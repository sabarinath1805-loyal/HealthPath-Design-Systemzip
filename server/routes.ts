import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { setupAuth, requireAuth } from "./auth";
import { storage } from "./storage";
import { getOpenAI, CHAT_MODEL } from "./openai";
import { SYSTEM_PROMPT, TOOLS } from "./prompt";
import type { Case, Message, User } from "@shared/schema";
import type OpenAI from "openai";

const sendSchema = z.object({ text: z.string().min(1).max(8000) });
const newCaseSchema = z.object({ title: z.string().min(1).max(120).optional() });

// --- helpers ----------------------------------------------------

function relativeMeta(c: Case): string {
  const now = Date.now();
  const updated = new Date(c.updatedAt).getTime();
  const days = Math.floor((now - updated) / (1000 * 60 * 60 * 24));
  let when: string;
  if (days <= 0) when = "Today";
  else if (days === 1) when = "Yesterday";
  else if (days < 7) when = `${days} days ago`;
  else if (days < 30) when = `${Math.floor(days / 7)} weeks ago`;
  else when = "Last month";

  if (c.status === "waiting") return `${when} · waiting on reply`;
  return when;
}

function bucketFor(c: Case): "open" | "recent" | "earlier" {
  if (c.status === "waiting") return "open";
  const days = Math.floor(
    (Date.now() - new Date(c.updatedAt).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (days < 7) return "recent";
  return "earlier";
}

function caseView(c: Case) {
  return {
    id: c.id,
    title: c.title,
    status: c.status,
    meta: relativeMeta(c),
    bucket: bucketFor(c),
    updatedAt: c.updatedAt,
  };
}

function deriveTitle(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 48) return clean;
  return clean.slice(0, 45).trimEnd() + "…";
}

// Map stored messages into OpenAI chat history.
function toChatHistory(
  msgs: Message[],
): OpenAI.Chat.Completions.ChatCompletionMessageParam[] {
  return msgs.map((m) => {
    if (m.role === "user") {
      return { role: "user", content: m.text ?? "" };
    }
    let content = m.text ?? "";
    if (m.kind === "document" && m.data) {
      const d = m.data as any;
      content += `\n\n[I drafted a document titled "${d.title}".]`;
    } else if (m.kind === "escalation" && m.data) {
      const d = m.data as any;
      content += `\n\n[I suggested a next step: ${d.title}]`;
    }
    return { role: "assistant", content: content || "(no content)" };
  });
}

function sse(res: Response, event: object) {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

// --- routes -----------------------------------------------------

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // List cases for the signed-in user
  app.get("/api/cases", requireAuth, async (req, res) => {
    const user = req.user as User;
    const list = await storage.getCases(user.id);
    res.json(list.map(caseView));
  });

  // Create a new case
  app.post("/api/cases", requireAuth, async (req, res) => {
    const user = req.user as User;
    const parsed = newCaseSchema.safeParse(req.body);
    const title = parsed.success && parsed.data.title ? parsed.data.title : "New case";
    const c = await storage.createCase(user.id, title);
    res.status(201).json(caseView(c));
  });

  // Get a single case with its messages
  app.get("/api/cases/:id", requireAuth, async (req, res) => {
    const user = req.user as User;
    const id = Number(req.params.id);
    const c = await storage.getCase(id, user.id);
    if (!c) return res.status(404).json({ message: "Case not found." });
    const msgs = await storage.getMessages(id);
    res.json({ case: caseView(c), messages: msgs });
  });

  // Delete a case
  app.delete("/api/cases/:id", requireAuth, async (req, res) => {
    const user = req.user as User;
    const id = Number(req.params.id);
    const c = await storage.getCase(id, user.id);
    if (!c) return res.status(404).json({ message: "Case not found." });
    await storage.deleteCase(id, user.id);
    res.sendStatus(204);
  });

  // Send a message and stream the assistant reply (SSE)
  app.post("/api/cases/:id/messages", requireAuth, async (req, res) => {
    const user = req.user as User;
    const id = Number(req.params.id);
    const c = await storage.getCase(id, user.id);
    if (!c) return res.status(404).json({ message: "Case not found." });

    const parsed = sendSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Type a message first." });
    }

    const existing = await storage.getMessages(id);
    const isFirst = existing.length === 0;

    const userMsg = await storage.addMessage({
      caseId: id,
      role: "user",
      text: parsed.data.text,
      kind: "text",
      data: null,
    });

    if (isFirst && (c.title === "New case" || !c.title)) {
      await storage.updateCase(id, user.id, {
        title: deriveTitle(parsed.data.text),
        status: "open",
      });
    } else if (c.status === "waiting") {
      // User re-engaged — the case is active again, not waiting on a reply.
      await storage.updateCase(id, user.id, { status: "open" });
    }

    // Set up SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    sse(res, { type: "user", message: userMsg });

    const history = toChatHistory([...existing, userMsg]);

    let openai: OpenAI;
    try {
      openai = getOpenAI();
    } catch (err: any) {
      sse(res, {
        type: "error",
        message:
          "Chat isn't connected yet. The OpenAI integration needs to be authorized.",
      });
      return res.end();
    }

    let fullText = "";
    const toolAcc: Record<number, { name: string; args: string }> = {};

    try {
      const stream = await openai.chat.completions.create({
        model: CHAT_MODEL,
        stream: true,
        max_completion_tokens: 8192,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...history],
        tools: TOOLS,
      });

      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (!delta) continue;
        if (delta.content) {
          fullText += delta.content;
          sse(res, { type: "delta", text: delta.content });
        }
        if (delta.tool_calls) {
          for (const tc of delta.tool_calls) {
            const idx = tc.index ?? 0;
            if (!toolAcc[idx]) toolAcc[idx] = { name: "", args: "" };
            if (tc.function?.name) toolAcc[idx].name += tc.function.name;
            if (tc.function?.arguments)
              toolAcc[idx].args += tc.function.arguments;
          }
        }
      }
    } catch (err: any) {
      console.error("AI stream error:", err?.message || err);
      sse(res, {
        type: "error",
        message: "Something went wrong reaching the assistant. Please try again.",
      });
      return res.end();
    }

    // Resolve the first valid tool call into a card
    let card: { kind: "document" | "escalation"; data: any } | null = null;
    for (const idx of Object.keys(toolAcc)) {
      const tc = toolAcc[Number(idx)];
      let parsedArgs: any;
      try {
        parsedArgs = JSON.parse(tc.args || "{}");
      } catch {
        continue;
      }
      if (tc.name === "draft_document") {
        card = {
          kind: "document",
          data: {
            title: parsedArgs.title ?? "Document",
            caseId: `CASE-${String(id).padStart(6, "0")}`,
            language: parsedArgs.language ?? "",
            status: "Draft",
            preview: parsedArgs.body ?? "",
          },
        };
        break;
      }
      if (tc.name === "suggest_escalation") {
        card = {
          kind: "escalation",
          data: {
            label: parsedArgs.label ?? "Next step",
            title: parsedArgs.title ?? "",
            description: parsedArgs.description ?? "",
            icon: parsedArgs.icon ?? "alertCircle",
          },
        };
        break;
      }
    }

    const assistantMsg = await storage.addMessage({
      caseId: id,
      role: "assistant",
      text: fullText || null,
      kind: card ? card.kind : "text",
      data: card ? card.data : null,
    });

    // Escalation implies the case is now waiting on someone else
    if (card?.kind === "escalation") {
      await storage.updateCase(id, user.id, { status: "waiting" });
    } else {
      await storage.touchCase(id);
    }

    sse(res, { type: "message", message: assistantMsg });
    sse(res, { type: "done" });
    res.end();
  });

  return createServer(app);
}

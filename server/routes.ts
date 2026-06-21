import type { Express, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import { setupAuth, requireAuth } from "./auth";
import { storage } from "./storage";
import { getAnthropic, CHAT_MODEL } from "./openai";
import { SYSTEM_PROMPT, TOOLS_ANTHROPIC } from "./prompt";
import { retrieveLegalContext, formatCitations, type RetrievedChunk } from "./rag";
import type { Case, Message, User } from "@shared/schema";
import type Anthropic from "@anthropic-ai/sdk";

const sendSchema = z.object({ text: z.string().min(1).max(8000)});
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
  else if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  else return "Last month";

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

// Derive a short, descriptive title from the first message.
// We do NOT just take the first 48 chars — we look for a clear subject
// pattern. For casual openers (e.g. "Hey bro", "Hi!") we fall back to a
// generic placeholder so the title isn't verbatim user text.
function deriveTitle(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return "New case";
  // Strip leading greetings/pleasantries
  const stripped = clean
    .replace(/^(hey|hi|hello|hola|ola|que tal|qué tal|good\s+(morning|afternoon|evening))[\s,!.]*/i, "")
    .trim();
  if (stripped.length === 0 || stripped.length < 4) {
    return "New conversation";
  }
  // Try to find the first "I need / I want / My [X] / Estoy en / Necesito"
  // pattern and use what comes after it.
  const patterns = [
    /^(?:i\s+)?(?:need|want|have|got|am|was|got)\s+([^.!?\n]+)/i,
    /^(?:my|me|esto|tengo|debo|necesito|quiero)\s+([^.!?\n]+)/i,
    /^(?:can|could|would)\s+you\s+([^.!?\n]+)/i,
    /^(?:help|ayuda|ay[úu]dame)\s+([^.!?\n]+)/i,
  ];
  for (const p of patterns) {
    const m = stripped.match(p);
    if (m && m[1] && m[1].length >= 4) {
      const t = m[1].trim().replace(/[,.!?;]+$/, "");
      const capped = t.length > 44 ? t.slice(0, 42).trimEnd() + "…" : t;
      // Title-case: capitalize first letter
      return capped.charAt(0).toUpperCase() + capped.slice(1);
    }
  }
  // Fallback: take first sentence, cap at 48 chars
  const first = stripped.split(/[.!?\n]/)[0].trim();
  if (first.length === 0) return "New conversation";
  return first.length > 48 ? first.slice(0, 45).trimEnd() + "…" : first;
}

function sse(res: Response, event: object) {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

// Convert stored messages into Anthropic format.
function toAnthropicHistory(msgs: Message[]): Anthropic.MessageParam[] {
  return msgs.map((m) => {
    if (m.role === "user") {
      return { role: "user", content: m.text ?? "" };
    }
    let text = m.text ?? "";
    if (m.kind === "document" && m.data) {
      const d = m.data as any;
      text += `\n\n[I drafted a document titled "${d.title}".]`;
    } else if (m.kind === "escalation" && m.data) {
      const d = m.data as any;
      text += `\n\n[I suggested a next step: ${d.title}]`;
    }
    return { role: "assistant", content: text || "(no content)" };
  });
}

// Read "country" from a chat history (very lightweight, keyword-based).
// Used so we can pre-attach RAG context without the model having to ask.
function inferCountry(msgs: Message[]): string | null {
  const text = msgs
    .map((m) => m.text ?? "")
    .join(" ")
    .toLowerCase();
  if (/\b(eps|sura|compensar|sanis|cafesalud|c?c?f?c?d|promotor(a)?|c[oó]rdoba|sanitas|compensar|bogot[aá]|medell[ií]n|colombia|ley\s*1751)\b/.test(text)) {
    return "Colombia";
  }
  if (/\b(philhealth|philippines|manila|cebu|quezon|ra\s*11223)\b/.test(text)) {
    return "Philippines";
  }
  if (/\b(bpjs|jakarta|indonesia|jkn)\b/.test(text)) return "Indonesia";
  if (/\b(vietnam|hanoi|ho\s*chi\s*minh|vn)\b/.test(text)) return "Vietnam";
  if (/\b(pmjay|ayushman|india|mumbai|delhi|rsby|edraakhil)\b/.test(text)) {
    return "India";
  }
  return null;
}

// --- routes -----------------------------------------------------

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // List cases
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
      await storage.updateCase(id, user.id, { status: "open" });
    }

    // Set up SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    sse(res, { type: "user", message: userMsg });

    const history = toAnthropicHistory([...existing, userMsg]);

    // Pre-attach RAG context when the user (or the conversation) appears
    // to be asking about legal rights, insurance coverage, complaint procedures,
    // or anything grounded in the per-country document store.
    let ragBlock = "";
    const userText = parsed.data.text.toLowerCase();
    const ragTriggers =
      /\b(right|denial|denied|deny|denying|appeal|petition|eps|philhealth|bpjs|pmjay|ayushman|scheme|insurance|coverage|medication|medicine|prescription|clinic|hospital|complaint|queja|tutela|recurso|derecho|cobertura|medicamento|negativa|asegurado|afiliado|seguro)\b/;
    if (ragTriggers.test(userText) || existing.length > 0) {
      const country = inferCountry([...existing, userMsg]);
      try {
        const chunks = await retrieveLegalContext(parsed.data.text, country ?? undefined);
        if (chunks.length > 0) {
          ragBlock = `\n\n[GROUNDED CONTEXT — passages from per-country official sources. Cite the source by name in your answer, not the chunk number.]\n\n${formatCitations(chunks)}`;
        }
      } catch (err) {
        console.error("RAG retrieve failed:", (err as Error).message);
      }
    }

    let anthropic: Anthropic;
    try {
      anthropic = getAnthropic();
    } catch (err: any) {
      sse(res, {
        type: "error",
        message: "Chat isn't connected yet. The Anthropic integration needs to be authorized.",
      });
      return res.end();
    }

    let fullText = "";
    let toolCard: { kind: "document" | "escalation"; data: any } | null = null;

    // Allow up to 2 tool-use rounds so the model can call a tool
    // (e.g. draft_document) and then write a follow-up message
    // describing what it just did.
    const MAX_ROUNDS = 2;
    const toolResults: Anthropic.ToolResultBlockParam[] = [];

    try {
      for (let round = 0; round < MAX_ROUNDS; round++) {
        const messages: Anthropic.MessageParam[] = [...history];
        if (toolResults.length) {
          // Add a synthetic assistant turn that contains the tool_use blocks
          // (Anthropic requires us to send them back before the tool_result).
          // We rebuild the assistant turn from the last streamed tool_uses.
          // (Simplified: skip emitting synthetic assistant turn; instead
          //   pass tool results back as a new user message with the prefix.)
          messages.push({
            role: "user",
            content: toolResults.flat(),
          });
        }

        const system = SYSTEM_PROMPT + ragBlock;

        const stream = anthropic.messages.stream({
          model: CHAT_MODEL,
          max_tokens: 4096,
          system,
          tools: TOOLS_ANTHROPIC,
          messages,
        });

        const pendingToolUses: Anthropic.ToolUseBlockParam[] = [];
        let currentToolJson = "";
        let currentToolName: string | null = null;
        let currentToolId: string | null = null;

        for await (const event of stream) {
          if (
            event.type === "content_block_start" &&
            event.content_block.type === "tool_use"
          ) {
            currentToolName = event.content_block.name;
            currentToolId = event.content_block.id;
            currentToolJson = "";
            // announce the tool call to the client (debug aid)
            sse(res, { type: "tool", name: currentToolName });
          } else if (event.type === "content_block_delta") {
            if (event.delta.type === "text_delta") {
              const text = event.delta.text;
              if (text) {
                fullText += text;
                sse(res, { type: "delta", text });
              }
            } else if (event.delta.type === "input_json_delta") {
              currentToolJson += event.delta.partial_json;
            }
          } else if (event.type === "content_block_stop") {
            if (currentToolName && currentToolId) {
              let input: any = {};
              try {
                input = currentToolJson ? JSON.parse(currentToolJson) : {};
              } catch {
                input = {};
              }
              pendingToolUses.push({
                type: "tool_use",
                id: currentToolId,
                name: currentToolName,
                input,
              });
              currentToolName = null;
              currentToolId = null;
              currentToolJson = "";
            }
          } else if (event.type === "message_stop") {
            // end of message
          }
        }

        if (pendingToolUses.length === 0) break;

        // Resolve our two "card" tools. Server tools (web_search,
        // retrieve_legal_context, extract_document_fields) we let the
        // model call on its own next round — we just echo a stub.
        for (const tu of pendingToolUses) {
          if (tu.name === "draft_document") {
            const input = tu.input as any;
            toolCard = {
              kind: "document",
              data: {
                title: input.title ?? "Document",
                caseId: `CASE-${String(id).padStart(6, "0")}`,
                language: input.language ?? "",
                status: "Draft",
                preview: input.body ?? "",
              },
            };
            toolResults.push({
              type: "tool_result",
              tool_use_id: tu.id,
              content: "Document drafted. Continue explaining to the user.",
            });
          } else if (tu.name === "suggest_escalation") {
            const input = tu.input as any;
            toolCard = {
              kind: "escalation",
              data: {
                label: input.label ?? "Next step",
                title: input.title ?? "",
                description: input.description ?? "",
                icon: input.icon ?? "alertCircle",
              },
            };
            toolResults.push({
              type: "tool_result",
              tool_use_id: tu.id,
              content: "Escalation surfaced. Continue explaining to the user.",
            });
          } else {
            // Server tools: we don't actually run them, just give a stub
            // result. In production, these would be real handlers.
            toolResults.push({
              type: "tool_result",
              tool_use_id: tu.id,
              content: "Tool not configured in this build.",
            });
          }
        }
        // loop and let the model write the follow-up text
      }
    } catch (err: any) {
      console.error("AI stream error:", err?.message || err);
      sse(res, {
        type: "error",
        message: "Something went wrong reaching the assistant. Please try again.",
      });
      return res.end();
    }

    const assistantMsg = await storage.addMessage({
      caseId: id,
      role: "assistant",
      text: fullText || null,
      kind: toolCard ? toolCard.kind : "text",
      data: toolCard ? toolCard.data : null,
    });

    if (toolCard?.kind === "escalation") {
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

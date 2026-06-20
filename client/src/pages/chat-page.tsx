import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Sidebar } from "@/components/chat/Sidebar";
import { Composer } from "@/components/chat/Composer";
import {
  AssistantMessage,
  AssistantText,
} from "@/components/chat/AssistantMessage";
import { UserBubble } from "@/components/chat/UserBubble";
import { DocumentCard } from "@/components/chat/DocumentCard";
import { EscalationCard } from "@/components/chat/EscalationCard";
import { BrandLogo } from "@/components/chat/BrandLogo";
import { Badge } from "@/components/core/Badge";
import { Button } from "@/components/core/Button";
import { IconButton } from "@/components/core/IconButton";
import { Icon } from "@/components/core/Icon";

type CaseView = {
  id: number;
  title: string;
  status: string;
  meta: string;
  bucket: "open" | "recent" | "earlier";
};

type ChatMessage = {
  id: number | string;
  role: "user" | "assistant";
  text: string | null;
  kind: "text" | "document" | "escalation";
  data: any;
  thinking?: boolean;
};

const STREAM_ID = "__stream__";

const STARTER_PROMPTS = [
  "My insurance denied a medicine I need",
  "Help me draft a complaint letter",
  "What's covered under my plan?",
  "I've been waiting 3 weeks for an answer",
  "Find a pharmacy that has my prescription",
];

function initialsFor(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function downloadText(filename: string, text: string) {
  const blob = new Blob([text || ""], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ChatPage() {
  const { user, logoutMutation } = useAuth();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sending, setSending] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobile, setMobile] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

  const casesQuery = useQuery<CaseView[]>({ queryKey: ["/api/cases"] });
  const cases = casesQuery.data ?? [];
  const active = useMemo(
    () => cases.find((c) => c.id === activeId),
    [cases, activeId],
  );

  useEffect(() => {
    const onResize = () => setMobile(window.innerWidth < 860);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function selectCase(id: number) {
    setActiveId(id);
    if (mobile) setDrawerOpen(false);
    setMessages([]);
    try {
      const res = await apiRequest("GET", `/api/cases/${id}`);
      const data = await res.json();
      setMessages(data.messages);
    } catch {
      setMessages([]);
    }
  }

  function newCase() {
    setActiveId(null);
    setMessages([]);
    if (mobile) setDrawerOpen(false);
  }

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);

    let caseId = activeId;
    try {
      if (caseId == null) {
        const res = await apiRequest("POST", "/api/cases", {});
        const created: CaseView = await res.json();
        caseId = created.id;
        setActiveId(created.id);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `u-${Date.now()}`,
          role: "user",
          text: trimmed,
          kind: "text",
          data: null,
        },
        {
          id: STREAM_ID,
          role: "assistant",
          text: "",
          kind: "text",
          data: null,
          thinking: true,
        },
      ]);

      const res = await fetch(`/api/cases/${caseId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
        credentials: "include",
      });

      if (!res.ok || !res.body) throw new Error("stream failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      const patchStream = (fn: (m: ChatMessage) => ChatMessage) =>
        setMessages((prev) =>
          prev.map((m) => (m.id === STREAM_ID ? fn(m) : m)),
        );

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf("\n\n")) >= 0) {
          const frame = buffer.slice(0, idx);
          buffer = buffer.slice(idx + 2);
          if (!frame.startsWith("data: ")) continue;
          const ev = JSON.parse(frame.slice(6));

          if (ev.type === "delta") {
            patchStream((m) => ({
              ...m,
              thinking: false,
              text: (m.text ?? "") + ev.text,
            }));
          } else if (ev.type === "message") {
            const msg = ev.message as ChatMessage;
            patchStream(() => ({ ...msg, thinking: false }));
          } else if (ev.type === "error") {
            patchStream((m) => ({
              ...m,
              thinking: false,
              text: ev.message,
            }));
          }
        }
      }
    } catch {
      setMessages((prev) =>
        prev.map((m) =>
          m.id === STREAM_ID
            ? {
                ...m,
                thinking: false,
                text: "Something went wrong. Please try again.",
              }
            : m,
        ),
      );
    } finally {
      setSending(false);
      queryClient.invalidateQueries({ queryKey: ["/api/cases"] });
    }
  }

  const empty = messages.length === 0;
  const userName = user?.name ?? "You";

  const shellClass = [
    "hp hp-app",
    mobile && "hp--mobile",
    mobile && drawerOpen && "hp--drawer-open",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClass}>
      {mobile && (
        <div
          className="hp-sidebar-scrim"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <Sidebar
        cases={cases}
        activeId={activeId ?? undefined}
        onSelectCase={selectCase}
        onNewCase={newCase}
        user={{
          name: userName,
          meta: user?.email ?? "",
          initials: initialsFor(userName),
        }}
        onClose={mobile ? () => setDrawerOpen(false) : undefined}
      />

      <main className="hp-main">
        <header className="hp-main__header">
          {mobile && (
            <IconButton label="Open menu" onClick={() => setDrawerOpen(true)}>
              <Icon name="menu" size={20} />
            </IconButton>
          )}
          <div className="hp-main__title">
            {empty ? "New case" : active?.title || "Conversation"}
          </div>
          {active?.status && !empty && (
            <Badge tone={active.status === "waiting" ? "warn" : "brand"}>
              {active.status === "waiting" ? "Waiting on reply" : "Open"}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => logoutMutation.mutate()}
          >
            Sign out
          </Button>
        </header>

        {empty ? (
          <div className="hp-empty">
            <BrandLogo size="lg" showWord={false} />
            <h1 className="hp-empty__title">
              Hi{userName ? `, ${userName.split(" ")[0]}` : ""}. What's on your
              mind?
            </h1>
            <p className="hp-empty__sub">
              Tell me what's going on, in your own words. I can explain
              insurance coverage, draft a complaint letter, or figure out who to
              ask next. I don't give medical advice. Take your time.
            </p>
            <div className="hp-empty__chips">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  className="hp-empty__chip"
                  onClick={() => send(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="hp-thread" ref={scrollerRef}>
            <div className="hp-thread__inner">
              {messages.map((m) =>
                m.role === "user" ? (
                  <UserBubble key={m.id}>{m.text}</UserBubble>
                ) : (
                  <AssistantMessage key={m.id} thinking={m.thinking}>
                    {m.text && <AssistantText>{m.text}</AssistantText>}
                    {m.kind === "document" && m.data && (
                      <DocumentCard
                        title={m.data.title}
                        caseId={m.data.caseId}
                        language={m.data.language}
                        status={m.data.status || "Draft"}
                        preview={m.data.preview}
                        onDownload={() =>
                          downloadText(
                            `${m.data.title}.txt`,
                            m.data.preview,
                          )
                        }
                        onCopy={() =>
                          navigator.clipboard?.writeText(m.data.preview || "")
                        }
                      />
                    )}
                    {m.kind === "escalation" && m.data && (
                      <EscalationCard
                        label={m.data.label}
                        title={m.data.title}
                        description={m.data.description}
                        icon={m.data.icon}
                      />
                    )}
                  </AssistantMessage>
                ),
              )}
            </div>
          </div>
        )}

        <Composer
          onSend={send}
          autoFocus={!mobile}
          disabled={sending}
        />
      </main>
    </div>
  );
}

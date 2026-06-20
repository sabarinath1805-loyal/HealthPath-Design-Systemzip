// ============================================================
// HealthPath — application screens
//
// These compose the components in components/core + components/chat.
// Copy-paste-ready for engineering. Each Screen is a self-contained
// React component with mock data; swap in real backend handlers.
// ============================================================

/* global React */
const { useState, useMemo, useRef, useEffect } = React;

// Pulled from the design-system bundle (window.<Namespace>.<Name>)
const NS = window.HealthPathDesignSystem_54b6fa;
const {
  Icon,
  Button,
  IconButton,
  Input,
  Textarea,
  Field,
  Avatar,
  Badge,
  Disclaimer,
  BrandLogo,
  UserBubble,
  AssistantMessage,
  AssistantText,
  DocumentCard,
  EscalationCard,
  Composer,
  ConversationItem,
  Sidebar,
} = NS;

// ---- Mock data --------------------------------------------------

const MOCK_CASES = [
  {
    id: "c1",
    title: "Medication denied by EPS",
    meta: "Today · waiting on EPS",
    status: "waiting",
    bucket: "open",
  },
  {
    id: "c2",
    title: "Hospital bill — wrong copay",
    meta: "2 days ago · draft sent",
    status: "open",
    bucket: "recent",
  },
  {
    id: "c3",
    title: "Appointment reassignment",
    meta: "5 days ago",
    bucket: "recent",
  },
  {
    id: "c4",
    title: "Vaccination record request",
    meta: "Last month",
    bucket: "earlier",
  },
  {
    id: "c5",
    title: "Insurance card replacement",
    meta: "Last month",
    bucket: "earlier",
  },
];

const USER = { name: "María R.", meta: "Bogotá", initials: "MR" };

const SAMPLE_LETTER = `Bogotá, 20 de junio de 2026

Estimado/a Director/a de Atención al Usuario:

Mediante la presente solicito formalmente la entrega del medicamento Atorvastatina 40 mg, prescrito por mi médico tratante el 4 de junio de 2026 (orden adjunta), que mi EPS ha negado sin justificación escrita.

Conforme al artículo 10 de la Resolución 1604 de 2013, agradeceré una respuesta escrita en un plazo máximo de diez (10) días hábiles, indicando si el medicamento será entregado o las razones formales de su negación.

Atentamente,
María R.
CC. 1.020.…
Caso CASE-2026-04812`;

// ============================================================
// 1. LOGIN screen
// ============================================================

function LoginScreen({ onSignedIn }) {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onSignedIn?.({ email, name: name || "María R." });
  };

  return (
    <div className="hp hp-auth">
      <form className="hp-auth__card" onSubmit={submit} noValidate>
        <div className="hp-auth__brand">
          <BrandLogo size="lg" />
          <h1 className="hp-auth__title">
            {mode === "login" ? "Welcome back." : "Let's get started."}
          </h1>
          <p className="hp-auth__sub">
            {mode === "login"
              ? "I'll pick up your cases where we left off."
              : "One small step. Nothing here is medical advice — I help with paperwork and access."}
          </p>
        </div>

        {mode === "register" && (
          <Field label="Your name" htmlFor="name">
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should I call you?"
            />
          </Field>
        )}

        <Field label="Email" htmlFor="email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            leftIcon={<Icon name="mail" size={16} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </Field>

        <Field
          label="Password"
          htmlFor="password"
          help={mode === "register" ? "At least 8 characters." : undefined}
        >
          <Input
            id="password"
            type="password"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            required
            leftIcon={<Icon name="lock" size={16} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </Field>

        <Button variant="primary" size="lg" block type="submit">
          {mode === "login" ? "Sign in" : "Create account"}
        </Button>

        <div className="hp-auth__divider">or</div>

        <Button variant="secondary" size="lg" block type="button">
          Continue as a guest
        </Button>

        <p className="hp-auth__foot">
          {mode === "login" ? (
            <>
              New here?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("register"); }}>
                Create an account
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setMode("login"); }}>
                Sign in
              </a>
            </>
          )}
        </p>

        <Disclaimer />
      </form>
    </div>
  );
}

// ============================================================
// 2. EMPTY state (first conversation)
// ============================================================

const STARTER_PROMPTS = [
  "My insurance denied a medicine I need",
  "Help me draft a complaint letter",
  "What's covered under my plan?",
  "I've been waiting 3 weeks for an answer",
  "Find a pharmacy that has my prescription",
];

function EmptyState({ onStart, userName }) {
  return (
    <div className="hp-empty">
      <BrandLogo size="lg" showWord={false} />
      <h1 className="hp-empty__title">
        Hi{userName ? `, ${userName.split(" ")[0]}` : ""}. What's on your mind?
      </h1>
      <p className="hp-empty__sub">
        Tell me what's going on, in your own words. I can explain insurance coverage,
        draft a complaint letter, or figure out who to ask next. Take your time.
      </p>
      <div className="hp-empty__chips">
        {STARTER_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            className="hp-empty__chip"
            onClick={() => onStart?.(p)}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// 3. Thread — a rendered list of messages, supports all 3 types
// ============================================================

function Thread({ messages }) {
  const scrollerRef = useRef(null);
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    // Smoothly scroll to bottom without using scrollIntoView
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="hp-thread" ref={scrollerRef}>
      <div className="hp-thread__inner">
        {messages.map((m, i) => (
          <MessagePart key={i} message={m} />
        ))}
      </div>
    </div>
  );
}

function MessagePart({ message }) {
  if (message.role === "user") {
    return <UserBubble>{message.text}</UserBubble>;
  }
  if (message.role === "assistant") {
    return (
      <AssistantMessage thinking={message.thinking}>
        {message.text && <AssistantText>{message.text}</AssistantText>}
        {message.kind === "document" && (
          <DocumentCard
            title={message.title}
            caseId={message.caseId}
            language={message.language}
            status={message.status || "Draft"}
            preview={message.preview}
            onDownload={() => downloadText(message.title + ".txt", message.preview)}
            onCopy={() => navigator.clipboard?.writeText(message.preview || "")}
            onOpen={() => alert("Open full document")}
          />
        )}
        {message.kind === "escalation" && (
          <EscalationCard
            label={message.label}
            title={message.title}
            description={message.description}
            icon={message.icon}
            primaryAction={message.primaryAction}
            secondaryAction={message.secondaryAction}
          />
        )}
      </AssistantMessage>
    );
  }
  return null;
}

function downloadText(filename, text) {
  const blob = new Blob([text || ""], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

// ============================================================
// 4. Main chat view (sidebar + main panel + composer)
// ============================================================

const SAMPLE_CONVERSATION = [
  {
    role: "user",
    text:
      "Mi EPS me negó la Atorvastatina que mi doctor recetó. La necesito para mi colesterol. ¿Qué puedo hacer?",
  },
  {
    role: "assistant",
    text:
      "Lamento que estés pasando por esto — pasa más de lo que debería, y hay un camino claro para resolverlo. Lo primero es pedir la negación por escrito. Tu EPS está obligada a entregártela. Después, presentamos una solicitud formal y, si no responden en 10 días hábiles, podemos avanzar.\n\nQuieres que prepare la solicitud formal ahora?",
  },
  {
    role: "user",
    text: "Sí, por favor. Hazlo en español formal.",
  },
  {
    role: "assistant",
    text:
      "Aquí tienes el borrador. Lo dejé formal porque es lo que la oficina espera. Puedes copiarlo tal cual o cambiar lo que quieras antes de enviar.",
    kind: "document",
    title: "Solicitud formal de medicamento",
    caseId: "CASE-2026-04812",
    language: "Spanish · formal",
    status: "Draft",
    preview: SAMPLE_LETTER,
  },
  {
    role: "assistant",
    kind: "escalation",
    label: "Heads up",
    title: "Tu caso lleva 18 días abierto sin respuesta.",
    description:
      "La EPS tiene 10 días hábiles para responder por escrito. Es momento de pedir una respuesta formal y dejar constancia.",
    icon: "clock",
    primaryAction: { label: "Redactar recordatorio", onClick: () => alert("Drafting reminder…") },
    secondaryAction: { label: "¿A quién llamo?", onClick: () => alert("Showing contacts…") },
  },
];

function MainChat({
  initialMessages,
  cases = MOCK_CASES,
  user = USER,
  mobile = false,
  onBackToShowcase,
}) {
  const [activeId, setActiveId] = useState("c1");
  const [messages, setMessages] = useState(initialMessages || []);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [recording, setRecording] = useState(false);

  const active = useMemo(() => cases.find((c) => c.id === activeId), [cases, activeId]);

  const send = (text) => {
    if (!text) return;
    setMessages((m) => [...m, { role: "user", text }]);
    // Mock assistant reply
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", thinking: true },
      ]);
      setTimeout(() => {
        setMessages((m) => {
          const next = m.filter((x) => !x.thinking);
          return [
            ...next,
            {
              role: "assistant",
              text:
                "Got it. Let me pull up what your plan actually says about that — give me a moment.",
            },
          ];
        });
      }, 1200);
    }, 200);
  };

  const startFromPrompt = (p) => {
    setMessages([{ role: "user", text: p }]);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "assistant", thinking: true }]);
      setTimeout(() => {
        setMessages((m) => {
          const next = m.filter((x) => !x.thinking);
          return [
            ...next,
            {
              role: "assistant",
              text:
                "I can help with that. Tell me a little more — what's the medicine, who's the insurance, and what did they say when they denied it?",
            },
          ];
        });
      }, 900);
    }, 200);
  };

  const newCase = () => {
    setMessages([]);
    setActiveId("new");
    if (mobile) setDrawerOpen(false);
  };

  const empty = messages.length === 0;

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
        activeId={activeId}
        onSelectCase={(id) => {
          setActiveId(id);
          if (id === "c1") setMessages(SAMPLE_CONVERSATION);
          else setMessages([]);
          if (mobile) setDrawerOpen(false);
        }}
        onNewCase={newCase}
        user={user}
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
          {!mobile && (
            <IconButton label="More options">
              <Icon name="more" size={18} />
            </IconButton>
          )}
        </header>

        {empty ? (
          <EmptyState userName={user?.name} onStart={startFromPrompt} />
        ) : (
          <Thread messages={messages} />
        )}

        <Composer
          onSend={send}
          onAttach={() => alert("Open file picker")}
          onMicToggle={() => setRecording((r) => !r)}
          isRecording={recording}
          autoFocus={!mobile}
        />
      </main>
    </div>
  );
}

// ============================================================
// Showcase — switcher across screens (the wrapper this demo uses).
// In production, your router renders LoginScreen → MainChat directly.
// ============================================================

function Showcase() {
  const [screen, setScreen] = useState("chat-loaded"); // login | empty | chat-loaded | mobile-chat | mobile-empty
  const [user, setUser] = useState(USER);

  const screens = [
    { id: "chat-loaded", label: "Main chat" },
    { id: "empty",       label: "Empty state" },
    { id: "login",       label: "Sign in" },
    { id: "mobile-chat", label: "Mobile · chat" },
    { id: "mobile-empty",label: "Mobile · empty" },
  ];

  let content;
  if (screen === "login") {
    content = <LoginScreen onSignedIn={(u) => { setUser({ ...USER, ...u }); setScreen("chat-loaded"); }} />;
  } else if (screen === "empty") {
    content = <MainChat user={user} initialMessages={[]} />;
  } else if (screen === "chat-loaded") {
    content = <MainChat user={user} initialMessages={SAMPLE_CONVERSATION} />;
  } else if (screen === "mobile-chat") {
    content = (
      <div className="hp-mobile-frame">
        <MainChat user={user} initialMessages={SAMPLE_CONVERSATION} mobile />
      </div>
    );
  } else if (screen === "mobile-empty") {
    content = (
      <div className="hp-mobile-frame">
        <MainChat user={user} initialMessages={[]} mobile />
      </div>
    );
  }

  return (
    <div className="showcase">
      <div className="showcase__bar">
        <BrandLogo />
        <span className="showcase__sep" />
        {screens.map((s) => (
          <button
            key={s.id}
            type="button"
            className={"showcase__tab" + (screen === s.id ? " is-active" : "")}
            onClick={() => setScreen(s.id)}
          >
            {s.label}
          </button>
        ))}
        <span style={{ flex: 1 }} />
        <span className="showcase__meta">
          {user.name}
        </span>
      </div>
      <div className="showcase__stage">{content}</div>
    </div>
  );
}

// Mount
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Showcase />);

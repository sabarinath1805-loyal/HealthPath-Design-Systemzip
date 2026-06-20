# HealthPath Design System

A design system for **HealthPath** — an AI agent that helps low-income patients in Colombia, India, and Southeast Asia navigate healthcare bureaucracy. HealthPath finds medication availability, translates insurance coverage into plain language, explains legal rights, generates formal complaint/claim letters, and gives clear next-step escalation guidance.

> HealthPath gives **zero medical advice**. It is a paperwork and access companion — not a clinician.

The product is a ChatGPT-style chat app. Users open a conversation, describe what they're stuck on, and HealthPath responds with plain-language explanations and — when it helps — drafts a document (a complaint letter, a claim form) or surfaces a clear next step (whom to call, what office to visit).

---

## Source material

This system was built by adapting the visual + interaction architecture of:

- **vercel/ai-chatbot** — <https://github.com/vercel/ai-chatbot> (the open-source Next.js + AI SDK chat template). The sidebar/main-panel/composer scaffold, message rendering, OKLCH color authoring approach, and shadow tier system are inspired by its `app/globals.css`, `components/chat/*`, and `components/ai-elements/*` directories. The reader can explore that repo to deepen any of the chat patterns used here (artifacts, tool calls, streaming, etc).

What's our own:
- Brand palette (warm teal/green/amber over warm neutrals — Vercel's is grayscale)
- Voice, tone, and writing rules (calm, plain-language, multilingual-safe)
- The two chat-card types unique to HealthPath: **Document** and **Escalation**
- The persistent "not medical advice" disclaimer
- Mobile-first composer and sidebar drawer

---

## Index

Files in this system, with purpose:

| Path | Purpose |
| --- | --- |
| `styles.css` | **Global CSS entry.** Consumers link this one file. |
| `tokens/fonts.css` | Webfonts (Geist, Geist Mono — via Google Fonts CDN). |
| `tokens/colors.css` | Base palette + semantic color aliases. |
| `tokens/typography.css` | Type families, weights, scale, semantic roles. |
| `tokens/spacing.css` | Spacing, radii, shadows, motion, layout sizes. |
| `assets/` | Logos and brand SVGs. |
| `guidelines/` | Foundation specimen cards (Type, Colors, Spacing, Brand). |
| `components/core/` | Primitives — Button, IconButton, Input, Avatar, Badge, Disclaimer. |
| `components/chat/` | Chat-domain components — UserBubble, AssistantMessage, **DocumentCard**, **EscalationCard**, Composer, Sidebar, ConversationItem, BrandLogo. |
| `ui_kits/healthpath/` | Full-screen recreations: main chat, empty state, login, mobile. |
| `SKILL.md` | Cross-compatible skill definition (works as a Claude Code Agent Skill). |

Open the **Design System** tab to browse every specimen and component card visually.

---

## Content fundamentals

The user is often anxious, exhausted, and dealing with a bureaucratic dead end. Every word in the product has to **lower the temperature**, not raise it.

### Voice

- **The agent speaks as "I", singular.** "I can draft that letter for you." Not "We" — that implies a faceless company. Not "HealthPath" in the third person — that's clinical.
- **The user is "you".**
- **Plain language, sixth-grade reading level.** Short sentences. One idea per sentence. Avoid Latinate jargon (`utilize` → `use`, `request` → `ask for`, `commence` → `start`).
- **Translatable-safe.** Avoid English idioms, regional metaphors, and humor that won't survive translation to Spanish or Hindi. Prefer literal phrasing.
- **Reassuring but never patronizing.** Acknowledge difficulty, then point at the next concrete step. "This part is confusing on purpose. Here's what to do next."
- **Always boundaried.** When the user asks for medical advice, redirect warmly: "I'm not able to give medical advice, but I can help you find a doctor who speaks your language or write a letter asking for a faster appointment."

### Tone calibration

| Situation | Tone |
| --- | --- |
| Default | Calm, patient, matter-of-fact. |
| User is frustrated or scared | A half-step warmer. Acknowledge first, then act. |
| Generated document | Formal, complete, ready to submit. The user can copy it as-is. |
| Escalation / next step | Direct and confident. No hedging. |
| Refusal (medical advice) | Warm + a useful alternative. Never just "no". |

### Casing

- **Sentence case** everywhere — buttons, headings, menu items, navigation. ("New chat", not "New Chat".)
- Proper nouns capitalised (HealthPath, IMSS, EPS, ESI, BPJS).
- Acronyms in caps when they're proper acronyms; spell out on first use.

### Emoji & punctuation

- **No emoji.** The audience is often in genuinely hard situations; emoji read as flippant or unprofessional. Icons (Lucide) do the work emoji would do elsewhere.
- Avoid exclamation marks. Periods are calmer.
- Em-dashes and parentheticals are fine — they slow the read down, which is what we want.

### Examples

✅ **Good — first reply on a new chat:**
> Hi. Tell me what's going on, in your own words. I can help you understand insurance coverage, find what your local pharmacy stocks, draft a complaint letter, or figure out who to ask next. Take your time.

✅ **Good — opening a generated letter:**
> Here's a draft. I've kept it formal because that's what the office expects. You can copy it as-is or change anything you want before sending.

✅ **Good — escalation card heading:**
> Your case has been open for 18 days. Here's the next step.

❌ **Avoid:**
> Hey! 👋 I'm HealthPath, your AI-powered healthcare navigator! Let's get started on your journey! 🏥✨

❌ **Avoid (clinical / corporate):**
> Please be advised that this platform does not provide clinical recommendations. Kindly utilize alternative resources for medical inquiries.

❌ **Avoid (patronizing):**
> Don't worry, sweetie, I'll help you figure this out!

### The disclaimer

A single line lives near the composer on every screen:

> I help with access and paperwork, not medical advice.

It is rendered in `--text-muted`, never as an alert. It is a quiet reminder — not a warning.

---

## Visual foundations

### Colors

A **warm, soft, low-saturation** palette. The brand will share screen with sad bureaucratic forms, screenshots of insurance portals, and photos of medication boxes — so HealthPath itself stays calm and neutral and lets that user content breathe.

- **Brand: soft teal-green** (`--teal-600` / `oklch(0.555 0.078 182)`). Reads as health-adjacent without being hospital-green. Used for the user bubble, primary buttons, focused links, the logo mark, and the Document card accent.
- **Soft blue** (`--blue-500` / `oklch(0.628 0.105 231)`) for information, links, and focus rings.
- **Warm amber** (`--amber-500` / `oklch(0.72 0.122 58)`) for the Escalation card only. Warm enough to feel like a guide, not a warning siren.
- **Warm neutrals** (`--warm-50` through `--warm-950`) — a whisper of warmth at hue ~80°. The background is `--warm-50`, not paper-white. The sidebar is `--warm-100`. Text is `--warm-900`, not pure black. Borders are `--warm-200`. **No sterile hospital white anywhere.**
- **Soft red** (`--red-500`) for genuine errors only. Never used for escalation, which is a guide, not a problem.

The palette is authored in OKLCH for perceptual evenness, then exposed as semantic aliases (`--text-primary`, `--surface-card`, `--bubble-user`, `--escalation-border`, …). Components only ever reference the aliases.

### Type

- **Geist** for everything, **Geist Mono** for reference codes (claim numbers, document IDs).
- Type scale tuned for low-end phones in bright daylight: chat body is `13px` (matches the underlying product), readable copy is `15px`. Nothing below `12px`.
- Headings carry `-0.025em` letter-spacing; body is at default tracking.
- Line height for chat messages is `1.65` — generous, easy to scan.
- `text-wrap: pretty` on body and `text-wrap: balance` on headings.

### Backgrounds

- Solid warm tones, never gradients on the canvas.
- The user message bubble uses solid `--bubble-user` (teal). No mesh gradients, no glass.
- Subtle glow only on the focused composer (a soft 12% blue halo).
- No background images, no patterns, no textures. The user's life is the texture.

### Animation

- **Calm, never bouncy.** Default easing is `--ease-out` `cubic-bezier(0.22, 1, 0.36, 1)` — a gentle settle.
- Durations: `120ms` for hovers, `200ms` for state changes, `280ms` for message-in.
- A new message fades up 6–8px. That's the only entrance animation on chat content.
- No infinite loops on content. The "thinking" indicator is the one exception — three dots with a 1.4s pulse.
- `prefers-reduced-motion: reduce` collapses all animation to opacity-only fades at `120ms`.

### Hover / press states

- **Hover** = surface gets `--surface-hover` (a half-step warmer) OR text gains 8% opacity weight. No drop shadow change on hover — that's reserved for true elevation.
- **Press** = surface gets `--surface-active`, no scale change. Buttons feel grounded, not springy.
- **Focus** = a 3px `--blue-500 @ 35%` ring via `box-shadow`. The ring is always visible on keyboard focus.

### Borders

- 1px hairlines in `--border` (`--warm-200`). `--border-strong` (`--warm-300`) for dividers between major regions only.
- Cards have a 1px border + a soft `--shadow-card`. Never border-less floating cards.
- The Escalation card has a **4px left border** in `--amber-500` — that's its identifying mark.

### Shadows

Six tiers. All warm-tinted (built from `--warm-950` at low opacity), never neutral-black.

- `--shadow-xs` — micro-lift on buttons.
- `--shadow-card` — default card.
- `--shadow-composer` — input bar at rest.
- `--shadow-composer-focus` — input bar focused (adds blue ring).
- `--shadow-float` — popovers, menus.
- `--shadow-modal` — modal sheets.

### Radii

Soft, never pill-like for content cards. Buttons `6px`. Cards `10px`. Composer `14px`. Message bubbles `18px`. Avatars and the mic/send buttons are the only fully round elements.

### Layout rules

- One column on mobile (≤640px). Sidebar becomes an off-canvas drawer.
- Two columns on tablet+ (sidebar 272px collapsing to 52px, main panel fluid).
- Chat column max-width `46rem` (736px) for comfortable reading.
- Composer pinned to the bottom of the chat column, not the viewport.
- Minimum touch target: `2.75rem` (44px).
- Sidebar items, conversation items, and composer buttons all meet the touch target on mobile.

### Imagery

- No stock photography in the product chrome. The product itself is text-and-card.
- When imagery DOES appear (Document card preview), it's warm and matte. No high-contrast medical imagery.

### Transparency, blur

- Transparency only on the composer disclaimer (`--text-muted`) and on the message-actions row (visible on hover at full opacity, otherwise 60%).
- No backdrop-blur. Low-end phones drop frames on blur.

---

## Iconography

HealthPath uses **Lucide** (the icon set the underlying vercel/ai-chatbot uses via `lucide-react`). Lucide is a clean, friendly, 1.5-stroke line family — calmer than Heroicons-solid and warmer than Phosphor-thin.

- **Loading**: via CDN (`https://unpkg.com/lucide@latest`) in HTML demos. In production React, install `lucide-react`.
- **Stroke width**: `1.75` by default. `1.5` at sizes ≥ 24px. Never solid-filled icons.
- **Sizing**: 16px in dense UI, 18px in the composer, 20px in conversation list items, 24px in section headers.
- **Color**: icons inherit `currentColor`. They are `--text-muted` by default, `--text-primary` on hover, `--brand` when active/selected.
- **Logo**: a custom inline SVG mark (`assets/logo-mark.svg`) + lockup (`assets/logo-lockup.svg`). The mark is a stylised path winding toward a destination with a small "plus" alongside — a wayfinding-for-healthcare cue. **It's the only original artwork in the system; everything else is text + Lucide.**

We do not use:
- Emoji as icons.
- Unicode glyphs (▶, ✓) as icons.
- Custom brand illustrations. (The product should feel like a clear conversation, not a marketing page.)

If you need an icon Lucide doesn't have, file an issue and ship Lucide's nearest match in the interim — never improvise an SVG inline.

---

## Caveats & flags for the user

- **Fonts**: Geist + Geist Mono are loaded from the Google Fonts CDN, not bundled binaries. If you need fully offline operation, drop the `.woff2` files into `assets/fonts/` and replace `tokens/fonts.css` with matching `@font-face` rules.
- **Logo**: the mark in `assets/` is a placeholder identity (a clean teal wayfinding glyph) — replace with the brand's real logo once it exists.
- **Icons**: Lucide is referenced via CDN in demos. In production code, install `lucide-react`.

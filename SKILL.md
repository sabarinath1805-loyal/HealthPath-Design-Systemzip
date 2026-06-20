---
name: healthpath-design
description: Use this skill to generate well-branded interfaces and assets for HealthPath, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a calm, multilingual, plain-language healthcare-bureaucracy chat agent.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.

Quick orientation:

- `styles.css` is the single global stylesheet — link it once. It pulls tokens (colors, type, spacing, motion) and component CSS.
- `tokens/` holds the source-of-truth CSS custom properties. Reference the **semantic aliases** (`--brand`, `--text-primary`, `--bubble-user`, `--escalation-border`, …) from components — never raw scales like `--teal-600`.
- `components/` holds the React primitives. The two HealthPath-specific cards are `components/chat/DocumentCard.{jsx,d.ts}` (generated complaint/claim letter) and `components/chat/EscalationCard.{jsx,d.ts}` (recommended next step, warm amber accent). The persistent reassurance line is `components/core/Disclaimer.jsx`.
- `ui_kits/healthpath/` is the live chat application: sign-in, empty state, main chat, and a mobile drawer view. `screens.jsx` is the screen code; lift functions from it directly.
- `guidelines/` is the design system tab's specimen cards — open the .html files in a browser to see the palette, type ramp, and so on.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

**HealthPath voice cheat sheet** (always check the README's Content Fundamentals section for the full set):

- Speak as "I", singular. The user is "you".
- Plain language, short sentences, sixth-grade reading level. Translatable-safe — no idioms.
- Sentence case everywhere.
- No emoji. No exclamation marks.
- The disclaimer is always present near the composer, never as an alert: **"I help with access and paperwork, not medical advice."**
- HealthPath gives **zero medical advice** — only access and paperwork navigation. If the prompt drifts into clinical territory, redirect warmly to what the agent actually does.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

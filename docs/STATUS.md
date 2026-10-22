# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 2 Build [FS], task **FS-1 close-out** (gate PM-12 passed 2026-10-22) · **Last updated:** 2026-10-22 (setup done, waiting for the Supabase sign-in)
**First thing next session:** Lakshay runs `/mcp`, picks supabase, signs in, and starts a new chat (the Supabase tool was pointed at "comply pilot" for this folder only, and reconnects at chat start). Then Claude checks `get_project_url` = `weywbysvdcdjcciqgrqw`, lists the training project's tables (read only), Lakshay confirms, and Claude wipes them after asking again.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Build** [tech.md](versions/v1/tech.md) (decisions D1 to D16, order of work, Figma to code, "Smooth and subtle") · ADRs [adr/](adr/README.md) (0001 to 0011) · **Design (frozen)** [design/](versions/v1/design/) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18; stage 1 Design approved 2026-10-22** (PM-12): 66 frames, a clickable demo, notes on every frame. Figma [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot), FigJam [flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **PM-12 decisions:** consent for colleagues and owners before real data; small screens built from existing parts; no projector sizing; owner phone screens stay simple (richer later); subtle, smooth animation.
- **Build decisions:** one Next.js app · Supabase, "comply pilot" (Tokyo, `weywbysvdcdjcciqgrqw`) = training, "comply-pilot-new" (Seoul, `wewudhskurjdqqrhsfho`) = demo · Vercel free · Tailwind + shadcn/ui · Vitest + Playwright · repo private · screens from Figma's own design-to-code tool (D14) · no separate deploy planning (D15) · **email from Lakshay's personal Gmail (D16, ADR 0011)**.
- **Setup done 2026-10-22:** Node 24.22.1 first in every new shell (Homebrew's own Node was repaired and is now 26.12.1, see tech.md); `gh` logged in; GitHub Pro not wanted for now; the Supabase tool set to "comply pilot" for this folder; the handoff folder refreshed.

## Next (Build, in order)
1. **FS-1:** list and wipe the training project (after the sign-in above). 2. **QA-1** starter app on Vercel (small; questions: how to make the app, which lint tool, the old v0 env files). 3. **FS-2** tables, API shapes, RLS, cross-firm tests, automatic checks; start with "what is a calendar item" (tech.md, builder check). 4. **FS-5** due-date engine. 5. Logic cores: FS-14, FS-10, FS-13, FS-8. 6. **Screens** in demo order from Figma's tool; Code Connect tested once. 7. **Gate PM-16.**
Each task starts with its design questions, one at a time, options plus a recommendation.

## Open questions
- **Lakshay, by hand:** the `/mcp` sign-in above; before FS-3, turn on 2-Step Verification on the personal Gmail and make an app password (only into `.env.local` and settings pages, never chat).
- `UNVERIFIED`: Code Connect on the Education plan (one test call in the first part task); Vercel Seoul region on the free plan; whether `supabase db push` needs Docker (the Supabase command-line tool and Docker are not installed); whether Vercel offers Node 26 yet.
- **Data is good enough for now** (Lakshay): crawlers and scripts come later. Out of the app: Forms 143/144, non-audit ITR, PF, MSME Form-1.

## Watch out
- **Supabase tool:** a user-level entry still points at another project (`bqprlhfixgcpfhxthrss`, neither of ours). The local entry for this folder wins. Never point the tool at the demo project.
- **No keys or real data in commits, docs or chat.** The old v0 env files on the disk (`.env.local`, `.env.v0-backend`) are not in git: don't read them into chat; treat their keys as dead.
- **Figma:** 200 MCP calls a day and 10 a minute; the design file is now read, not redrawn.

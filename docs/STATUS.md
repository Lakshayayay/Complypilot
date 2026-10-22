# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 2 Build [FS], next task **QA-1 starter app** (FS-1 closed 2026-10-22) · **Last updated:** 2026-10-22 (training project wiped; build plan saved)
**First thing next session:** read [tech.md](versions/v1/build/tech.md), "FS-2 decisions" (build-plan.md was deleted 2026-10-22). Lakshay does step 0 by hand: reload VS Code so Claude's shell uses Node 24, delete the 3 old v0 env files, reset the old Supabase keys. Then QA-1 starts with its question 1 (folders now or with their first file), one question at a time.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Build** [build/](versions/v1/build/): [tech.md](versions/v1/build/tech.md) (decisions D1 to D19, layout, Figma to code, "Smooth and subtle") · ADRs [adr/](adr/README.md) (0001 to 0011) · **Design (frozen)** [design/](versions/v1/design/) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18; stage 1 Design approved 2026-10-22** (PM-12): 66 frames, a clickable demo, notes on every frame. Figma [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot), FigJam [flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **PM-12 decisions:** consent for colleagues and owners before real data; small screens built from existing parts; no projector sizing; owner phone screens stay simple (richer later); subtle, smooth animation.
- **Build decisions:** one Next.js app · Supabase, "comply pilot" (Tokyo, `weywbysvdcdjcciqgrqw`) = training, "comply-pilot-new" (Seoul, `wewudhskurjdqqrhsfho`) = demo · Vercel free · Tailwind + shadcn/ui · Vitest + Playwright · repo private · screens from Figma's own design-to-code tool (D14) · no separate deploy planning (D15) · email from Lakshay's personal Gmail (D16, ADR 0011).
- **Setup done 2026-10-22:** Node 24.22.1 installed (first on the PATH in new shells); `gh` logged in; GitHub Pro not wanted for now; the Supabase tool set to "comply pilot" for this folder.
- **FS-1 closed 2026-10-22:** the Supabase tool signed in and checked (`weywbysvdcdjcciqgrqw`). The training project had 8 v0 tables with a few test rows (no logins, no files). The tool refused the deletes, so Lakshay wiped them in the SQL Editor; Claude checked it empty. Supabase's own `rls_auto_enable()` was kept (it turns RLS on for every new table).
- **Decided 2026-10-22:** starter app from the official generator (D17) · ESLint (D18) · delete the v0 env files and reset the old keys (D19) · design questions stay one at a time · tech.md moved into `versions/v1/build/` next to the new build-plan.md (links fixed).

## Next (Build, in order)
0. **Step 0 by hand** (above). 1. **QA-1** starter app on Vercel (4 questions in build-plan.md). 2. **FS-2** tables, API shapes, RLS, cross-firm tests, automatic checks; starts with "what is a calendar item". 3. **FS-5** due-date engine. 4. Logic cores: FS-14, FS-10, FS-13, FS-8. 5. The look in code, then **screens** in demo order. 6. **Gate PM-16.**
Each task starts with its design questions, one at a time, options plus a recommendation.

## Open questions
- **Lakshay, by hand:** step 0; before FS-3, turn on 2-Step Verification on the personal Gmail and make an app password (only into `.env.local` and settings pages, never chat).
- `UNVERIFIED`: that `create-next-app` still offers ESLint and our options (check first at QA-1); Vercel Seoul region and private repos on the free plan; whether `supabase db push` needs Docker; Supabase's key screen names; Code Connect on the Education plan; whether Vercel offers Node 26 yet.
- **Data is good enough for now** (Lakshay): crawlers and scripts come later. Out of the app: Forms 143/144, non-audit ITR, PF, MSME Form-1.

## Watch out
- **Supabase tool:** deletes sent through it are refused (read-only works), so migrations go through files and the command-line tool, or the SQL Editor. A user-level entry still points at another project (`bqprlhfixgcpfhxthrss`, neither of ours); the local entry for this folder wins. Never point the tool at the demo project.
- **No keys or real data in commits, docs or chat.** Never read the old v0 env files into chat; their keys are dead.
- **Figma:** 200 MCP calls a day and 10 a minute; the design file is now read, not redrawn.

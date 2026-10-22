# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 2 Build [FS] has started. **Gate PM-12 (design) was approved on 2026-10-22, no changes** · **Last updated:** 2026-10-22 (gate approved)
**First thing next session: ask Lakshay which by-hand step is done** (list below). Then start step 1 of Build. Don't start code before FS-1 is closed.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Build** [tech.md](versions/v1/tech.md) (decisions D1 to D15, order of work, Figma to code, "Smooth and subtle") · **Design (frozen)** [design/](versions/v1/design/): [design.md](versions/v1/design/design.md) · [screens.md](versions/v1/design/screens.md) · [flows.md](versions/v1/design/flows.md) · [figma-ledger.json](versions/v1/design/figma-ledger.json) · ADRs [adr/](adr/) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18** (PM-11): 12 features F1 to F12.
- **Stage 1 Design approved 2026-10-22** (PM-12): 66 frames on Figma `06 Screens`, a clickable demo, notes on every frame. Figma [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot), FigJam [flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh). Brand: mulberry, teal, Anek Latin. No Hindi in new work.
- **PM-12 decisions (2026-10-22):** consent for colleagues and owners comes before real data (only the firm sign-up in v1); the small screens with no frame are built from existing parts; **no projector sizing** (normal desktop sizes); the owner phone screens stay simple, richer ones later (idea.md); animation is subtle and smooth ([tech.md](versions/v1/tech.md)).
- **Build decisions:** one Next.js app · Supabase, "comply pilot" (Tokyo) = training, "comply-pilot-new" (Seoul) = demo · Vercel free · Gmail sends email · Tailwind + shadcn/ui · Vitest + Playwright · Vercel Cron + encrypted GitHub backups · fully free, no domain · repo private (ADR 0010). **New 2026-10-22:** screens come from Figma's own design-to-code tool (D14); no separate deploy planning, Vercel auto-deploys (D15).

## Next (Build, in order)
1. **FS-1 close-out:** Lakshay's by-hand steps; Claude lists the training project's tables, Lakshay confirms, wipe.
2. **QA-1** starter app on Vercel (small). 3. **FS-2** tables, API shapes, RLS, cross-firm tests, automatic checks; start with what a calendar item is (tech.md, builder check). 4. **FS-5** due-date engine. 5. Logic cores: FS-14, FS-10, FS-13, FS-8. 6. **Screens** in demo order, from Figma's tool; Code Connect tested once. 7. **Gate PM-16.**
Each task starts with its design questions, one at a time, options plus a recommendation.

## Open questions
- **Lakshay, by hand** (tech.md): tell Claude when "comply pilot" has restored (its database timed out on 2026-10-22); install Node 24 LTS (the Mac has Node 25.6.1, no longer patched); `gh auth login` (not logged in); apply for GitHub Pro (Student Developer Pack); Gmail account and app password before FS-3; keys only in env files, never in chat.
- **Review later:** none open. `UNVERIFIED`: Code Connect on the Education plan (one test call in the first part task); Vercel Seoul region on the free plan; whether `supabase db push` needs Docker (the Supabase command-line tool and Docker are not installed on the Mac); whether Vercel offers Node 26 yet. Open tech checks are in tech.md.
- **Data is good enough for now** (Lakshay): crawlers and scripts come later. Out of the app: Forms 143/144, non-audit ITR, PF, MSME Form-1.

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute. A failed `use_figma` call is rolled back whole. `clone()` of a frame inside a section lands on the page root. More in the memory note "Figma files".
- **No keys or real data in commits, docs or chat** (the repo is private, but could leak). v1 uses made-up data and English only. New ideas go into idea.md.
- The old v0 env files on the disk (`.env.local`, `.env.v0-backend`) are not in git: don't read them into chat; treat their keys as dead.

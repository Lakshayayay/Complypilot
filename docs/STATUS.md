# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 2 Build [FS], next task **FS-5 due-date engine** (FS-2 closed 2026-10-23) · **Last updated:** 2026-10-24 (status synced with git)
**First thing next session:** read [tech.md](versions/v1/build/tech.md): "Order of work", "Logic cores", and the ✅ rows in [due-dates.md](versions/v1/research/due-dates.md). FS-5 starts with its design questions, one at a time (options plus a recommendation), on a new branch.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Build** [build/](versions/v1/build/): [tech.md](versions/v1/build/tech.md) (decisions D1 to D21, FS-2 tables and server actions, layout, Figma to code) · ADRs [adr/](adr/README.md) (0001 to 0011) · **Design (frozen)** [design/](versions/v1/design/) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18; stage 1 Design approved 2026-10-22** (PM-12): 66 frames, a clickable demo. Figma [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot), FigJam [flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **Build decisions:** one Next.js app · Supabase, "comply pilot" (Tokyo, `weywbysvdcdjcciqgrqw`) = training, "comply-pilot-new" (Seoul, `wewudhskurjdqqrhsfho`) = demo · Vercel free, deploy at the end of Build (D20) · Tailwind + shadcn/ui · Vitest + Playwright · repo private, no GitHub Pro · screens from Figma's design-to-code tool (D14) · email from Lakshay's personal Gmail (ADR 0011).
- **FS-1 closed 2026-10-22:** training project checked and wiped; Node 24 in Claude's shell; v0 env files deleted.
- **QA-1 closed 2026-10-22:** the app skeleton on the Mac (Next.js 16, TypeScript, Tailwind, ESLint, `src/`), exact versions pinned; lint, type check and build pass.
- **FS-2 closed 2026-10-23** (PR #1, merged): 12 tables with RLS (database rules that keep firms apart) on every one, two migrations, a private `files` bucket, 80 security tests. GitHub runs lint, type check, unit tests and the security tests on every push.
- **Sync check 2026-10-24:** `main` matches GitHub; the last checks on `main` passed; the training database has both migrations, the same as `supabase/migrations/`.

## Next (Build, in order)
1. **FS-5** due-date engine: a pure function (same inputs, same answer) from the ✅ rows, with unit tests (criterion 6).
2. Logic cores, each pure with unit tests: FS-14 repeating tasks · FS-10 licence warnings · FS-13 factory rules · FS-8 CSV parser.
3. The look in code (start of FS-3), then **screens** in demo order (tech.md, "Order of work").
4. **Gate PM-16:** Lakshay deploys for it (D20).

## Open questions
- **Lakshay, by hand:** (1) a Supabase secret key was shown in chat: turn it off, make another, and check the old v0 keys are off. Values only into `.env.local`. (2) Before FS-3: 2-Step Verification on the personal Gmail and an app password (never into chat). (3) Disconnect the old Cloudflare Workers project ("complypilot") from the GitHub repo; it fails on every push but is not one of our checks.
- **Branch tidy-up (Lakshay decides):** `feat/v1-due-date-engine` is an old v0 branch (2026-10-02, before the fresh start), on GitHub too. FS-5 would want that name. `feat/v1-fs2-data` (on GitHub) and 5 local branches are already merged and could go.
- `UNVERIFIED`: Vercel Seoul region and private repos on the free plan (check at deploy); Code Connect on the Education plan; Vercel and Node 26; Supabase's email limit with our own Gmail sender; Google's own app-password page.
- **Builder-check points still open** (tech.md): 6, 9 to 15, 17, 18. Each is settled in the task named beside it.
- **Data is good enough for now** (Lakshay): crawlers and scripts come later. Out of the app: Forms 143/144, non-audit ITR, PF, MSME Form-1.

## Watch out
- **New table checklist** (tech.md): migration with RLS and grants, a security test case and the `TABLES` list, re-run `gen types`, `db push` only after GitHub is green. From 2026-10-30 Supabase no longer exposes new tables by itself; our migrations already grant access explicitly.
- **Supabase tool:** deletes are refused (read-only works), so migrations go through files and the command-line tool. The local entry for this folder points at training and wins over a user-level entry for another project (`bqprlhfixgcpfhxthrss`, neither of ours). Never point it at the demo project.
- **No keys or real data in commits, docs or chat.**
- **Figma:** 200 MCP calls a day and 10 a minute; the design file is read, not redrawn.

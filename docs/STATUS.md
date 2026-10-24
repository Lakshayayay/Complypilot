# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 2 Build [FS], next task **one of the four logic cores** (FS-5 closed 2026-10-24) · **Last updated:** 2026-10-24 (wrap up)
**First thing next session:** read [tech.md](versions/v1/build/tech.md): "Order of work", "FS-5 decisions" (the date helpers and state list the next cores reuse), and the research file of the core Lakshay picks. Ask which core first (Claude suggests FS-14, the smallest); it starts with its design questions, one at a time (options plus a recommendation), on a new branch.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Build** [build/](versions/v1/build/): [tech.md](versions/v1/build/tech.md) (decisions D1 to D21, FS-2 tables and server actions, FS-5 decisions, layout, Figma to code) · ADRs [adr/](adr/README.md) (0001 to 0011) · **Design (frozen)** [design/](versions/v1/design/) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18; stage 1 Design approved 2026-10-22** (PM-12): 66 frames, a clickable demo. Figma [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot), FigJam [flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **Build decisions:** one Next.js app · Supabase, "comply pilot" (Tokyo, `weywbysvdcdjcciqgrqw`) = training, "comply-pilot-new" (Seoul, `wewudhskurjdqqrhsfho`) = demo · Vercel free, deploy at the end of Build (D20) · Tailwind + shadcn/ui · Vitest + Playwright · repo private, no GitHub Pro · screens from Figma's design-to-code tool (D14) · email from Lakshay's personal Gmail (ADR 0011).
- **FS-1, QA-1 closed 2026-10-22:** training project wiped; Node 24; the app skeleton on the Mac (Next.js 16, TypeScript, Tailwind, ESLint), versions pinned.
- **FS-2 closed 2026-10-23** (PR #1): 12 tables with RLS (database rules that keep firms apart) on every one, two migrations, a private `files` bucket, 80 security tests. GitHub runs lint, type check, unit tests and the security tests on every push.
- **FS-5 closed 2026-10-24** (PR #2, merged, checks green): the due-date engine, item status and state list as pure code, 106 unit tests (one per ✅ date). Nine design points agreed one at a time (tech.md, "FS-5 decisions"). New ✅ row: tax audit report for tax year 2026-27 is 30 Sep 2027. `main` is clean and matches GitHub; only `main` exists.

## Next (Build, in order)
1. Logic cores, each pure with unit tests and its own design talk: FS-14 repeating tasks (criterion 10) · FS-10 licence warnings (9) · FS-13 factory rules (5) · FS-8 CSV parser (3). They reuse `src/lib/dates.ts` and `states.ts`.
2. The look in code (start of FS-3), then **screens** in demo order (tech.md, "Order of work").
3. **Gate PM-16:** Lakshay deploys for it (D20).

## Open questions
- **Lakshay, by hand:** (1) a Supabase secret key was shown in chat: turn it off, make another, check the old v0 keys are off; values only into `.env.local`. Needed before FS-3. (2) Before FS-3: 2-Step Verification on the personal Gmail and an app password (never into chat). (3) Disconnect the old Cloudflare Workers project ("complypilot") from the repo; it fails on every push but is not one of our checks.
- `UNVERIFIED`: audit-case return date for tax year 2026-27 (31 Oct 2027; the official section 263 page blocks automated reading, so it stays out; CAs can confirm in the demos); Vercel Seoul region and private repos on the free plan (at deploy); Code Connect on the Education plan; Vercel and Node 26; Supabase's email limit with our Gmail sender; Google's app-password page.
- **Builder-check points still open** (tech.md): 6, 9 to 15, 17, 18. Point 9's 7-day "Due soon" is settled; its licence chips wait for FS-10. Point 17: plain UTC dates chosen, no date-fns.
- **FS-10 to settle:** the table stores `apply_by_date`, but licences.md talks of `lead_days`.
- **Data is good enough for now** (Lakshay): crawlers and scripts come later. Out of the app: Forms 143/144, non-audit ITR, PF, MSME Form-1.

## Watch out
- **New table checklist** (tech.md): migration with RLS and grants, a security test case and the `TABLES` list, re-run `gen types`, `db push` only after GitHub is green. From 2026-10-30 Supabase no longer exposes new tables by itself; our migrations already grant access explicitly.
- **Supabase tool:** deletes are refused (read-only works), so migrations go through files and the command-line tool. The local entry for this folder points at training and wins over a user-level entry for another project (`bqprlhfixgcpfhxthrss`, neither of ours). Never point it at the demo project.
- **Government sites:** incometaxindia.gov.in and the MCA site refuse automated reading (403); incometax.gov.in FAQ pages can be read.
- **No keys or real data in commits, docs or chat.**
- **Figma:** 200 MCP calls a day and 10 a minute; the design file is read, not redrawn.

# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-4: batch 6 next) · 2 Build [FS] planned, starts after the design gate · **Last updated:** 2026-10-21
**Where we stopped:** **Every build decision is agreed and written:** [tech.md](versions/v1/tech.md) and ADRs [0001 to 0009](adr/). UX-3 is approved; all 22 demo-path screens and 36 of the other 43 frames are built. Figma's daily limit has reset. **Next: finish the design** (batch 6, then checks, polish, notes, clickable demo, design QA, gate PM-12), **then start the build from tech.md.** UX-4 runs to PM-12 without stopping (Lakshay, 2026-10-21). Nothing is half-built; everything is committed and pushed.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Design** [design/](versions/v1/design/): [design.md](versions/v1/design/design.md) (checklist, decisions, rules) · [screens.md](versions/v1/design/screens.md) · [flows.md](versions/v1/design/flows.md) · [figma-ledger.json](versions/v1/design/figma-ledger.json) (Figma IDs) · **Build** [tech.md](versions/v1/tech.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18** (gate PM-11). v1 scope is locked: 12 features F1–F12.
- **UX-1 flows and UX-2 wireframes approved (2026-10-19/20).** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) and the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **UX-3 approved 2026-10-21.** Brand: mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin; 38 component sets; logo, app icon, brand board. Tagline: "One calendar. No missed deadlines." No Hindi in new work.
- **UX-4 so far:** reminder days agreed; Notion joined Odoo as a design reference. Frames on `06 Screens`, one section per batch (IDs in the ledger, notes in screens.md): `demo-path` 22 · `batch-1` sign-in and sign-up 13 · `batch-2` clients 5 · `batch-3` client and review states 4 · `batch-4` licences and owner home 9 · `batch-5` tasks and thread states 5. Every batch read back by script (0 typed-in colours, all text styled, no phone button under 44 px).
- **Build decisions (2026-10-21, all fully free, no domain):** one Next.js app (TypeScript) · Supabase with two projects, "comply pilot" (Tokyo) = training and "comply-pilot-new" (Seoul) = demo · Vercel free · a new Gmail account sends email · Tailwind + shadcn/ui · Vitest + Playwright · Vercel Cron for emails, GitHub Actions for encrypted nightly backups · code laid out by feature. **Data stays in Seoul for v1 (made-up data only); the app names no place; Mumbai before real users** ([ADR 0003](adr/0003-hosting-and-data-region.md)).
- **Project structure:** design docs in `v1/design/`; gates PM-16 to PM-19 for every stage; the handoff folder stays.

## Next
**Design track, in this order (Figma):**
1. **Batch 6:** CA-22 firm, CA-23 team, CA-24 due-date changes (+ CA-24b preview, CA-24c applied), CA-25 privacy, EM-06 the firm's morning list. That completes all 65 frames.
2. Loading and empty states → 1366 and 360 px checks → polish pass (modern look; fixes listed in design.md, incl. the CA-03 privacy wording) → Dev Mode notes → clickable demo → design QA → **gate PM-12 (ping Lakshay)**.

**Build track (after PM-12, from [tech.md](versions/v1/tech.md)):** close FS-1 (Lakshay's by-hand steps; wipe the training project) → QA-1 deploy pipeline → FS-2 tables, API shapes, RLS → FS-5 due-date engine and the logic cores of FS-14, FS-10, FS-13, FS-8 → screens in demo order → gate PM-16.

## Open questions
- **Lakshay, by hand** (list in tech.md): tell Claude when "comply pilot" has restored; make the app's Gmail account and app password; install Node 24 LTS; `gh auth login`; keys only into env files and settings, never into chat. Later: complypilot.com and the trademark.
- **Review later (Lakshay)**, defaults taken: "Confirm 5 licences", projector chip size, the CA-13 status word (design.md, UX-4); the full privacy notice text (stage 2); demo licence numbers and "renew on e-District Delhi" (screens.md).
- **Data is good enough for now** (Lakshay): a data-engineering track (crawlers, scripts) comes later. Still ⚠️ and out of the app: Forms 143/144, non-audit ITR dates, PF 15th, MSME Form-1.
- `UNVERIFIED`: Code Connect and Dev Mode notes on the Education plan; the other open tech checks are listed in tech.md ("Open checks").

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute (Education plan); aim for 150 a day. About 142 were used earlier on 2026-10-21 before the limit reset. Send at most 4 calls at once. A failed `use_figma` call is rolled back whole.
- **Build only from variables and styles.** Size a part before putting it into a slot. Clone a finished frame instead of rebuilding the shell. Load a text's font before changing any of its settings. More in the memory note "Figma files".
- **The repo is public:** no keys, passwords or real data in commits, docs or chat. v1 uses made-up demo data only, English only. New ideas go into idea.md, not into v1.

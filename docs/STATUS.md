# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-4: all 65 frames built; states and checks next) · 2 Build [FS] planned, starts after the design gate · **Last updated:** 2026-10-22
**Where we stopped:** **Every build decision is agreed and written:** [tech.md](versions/v1/tech.md) and ADRs [0001 to 0009](adr/). UX-3 is approved. **All 65 frames are built** (batch 6, settings and the firm's morning email, done 2026-10-22). Loading states, width checks and the polish pass are done too (2026-10-22). Dev Mode notes are written on all 66 frames, and the **clickable demo is built** (Figma, page 06 Screens: select CA-14, press Present; the click path is in design.md). Design QA is done except a fresh-eyes pass: a helper agent read the docs as a builder (24 findings; the contradictions are fixed in the README, the rest is an agenda with defaults in tech.md). **Next: a fresh-eyes pass in a new session, then gate PM-12 (Lakshay walks the demo); then start the build from tech.md.** UX-4 runs to PM-12 without stopping (Lakshay, 2026-10-21). Nothing is half-built; everything is committed and pushed.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Design** [design/](versions/v1/design/): [design.md](versions/v1/design/design.md) (checklist, decisions, rules) · [screens.md](versions/v1/design/screens.md) · [flows.md](versions/v1/design/flows.md) · [figma-ledger.json](versions/v1/design/figma-ledger.json) (Figma IDs) · **Build** [tech.md](versions/v1/tech.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18** (gate PM-11). v1 scope is locked: 12 features F1–F12.
- **UX-1 flows and UX-2 wireframes approved (2026-10-19/20).** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) and the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **UX-3 approved 2026-10-21.** Brand: mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin; 38 component sets; logo, app icon, brand board. Tagline: "One calendar. No missed deadlines." No Hindi in new work.
- **UX-4 so far:** reminder days agreed; Notion joined Odoo as a design reference. Frames on `06 Screens`, one section per batch (IDs in the ledger, notes in screens.md): `demo-path` 22 · `batch-1` sign-in and sign-up 13 · `batch-2` clients 5 · `batch-3` client and review states 4 · `batch-4` licences and owner home 9 · `batch-5` tasks and thread states 5 · `batch-6` settings and morning email 7. Every batch read back by script (0 typed-in colours, all text styled, no phone button under 44 px).
- **Build decisions (2026-10-21, all fully free, no domain):** one Next.js app (TypeScript) · Supabase with two projects, "comply pilot" (Tokyo) = training and "comply-pilot-new" (Seoul) = demo · Vercel free · a new Gmail account sends email · Tailwind + shadcn/ui · Vitest + Playwright · Vercel Cron for emails, GitHub Actions for encrypted nightly backups · code laid out by feature. **Data stays in Seoul for v1 (made-up data only); the app names no place; Mumbai before real users** ([ADR 0003](adr/0003-hosting-and-data-region.md)).
- **Project structure:** design docs in `v1/design/`; gates PM-16 to PM-19 for every stage; the handoff folder stays.

## Next
**Design track, in this order (Figma):**
1. Fresh-eyes pass on the Figma file and docs (new session) → update the Cover sheet chips → **gate PM-12 (ping Lakshay)**, where he also decides 2 points from the builder check (consent for colleagues and owners; small screens without a frame, design.md "Decide at PM-12"). Lakshay, by hand: look at one frame in Dev Mode to see the notes, and mark finished screens "Ready for dev". Done on 2026-10-22: loading state CA-14c (66 frames), width checks at 1366 and 360 px, the polish pass (rounder corners 8/12/20, soft floating shadow, CA-03 and CA-08 wording).

**Build track (after PM-12, from [tech.md](versions/v1/tech.md)):** close FS-1 (Lakshay's by-hand steps; wipe the training project) → QA-1 deploy pipeline → FS-2 tables, API shapes, RLS → FS-5 due-date engine and the logic cores of FS-14, FS-10, FS-13, FS-8 → screens in demo order → gate PM-16.

## Open questions
- **Lakshay, by hand** (list in tech.md): tell Claude when "comply pilot" has restored; make the app's Gmail account and app password; install Node 24 LTS; `gh auth login`; keys only into env files and settings, never into chat. Later: complypilot.com and the trademark.
- **Review later (Lakshay)**, defaults taken: "Confirm 5 licences", projector chip size, the CA-13 status word (design.md, UX-4); the full privacy notice text (stage 2); demo licence numbers and "renew on e-District Delhi" (screens.md); 5 small points on the Settings frames, e.g. CA-03's "export and delete at any time" (screens.md, batch 6).
- **Data is good enough for now** (Lakshay): a data-engineering track (crawlers, scripts) comes later. Still ⚠️ and out of the app: Forms 143/144, non-audit ITR dates, PF 15th, MSME Form-1.
- `UNVERIFIED`: Code Connect on the Education plan, and whether Dev Mode shows our notes (the Figma API accepted them); the other open tech checks are listed in tech.md ("Open checks").

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute (Education plan); aim for 150 a day. About 142 were used on 2026-10-21 before the limit reset; about 100 since (2026-10-22). Send at most 4 calls at once. A failed `use_figma` call is rolled back whole.
- **Build only from variables and styles.** Size a part before putting it into a slot. Clone a finished frame instead of rebuilding the shell. Load a text's font before changing any of its settings. More in the memory note "Figma files".
- **The repo is public:** no keys, passwords or real data in commits, docs or chat. v1 uses made-up demo data only, English only. New ideas go into idea.md, not into v1.

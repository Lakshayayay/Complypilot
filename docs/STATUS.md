# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-4: batch 6 next) · **Last updated:** 2026-10-21 (end of the Figma day)
**Where we stopped:** UX-3 is approved and closed. **All 22 demo-path screens are built**, and **36 of the other 43 frames** (batches 1 to 5). UX-4 runs to gate PM-12 without stopping (Lakshay, 2026-10-21). **Next, in a new chat: batch 6, settings and the firm's reminder email (7 frames).** Nothing is half-built; everything is committed and pushed.
**Plan for this version:** [v1 README](versions/v1/README.md) · **Stage doc, with the checklist, the UX-4 notes and every result:** [design.md](versions/v1/design/design.md) · **Figma IDs:** [figma-ledger.json](versions/v1/design/figma-ledger.json) · **Screens and what each frame shows:** [screens.md](versions/v1/design/screens.md) · **Flows:** [flows.md](versions/v1/design/flows.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18.** v1 scope is locked: 12 features F1–F12.
- **UX-1 flows and UX-2 wireframes approved (2026-10-19/20).** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) and the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **UX-3 approved 2026-10-21.** Brand: mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin; 38 component sets; logo, app icon, brand board. Tagline: "One calendar. No missed deadlines." No Hindi in new work.
- **UX-4 (2026-10-21):** reminder days agreed; ARN format checked (the sample fits); **Notion joined Odoo** as a design reference (feel, motion, side peek).
- **Frames on `06 Screens`, one section per batch** (IDs in the ledger, notes in screens.md): `demo-path` 22 frames (A to E) · `batch-1` sign-in and sign-up 13 · `batch-2` clients 5 · `batch-3` client and review states 4 · `batch-4` licences and owner home 9 · `batch-5` tasks and thread states 5. Every batch read back by script: 0 typed-in colours, all text styled, Anek Latin, no dashes, no phone button under 44 px.
- **Tax dates (2026-10-21):** Form 140 (31 Jul, 31 Oct, 31 Jan, 31 May) and advance tax (15 Jun, Sep, Dec, Mar) are now ✅ from official pages (research/due-dates.md).

## Next (in this order)
1. **Batch 6:** CA-22 firm settings, CA-23 team, CA-24 due-date changes with CA-24b preview and CA-24c applied, CA-25 privacy, EM-06 the firm's morning list. That completes all 65 frames.
2. 1366 and 360 px checks → polish pass (modern look; Odoo and Notion; fix the 16 px `Textarea` label on CA screens) → Dev Mode annotations → clickable demo → design QA → **gate PM-12 (ping Lakshay)**.

## Open questions
- **Review later (Lakshay)**, defaults taken so work keeps moving: "Confirm 5 licences", projector chip size, the CA-13 status word (design.md, UX-4); the full privacy notice text (stage 2); demo licence numbers and "renew on e-District Delhi" (recheck in stage 2) (screens.md).
- **New:** Form 140 and advance tax are now ✅, so stage 2 can put them on the calendar (FS-5 writes ✅ rows). CA-08's note still lists Form 140 as "not on the calendar yet": fix in the polish pass.
- Still ⚠️ and out of the app: Forms 143/144, non-audit ITR dates (Finance Bill 2026 says 31 Aug, secondary sources only), PF 15th and MSME Form-1 (CAs confirm in the demo calls, Lakshay's choice). Haryana boiler office, fire portal and licence validity not found. Delhi fire certificate validity: sources disagree.
- **Lakshay, later and by hand:** complypilot.com and the trademark (IP India). Optional: Odoo and Notion screenshots (design-references.md, rows O1, M4).
- `UNVERIFIED`: Code Connect and Dev Mode annotations on the Education plan.

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute (Education plan); aim for 150 a day. **About 142 were used on 2026-10-21**, so the next Figma work starts the next day. Send at most 4 calls at once. A failed `use_figma` call is rolled back whole.
- **Build only from variables and styles.** Size a part before putting it into a slot. Clone a finished frame instead of rebuilding the shell. Load a text's font before changing any of its settings. Table cells in a row must hug their height. Owner pages taller than the phone grow downwards (content hugs). More in the memory note "Figma files".
- v1 uses made-up demo data only, English only. No app code until stage 2; before any code we agree folders, files and naming together. New ideas go into idea.md, not into v1.

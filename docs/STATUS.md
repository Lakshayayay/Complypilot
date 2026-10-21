# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-4: the other 43 frames next) · **Last updated:** 2026-10-21
**Where we stopped:** UX-3 is approved and closed. **All 22 demo-path screens are built (batches A to E).** UX-4 runs to gate PM-12 without stopping (Lakshay, 2026-10-21). Of the other 43 frames, **batches 1 to 3 (sign-in and sign-up 13, clients 5, client and review states 4) are built. Next: batch 4, licences and owner home (9).** Nothing is half-built.
**Plan for this version:** [v1 README](versions/v1/README.md) · **Stage doc, with the checklist, the UX-4 notes and every result:** [design.md](versions/v1/design.md) · **Figma IDs:** [figma-ledger.json](versions/v1/figma-ledger.json) · **Screens:** [screens.md](versions/v1/screens.md) · **Flows:** [flows.md](versions/v1/flows.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18.** v1 scope is locked: 12 features F1–F12.
- **UX-1 flows and UX-2 wireframes approved (2026-10-19/20).** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) and the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh). Odoo is the main design guide.
- **UX-3 approved 2026-10-21 (design.md, UX-3).** Brand: C's colours and type with B's logo (mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin). Variables, 18 text styles, 10 status chips, 38 component sets; phase E added the real cut-out logo, `Logo` lockups, app icon, favicon and a 3×3 brand board. Tagline: "One calendar. No missed deadlines." No Hindi in new work.
- **UX-4 reminder days agreed (Lakshay, 2026-10-21):** licences count from an apply-by date (Delhi factory 30 days, Delhi fire 180, others 0; reminders 90/60/30 before it). The firm gets a morning list, owners a Monday list plus a task email. README F7, F10 and criteria 9 and 12 changed.
- **UX-4 demo-path screens** on `06 Screens`, section `demo-path` (IDs in the ledger): A CA-14, CA-14b, CA-15 · B CA-07, CA-08, CA-11, CA-12 · C EM-03, OW-02 to OW-07 · D CA-13 · E CA-20b, OW-11, OW-11b, CA-20, CA-21, CA-21c, EM-07 (the thread panel opens like Notion's side peek). Each batch read back by script: 0 typed-in colours, all text styled, Anek Latin. New parts: `IconButton`, `ChoiceCard`, `Textarea` and the icon `chat-circle-text`; `ViewSwitch` is Month · Client grid; `StepIndicator` has 8 steps.
- **2026-10-21:** ARN format checked (the sample fits); Notion joined Odoo as a design reference (design-references.md, study 3). Everything is committed and pushed.

## Next (in this order)
1. **The other 43 frames,** flow by flow, with empty, error, loading and saving states, in 6 batches: ~~sign-in and sign-up 13~~ · ~~clients 5~~ · ~~client and review states 4~~ (done) · licences and owner home 9 · tasks and thread states 5 · settings and reminder email 7.
2. Then 1366 and 360 px checks → polish pass (modern look; Odoo and Notion) → Dev Mode annotations → clickable demo → design QA → **gate PM-12 (ping Lakshay)**.
3. Side task when Figma calls run out: check the ⚠️ tax dates below against primary sources.

## Open questions
- **Review later (Lakshay):** defaults taken so work keeps moving, listed in design.md, UX-4 ("Confirm 5 licences", projector chip size, CA-13 status word).
- **Lakshay, later and by hand:** check complypilot.com and the trademark (IP India). Optional: 3 Odoo screenshots (design-references.md, row O1).
- Still ⚠️ and out of the app: TDS forms 140/143/144, advance tax 15 Sep/15 Dec, non-audit ITR dates, PF 15th, MSME Form-1 dates. Haryana boiler office, fire portal and licence validity not found ("ask your CA"). Delhi fire certificate validity: sources disagree.
- `UNVERIFIED`: Code Connect (links Figma parts to code) and Dev Mode annotations on the Education plan. Check in stage 2, and when the first annotation is added.

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute on your Education plan (Figma's rate-limits page, checked 2026-10-21); we count every call and aim for 150 a day (about 129 were used on 2026-10-21). Send at most 4 calls at once. A failed `use_figma` call is rolled back whole. Never move nodes made by `generate_diagram`. Load Figma's skills before drawing (figma-use and figma-generate-design for screens).
- **Build only from variables and styles** (a spacing step outside the scale is silently ignored). **Size a part before putting it into another part's slot**, or it is drawn at its old width. Clone a finished frame instead of rebuilding the shell. More in the memory note "Figma files".
- v1 uses made-up demo data only, English only. No app code until stage 2; before any code we agree folders, files and naming together. New ideas go into idea.md, not into v1.

# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-4: demo-path batch E next) · **Last updated:** 2026-10-21 (wrap up)
**Where we stopped:** UX-3 is approved and closed. UX-4 has started: reminder days agreed, and **15 of the 22 demo-path screens are built (batches A to D)**. **Next: batch E, the last 7 demo frames, in a new chat**, then review point 6. Nothing is half-built.
**Plan for this version:** [v1 README](versions/v1/README.md) · **Stage doc, with the checklist, the UX-4 notes and every result:** [design.md](versions/v1/design.md) · **Figma IDs:** [figma-ledger.json](versions/v1/figma-ledger.json) · **Screens:** [screens.md](versions/v1/screens.md) · **Flows:** [flows.md](versions/v1/flows.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18.** v1 scope is locked: 12 features F1–F12.
- **UX-1 flows and UX-2 wireframes approved (2026-10-19/20).** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) and the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh). Odoo is the main design guide.
- **UX-3 approved 2026-10-21 (design.md, UX-3).** Brand: C's colours and type with B's logo (mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin). Variables, 18 text styles, 10 status chips, 38 component sets; phase E added the real cut-out logo, `Logo` lockups, app icon, favicon and a 3×3 brand board. Tagline: "One calendar. No missed deadlines." No Hindi in new work.
- **UX-4 reminder days agreed (Lakshay, 2026-10-21):** licences count from an apply-by date (Delhi factory 30 days, Delhi fire 180, others 0; reminders 90/60/30 before it). The firm gets a morning list, owners a Monday list plus a task email. README F7, F10 and criteria 9 and 12 changed.
- **UX-4 demo-path screens** on `06 Screens`, section `demo-path` (IDs in the ledger): A CA-14, CA-14b, CA-15 · B CA-07, CA-08, CA-11, CA-12 · C EM-03, OW-02 to OW-07 · D CA-13. Each batch read back by script: 0 typed-in colours, all text styled, Anek Latin. New parts: `IconButton`, `ChoiceCard`, `Textarea` and the icon `chat-circle-text`; `ViewSwitch` is Month · Client grid; `StepIndicator` has 8 steps (the owner answers 8 questions).
- Everything through batch D is committed on `main`.

## Next (in this order)
1. ~~Housekeeping~~ done 2026-10-21: batch A to D notes moved to screens.md (design.md now 342 lines); `06 Screens` page brief updated.
2. **Batch E, demo beats 8 to 11 (7 frames):** CA-20b (thread: "Need document" given to the owner as a task) · OW-11 and OW-11b (owner uploads, ticks) · CA-20 (thread after the upload) · CA-21 (Mark done: ARN and receipt) · CA-21c (done: the one moment of delight; Undo on the toast, Edit on the done banner) · EM-07 (the owner's Monday list email). **Fact-check the ARN format first:** the sample "AA0710260012345" is a guess. Demo cast and rules: design.md, UX-4.
3. **Review point 6:** Lakshay reviews the 22 demo frames.
4. **The other 43 frames,** flow by flow, with empty, error, loading and saving states. Proposed 6 batches (agree first): sign-in and sign-up 13 · clients 5 · client and review states 4 · licences and owner home 9 · tasks and thread states 5 · settings and reminder email 7. Then 1366 and 360 px checks → polish pass (modern look) → Dev Mode annotations → clickable demo → design QA → gate PM-12.

## Open questions
- **Lakshay:** CA-13 says "Confirm 5 licences", but the 5th item is the labour-code registration (not legally a licence). Keep it, or "Confirm 5" / "Confirm 5 items"? I recommend keeping it. Chip words look small at 1024 px (projector): change nothing until a real projector test.
- **Lakshay, later and by hand:** check complypilot.com and the trademark (IP India). Optional: 3 Odoo screenshots (design-references.md, row O1).
- Still ⚠️ and out of the app: TDS forms 140/143/144, advance tax 15 Sep/15 Dec, non-audit ITR dates, PF 15th, MSME Form-1 dates. Haryana boiler office, fire portal and licence validity not found ("ask your CA"). Delhi fire certificate validity: sources disagree.
- `UNVERIFIED`: Code Connect (links Figma parts to code) and Dev Mode annotations on the Education plan. Check in stage 2, and when the first annotation is added.

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute on your Education plan (Figma's rate-limits page, checked 2026-10-21); we count every call and aim for 150 a day (about 90 were used on 2026-10-21). Send at most 4 calls at once. A failed `use_figma` call is rolled back whole. Never move nodes made by `generate_diagram`. Load Figma's skills before drawing (figma-use and figma-generate-design for screens).
- **Build only from variables and styles** (a spacing step outside the scale is silently ignored). **Size a part before putting it into another part's slot**, or it is drawn at its old width. Clone a finished frame instead of rebuilding the shell. More in the memory note "Figma files".
- v1 uses made-up demo data only, English only. No app code until stage 2; before any code we agree folders, files and naming together. New ideas go into idea.md, not into v1.

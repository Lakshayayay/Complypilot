# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 0 Plan & Research [PM] · **Last updated:** 2026-10-17
**Plan for this version:** [v1 README](versions/v1/README.md) · **Vision and ideas:** [idea.md](../idea.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done (milestones)
- Fresh start (2026-09-18): v0 code archived under git tag `v0-prototype` ([how to read it](../README.md#the-old-prototype)).
- Stage 0 research: [due dates](versions/v1/research/due-dates.md) · [licences](versions/v1/research/licences.md) · [competitors](versions/v1/research/competitors.md) · [privacy (DPDP)](versions/v1/research/privacy.md) · [CSV import](versions/v1/research/import-formats.md) · [pilot script](versions/v1/research/pilots.md).
- **v1 scope locked (2026-10-17):** a CA dashboard and an owner dashboard joined by one shared calendar, with factory questions (Delhi + Haryana), one thread per item, email reminders and an AI factory type matcher. 12 features (F1–F12), each tagged with its tracks.
- AGENTS.md: no deadlines or hour budgets; every version README lists features with tracks; engineering design is agreed together, with options, before any code.
- idea.md is the vision doc. Every idea from our chats is one line in its list at the end.
- Fixed links to the deleted PDP.md and ROADMAP.md (README, AGENTS.md, v2–v5); pilot script updated for the demo-only v1.

## Next (in this order)
1. **v1-PM-8, Delhi + Haryana licence rules** → new file `versions/v1/research/applicability-delhi-haryana.md`.
   - Cover: factory licence (size limits under the OSH Code, the new labour law), fire NOC, boiler, pollution consent (CTE/CTO), hazardous waste.
   - For each rule: which factories it applies to, the official source and the date checked.
   - Add test factories (made up), each with its expected licence list. These become the tests for F4.
2. **v1-PM-9, the CPCB pollution category list** → `versions/v1/research/pollution-categories.md`. Find the official red/orange/green/white list and check whether Delhi or Haryana change it. This list feeds the AI matcher (F11) and its eval set.
3. **v1-PM-10, MSME Form-1 dates:** confirm 30 Apr and 31 Oct on the official MCA site and who must file, then add a ✅ row to [due-dates.md](versions/v1/research/due-dates.md).
4. **v1-PM-11, stage 0 gate:** Lakshay reviews the research and approves.
5. **Then stage 1, Design [UX]:** create `versions/v1/design.md` and start v1-UX-1 (user flows).

## Open questions
- None right now. New ideas go into idea.md, not into v1.

## Watch out
- v1 uses made-up demo data only, until "export and delete a client" exists.
- No app code until stage 2. Before any code, agree the folders, files and naming together.
- Comments left on a plan in the review screen don't reach Claude unless the plan is sent back with a typed note. Paste them in chat to be safe.
- `.env*` files are v0 leftovers, local only (never in git). The v1 stack isn't chosen yet.

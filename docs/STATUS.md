# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 0 Plan & Research is done (gate approved 2026-10-18); **stage 1 Design [UX] is next, not started** · **Last updated:** 2026-10-18
**Plan for this version:** [v1 README](versions/v1/README.md) · **Vision and ideas:** [idea.md](../idea.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done (milestones)
- Fresh start (2026-09-18): v0 code archived under git tag `v0-prototype` ([how to read it](../README.md#the-old-prototype)).
- **v1 scope locked (2026-10-17):** a CA dashboard and an owner dashboard joined by one shared calendar, with factory questions (Delhi + Haryana), one thread per item, email reminders and an AI factory type matcher. 12 features (F1–F12), each tagged with its tracks.
- **Stage 0 finished and approved (2026-10-18):** [due dates](versions/v1/research/due-dates.md) · [licences](versions/v1/research/licences.md) · [competitors](versions/v1/research/competitors.md) · [privacy (DPDP)](versions/v1/research/privacy.md) · [CSV import](versions/v1/research/import-formats.md) · [pilot script](versions/v1/research/pilots.md) · [pollution categories](versions/v1/research/pollution-categories.md) · [licence rules for Delhi and Haryana](versions/v1/research/applicability-delhi-haryana.md). Committed as `225a718`.
  - Data files in `research/data/`: CPCB 2025 list (419 sectors, 5 colours), Delhi's own list (725 activities), the 87-sector exempt schedule.
  - 21 licence rules with sources and 9 made-up test factories (these become the F4 tests).
- **Decisions (2026-10-18):** Delhi uses its own pollution list, Haryana uses CPCB's. Workers in the factory-size grey band give "ask your CA". Unconfirmed rows stay ⚠️ and out of the app.

## Next (in this order)
1. **Stage 1, Design [UX]:** create `versions/v1/design.md` (opens with "Learn first") and start v1-UX-1, the user flows: firm sign-up → add clients → invite owner → factory questions → calendar → item thread → mark done.
2. **Carry into design:** the factory questions list (in the licence-rules file), the "ask your CA" and "inform the board" result screens, and the reminder days (some renewals must be applied for 60 days to 6 months early).
3. **Later:** v1-PM-15 re-checks the rules and dates just before the demo.

## Open questions
- None blocking. Still ⚠️ and out of the app: TDS forms 140/143/144, advance tax 15 Sep/15 Dec, non-audit ITR dates, PF 15th, MSME Form-1 dates (a CA confirms in the demo calls). Haryana boiler office, fire portal and licence validity not found ("ask your CA").
- New ideas go into idea.md, not into v1.

## Watch out
- v1 uses made-up demo data only, until "export and delete a client" exists.
- No app code until stage 2. Before any code, agree the folders, files and naming together.
- Delhi bans Red-category factories and licenses factories only in conforming industrial areas, so the questions must ask about area type.
- Comments left on a plan in the review screen don't reach Claude unless the plan is sent back with a typed note. Paste them in chat to be safe.
- `.env*` files are v0 leftovers, local only (never in git). The v1 stack isn't chosen yet.

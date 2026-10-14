# Status

**Version:** v1 · **Stage:** 0 Plan & Research [PM] · **Last updated:** 2026-10-14
**Plan for this version:** [v1 README](versions/v1/README.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done (milestones)
- Fresh start (2026-09-18): v0 code archived under git tag `v0-prototype` ([how to read it](../README.md#the-old-prototype)).
- Outlines for later versions: [v2](versions/v2/README.md) · [v3](versions/v3/README.md) · [v4](versions/v4/README.md) · [v5](versions/v5/README.md).
- Stage 0 research: [due dates](versions/v1/research/due-dates.md) · [licences](versions/v1/research/licences.md) · [competitors](versions/v1/research/competitors.md) · [privacy (DPDP)](versions/v1/research/privacy.md) · [CSV import](versions/v1/research/import-formats.md) · [pilot script](versions/v1/research/pilots.md).
- Removed PLAN.md (2026-10-14). Still in git: `git show e3813f9:PLAN.md`.

## In progress
- Pilot recruitment: script ready, no interviews yet ([tracker](versions/v1/research/pilots.md#pilot-engagement-pipeline-tracker)).
- v1 README has no scope, time budget or acceptance criteria yet. Last full version: `git show 19de8c9:docs/versions/v1/README.md`.

## Next
1. Choose the core workflow (v1-PM-1), then add scope, time budget and acceptance criteria to the [v1 README](versions/v1/README.md).
2. Fix mentions of the deleted PDP.md, ROADMAP.md and adr/ in [README](../README.md), [AGENTS.md](../AGENTS.md) and the v2–v5 READMEs.
3. Stage 0 gate: freeze scope (v1-PM-4).

## Open questions
- Core workflow: filing calendar, licence tracker, or both?
- Bring back the vision and roadmap (`git show 0a14ffa^:docs/PDP.md`, `git show 0a14ffa^:docs/ROADMAP.md`) or drop the mentions?

## Watch out
- No app code yet; coding starts in Stage 2.
- Research files use old task IDs (PM-1 to PM-6) that don't match the v1 README's PM-1 to PM-4.
- `.env*` files are v0 leftovers, local only (never in git). The v1 stack isn't chosen yet.

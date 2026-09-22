# v3 — Owner Console + Factory Layer

**Status:** Outline. Planned in detail after v2 ships.

## Goal (draft)
The owner sees their compliance health, calendar and documents on their phone, and gets early warnings before factory licences expire.

## Scope ideas (from PDP Modules 3 and 4)
- Owner login on mobile web.
- Health score (green / yellow / red), shared calendar, document vault.
- Profile by state + industry → the licences that apply: pollution consents (CTE = consent to set up, CTO = consent to run), factory licence, fire NOC, boiler certificate, EPR (plastic/waste recycling duties).
- Expiry tracking and early warnings. v1 already has a basic licence tracker on the CA side; v3 adds owner alerts and the state profiler. Note: CTO no longer expires (see `../v1/research/licences.md`).
- AI: match the owner's industry to the official pollution category list, showing the source.

## References
- Old SPCB research for Punjab, Delhi and Maharashtra: `git show v0-prototype:docs/prd.md`, Module 3. UNVERIFIED: re-check every rule against official sources.

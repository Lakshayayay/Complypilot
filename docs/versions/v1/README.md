# v1 — CA Workspace

**Status:** Draft. Stage 0 (Plan & Research) not started. Everything below is a starting point to discuss, not a decision.
**Time budget:** decided in stage 0.

## Goal (draft)
A CA firm keeps all its clients, and every client's filing deadlines and status, in one fast grid instead of Excel and memory.

## Who can use it when it ships (draft)
3–5 pilot CA firms: the partner and their article staff (junior assistants).

## Scope (draft)
In:
- Firm sign-up; staff accounts with roles (partner, article).
- Clients: add by hand, or import from Tally/Winman export files.
- Compliance calendar: due dates for GST, TDS, PF/ESIC and income tax, created automatically for each client.
- Client grid: every client × every filing, with its status, on one fast screen.
- Assign clients to staff.
- Mark a filing as done and attach its receipt.

Out (later versions): WhatsApp automation (v2), owner login (v3), SPCB/factory tracking (v3), reconciliation (v4), Tally desktop connector, live government portal data.

## Success metric (draft)
Pilot CAs track at least one month of real filings in ComplyPilot. Sharpened in stage 0.

## Acceptance criteria
Written in stage 0: the exact checks that prove v1 works.

## Stages
### 0 Plan & Research [PM] → this file + `research/`
- Talk to pilot CAs; collect sample Tally/Winman exports (with private details removed).
- Research, using official sources: compliance due dates, Tally/Winman export formats, DPDP basics.
- Decide the time budget, final scope, success metric and acceptance criteria. Start the long-lead items (see ROADMAP).

### 1 Design [UX] → `design.md`
- Screens and flows for everything in scope, plus the first pieces of the design system (colours, fonts, buttons, tables).
- Reference only: the v0 Figma file (https://www.figma.com/design/qxAk4a3CqsicJPDCGaXWi8/ComplyPilot-MVP-Development) and the old design direction (`git show v0-prototype:docs/frontend.md`).

### 2 Build [FS] → `tech.md`
- Choose the stack and record each choice as an ADR. Set up the deploy pipeline first.
- Data structure → API shapes → build one feature at a time, with tests alongside.
- Security design (who can see what) is part of `tech.md`.

### 3 Intelligence [AI] → `ai.md`
- Data first: clean, well-structured client and filing data, and the numbers we'll measure (Google's Rules of ML #1–#4).
- One small AI feature that a human confirms. Candidate: read a GST registration certificate PDF and fill in the client's details. Decided in stage 0.

### 4 Test & Release [QA] → `test.md`
- Integration and end-to-end tests on the main flows, security checks, and pilot CAs trying it for real (UAT, user acceptance testing).

### 5 Checkpoint → `review.md`
- [ ] All acceptance criteria pass
- [ ] No unlisted mocks
- [ ] Deployed to production
- [ ] Pilot feedback collected
- [ ] `docs/SYSTEM.md` written
- [ ] Tagged `v1.0.0` + CHANGELOG entry
- [ ] Retro written; v2 planned

## Tasks
Added in stage 0. Each has an ID and a track tag (e.g. `v1-FS-3`).

## Mocks & debt
None yet.

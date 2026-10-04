# v1 — Foundation & Core Workflow

**Goal:** Establish a working collaboration layer between Indian Chartered Accountants (CAs) and MSME factory owners. Track filings, document collection, and compliance deadlines without replacing Tally/Winman.

**Current Stage:** 0 Plan & Research [PM]

---

## Stage 0 Tasks [PM]
- [ ] `v1-PM-1`: Define primary persona pain points and select the single core workflow (e.g., filing calendar vs document collection vs factory licenses).
- [ ] `v1-PM-2`: Research statutory due date rules (GST, TDS, Advance Tax, Factory Act) and regulatory edge cases.
- [ ] `v1-PM-3`: Draft data structure and API requirements for the core workflow.
- [ ] `v1-PM-4`: Stage 0 review and scope freeze.

---

## Active Mocks
*(None yet)*

---

## Engineering rules
- Branch per task `<type>/vN-<slug>`; Conventional Commits; merge only when checks pass.
- Agree the data structure and API shapes (what the backend sends and receives) before building screens.
- Every table must stop one customer from seeing another's data (Postgres RLS).
- Unit-test money, compliance-rule, parser and auth logic. E2E only for critical flows.
- Mark mocks `// MOCK:` and list them in the version README; a version can't ship with an unlisted mock.
- New dependency/service or hard-to-reverse choice → ADR before code.
- Secrets only in env files. Never store users' government-portal passwords.
- AI on finance/compliance: grounded in source data, shows its source, a human confirms, eval set before shipping.

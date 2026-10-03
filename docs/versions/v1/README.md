# v1

Fresh start. This file is rewritten from scratch.

## Engineering rules
- Branch per task `<type>/vN-<slug>`; Conventional Commits; merge only when checks pass.
- Agree the data structure and API shapes (what the backend sends and receives) before building screens.
- Every table must stop one customer from seeing another's data (Postgres RLS).
- Unit-test money, compliance-rule, parser and auth logic. E2E only for critical flows.
- Mark mocks `// MOCK:` and list them in the version README; a version can't ship with an unlisted mock.
- New dependency/service or hard-to-reverse choice → ADR before code.
- Secrets only in env files. Never store users' government-portal passwords.
- AI on finance/compliance: grounded in source data, shows its source, a human confirms, eval set before shipping.

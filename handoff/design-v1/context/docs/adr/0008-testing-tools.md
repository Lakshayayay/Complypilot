# 0008 Testing tools: Vitest and Playwright

**Status:** Accepted; the public-repository points are replaced by [ADR 0010](0010-private-repository.md) · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended) · **Task:** v1-FS-1

## Context
AGENTS.md: unit-test money, compliance-rule, parser and auth logic; E2E only for critical flows. v1's README testing plan has unit, database (firm separation), integration, E2E and AI-eval levels. Criterion 2 needs automated tests that try to cross firms on every table and every file link.

## Options
| Option | For | Against |
|---|---|---|
| **Vitest + Playwright** | Modern, fast, written in TypeScript like the app | Security tests go through the app's data path, not raw SQL |
| Vitest + pgTAP + Playwright | Tests inside the database too | One more tool; files still need Vitest |
| Jest + Cypress | Well known | Slower, more setup with current Next.js |

## Decision
- **Vitest** for unit tests (due-date engine, licence warnings, repeating tasks, CSV parser, factory rules, GSTIN and PAN checks) and for the **security tests**: sign in as made-up users of firm A, firm B and an owner, then try to read and change every table and open every file link. Unit tests sit beside the code (`due-date-engine.test.ts`); security tests are in `tests/security/`.
- **Playwright** for the 3 critical click-through flows (v1-QA-2, stage 4).
- Both run in GitHub Actions on every change. The security tests use a throwaway Supabase started on GitHub's computer ([ADR 0004](0004-training-and-demo-environments.md)).

## Consequences
- The checks are the gate: code merges only when they pass. "Required checks" on `main` is a GitHub branch rule; it works on public repositories with the Free plan, and our repo is public ([GitHub docs](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches), 2026-10-21). Lakshay switches it on by hand at QA-1.
- Actions minutes: free for standard runners on public repositories; private repositories get 2,000 a month ([GitHub billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)).
- A mistake in a policy is found only if a test tries it: every new table adds its cross-firm cases in the same task.
- Versions are pinned at QA-1 (Vitest 5.0.5 and Playwright 1.64.1 on npm, 2026-10-21).

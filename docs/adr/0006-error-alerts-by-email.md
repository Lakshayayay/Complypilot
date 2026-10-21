# 0006 Error alerts: Vercel logs plus an email hook

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended) · **Task:** v1-FS-1, v1-QA-1

## Context
Acceptance criterion 14: "Error alerts reach Lakshay." Lakshay first chose "Vercel logs only", which doesn't alert anyone; after Claude pointed out the clash he chose the email hook. Money rule: free ([tech.md](../versions/v1/tech.md#decision-log), D1).

## Options
| Option | For | Against |
|---|---|---|
| **Vercel logs + email hook** | No new service; meets criterion 14 | No grouping of repeated errors, no dashboard |
| Sentry free plan | Alerts, the failing line, grouping | One more account; its free allowance is unclear (a 5k-errors figure and a 50k one both appear, 2026-10-21) |
| Logs only | Nothing to set up | No alerts: criterion 14 fails unless we rewrite it |

## Decision
Next.js has a hook, `onRequestError` in `instrumentation.ts`, that runs when server code fails ([docs](https://nextjs.org/docs/app/guides/instrumentation)). It sends Lakshay one email through the Gmail sender ([ADR 0005](0005-email-through-gmail.md)): what failed, which page or action, the time. Timed jobs ([ADR 0009](0009-timed-jobs-and-backups.md)) email on failure too. Vercel keeps the full logs.

## Consequences
- To stop a flood (Gmail allows about 500 a day), the hook sends at most one email per error message per hour. A counter in memory is imperfect on serverless (each instance has its own), and that is accepted.
- Browser-side errors and a dead site aren't caught by this hook. QA-5 adds an uptime check, e.g. a scheduled GitHub job that opens the site and fails loudly.
- Gmail is a single point: if it is down, so are the alerts. The GitHub job's failure email is the second path.
- If errors become too many to read as emails, add Sentry with a new ADR.

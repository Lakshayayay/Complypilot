# 0009 Timed jobs and backups: Vercel Cron and GitHub Actions

**Status:** Accepted; the public-repository points are replaced by [ADR 0010](0010-private-repository.md) · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended; Claude added the encryption step) · **Task:** v1-FS-1, v1-FS-9, v1-FS-15

## Context
A timed job is code that runs on a clock, like an alarm: no one clicks anything. We need two kinds: the morning and Monday reminder emails (F10, criterion 12) and a daily backup (criterion 14). Supabase's free plan has **no automatic backups** ([pricing](https://supabase.com/pricing), 2026-10-21).

## Options
| Option | For | Against |
|---|---|---|
| **Vercel Cron for emails, GitHub Actions for backups** | Each tool does what it is good at | Two places to look |
| GitHub for everything | One place | GitHub's clock can run late when busy, so emails arrive at odd times |
| Inside Supabase (pg_cron, Edge Functions) | Next to the data | A second kind of server code (Deno) to learn |

## Decision
- **Reminders:** one Vercel Cron job each day, `0 2 * * *` in UTC. Hobby runs it once a day and only to the hour, so it lands about 7:30 to 8:30 am IST ([Vercel cron limits](https://vercel.com/docs/cron-jobs/usage-and-pricing), 2026-10-21). It calls a route that only answers with the right secret (`CRON_SECRET`). The firm gets its list every day; on Mondays the owners' lists go out too. The "task for you" email is sent at once by the app, not timed. The daily query also keeps the demo database awake.
- **Backups:** a GitHub Actions workflow every night runs `pg_dump` (a Postgres tool that writes the whole database to a file) on the demo database, **encrypts the file with a passphrase** kept in a GitHub secret, and uploads it as an artifact kept 14 days. **Why encrypt:** the repository is public, and a public repository's artifacts can be downloaded by anyone (`UNVERIFIED`; we treat it as true). v1 data is made up, but the habit starts now.
- **One test restore** of a backup into the training project, done once and written as the runbook (v1-FS-9, v1-QA-5).

## Consequences
- GitHub gives 500 MB of artifact space on the Free plan ([billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)); a demo database is tiny.
- A failed job emails Lakshay ([ADR 0006](0006-error-alerts-by-email.md)).
- GitHub may switch off scheduled workflows in a public repo after 60 days with no activity (`UNVERIFIED`); our commits keep it active.
- When real client data arrives, backups move out of GitHub to private storage, with a new ADR.

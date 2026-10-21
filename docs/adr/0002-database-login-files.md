# 0002 Database, login and files: Supabase, used as the signed-in user

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended) · **Task:** v1-FS-1

## Context
We need a database, email-link login and private file storage. Every table must keep one firm's data from another firm (AGENTS.md: Postgres RLS, database rules that decide per row who may see it). Lakshay already has a Supabase account with two projects.

## Options
| Option | For | Against |
|---|---|---|
| **Supabase** (Postgres + login + files) | One service, one set of keys. RLS applies to the database and to files | Free projects sleep after about 7 quiet days; no automatic backups |
| Neon + Clerk + Cloudflare R2 | Each part is best of its kind | Three accounts and setups; file rules are harder |
| ORM (Drizzle or Prisma) for queries | Nicer query code | It usually skips RLS, so safety rests on every query having the right filter |

## Decision
**Supabase.** Code reads and writes through **supabase-js as the signed-in user**, so RLS always applies. Types are generated from the database. The master "service key" is used only by timed jobs, in one server-only file. Complicated queries become SQL functions the app calls. **No ORM.** Login is an email link, no passwords (design decision 2026-10-19). Files live in a private bucket and open only through short-lived signed links.

## Consequences
- Tables, API shapes and RLS are agreed in FS-2 before any screen.
- Table changes are SQL files in `supabase/migrations/` (see [ADR 0004](0004-training-and-demo-environments.md)).
- Free limits: 500 MB database, 1 GB files, 2 active projects ([Supabase pricing](https://supabase.com/pricing), 2026-10-21). Backups: [ADR 0009](0009-timed-jobs-and-backups.md).
- Supabase's own email sender only reaches the project's team and sends 2 an hour, so sign-in links need our own sender: [ADR 0005](0005-email-through-gmail.md).
- Lock-in is limited: the database is plain Postgres, so the data can move.

# v1 Build (stage 2)

**Stage:** 2 Build [FS], planned 2026-10-21 with Lakshay; **started 2026-10-22, after gate PM-12 (design approved)**. **Tasks:** FS-1 to FS-16, QA-1 and gate PM-16, in the [README](../README.md). **Decisions:** [docs/adr/](../../../adr/README.md) (0001 to 0011).
**Next step:** the other logic cores (FS-14, FS-10, FS-13, FS-8). FS-5 (the due-date engine) closed 2026-10-24; FS-2 (tables, RLS, security tests, GitHub checks) closed 2026-10-23; QA-1 (the app skeleton, on the Mac only) closed 2026-10-22; Vercel and the deploy wait until the end (D20).
FS-2's decisions and steps are in "FS-2 decisions" below; FS-5's are in "FS-5 decisions".

## Learn first
New ideas this stage uses. Sources opened 2026-10-21 unless marked.
| Idea | What it is, simply | Why we need it | What we give up | Source |
|---|---|---|---|---|
| QA | Quality assurance: checks that run by themselves on every change | A mistake is caught the day it is made. AGENTS.md: the pipeline is set up first | A little time before the first feature | [GitHub: Understanding GitHub Actions](https://docs.github.com/en/actions/get-started/understanding-github-actions) |
| Next.js app | A framework (a base toolkit) for websites: screens and server code in one project | One language, one deploy | We follow its folder rules | [Next.js docs](https://nextjs.org/docs/app) |
| Server action | A function that runs on the server and is called from a screen, e.g. "save client" | The only place data is written, so rules and checks sit in one spot | Server code must never trust what the screen sends: check it | [React: Server Functions](https://react.dev/reference/rsc/server-functions) |
| RLS | Row Level Security: a database rule that decides, row by row, who may read or change it | One firm can never see another's data, even if our code has a bug | Every table needs its rules and its tests | [Supabase: RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) · [Postgres: RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html) |
| Email sign-in link | The user types their email, gets a one-time link, no password | Nothing to forget or leak (design decision 2026-10-19) | It relies on email arriving | [Supabase: passwordless email](https://supabase.com/docs/guides/auth/auth-email-passwordless) |
| Private files, signed links | Files sit in a private bucket; a link that works for a few minutes opens one file | Receipts and certificates open only for that firm and that owner | Links must be made on demand | [Supabase: Storage access control](https://supabase.com/docs/guides/storage/security/access-control) |
| Migration | A numbered SQL file that changes the database, kept in git | Training and demo get the same tables, and history is kept | Never edit a file after it has run: add a new one | [Supabase: Database migrations](https://supabase.com/docs/guides/deployment/database-migrations) |
| Generated types | The database describes itself, and a tool writes matching TypeScript types | A wrong column name fails at build, not in front of a user | Re-run it after each migration | [Supabase: Generating types](https://supabase.com/docs/guides/api/rest/generating-types) |
| Env files and secrets | Settings and keys kept outside the code, in `.env.local` and in Vercel's and GitHub's settings | Keys never reach git (the repo is private from 2026-10-22, but a repo can leak) | You must set them in each place | [Next.js: Environment variables](https://nextjs.org/docs/app/guides/environment-variables) |
| Timed job | Code that runs on a clock, like an alarm | Morning reminders and nightly backups | Hobby cron: once a day, only to the hour | [Vercel: Cron jobs](https://vercel.com/docs/cron-jobs) |
| CI/CD and preview link | On every push a robot runs the checks (CI); if they pass, the site is published (CD). Each branch also gets its own test link | Broken code can't reach `main` | Checks take minutes | [Vercel: Deployments](https://vercel.com/docs/deployments) |
| Branch rule | A GitHub setting: `main` accepts a change only when the checks pass | "Merge only when checks pass" (AGENTS.md) becomes a rule, not a habit | You can't push straight to `main` any more (docs-only changes keep going straight, see AGENTS.md) | [GitHub: Protected branches](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/about-protected-branches) |
| Unit, security and E2E tests | Unit = one function; security = "can firm A see firm B?"; E2E = a robot clicks through the app | Catch different mistakes | Each kind takes time to write | [Vitest](https://vitest.dev/guide/) · [Playwright](https://playwright.dev/docs/intro) |
| Design tokens in code | The Figma variables, as CSS variables in one file | Change a colour once, everywhere | Names must match Figma | [Tailwind: Theme variables](https://tailwindcss.com/docs/theme) |
| Design-to-code tool | Figma's own tool (`get_design_context`) reads a frame's real structure (layout, spacing, variables, parts, icons) and returns React + Tailwind code as a starting point, plus a picture of the frame | Screens come from the design data, not from copying a screenshot by eye | It writes web code to adapt, not finished code: data, login and rules are ours | [Figma: server returning web code](https://developers.figma.com/docs/figma-mcp-server/server-returning-web-code) (opened 2026-10-22) |
| Code Connect | A link from each Figma part to its code file, so Figma's code uses our own parts | Less swapping per screen | Figma lists it for Organization and Enterprise plans; the Education plan is `UNVERIFIED`, one test call decides | [Figma: Code Connect](https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect) (opened 2026-10-22) |

## Decision log
All agreed with Lakshay on 2026-10-21, one at a time. "Options" are what Claude offered.
| # | Question | Options offered | Lakshay chose | ADR |
|---|---|---|---|---|
| D1 | Money | Free + a domain · fully free · plus Supabase Pro | **Fully free, no domain** | all |
| D2 | App shape | One Next.js app · Next.js + separate server (v0) | **One Next.js app** | [0001](../../../adr/0001-app-framework.md) |
| D3 | Database, login, files | Supabase · three separate services; reuse or new project | **Supabase, his two projects**: "comply pilot" = training, "comply-pilot-new" = demo | [0002](../../../adr/0002-database-login-files.md), [0004](../../../adr/0004-training-and-demo-environments.md) |
| D3b | Data region | New demo project in Mumbai · keep Seoul and change the promise | **Keep Seoul**; Mumbai before real users | [0003](../../../adr/0003-hosting-and-data-region.md) |
| D3c | Privacy line on sign-up and settings | No place · honest about the demo · name the place | **"Kept safe on secure cloud servers."**, no place named | [0003](../../../adr/0003-hosting-and-data-region.md) |
| D4 | Hosting | Vercel · Netlify or Cloudflare · Render | **Vercel free (Hobby)** | [0003](../../../adr/0003-hosting-and-data-region.md) |
| D5 | Email | New Gmail over SMTP · Resend (own inbox only) | **New Gmail account** | [0005](../../../adr/0005-email-through-gmail.md) |
| D6 | Error alerts | Sentry · logs only · logs + email hook | **Logs + email hook** (after "logs only" clashed with criterion 14) | [0006](../../../adr/0006-error-alerts-by-email.md) |
| D7 | Database access | supabase-js as the user · an ORM | **supabase-js, no ORM** | [0002](../../../adr/0002-database-login-files.md) |
| D8 | Where we develop | Two cloud projects · Docker on the Mac · one project | **Two cloud projects** | [0004](../../../adr/0004-training-and-demo-environments.md) |
| D9 | UI toolkit | Tailwind + shadcn/ui · MUI or Mantine · plain CSS | **Tailwind + shadcn/ui** | [0007](../../../adr/0007-ui-toolkit.md) |
| D10 | Tests | Vitest + Playwright · plus pgTAP · Jest + Cypress | **Vitest + Playwright** | [0008](../../../adr/0008-testing-tools.md) |
| D11 | Timed jobs | Vercel for emails + GitHub for backups · GitHub for all · inside Supabase | **Vercel emails, GitHub backups** | [0009](../../../adr/0009-timed-jobs-and-backups.md) |
| D12 | Code layout | By feature · by type | **By feature** | below |
| D13 | Build order | Logic now, screens later · README order as is | **Logic now, screens later** | below |
| D14 | Figma to code (2026-10-22) | Figma's own design-to-code tool · a one-click plugin (Anima, Locofy, Builder.io) · Figma Make | **Figma's own tool.** Plugins are paid (breaks "fully free"); Make's Supabase link is key-value only and needs an Organization plan | below, "Figma to code" |
| D15 | Deploy planning (2026-10-22; **replaced by D20**) | A planned pipeline task · starter app and Vercel's own auto-deploy | **No separate deploy planning.** Lakshay has deployed on Vercel's free plan before; once the repo is connected it publishes `main` and a preview link per branch by itself | README QA-1 |
| D16 | Email account (2026-10-22) | A separate Gmail account for the app (Claude's recommendation) · Lakshay's personal Gmail | **Personal Gmail** (a leaked app password could reach his own mail; see the ADR) | [0011](../../../adr/0011-email-from-personal-gmail.md) |
| D17 | Make the starter app (2026-10-22) | The official generator (`create-next-app`) · write the files by hand | **Official generator**, run in a temporary folder and copied in (the repo root already has files) | below |
| D18 | Lint tool (2026-10-22) | ESLint · Biome | **ESLint.** Checked 2026-10-22 in the [create-next-app docs](https://nextjs.org/docs/app/api-reference/cli/create-next-app) (updated 2026-09-29): still offered (`--eslint`); Next.js 16.4.2 installed, minimum Node 20.9 | below |
| D19 | Old v0 env files (2026-10-22) | Delete + new Supabase keys · move out of the folder · leave | **Delete them and reset the old keys** (v0 used "comply pilot", so its old keys may still work). Files deleted 2026-10-22; the key swap is still open (see "by hand") | below |
| D20 | Deploy timing (2026-10-22) | Vercel and the pipeline at the start of Build (QA-1) · deploy at the end, on Lakshay's terms | **Deploy at the end.** QA-1 became "app skeleton, local only". Unchecked until then: Vercel Seoul region and private repos on the free plan, Node 26 on Vercel | README QA-1, criterion 14 |
| D21 | Generator settings (2026-10-22) | Keep the generator's defaults · change them | Kept: **Cache Components** and **Partial Prefetching** (data is dynamic unless we mark it cached; the docs say both become the only mode in the next major release). Set `agentRules: false` so `next dev` never rewrites our shared AGENTS.md. `typecheck` script runs `next typegen` first, because `.next/` (git-ignored) holds the route types. **Confirmed by Lakshay 2026-10-23** | [Cache Components](https://nextjs.org/docs/app/api-reference/config/next-config-js/cacheComponents) |
**Claude's own calls (Lakshay can change them):** npm; Node 24 LTS; Nodemailer for email and Zod for input checks, each noted when first added; the backup file is encrypted (it was a public-repo precaution; kept now the repo is private, [0010](../../../adr/0010-private-repository.md)); the error hook sends at most one email per error per hour; each task's own design questions are asked when the task starts.

## Environments
| | Training | Demo / live |
|---|---|---|
| Supabase project | **comply pilot** (Tokyo, ap-northeast-1; v0 tables wiped 2026-10-22) | **comply-pilot-new** (Seoul, ap-northeast-2; empty) |
| Project ID (not secret; it is in the project's web address) | `weywbysvdcdjcciqgrqw` | `wewudhskurjdqqrhsfho` |
| Used by | The Mac, tests, Vercel preview links | Vercel production (`main`) and the demo |
| Backups | Not needed | Nightly, encrypted ([0009](../../../adr/0009-timed-jobs-and-backups.md)) |
**Setting names (names only, never values; final at QA-1, and Supabase's current key names are checked then):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` (server only), `NEXT_PUBLIC_APP_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ALERT_EMAIL_TO`, `CRON_SECRET`; GitHub secrets: `SUPABASE_DB_URL`, `BACKUP_PASSPHRASE`. The names-only `.env.example` was made at QA-1 (`.gitignore` hides every `.env.*` file except it).

## Code layout and naming
Agreed by feature (D12). Pages stay in `src/app/` because Next.js turns folders there into web addresses ([project structure](https://nextjs.org/docs/app/getting-started/project-structure)).
```
src/
  app/                      pages; route groups (ca) and (owner); api/cron/reminders
  features/<feature>/       one folder per feature: screens, server actions, queries, rules, tests
    calendar/  clients/  due-dates/  licences/  factory-rules/  tasks/  threads/  reminders/  auth/
  components/ui/            shadcn parts, restyled from Figma
  lib/supabase/             database connection (as the user; server-only service-key file)
  lib/email/                Gmail sender
supabase/migrations/        SQL change files, numbered
supabase/seed.sql           demo data (made up)
tests/security/             firm A vs firm B, owner vs owner
tests/e2e/                  Playwright click-through flows (stage 4)
```
- **Layers:** screens → server actions (the only writers) → database (RLS is the wall). Rule logic (due dates, licence warnings, repeating tasks, factory rules, CSV parsing) is **pure**: same input, same answer, no database inside, so it is easy to test.
- **Naming:** files in kebab-case (`due-date-engine.ts`); components in PascalCase, same name as Figma (`StatusChip`); database tables and columns in snake_case; tests beside the code (`*.test.ts`); every table has a `firm_id` that RLS checks.
- **Mocks:** marked `// MOCK:` and listed in the README (rule in AGENTS.md).

## How each task runs
Design agreed with Lakshay (one question at a time, options + recommendation) → branch `<type>/v1-<slug>` → code and tests → checks pass → merge → docs updated in the same change → tick the box in the README. Docs-only changes go straight to `main`.

## Order of work
Agreed D13: logic that needs no screens comes first; screens follow in demo-story order after gate PM-12. Done = its "done when" in the README passes.
**Before screens (needs no design):**
- [x] v1-FS-1 close-out (2026-10-22): decisions written (this file, ADRs 0001 to 0011); the Supabase tool signed in; the training project checked (8 v0 tables, a few test rows, no logins or files) and wiped by Lakshay in the SQL Editor. Supabase's own `rls_auto_enable()` helper was kept: it turns RLS on for every new table in `public`
- [x] v1-QA-1 app skeleton, on the Mac only (D20; closed 2026-10-22): one starter page; `npm run lint`, `npm run typecheck` and `npm run build` pass; `next dev` serves the page. Exact versions pinned (`.npmrc`), `engines` Node 24.x, `.nvmrc`. The GitHub Actions checks (lint, type check, Vitest) and the branch rule join at FS-2; the email-on-error hook comes at QA-5
- [x] v1-FS-2 (closed 2026-10-23): two migrations in `supabase/migrations/` (12 tables, RLS on every one, explicit grants, no anonymous access, composite foreign keys, owner guards, database-written events, a private `files` bucket); 80 security tests in `tests/security/` pass on GitHub; on training, `db push` applied both and Supabase's security advisor shows no warnings. GitHub Actions (`.github/workflows/checks.yml`) runs lint, typecheck, unit tests and the security tests on every push
- [x] v1-FS-5 due-date engine (closed 2026-10-24, criterion 6): pure code in `src/features/due-dates/`, `src/features/calendar/item-status.ts` and `src/lib/` (`dates.ts`, `states.ts`); 106 unit tests, one per ✅ row of due-dates.md plus the rules below
- [ ] Logic cores, each pure with unit tests: v1-FS-14 next dates (criterion 10) · v1-FS-10 licence warnings (criterion 9) · v1-FS-13 factory rules (criterion 5) · v1-FS-8 CSV parser and bad-row report (criterion 3)

**Screens, in demo-story order (PM-12 passed 2026-10-22):**
- [ ] FS-3 login, sign-up, consent, invite colleagues · FS-4 clients · FS-8 import screens · FS-6 calendar · FS-12 invite owner and owner login · FS-7 thread and Mark done · FS-10 licence screens · FS-13 factory questions screens · FS-14 task screens · FS-11 override dates · FS-15 reminders · FS-9 backups on, breach runbook, demo-data guard · FS-16 demo data
- **Small screens with no frame (decided at PM-12, built from existing parts):** edit and archive a client (FS-4) · edit a licence and its apply-by date (FS-10) · edit and delete a task (FS-14) · "session expired" and "not allowed" (FS-3)
- [ ] v1-PM-16 **Gate:** the app on a preview link with demo data (Lakshay deploys it, D20), every FS task ticked, checks pass, Lakshay walks the demo story

## FS-2 decisions (2026-10-22, Lakshay; one question at a time, options plus a recommendation)
| # | Point | Decision |
|---|---|---|
| 1 | Calendar item | Filings, licence renewals and the firm's own tasks are items; each has one thread. An **owner task** is a to-do attached to an item and shares its thread |
| 1b | Thread visibility | Firm staff see all. The client's owner sees Messages and Activity, **never Notes** (RLS). Other firms and owners see nothing |
| 2 | Stage and status | **Save actions only:** `filed_at/by`, `done_at/by`, ARN, receipt. Worked out when shown: Waiting on owner (an open owner task), Late, Due soon (7 days), Upcoming |
| 3 | Item storage | **Saved rows**, one per filing per period, 12 months ahead; rebuilt when a client's filings or a due-date change is edited; a daily job adds the next month |
| 4 | Due-date changes | Per firm (CA-24): filing, period, optional state, new date, source, who, when. **Removable:** removing puts the official date back; done items stay done |
| 5 | Licence facts | **Only the CA** types number and dates; the owner only uploads the certificate. An explicit `no_expiry` flag; empty expiry without it = "Details needed" |
| 8 | Accounts | **One email = one firm + one role** (staff or owner); an owner has exactly one client; a reused email gets a plain error |
| 7 | Archive | `archived_at`: hidden from lists, calendar and emails; no new items; owner login blocked; data kept; **Unarchive** restores it |
| 16 | Files | One private bucket, path `firm_id/client_id/…`; PDF/JPG/PNG up to 10 MB; signed links 5 min. **The uploader can delete their own file** (an Activity line records it), **except a done item's receipt** (only Edit on Mark done replaces it). Needs a small delete control built from existing parts (not in the frames) |
| T1 | Migrations | **Supabase CLI as a pinned npm dev package.** Lakshay runs `npx supabase login` and `link` once (password typed by him). Claude runs `db push --dry-run`, then `db push`. **`db push` works without Docker** (2026-10-23) |
| T2 | Security tests | **GitHub only** (ADR 0004/0008): a throwaway Supabase on GitHub's runner. The Mac runs lint, typecheck and unit tests |
| T3 | Types | Claude's call: `supabase gen types --lang typescript --linked` into `src/lib/supabase/database.types.ts`, committed, re-run by hand after each migration (GitHub doesn't diff it: the local and cloud generators lay the same types out differently) |

Sources checked 2026-10-22 (supabase.com/docs; no page shows a date): [CLI getting started](https://supabase.com/docs/guides/local-development/cli/getting-started), [db push](https://supabase.com/docs/reference/cli/supabase-db-push), [gen types](https://supabase.com/docs/reference/cli/supabase-gen-types), [testing in CI](https://supabase.com/docs/guides/deployment/ci/testing), [API keys](https://supabase.com/docs/guides/api/api-keys). `supabase start` and `db pull` need Docker; `db push` is not said to (`UNVERIFIED`, try once). Legacy `anon`/`service_role` keys stay valid until switched off in the dashboard.

**FS-2 build steps** (branch `feat/v1-fs2-data`; load the `supabase` and `supabase-postgres-best-practices` skills before any SQL; stop after each step that needs Lakshay):
1. Draft of tables and API shapes in this file, for Lakshay to review. 2. Tooling: `supabase` CLI and Vitest as pinned dev packages, `supabase init`; Lakshay runs `login` and `link`. 3. Migration 0001: helper functions for "my firm / my role / my client" (private schema), tables, RLS on every table (`TO authenticated`, a `firm_id` check, never `user_metadata`), the storage bucket and its rules; `db push --dry-run`, then `db push`; read-only advisors show no RLS warnings. 4. Generated types. 5. `src/lib/supabase/`: `supabase-js` and `@supabase/ssr` (pinned), a server client acting as the user, a browser client, a `server-only` secret-key client. 6. `tests/security/`: made-up firms A and B and an owner of each; every table read, insert, update, delete across firms and owners; Notes hidden from owners; owners can't edit licence facts; file reads across firms blocked; deletes only by the uploader, never a done receipt. 7. GitHub Actions: lint, typecheck, unit tests; then `supabase/setup-cli`, `supabase start`, security tests. 8. Merge when green; tick FS-2 in the README.

**What FS-2 built, and what it taught us (2026-10-23)**
- **Grants:** Supabase stops exposing new tables to the Data API by itself on 2026-10-30 ([changelog](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)). Every migration grants each new table to `authenticated` and `service_role` and revokes `anon`; the local copy runs with `auto_expose_new_tables = false` to prove it.
- **Storage reads follow the files table:** an object can be read only if its `files` row is visible. A deleted file stays visible to its uploader alone, because Postgres checks the read rule before a delete.
- **Supabase's own `rls_auto_enable()`** was callable by anyone through the API; the second migration closes that (the event trigger still works).
- **Moved to FS-3, their first use:** `@supabase/ssr` and the server and browser clients. FS-2's only app file is `src/lib/supabase/database.types.ts`.
- **Versions pinned:** `supabase` CLI 2.121.0, Vitest 5.0.5, `@supabase/supabase-js` 2.118.0, `@types/node` 24.19.2 (was 20, which Vitest 5 refuses).
- **New table checklist:** a migration with RLS and grants, a case in `tests/security/firms-apart.test.ts` and the `TABLES` list (the coverage test fails otherwise), re-run `gen types`, then `db push` only after GitHub is green.

**Logic cores** (pure functions, tests beside the code in `src/features/<feature>/`, each starts with its own short design talk): FS-5 due dates ([due-dates.md](../research/due-dates.md), criterion 6) · FS-14 repeating tasks (criterion 10) · FS-10 licence warnings ([licences.md](../research/licences.md), criterion 9) · FS-13 factory rules ([applicability-delhi-haryana.md](../research/applicability-delhi-haryana.md), criterion 5) · FS-8 CSV parser ([import-formats.md](../research/import-formats.md), criterion 3).
**The look in code** (once, at the start of FS-3): Figma variables into one CSS token file · the 38 parts on `05 Components` into `src/components/ui/` (shadcn, restyled) · one Code Connect test call (`UNVERIFIED` on the Education plan) · brand files into `public/`.
**How each step is checked:** FS-2: migrations run on training, advisors show no RLS warnings, cross-firm tests pass on GitHub. Logic cores: `npx vitest run`. Screens: compared with the picture Figma returns; the demo story is walked at PM-16.

## FS-2 tables and server actions (approved by Lakshay 2026-10-23)
Built only from the decisions above and the frames. **S** = staff of that firm, **O** = that client's owner. Every table has `id`, `created_at` and (except `firms`) a `firm_id`. Names are snake_case.

| Table | Key columns | Who can do what (RLS) |
|---|---|---|
| `firms` | name, city, contact_email, mobile, default_state | S read and edit their own firm. Made only by the sign-up action |
| `members` | user_id (the login), firm_id, role (`staff` or `owner`), client_id (owners only), name, email | Everyone reads their own row; S read their firm's members. Written only by the server on sign-up and invite accept. One row per login = one email, one firm, one role |
| `invites` | email, role, client_id, invited_by, accepted_at | S create and read their firm's. Accepted by the server |
| `consents` | user_id, notice_version, accepted_at | S read their firm's, add their own. **Never changed or deleted** |
| `clients` | name, trade_name, gstin, pan, state, gst_scheme, contact_name, contact_phone, archived_at (no TDS/PF/ESIC flags or income-tax type: `client_filings` is the one record of which filings apply; the CSV import turns those columns into filings. Approved 2026-10-23) | S all in their firm. O read their own (not if archived). Unique (firm_id, gstin) |
| `client_filings` | client_id, filing_code | S all. O read their own |
| `calendar_items` | client_id, kind (`filing` / `licence` / `task`), filing_code, period_start, period_label, official_due_date, due_date, due_date_change_id, licence_id, title, filed_at / by, done_at / by, arn, receipt_file_id | S read and update. O read their own. Rows are made and rebuilt by server code. Unique (client_id, filing_code, period_start) |
| `due_date_changes` | filing_code, period_start, state (optional), new_due_date, source, created_by, removed_at, removed_by | S only, own firm. O never read directly (they see the moved date on the item) |
| `licences` | client_id, licence_type, number, office, issued_on, expires_on, no_expiry, apply_by_date, certificate_file_id, source (`factory_rules` / `manual`), confirmed_at | S all. O read their own and attach a certificate file only. Status (Valid, Renew soon, Expired, Details needed, Valid until cancelled) is worked out when shown |
| `owner_tasks` | calendar_item_id, title, note, created_by, done_at, done_by | S create and read. O read their own and tick them done |
| `thread_entries` | calendar_item_id, kind (`message` / `note` / `event`), author_id, body, tag (`need_document` / `question` / `filed`), event_type, file_id | S read all, write messages and notes. **O read messages and events, never notes**; O write messages only. Events are written by the database itself, nobody types one |
| `files` | calendar_item_id or licence_id, storage_path (`firm_id/client_id/…`), file_name, mime_type, size_bytes, uploaded_by, deleted_at | S and O read and upload for their own client. The uploader can delete, except a file used as a done item's receipt |

**Rules across all tables**
- **Composite foreign keys:** a child row carries `firm_id` and points at its parent with both ids, for example (client_id, firm_id) to `clients`. A row then cannot sit under another firm's client, even through a bug (a "foreign key" is the database's link from one row to another).
- **Helper functions** `my_firm_id()`, `my_role()`, `my_client_id()` in a private schema that the app cannot call directly; every policy uses them. Policies say `TO authenticated`, check `firm_id`, and never read `user_metadata` (a user can edit it).
- **Events by trigger:** "Rakesh marked this done", "Vikram removed a file" and the like are written by database triggers when the real change happens, so they can't be faked or forgotten.
- **Not in FS-2** (each arrives with its task, with RLS and cross-firm tests in the same change): `firm_tasks` (FS-14), factory answers and licence suggestions (FS-13), `reminder_runs` (FS-15).

**Server actions (the only writers).** Each checks its input with a schema (Zod) and returns a typed result; errors are plain sentences.
| Task | Action: input → output |
|---|---|
| FS-3 | `createFirm({firmName, city, email, mobile, noticeVersion})` → firm + consent saved · `inviteColleague({email})` → invite · `acceptInvite(token)` → member |
| FS-4 | `createClient`, `updateClient`, `archiveClient(id)`, `unarchiveClient(id)` · `setClientFilings(clientId, filingCodes[])` → items rebuilt |
| FS-8 | `importClients(csvText)` → `{saved: n, badRows: [{row, field, reason}]}` |
| FS-12 | `inviteOwner({clientId, email})` → invite sent |
| FS-6 | `listCalendarItems({from, to, clientId?, filingCode?, status?})` → items with worked-out status and days late · `getCalendarItem(id)` → item, thread, owner tasks |
| FS-7 | `postMessage({itemId, body, tag?, fileId?})` · `postNote({itemId, body})` (S) · `giveOwnerTask({itemId, title, note?})` (S) · `tickOwnerTask(id)` (O) · `tagFiled(itemId)` · `markDone({itemId, arn, receiptFileId})` · `editDone(...)` · `undoDone(itemId)` (10 seconds) · `requestUpload({itemId or licenceId, fileName, mimeType, size})` → `{fileId, uploadUrl}` · `deleteFile(fileId)` |
| FS-10 | `saveLicence({...})` (S) · `attachCertificate({licenceId, fileId})` (O) |
| FS-11 | `previewDueDateChange({filingCode, periodStart, state?, newDate})` → `{itemsMoved, alreadyDone, firstClients[]}` · `applyDueDateChange(...)` · `removeDueDateChange(id)` |

**Three small points, confirmed 2026-10-23:** (a) filing codes (`gstr1`, `gstr3b`, `pmt06`, `cmp08`, `gstr4`, `gstr9`, `tds_deposit`, `tds_return_salary`, `tds_return_other`, `advance_tax`, `tax_audit`, `itr_audit`, `esic`) are plain text with a CHECK list, not a lookup table; (b) removing a due-date change keeps the row with `removed_at` (history stays); (c) events come from database triggers, as above.

## FS-5 decisions (2026-10-24, Lakshay; one question at a time, options plus a recommendation)
| # | Point | Decision |
|---|---|---|
| D1 | Files | Dates in `features/due-dates/due-date-engine.ts`; status in `features/calendar/item-status.ts`; states in `lib/states.ts`; date helpers in `lib/dates.ts` (Claude's addition: the engine, status and later cores share them). Tests beside each file |
| D2 | Dates | Plain `"YYYY-MM-DD"` text (what Postgres `date` gives), tiny helpers that run in UTC, no package. `Temporal` is not in Node 24 (tried 2026-10-24). The engine never reads the clock: `today` is passed in, worked out in Asia/Kolkata by the caller |
| D3 | Shape | One rule table keyed by filing code, three functions: `filingsFor(scheme)` (the add-client checkboxes), `workOutItems({scheme, state, filings, changes, from, to})` (items with the `calendar_items` fields), `ruleText(code, scheme)` (the CA-08 line). A rule and its text sit in one row, so they cannot disagree |
| D4 | Window | An item is in the window by its **final** date (after changes), so an extended date stays on the calendar (30 Sep moved to 21 Oct is listed from 1 Oct) |
| D5 | Which change wins | A change for the client's state beats an all-states change; between equals the newest wins; removed changes are ignored |
| D6 | Period start, label | First day of the month, quarter or financial year (1 Apr); advance tax uses 1 Apr, 1 Jul, 1 Oct, 1 Jan. Labels: `September 2026`, `Jul to Sep 2026`, `FY 2025-26`, `1st instalment, FY 2026-27 (15%)`. FY wording works under both Income-tax Acts |
| D7 | Bad input | A plain error, never a quiet skip: a filing that does not fit the scheme, an unknown filing, scheme or (QRMP GSTR-3B) state |
| D8 | States | 36 names (28 states, 8 UTs); the merged "Dadra and Nagar Haveli and Daman and Diu" is in the 22nd group. Rule 61 still names the two UTs apart (37). GST state codes arrive in FS-8 |
| D9 | Status | Two answers: **stage** (Done, Filed, Waiting on owner, Open: first that applies) and **timing** (Late with days, Due soon = today to 7 days ahead, Upcoming; none when Done). **Filed keeps its timing until Done** (criterion 12) |
Also settled: advance tax is 4 instalments for every client (a presumptive client's CA unticks it and adds a 15 Mar task); the audit-case return for tax year 2026-27 stays out until its date is read on an official page ([due-dates.md](../research/due-dates.md)); the tax audit report for tax year 2026-27 (30 Sep 2027) is ✅ there.

**What FS-5 built, and what it taught us (2026-10-24)**
- **Tests:** 106 unit tests (`npm run test:unit`). The engine tests open a one-day window on each ✅ date and expect exactly that item. Three deliberate breaks (March TDS, the QRMP state split, the window using the official date) each made tests fail. A guard test compares the engine's 13 filing codes with the migration's CHECK list.
- **Known limits (v1):** the client's current GST scheme applies to every period (a mid-year switch is not handled). Periods are tried from 3 years before the window (`ponytail:` note in the code). Left out on purpose: government deductors (7 April) and the 30-day challan-cum-statement TDS cases, which are not factory-client cases. Tax audit and audit-case return items exist only for years in due-dates.md; the CA adds later years as tasks until they are confirmed.
- **Used by:** FS-4 (`filingsFor`, `ruleText`, then `workOutItems` to save items), FS-11 (`workOutItems` with changes, for the preview), FS-6/FS-7/FS-15 (`itemStatus`, `DUE_SOON_DAYS`), FS-8 and FS-10/FS-14 (`lib/dates.ts`, `lib/states.ts`).

## Lakshay does by hand (Claude can't)
- [x] "comply pilot" restored (2026-10-22). Claude's Supabase tool pointed at another project (`bqprlhfixgcpfhxthrss`, neither of ours), so Claude set a local entry for this folder only, pointing at "comply pilot". Signed in on 2026-10-22; the address was checked (`weywbysvdcdjcciqgrqw`)
- [x] The three old v0 env files are deleted (2026-10-22, D19)
- [ ] Supabase keys: new ones were made on "comply pilot", but a secret key value was shared in chat, so turn that one off and make another. Check the old v0 keys are off too. Values only into `.env.local`, never chat (D19)
- [ ] Gmail: Lakshay's personal account ([ADR 0011](../../../adr/0011-email-from-personal-gmail.md)). Before FS-3, the first email: turn on 2-Step Verification and make an app password; it goes only into `.env.local` and the settings pages, never into chat
- [x] Node 24 LTS installed by Claude (2026-10-22): Homebrew `node@24` (24.22.1), put first on the PATH by one line at the end of `~/.zshrc` (undo = delete that line). The Mac had Node 25.6.1, which stopped getting security fixes on 2026-06-01 ([endoflife.date](https://endoflife.date/nodejs)); Vercel's default is 24.x ([Vercel docs](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)). **Side effect, fixed:** installing it updated a shared Homebrew library, which broke the old Homebrew Node 25 (and `mongosh`), so Claude ran `brew upgrade node`: Homebrew's own `node` is now 26.12.1 (mongosh 2.13.0). Shells use Node 24; Node 26 only serves Homebrew's own tools. Node 26 becomes LTS around 2026-10-28; whether Vercel offers it yet is `UNVERIFIED`
- [x] `gh auth login` done (2026-10-22): Claude can open pull requests and read check results from the terminal
- [x] Make the GitHub repo private (done by Lakshay, 2026-10-22); GitHub Pro **not now** (Lakshay, 2026-10-22): checks still run on every change, nothing blocks a merge, and Claude merges only when the checks pass (ADR 0010)
- [ ] Put keys into `.env.local` and into Vercel's and GitHub's settings yourself. Never paste a key in chat
- [ ] At the end of Build (D20): connect the repo on Vercel, set the keys there, try the function region Seoul. The branch rule for `main` waits for GitHub Pro
- Already done: Supabase account and both projects; Vercel account.

## Figma to code
Decided D14 (2026-10-22): screens come from Figma's own design-to-code tool, not from copying screenshots and not from a paid plugin or Figma Make.
1. **Once, the look:** the Figma variables (colours, spacing, corners, fonts) are read with `get_variable_defs` and written as one CSS token file. Every variable has a CSS name (design.md, Foundations table); the names must not change.
2. **Once, the parts:** the 38 parts on `05 Components` become code components (shadcn as the base, restyled). **Code Connect test:** one call, at the first part, to see if the Education plan allows linking Figma parts to code files; if it does, all parts are linked; if not, the component map below does the same job. `UNVERIFIED` until tried.
3. **Per screen:** load the `figma-design-to-code` skill, call `get_design_context` on the frame (layout, spacing, variables, parts, icons; code plus a picture), read the frame's Dev Mode notes, swap in our parts, connect data, buttons and states. The picture it returns is the look check; a Figma screenshot is taken only to settle a doubt.
4. **Not in Figma, so ours:** data, login, security rules, due dates and emails (steps FS-2 to FS-5 and the screen tasks).
- **Component map:** a table here, filled as components are built: Figma set → code file → props (e.g. `StatusChip` → `components/ui/status-chip.tsx` → `status`, `size`).
- **Brand files:** logo, app icon and favicon are exported from Figma into `public/`.
- The 66 frames, notes and cast: [screens.md](../design/screens.md). Demo story: [flows.md](../design/flows.md).

## Smooth and subtle
Lakshay's direction at PM-12 (2026-10-22): proper screens, subtle animation, a smooth feel.
- **Motion** follows the agreed rules (design.md, "Motion review table"): frequent actions 200 ms or less, ease-out; Mark done is the one richer moment (450 ms at most); the thread panel slides in over 200 ms; buttons shrink a little when pressed; "reduce motion" is respected.
- **No blank waits:** a grey outline of the page (a skeleton, as in CA-14c) shows while it loads.
- **Feels instant:** a change shows at once and saves in the background; if the save fails, it rolls back with a message (an "optimistic update").
- **Sizes** follow normal desktop software (CA text 14 px, small labels 12 px). No projector sizing.
- **Open question for the first screen task (FS-3):** CSS and shadcn's own animations only, or also an animation library for the richer moments. Recommendation then: CSS first.

## Builder check: open points for stage 2
On 2026-10-22 a fresh helper agent read the design docs as a builder and listed 24 things it would have to guess. Three were contradictions and are corrected in the [README](../README.md#corrections-after-the-scope-lock). The rest are below: **recommended defaults, not agreed**. Each is settled with Lakshay, one at a time, in the task named in the last column (AGENTS.md: agree data and API shapes before screens). **The biggest gap is the first group: what a calendar item is and how its status moves.** **Settled in FS-2 (2026-10-22, "FS-2 decisions" above): points 1 to 5, 7, 8 and 16.** **Settled in FS-5 (2026-10-24, "FS-5 decisions"): the engine side of points 3 and 4, and the 7-day "Due soon" of point 9** (the licence-chip part of 9 waits for FS-10). Decisions needed at the design gate are in [design.md](../design/design.md) ("Decide at PM-12").
| # | Point | Recommended default | Decide in |
|---|---|---|---|
| 1 | What a calendar item is, and its thread | Filings, licences and the firm's own tasks are items; each has one thread. An owner task is an item inside the filing's thread. On a thread: all firm staff and that client's owner. The "Notes" tab is CA-only (hidden from the owner by RLS); "Activity" is the event lines | FS-2 |
| 2 | Stage and status | Stage goes Open, Waiting on owner, Filed, Done. Waiting on owner = an open owner task exists; the owner's tick moves it back to Open; the "Filed" tag moves it to Filed; Mark done = Done. Late and waiting at once: the stage chip plus "N days late". A day's badge shows the most urgent: late, waiting, soon, upcoming, done | FS-2 |
| 3 | How items are stored | Stored rows, a rolling 12-month horizon, rebuilt by the pure engine when a client's filings or an override changes, and by the daily job | FS-2, FS-5 |
| 4 | Due-date overrides | Filing + period + new date (+ optional state), per firm; applies to current and future clients; can be removed. The two CBDT changes in CA-24 are seed overrides | FS-2, FS-11 |
| 5 | Licence facts | An owner's upload only attaches the file; "Details needed" stays until the CA enters number and dates, and the CA sees "Certificate uploaded". A `no_expiry` flag: empty expiry without it = "Details needed"; with it = "Valid until cancelled" | FS-2, FS-10 |
| 6 | Undo and Edit on Mark done | Undo for 10 seconds restores the earlier state and keeps the file; Edit changes the ARN or receipt and writes an "edited" event | FS-7 |
| 7 | Archive a client | Hides it from lists and the calendar, blocks the owner's login, keeps the data | FS-4 |
| 8 | Accounts | One email belongs to one firm and one role; inviting an email already used shows a plain error; an owner has exactly one client | FS-3, FS-12 |
| 9 | Chips and thresholds | "Due soon" = 7 days (as in the morning list). The licence chip stays "Renew soon" at 90, 60 and 30 days; only the emails differ. The Delhi fire certificate's 180 days is ⚠️, so use 0 until confirmed; the CA can edit the apply-by date | FS-5, FS-10 |
| 10 | Reminder emails | Sent all 7 days; nothing sent when the list is empty; all dates are plain dates in Asia/Kolkata; a licence joins a list once its reminder day has passed since the last send (README criterion 12) | FS-15 |
| 11 | Demo clock and numbers | Seed relative to a settable "today" used only in the demo; a small generator hits the frame numbers (411 items, 8 late, 83 this week, 100 clients, 236 licences) | FS-16 |
| 12 | CA-13 before the AI exists | A pick-from-the-official-list card with no AI suggestion; any stub is marked `// MOCK:` and listed in the README until stage 3. The two category lists load from `research/data` by migration | FS-13, AI-3 |
| 13 | CSV import | Dedupe on GSTIN only (one PAN can have several GSTINs): a repeated PAN is a warning, not an error, on the form too. UTF-8, at most 1,000 rows and 2 MB | FS-8 |
| 14 | Sign-in link | Valid 1 hour, one use; works in any browser (the token goes to our own verify route); a plain "try again" when the send limit hits | FS-3 |
| 15 | Which code sends which email | All seven emails through Nodemailer from our code; auth links from the Supabase admin API; templates are plain HTML strings in `features/*/emails`; subjects come from the Figma frames | FS-3, FS-15 |
| 16 | Files | One private bucket, path `firm_id/client_id/...`; one rule for every file (PDF, JPG, PNG, up to 10 MB); signed links valid 5 minutes | FS-7 |
| 17 | Libraries (each noted when first added) | `date-fns` or plain UTC dates; shadcn Table with a sticky first column for CA-15; react-hook-form with Zod; Sonner for toasts; a custom month grid; `tests/e2e` for Playwright | each task |
| 18 | Glossary | Five lines (QRMP, CTE/CTO, ARN, "Ask your CA", "You decide", "Inform the board") written with the first screen task, so owner-facing words stay the same | FS-3 |

## Open checks
Short fact-checks done 2026-10-21 are in the ADRs. Still open:
- `UNVERIFIED` Google's own page for app passwords (third-party pages say 2-Step Verification is required)
- `UNVERIFIED` Vercel Hobby may pick the Seoul region (`icn1` exists; the Hobby page says "single region"). Confirm at deploy (D20)
- Confirmed 2026-10-23: `supabase db push` needs no Docker. `supabase status -o env` (CLI 2.121.0) prints `API_URL`, `PUBLISHABLE_KEY`, `SECRET_KEY`, `DB_URL`, plus the legacy `ANON_KEY` and `SERVICE_ROLE_KEY`
- Repo visibility: the repo is private from 2026-10-22 ([ADR 0010](../../../adr/0010-private-repository.md)); GitHub Pro is not wanted for now (2026-10-22); `UNVERIFIED` Vercel's current rule for private repos on Hobby. Check at deploy (D20)
- `UNVERIFIED` Supabase's rate limit for custom SMTP (sources say 30 messages an hour, or 30 new users an hour)
- Package versions on npm on 2026-10-21: Next.js 16.4.2, React 19.3.1, Tailwind 4.3.3, shadcn 4.22.1, supabase-js 2.118.0, Vitest 5.0.5, Playwright 1.64.1, Nodemailer 10.1.7, Zod 4.6.7, TypeScript 7.0.2. QA-1 pins the versions it uses
- Phosphor's code package name; Next.js `onRequestError` confirmed in the docs (it exists since Next.js 15)

## Watch out
- **A Cloudflare Workers project ("complypilot") is still connected to the GitHub repo**, probably from v0. It builds every push and fails ("Workers Builds" on PR #1, 2026-10-23). It is not one of our checks; Lakshay can disconnect it in the Cloudflare dashboard. Our checks are `checks` and `security`.
- **The repo is private from 2026-10-22** ([ADR 0010](../../../adr/0010-private-repository.md)), but nothing secret goes in a commit, a doc or a chat. `.env*` files are ignored by git (checked 2026-10-21: none ever entered git history).
- The old v0 env files on Lakshay's disk (not in git) are deleted before QA-1 (D19); their keys are dead and never reused. QA-1 writes a fresh names-only file.
- **The Supabase tool can't run deletes in our sessions:** on 2026-10-22, three `drop` commands sent through it were refused (read-only queries work). Lakshay ran the wipe in the SQL Editor. Migrations go through files and the Supabase command-line tool, or the SQL Editor.
- Every table has RLS on from its first migration. No table ships without its cross-firm tests (criterion 2).
- Gate PM-12 passed on 2026-10-22, so screens may be built, one task at a time. Mocks are marked `// MOCK:` and listed in the README.
- v1 uses made-up data only; the privacy line names no place ([0003](../../../adr/0003-hosting-and-data-region.md)).
- v0 is reference only: `git show v0-prototype:<path>`.

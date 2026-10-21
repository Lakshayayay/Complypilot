# v1 Build (stage 2)

**Stage:** 2 Build [FS], planned 2026-10-21 with Lakshay; **build starts after design is done** (gate PM-12), or earlier on tasks that need no screens if Figma blocks again (README, Stage 2). **Tasks:** FS-1 to FS-16, QA-1 and gate PM-16, in the [README](README.md). **Decisions:** [docs/adr/](../../adr/) (0001 to 0010).
**Next step when this stage starts:** close FS-1 (Lakshay's by-hand steps below; Claude lists the training project's tables, Lakshay confirms, wipe), then QA-1 (the deploy pipeline), then FS-2 (tables, API shapes, RLS).

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

## Decision log
All agreed with Lakshay on 2026-10-21, one at a time. "Options" are what Claude offered.
| # | Question | Options offered | Lakshay chose | ADR |
|---|---|---|---|---|
| D1 | Money | Free + a domain · fully free · plus Supabase Pro | **Fully free, no domain** | all |
| D2 | App shape | One Next.js app · Next.js + separate server (v0) | **One Next.js app** | [0001](../../adr/0001-app-framework.md) |
| D3 | Database, login, files | Supabase · three separate services; reuse or new project | **Supabase, his two projects**: "comply pilot" = training, "comply-pilot-new" = demo | [0002](../../adr/0002-database-login-files.md), [0004](../../adr/0004-training-and-demo-environments.md) |
| D3b | Data region | New demo project in Mumbai · keep Seoul and change the promise | **Keep Seoul**; Mumbai before real users | [0003](../../adr/0003-hosting-and-data-region.md) |
| D3c | Privacy line on sign-up and settings | No place · honest about the demo · name the place | **"Kept safe on secure cloud servers."**, no place named | [0003](../../adr/0003-hosting-and-data-region.md) |
| D4 | Hosting | Vercel · Netlify or Cloudflare · Render | **Vercel free (Hobby)** | [0003](../../adr/0003-hosting-and-data-region.md) |
| D5 | Email | New Gmail over SMTP · Resend (own inbox only) | **New Gmail account** | [0005](../../adr/0005-email-through-gmail.md) |
| D6 | Error alerts | Sentry · logs only · logs + email hook | **Logs + email hook** (after "logs only" clashed with criterion 14) | [0006](../../adr/0006-error-alerts-by-email.md) |
| D7 | Database access | supabase-js as the user · an ORM | **supabase-js, no ORM** | [0002](../../adr/0002-database-login-files.md) |
| D8 | Where we develop | Two cloud projects · Docker on the Mac · one project | **Two cloud projects** | [0004](../../adr/0004-training-and-demo-environments.md) |
| D9 | UI toolkit | Tailwind + shadcn/ui · MUI or Mantine · plain CSS | **Tailwind + shadcn/ui** | [0007](../../adr/0007-ui-toolkit.md) |
| D10 | Tests | Vitest + Playwright · plus pgTAP · Jest + Cypress | **Vitest + Playwright** | [0008](../../adr/0008-testing-tools.md) |
| D11 | Timed jobs | Vercel for emails + GitHub for backups · GitHub for all · inside Supabase | **Vercel emails, GitHub backups** | [0009](../../adr/0009-timed-jobs-and-backups.md) |
| D12 | Code layout | By feature · by type | **By feature** | below |
| D13 | Build order | Logic now, screens later · README order as is | **Logic now, screens later** | below |
**Claude's own calls (Lakshay can change them):** npm; Node 24 LTS; Nodemailer for email and Zod for input checks, each noted when first added; the backup file is encrypted (it was a public-repo precaution; kept now the repo is private, [0010](../../adr/0010-private-repository.md)); the error hook sends at most one email per error per hour; each task's own design questions are asked when the task starts.

## Environments
| | Training | Demo / live |
|---|---|---|
| Supabase project | **comply pilot** (Tokyo, ap-northeast-1; old v0 data to wipe) | **comply-pilot-new** (Seoul, ap-northeast-2; empty) |
| Used by | The Mac, tests, Vercel preview links | Vercel production (`main`) and the demo |
| Backups | Not needed | Nightly, encrypted ([0009](../../adr/0009-timed-jobs-and-backups.md)) |
**Setting names (names only, never values; final at QA-1, and Supabase's current key names are checked then):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `SUPABASE_SECRET_KEY` (server only), `NEXT_PUBLIC_APP_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, `ALERT_EMAIL_TO`, `CRON_SECRET`; GitHub secrets: `SUPABASE_DB_URL`, `BACKUP_PASSPHRASE`. A names-only `.env.example` is made at QA-1 (the current `.gitignore` hides every `.env.*` file, so it gets an exception).

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
- [ ] v1-FS-1 close-out: decisions are written (this file, ADRs 0001 to 0010). Left: Lakshay's by-hand steps; check the training project and wipe it
- [ ] v1-QA-1 deploy pipeline: starter Next.js app in the layout above; GitHub Actions (lint, type check, Vitest); Lakshay connects the repo on Vercel and sets the Seoul region; the email-on-error hook; Lakshay turns on the branch rule. Done when a starter page deploys by itself
- [ ] v1-FS-2 tables, API shapes, RLS and the cross-firm tests. Its own back-and-forth on the tables first
- [ ] v1-FS-5 due-date engine (criterion 6)
- [ ] Logic cores, each pure with unit tests: v1-FS-14 next dates (criterion 10) · v1-FS-10 licence warnings (criterion 9) · v1-FS-13 factory rules (criterion 5) · v1-FS-8 CSV parser and bad-row report (criterion 3)

**After PM-12, screens in demo-story order:**
- [ ] FS-3 login, sign-up, consent, invite colleagues · FS-4 clients · FS-8 import screens · FS-6 calendar · FS-12 invite owner and owner login · FS-7 thread and Mark done · FS-10 licence screens · FS-13 factory questions screens · FS-14 task screens · FS-11 override dates · FS-15 reminders · FS-9 backups on, breach runbook, demo-data guard · FS-16 demo data
- [ ] v1-PM-16 **Gate:** the app on a preview link with demo data, every FS task ticked, checks pass, Lakshay walks the demo story

## Lakshay does by hand (Claude can't)
- [ ] When "comply pilot" has finished restoring, tell Claude. Claude then shows the address its Supabase tool points at; Lakshay compares it with the dashboard address of "comply pilot". If they differ, tell Claude
- [ ] Make the app's Gmail account, turn on 2-Step Verification, make an app password
- [ ] Install Node 24 LTS
- [ ] `gh auth login` in the terminal, so Claude can open pull requests and read check results
- [ ] Make the GitHub repo private (done by Lakshay, 2026-10-22) and apply for GitHub Pro through the Student Developer Pack, so the branch rule can work on a private repo (ADR 0010)
- [ ] Put keys into `.env.local` and into Vercel's and GitHub's settings yourself. Never paste a key in chat
- [ ] At QA-1: connect the repo on Vercel (done before for other projects), set the function region to Seoul, switch on the branch rule for `main`
- Already done: Supabase account and both projects; Vercel account.

## Figma to code
- **Tokens:** every Figma variable has a CSS name (design.md, Foundations table). QA-1's first screen task reads them from Figma and writes the one token file.
- **Per screen:** load the `figma-design-to-code` skill, read the frame's design data and its Dev Mode notes, build from our components, compare with a Figma screenshot.
- **Component map:** a table here, filled as components are built: Figma set → code file → props (e.g. `StatusChip` → `components/ui/status-chip.tsx` → `status`, `size`). Code Connect would do this automatically but is `UNVERIFIED` on the Education plan ([Code Connect docs](https://developers.figma.com/docs/code-connect/)).
- **Brand files:** logo, app icon and favicon are exported from Figma into `public/`.
- The 65 frames, notes and cast: [screens.md](design/screens.md). Demo story: [flows.md](design/flows.md).

## Builder check: open points for stage 2
On 2026-10-22 a fresh helper agent read the design docs as a builder and listed 24 things it would have to guess. Three were contradictions and are corrected in the [README](README.md#corrections-after-the-scope-lock). The rest are below: **recommended defaults, not agreed**. Each is settled with Lakshay, one at a time, in the task named in the last column (AGENTS.md: agree data and API shapes before screens). **The biggest gap is the first group: what a calendar item is and how its status moves.** Decisions needed at the design gate are in [design.md](design/design.md) ("Decide at PM-12").
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
- `UNVERIFIED` Vercel Hobby may pick the Seoul region (`icn1` exists; the Hobby page says "single region"). Confirm at QA-1
- `UNVERIFIED` whether `supabase db push` needs Docker. Try it at FS-2
- Repo visibility: the repo is private from 2026-10-22 ([ADR 0010](../../adr/0010-private-repository.md)); `UNVERIFIED` that Lakshay's account qualifies for GitHub Pro (student benefit), and Vercel's current rule for private repos on Hobby. Check at QA-1
- `UNVERIFIED` Supabase's rate limit for custom SMTP (sources say 30 messages an hour, or 30 new users an hour); Supabase's current API key names
- Package versions on npm on 2026-10-21: Next.js 16.4.2, React 19.3.1, Tailwind 4.3.3, shadcn 4.22.1, supabase-js 2.118.0, Vitest 5.0.5, Playwright 1.64.1, Nodemailer 10.1.7, Zod 4.6.7, TypeScript 7.0.2. QA-1 pins the versions it uses
- Phosphor's code package name; Next.js `onRequestError` confirmed in the docs (it exists since Next.js 15)

## Watch out
- **The repo is private from 2026-10-22** ([ADR 0010](../../adr/0010-private-repository.md)), but nothing secret goes in a commit, a doc or a chat. `.env*` files are ignored by git (checked 2026-10-21: none ever entered git history).
- The old `.env.example` on Lakshay's disk (not in git) holds a v0-era `NEXTAUTH_SECRET`: treat it as dead and don't reuse it. QA-1 writes a fresh names-only file.
- Every table has RLS on from its first migration. No table ships without its cross-firm tests (criterion 2).
- No application code before PM-12 that builds screens. Mocks are marked `// MOCK:` and listed in the README.
- v1 uses made-up data only; the privacy line names no place ([0003](../../adr/0003-hosting-and-data-region.md)).
- v0 is reference only: `git show v0-prototype:<path>`.

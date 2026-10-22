# v1 Build plan, step by step

Agreed with Lakshay on 2026-10-22, after FS-1 closed. The decisions, folder layout and rules are in [tech.md](tech.md); the tasks and acceptance criteria are in the [README](../README.md). This file is the order we go in and the questions each step needs. Design questions stay **one at a time** (Lakshay chose this over batching them, 2026-10-22).

## Where we stopped (2026-10-22)
Questions already answered today:
| Question | Options offered | Lakshay chose |
|---|---|---|
| How to make the starter app | the official generator · write the files by hand | **Official generator** (tech.md D17) |
| Lint tool | ESLint · Biome | **ESLint** (D18) |
| The old v0 env files | delete + new Supabase keys · move out of the folder · leave | **Delete + new keys** (D19) |
| How design questions run | one table per task · one at a time · Claude decides small ones | **One at a time** |
| Where this plan lives | inside tech.md · a new build-plan.md (tech.md moves into build/) · outside the repo | **build-plan.md** |
| Folders: all now, or each with its first file | all now · with the first file | **With the first file** |
| Supabase packages: now or at FS-2 | now · FS-2 | **FS-2** |
| Vercel and the deploy pipeline at QA-1 | at QA-1 · at the end | **At the end, on Lakshay's terms** (tech.md D20) |

**QA-1 closed (2026-10-22):** the app skeleton runs on the Mac (details in Step 1 below).
**Next:** FS-2, starting with "what is a calendar item". Still open: step 0.3 (the Supabase key swap) and the Cache Components question (tech.md D21).

## Direction
```
Foundation             Logic (no screens)           Look              Screens (demo order)        Gate
QA-1 starter app  ->   FS-5 due dates          ->   tokens + 38   ->  FS-3 ... FS-16          ->  PM-16
FS-2 tables + RLS      FS-14 repeating tasks        parts in code                                 then AI (stage 3),
     + auto checks     FS-10 licence warnings                                                     test/release (4),
                       FS-13 factory rules                                                        checkpoint (5)
                       FS-8 CSV parser
```
The base (database walls, automatic checks) comes first, because everything sits on it. The pure rules (same input, same answer) are the riskiest logic and need no design, so they come next and are easy to test. Screens come last and plug into finished logic (tech.md D13).

**Every task:** design questions one at a time (options + a recommendation) → branch `<type>/v1-<slug>` → code and tests → checks pass → merge → docs in the same change → tick the README box.

## Checklist
- [x] FS-1 closed: training project checked and wiped (2026-10-22)
- [ ] Step 0: housekeeping (0.1 and 0.2 done; 0.3 the key swap is open)
- [x] Step 1: QA-1 app skeleton, on the Mac only (2026-10-22)
- [ ] Step 2: FS-2 tables, API shapes, RLS, cross-firm tests, automatic checks
- [ ] Step 3: logic cores FS-5, FS-14, FS-10, FS-13, FS-8
- [ ] Step 4: the look in code (tokens, 38 parts)
- [ ] Step 5: screens FS-3 to FS-16
- [ ] Step 6: gate PM-16

## Step 0: housekeeping (Lakshay by hand, about 10 minutes)
| # | What | Done when |
|---|---|---|
| 0.1 ✓ | Reload VS Code (Cmd+Shift+P → "Developer: Reload Window") so Claude's shell picks up the Node 24 line in `~/.zshrc`. On 2026-10-22 it still showed Node 26.12.1; Node 24.22.1 is installed at `/opt/homebrew/opt/node@24/bin`. Fallback: Claude puts that path first in each command | Claude's `node -v` shows 24.22.1 |
| 0.2 ✓ | Delete `.env.local`, `.env.v0-backend` and `.env.example` from the project folder. Claude never opens them | `ls -a` lists none of them |
| 0.3 | Supabase dashboard → "comply pilot" → API keys: turn off the old keys v0 used, make a new publishable key and a new secret key. The same on "comply-pilot-new" if v0 ever used it. Claude checks Supabase's docs for the screen names first (`UNVERIFIED`) | Old keys disabled, new ones exist; values never in chat |

## Step 1: QA-1, the app skeleton (done 2026-10-22, on the Mac only)
**Changed from the first plan:** Vercel and the deploy pipeline moved to the end of Build (tech.md D20, Lakshay's call). **Branch:** `chore/v1-starter-app`.

What was built: `create-next-app` (checked in the [Next.js docs](https://nextjs.org/docs/app/api-reference/cli/create-next-app), updated 2026-09-29) run in a temporary folder with `--ts --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm`, then copied in. Exact versions pinned (`.npmrc`), `engines` Node 24.x, `.nvmrc`, one starter page ("ComplyPilot" / "Coming soon"), a names-only `.env.example`, `agentRules: false` so `next dev` leaves our AGENTS.md alone (D21). The generator's own AGENTS.md was not copied. Folders arrive with their first file; Supabase packages arrive at FS-2.

Checks that passed: `npm run lint`, `npm run typecheck`, `npm run build`, and `next dev` serving the page.

## Step 2: FS-2, tables, API shapes, RLS and the automatic checks (the big one)
**Done when:** every table has RLS from its first migration, the cross-firm tests pass, and GitHub Actions runs lint, the type check and the tests on every push (criterion 2).

**A. Talk first, one question at a time, before any SQL.** The tech.md builder-check points, in this order: #1 what a calendar item is and its thread · #2 stage and status · #3 how items are stored · #4 overrides · #5 licence facts · #8 accounts · #7 archive · #16 files. A draft table list to react to (not decided): firms, members, consents, clients, client_filings, calendar_items, due_date_overrides, licences, tasks, threads, messages, files, events.

**B. Tooling questions, one at a time.**
- How migrations reach the database. On 2026-10-22, deletes through Claude's Supabase tool were refused 3 times, so `apply_migration` may be refused too. [Recommend: install the Supabase command-line tool, keep SQL files in `supabase/migrations/`, run `supabase db push` (whether it needs Docker is `UNVERIFIED`; try once). Fallback: Lakshay pastes each file into the SQL Editor]
- A throwaway database for the RLS tests on GitHub (ADR 0008). [Recommend: `supabase start` inside GitHub Actions, which has Docker; check the docs first]
- Generated TypeScript types, re-run after each migration.

**C. Build.** Migrations; RLS policies (`TO authenticated` plus a `firm_id` check, never `user_metadata`); `src/lib/supabase/` (as the user, plus a server-only secret-key file); Vitest; `tests/security/` (firm A vs firm B, owner vs owner, every table); the API shapes written in tech.md; the GitHub Actions workflow; Supabase advisors run after each migration.

## Step 3: the logic cores (pure functions with unit tests, no screens)
Each lives in `src/features/<feature>/` with tests beside it, and starts with its own short design talk.
| Task | What it does | Proven by | Data from |
|---|---|---|---|
| FS-5 | Due dates for every ✅ filing, incl. QRMP 22nd/24th by state and March TDS on 30 April | criterion 6 | [due-dates.md](../research/due-dates.md) |
| FS-14 | Next dates for monthly, quarterly and yearly tasks, incl. a task on the 31st in February | criterion 10 | — |
| FS-10 | Licence warnings at 90, 60, 30 days before the apply-by date, Expired, no expiry | criterion 9 | [licences.md](../research/licences.md) |
| FS-13 | Factory answers → suggested licences with sources; "ask your CA" outside Delhi/Haryana | criterion 5 | [applicability-delhi-haryana.md](../research/applicability-delhi-haryana.md) |
| FS-8 | CSV parser and bad-row report (GSTIN dedupe, 1,000 rows, 2 MB) | criterion 3 | [import-formats.md](../research/import-formats.md) |

## Step 4: the look in code (once, at the start of FS-3)
Figma variables → one CSS token file (names as in [design.md](../design/design.md)) · the 38 parts on `05 Components` → `src/components/ui/` (shadcn, restyled) · one Code Connect test call (`UNVERIFIED` on the Education plan) · brand files into `public/`. Question then: CSS-only animation, or also a library? [CSS first]

## Step 5: screens, in demo-story order
FS-3 login, sign-up, consent, invite (criterion 1) → FS-4 clients → FS-8 import screens → FS-6 calendar (criterion 8) → FS-12 owner invite and login (criterion 4) → FS-7 thread and Mark done (criterion 11) → FS-10 licence screens → FS-13 factory questions → FS-14 task screens → FS-11 overrides (criterion 7) → FS-15 reminders (criterion 12) → FS-9 backups and runbook → FS-16 demo data. Each follows tech.md "Figma to code" step 3. **Before FS-3, Lakshay:** 2-Step Verification on the personal Gmail and an app password (into `.env.local` and Vercel only).

## Step 6: gate PM-16, then beyond
**Deploy first (D20):** Lakshay connects the repo on Vercel on his own terms: keys into Vercel's settings, the Seoul function region and private-repo check (both `UNVERIFIED`), Node version. Then the app on a preview link with demo data, every FS task ticked, checks green, Lakshay walks the demo story. Then stage 3 (the AI matcher; eval set and ADR first), stage 4 (E2E, security, speed, monitoring, CA demos) and the checkpoint. Each is planned when it starts.

## Risks
- **Supabase changes through Claude's tool may be refused** (seen 2026-10-22): use migration files and the command-line tool, or the SQL Editor.
- **The free GitHub plan can't block a merge** ([ADR 0010](../../../adr/0010-private-repository.md)): Claude merges only when the checks are green.
- **Node 26 vs 24:** fixed by step 0.1, plus `engines` and `.nvmrc`.
- **Unchecked facts** (Vercel items wait for the deploy, D20): Vercel Seoul and private repos on the free plan, `db push` and Docker, Supabase key screen names. Each is checked at its step and written into tech.md.

## How we check each step
- Step 0: `node -v` = 24.22.1; the env files are gone; a read-only Supabase check shows the project still empty.
- QA-1: lint, type check and build pass locally; the Vercel address shows the page; the pull request has a preview link.
- FS-2: migrations run on training; advisors show no RLS warnings; cross-firm tests pass locally and on GitHub.
- Logic cores: `npx vitest run` passes each criterion's tests.
- Screens: each one is compared with the picture Figma returns; the demo story is walked at PM-16.

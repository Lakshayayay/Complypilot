# v1 — CA Workspace + Licence Tracker

**Status:** Stage 0 (Plan & Research) in progress. Focus, budget and cuts were decided on 2026-09-22. The scope is frozen at the stage 0 gate, after the pilot interviews (v1-PM-9).
**Time budget:** 18 weeks at about 10 hrs/week, so about 180 hours. Target: 28 Sep 2026 → 31 Jan 2027. If a stage runs over, we cut scope, not quality.

## Goal
A CA firm tracks every client's filing deadlines, and every factory client's licences, in one fast grid instead of Excel and memory.

## Why this can win
Client grids are common and cheap: Jamku costs about ₹6,500/yr, Zoho Practice ₹2,950/month. None of the tools we found also tracks a factory client's licences next to its filings. So we aim at CAs whose clients are manufacturers. Details: [research/competitors.md](research/competitors.md).

## Who uses it when it ships
2–3 pilot CA firms (at least 2) whose clients are mostly factories. Everyone in a firm has the same access; v1 has no roles.

## Scope
**In:**
1. Firm sign-up with a privacy notice and consent. Invite colleagues, who all get equal access.
2. Clients: add by hand, or import a CSV file (see [research/import-formats.md](research/import-formats.md)).
3. For each client, choose which filings apply:
   - GST: monthly, QRMP (quarterly returns, monthly tax) or composition
   - TDS
   - PF
   - ESIC
   - income tax: audit or non-audit
4. Due dates are created automatically for each client, using the rules in [research/due-dates.md](research/due-dates.md). When the government extends a date, we change it once and every client updates. We call this an **override date**.
5. **The grid:** every client × every filing for a chosen month.
   - Each cell shows a status: Not started, Waiting on client, Done, Late.
   - You can filter by filing and by status.
6. **Mark a filing done:** add the ARN (the government's acknowledgement number) and the receipt file. The app records who did it and when.
7. **Licence tracker:** each client's licences, from [research/licences.md](research/licences.md).
   - Each licence has a type, number, issuing office, issue date, an **optional** expiry date and the certificate file.
   - Warnings show at 90, 60 and 30 days before expiry, then "Expired". A licence with no expiry date shows "Valid until cancelled".
8. **One AI feature (stage 3):** read a GST registration certificate PDF and fill in the client's details. A person checks them before anything is saved.

**Out (and where each item goes):**
| Item | Goes to |
|---|---|
| Staff roles and assigning clients to staff | Backlog |
| Importing Tally/Winman files directly (needs sample files) | Backlog |
| WhatsApp document requests and receipts; reminders | v2 |
| Owner login, health score, owner alerts | v3 |
| Working out which licences a factory needs, state by state | v3 |
| Live filing status from government portals | Backlog |
| Billing | Backlog |

## Success metric
At least 2 pilot firms track one real filing month in ComplyPilot: the returns due in January 2027. At least 80% of that month's filings for their clients are marked in ComplyPilot.

## Acceptance criteria
Each check is proven by a test or a count. All of them must pass at the checkpoint.
1. **Sign-up:**
   - A new firm signs up and accepts the privacy notice. We store who accepted, when, and which version.
   - The firm invites a colleague, who logs in and sees the same clients.
2. **Separation:** a user in firm A can't read or change any row or file belonging to firm B. Automated tests try this on every table and every file link.
3. **Import:** a 100-row CSV with 5 bad rows saves 95 clients, and lists the 5 bad rows with row number and reason.
4. **Due dates:** unit tests show the engine gives the official date for every filing in due-dates.md, including the QRMP 22nd/24th split by state and the March TDS payment (due 30 April).
5. **Override:** changing one due date updates it for every affected client in the grid.
6. **Speed:** the grid with 100 clients × all filings opens in under 2 seconds on normal broadband, and filtering takes under 0.5 seconds.
7. **Mark done:**
   - Saves the ARN, the receipt (PDF/JPG/PNG, max 10 MB), who did it and when.
   - The receipt opens only for users of the same firm.
8. **Licences:** tests at the boundaries: 90, 60, 30 and 0 days left, plus "no expiry date". Each shows the right warning.
9. **Privacy:** a firm can export everything about one client (data + files) and delete it completely.
10. **AI:**
    - At least 90% of fields are correct on the eval set (the fixed set of 20–30 certificates we test against).
    - Every filled-in field shows the text it came from.
    - Nothing is saved until a person confirms.
11. **Release:**
    - Every change to `main` deploys automatically once the checks pass.
    - Daily backups, and one test restore done.
    - Error alerts reach Lakshay.
12. **Pilots:** the success metric is met.

## Stages and tasks
Tracks: [PM] product · [UX] design · [FS] full-stack · [AI] AI and data · [QA] testing and release. "Done when" is the check that closes each task.

### Stage 0: Plan & Research [PM] · weeks 1–2 (28 Sep – 11 Oct)
| ID | Task | Output | Done when |
|---|---|---|---|
| v1-PM-1 | Competitor research | research/competitors.md | First draft done 22 Sep; reviewed at the gate |
| v1-PM-2 | Due-date research | research/due-dates.md | Same; ⚠️ rows re-checked in v1-FS-5 |
| v1-PM-3 | Licence research | research/licences.md | Same |
| v1-PM-4 | Privacy (DPDP) research | research/privacy.md | Same |
| v1-PM-5 | Import format research | research/import-formats.md | Same |
| v1-PM-6 | Find pilots: ask your 1–2 contacts to introduce 2 more CA firms with factory clients. Write a 30-minute interview script | research/pilots.md (firm initials only) | 3 firms have agreed to talk |
| v1-PM-7 | Interview the pilots: how they track filings today, which filings and licences matter, how many clients they have, whether they'd use v1 for January 2027. Collect their tracking sheet with private details removed | research/pilots.md | At least 2 interviews written up |
| v1-PM-8 | Long-lead: start WhatsApp Business verification for v2 (⚠️ may need a registered business) | Note in ROADMAP | Application sent, or the blocker written down |
| v1-PM-9 | **Gate:** freeze the scope, filing list, licence list, AI feature and acceptance criteria; draft the data-processing terms | This file | Lakshay approves |

### Stage 1: Design [UX] · weeks 3–4 (12–25 Oct) → `design.md`
| ID | Task | Output | Done when |
|---|---|---|---|
| v1-UX-1 | "Learn first" notes and the user flows: sign-up → import → monthly work in the grid → mark done → licence warning | design.md | Every in-scope item has a flow |
| v1-UX-2 | Screen list and wireframes (rough layouts) for about 7 screens: login/sign-up, grid, client page, import, mark-done panel, licences due soon, settings (invite + override dates) | design.md + Figma | Every step of every flow has a screen |
| v1-UX-3 | Design basics: colours, fonts, spacing, table, buttons, status chips. Status is never shown by colour alone | design.md | Text contrast passes WCAG AA (the standard readability check) |
| v1-UX-4 | High-fidelity grid and mark-done screens; a 20-minute test with one pilot | Figma + notes | The pilot finds a GSTR-3B and marks it done without help |
| v1-PM-10 | **Gate:** re-check the hour estimate against the 18 weeks; cut scope if needed | This file | Lakshay approves |

### Stage 2: Build [FS] · weeks 5–13 (26 Oct – 27 Dec) → `tech.md`
Order matters: the deploy pipeline comes first, and privacy is done before pilots enter real data.
| ID | Task | Output | Done when |
|---|---|---|---|
| v1-FS-1 | Choose the stack, one ADR each: app framework; database, login and file storage; hosting; data region (India if possible). Also decide whether to reuse or reset the old Supabase project | docs/adr/0003+ | ADRs accepted |
| v1-QA-1 | Deploy pipeline: CI (automatic checks on every change: lint, type check, unit tests), preview deploys, production deploys from `main`, error tracking | CI config | A starter page deploys by itself |
| v1-FS-2 | Data structure, API shapes (what the server sends and receives) and RLS rules (database rules that keep firms apart), with tests | tech.md | Shapes agreed; cross-firm tests pass |
| v1-FS-3 | Login, firm sign-up, invite a colleague, store consent | Code + tests | Criterion 1 |
| v1-FS-4 | Clients: add, edit, archive; choose the filings that apply | Code + tests | Client form saves and shows |
| v1-FS-5 | Due-date engine: first confirm every ⚠️ row on the official text, then write it as a pure function (same inputs → same answer) | Code + unit tests | Criterion 4 |
| v1-FS-6 | The grid | Code + tests | Criterion 6 |
| v1-FS-7 | Mark done + receipt upload to private storage | Code + tests | Criterion 7 |
| v1-FS-8 | CSV import with a report of bad rows | Code + parser tests | Criterion 3 |
| v1-FS-9 | Privacy: export and delete a client; backups on; breach runbook | Code + tech.md | Criterion 9 |
| v1-QA-2 | Pilot early access (week 11, about 7 Dec), once FS-3 to FS-9 run in production | Feedback notes | 2 firms have added their clients |
| v1-FS-10 | Licence tracker + "due soon" list | Code + threshold tests | Criterion 8 |
| v1-FS-11 | Override dates (settings screen) | Code + tests | Criterion 5 |

### Stage 3: Intelligence [AI] · weeks 14–15 (28 Dec – 10 Jan) → `ai.md`
| ID | Task | Output | Done when |
|---|---|---|---|
| v1-AI-1 | "Learn first" notes. Check the data is clean (Google's Rules of ML #1–4). Pick the numbers we watch, e.g. share of filings done on time, import error rate | ai.md | The numbers can be read with one query |
| v1-AI-2 | Eval set: 20–30 GST registration certificates with their correct answers, from pilots with consent. Files that contain personal data stay out of git | ai.md | Answers double-checked |
| v1-AI-3 | The reader: PDF → legal name, trade name, GSTIN, address, state, registration date, type. Each field shows its source text, and a person confirms. It's a new service, so write an ADR first | ADR + code + tests | Works end to end on 3 samples |
| v1-AI-4 | Run the eval. Ship only if at least 90% of fields are right. In production, log how often people confirm or edit | ai.md results | Criterion 10 |

### Stage 4: Test & Release [QA] · weeks 16–17 (11–24 Jan) → `test.md`
| ID | Task | Output | Done when |
|---|---|---|---|
| v1-QA-3 | E2E tests (automated tests that click through the app like a user) for 3 flows: sign-up → add client → mark done; CSV import; licence warning | Tests in CI | They run on every pull request |
| v1-QA-4 | Security checks: cross-firm tests on every table and file link; OWASP Top 10 basics (the standard list of common web security holes); dependency audit; secret scan | test.md checklist | No high-risk issues open |
| v1-QA-5 | Speed test with 200 clients | test.md | Criterion 6 passes with room to spare |
| v1-QA-6 | UAT (user acceptance testing): pilots use v1 for the January filing month; log issues; fix blockers | test.md | Success metric counted |
| v1-QA-7 | Monitoring: uptime check, error alerts, one backup restore | Runbook in test.md | Criterion 11 |

### Stage 5: Checkpoint · week 18 (25–31 Jan) → `review.md`
- [ ] All acceptance criteria pass (review.md links the proof for each one)
- [ ] No unlisted mocks
- [ ] Deployed to production
- [ ] Pilot feedback collected
- [ ] `docs/SYSTEM.md` written
- [ ] Tagged `v1.0.0` + CHANGELOG entry
- [ ] Retro written; ROADMAP updated; v2 planned
- [ ] v1 folder frozen; anything still true moved into SYSTEM.md

## Testing plan
| Level | What it covers | When it's written |
|---|---|---|
| Unit | Due-date engine, CSV parser, GSTIN/PAN checks, licence thresholds | With each FS task |
| Database | RLS: cross-firm read and write blocked on every table; file access | From v1-FS-2, run in CI |
| Integration | API + real database with RLS switched on | From v1-FS-3 |
| E2E | The 3 critical flows | v1-QA-3 |
| AI eval | 20–30 certificates, at least 90% of fields correct | v1-AI-4 |
| UAT | Pilots, on the January filings | v1-QA-2 → QA-6 |

A task is done only when its tests pass in CI. v1 has no money calculations.

## Risks
| Risk | What we do |
|---|---|
| 10 hrs/week is tight (about 180 hrs) | Re-check the estimate at the stage 1 gate (v1-PM-10); cut scope, not quality |
| Due-date rules change (new Income-tax Act, labour codes, extensions) | Check every ⚠️ row in v1-FS-5; override dates; show new and old form names |
| Only 1–2 pilot contacts so far | Start v1-PM-6 in week 1; v1 can ship with 2 firms |
| CTO no longer expires, so the licence tracker may matter less | v1-PM-7 asks pilots which licences they actually chase |
| DPDP privacy law | Build the minimum from privacy.md before pilots (v1-FS-9 before v1-QA-2) |
| The old Supabase project may still hold prototype data | v1-FS-1 decides whether to reuse or reset it |

## Mocks & debt
None. Any `// MOCK:` in the code must be listed here.

# v1 — Shared Compliance Calendar

**Stage:** 1 Design [UX] → [design.md](design.md) (stage 0 approved 2026-10-18). Scope locked 2026-10-17. Any change from here is written down in this file.
**Time:** no deadlines or hour budgets. Progress = the task checklist below.
**Vision and ideas:** [idea.md](../../../idea.md)

## Goal
A CA firm and its factory owners share one compliance calendar. Every filing deadline, licence renewal and task is in one place. Each item has its own thread, where the CA and the owner talk, swap files and mark it done.

## Who it's for
- **Market:** Indian MSMEs with no in-house compliance team. They rely on solo or small CA firms. Our promise: no penalties for missed deadlines.
- **CA side:** a CA firm where everyone has the same access. A solo CA is a firm of one.
- **Owner side:** the CA invites the owner. The owner sees only their own items, can reply, upload files and tick off their own tasks.
- **Data rule:** v1 uses **made-up demo data only**. No real person's data goes in until "export and delete a client" exists (required by DPDP, India's privacy law; see [privacy.md](research/privacy.md)).

## Why this can win
Plain CA trackers are cheap and common (Jamku costs about ₹6,500/yr). Client portals are common too (Jamku, Zoho Practice, TaxDome), and EnvironDesk tracks pollution consents for environmental consultants. None we found puts tax filings and factory licences on one calendar that the CA and the owner both use (re-checked 2026-10-19). Details: [competitors.md](research/competitors.md).

## Features
Tracks: [PM] product · [UX] design · [FS] full-stack · [AI] AI and data · [QA] testing and release.

| # | Feature | Tracks |
|---|---|---|
| F1 | Firm sign-up with privacy notice and consent; invite colleagues | UX · FS |
| F2 | Add clients by hand or import a CSV file (a spreadsheet saved as plain text). Choose which filings apply to each client | UX · FS |
| F3 | Invite the owner; the owner logs in with a link sent to their email | UX · FS |
| F4 | **Factory questions:** about 10 simple questions (what it makes, where, workers, power, boiler, chemicals). Written rules suggest the licences that apply, each with its official source and a short plain-words note for the owner (what it is, which office gives it, where to apply). The CA checks the list before it goes on the calendar. Rules for **Delhi and Haryana** only; anywhere else the CA adds licences by hand, and an unknown case says "ask your CA" | PM · UX · FS |
| F5 | **Due dates** worked out automatically: GST, TDS, PF, ESIC, income tax, MSME Form-1 ([due-dates.md](research/due-dates.md)). **Override dates:** when the government extends a date, change it once and every client updates | PM · FS |
| F6 | **Shared calendar:** the CA sees all clients (by month, with filters); the owner sees only their own | UX · FS |
| F7 | **Licence tracker:** type, number, office, issue date, optional expiry date, certificate file, and an **apply-by date**: expiry minus how early the law wants you to apply (e.g. Delhi factory licence 30 days); the CA can edit it. Warnings at 90, 60 and 30 days before the apply-by date, then "Expired". No expiry date shows "Valid until cancelled" ([licences.md](research/licences.md); reminder days agreed 2026-10-21) | FS |
| F8 | **CA's own tasks**, which can repeat monthly, quarterly or yearly | UX · FS |
| F9 | **Item thread:** each calendar item has one thread with the people on it, messages, files and fixed tags (Need document / Question / Filed). **Mark done** here, with the ARN (the government's acknowledgement number) and the receipt file | UX · FS |
| F10 | **Email reminders** before a due date: one list each morning for the firm, one list each Monday for the owner (agreed 2026-10-21, criterion 12) | FS · QA |
| F11 | **AI factory type matcher:** the owner describes the factory in plain words; AI finds its official pollution category (red/orange/green/white/blue, from CPCB, the central pollution board; blue was added in February 2025, see [pollution-categories.md](research/pollution-categories.md)) and shows the line it matched. The CA confirms | AI · UX |
| F12 | **Demo:** a realistic demo data set and a 5-minute demo story | PM · QA |
| — | **Setup:** auto-deploy, firms can't see each other's data, error alerts, backups | FS · QA |

## Not in v1
| Item | Goes to |
|---|---|
| WhatsApp messages, no-login upload link, AI sorting of documents | v2 |
| Owner health score, document vault, factory questions for more states | v3 |
| Export and delete a client (was FS-9 in privacy.md) | First version with real users |
| Late-fee warning, ROC/MCA company filings, professional tax, CA fee tracking, staff roles | Later |
| Tally/Winman import ([import-formats.md](research/import-formats.md)), government portal data, GST certificate reader, calendar export to phone | Later |

## Done when
No sales goal: v1 is for engineering and a college/competition pitch. v1 is done when:
1. every acceptance criterion below passes,
2. it's live online,
3. the 5-minute demo runs end to end on demo data, and the slides are ready,
4. at least 2 CAs have seen the demo, and their feedback is written in review.md.

## Acceptance criteria
Each one is proven by a test or a check. All must pass at the checkpoint.
1. **Sign-up (F1):** a new firm signs up and accepts the privacy notice. We store who accepted, when, and which version. An invited colleague logs in and sees the same clients.
2. **Separation:** a user in firm A can't read or change anything of firm B's. An owner sees only their own client's items. Automated tests try this on every table and every file link.
3. **Import (F2):** a 100-row CSV with 5 bad rows saves 95 clients and lists the 5 bad rows with row number and reason.
4. **Owner login (F3):** an invited owner logs in with the email link and sees only their own calendar.
5. **Factory questions (F4):** for every test factory in the Delhi/Haryana research file, the rules give the expected licence list. Every suggestion shows its source. Nothing reaches the calendar until the CA confirms. A factory outside Delhi/Haryana gets "ask your CA", not an empty list.
6. **Due dates (F5):** unit tests show the official date for every filing in due-dates.md and MSME Form-1, including the QRMP 22nd/24th split by state and the March TDS payment (due 30 April).
7. **Override (F5):** changing one due date updates it for every affected client.
8. **Speed (F6):** the CA calendar with 100 clients × all filings for a month opens in under 2 seconds; filters respond in under 0.5 seconds.
9. **Licences (F7):** tests at 90, 60 and 30 days before the apply-by date and at expiry, for a licence with a lead time (Delhi factory licence, 30 days) and one without, plus "no expiry date", each show the right warning.
10. **Repeating tasks (F8):** unit tests show the right next dates for monthly, quarterly and yearly tasks, including month ends (a task on the 31st in February).
11. **Thread (F9):** the CA and the owner can post messages and files on an item and set tags. Mark done saves the ARN, the receipt (PDF/JPG/PNG, max 10 MB), who did it and when. Files open only for that firm and that client's owner.
12. **Reminders (F10):** the firm gets one email each morning listing late items and items due in the next 7 days. The owner gets one email each Monday listing their items due in the next 10 days and anything waiting on them, and an email right away when the CA gives them a task. Licences on a reminder day join both lists. Items already marked done never appear.
13. **AI (F11):** the matcher reaches its target on the eval set (a fixed set of test examples with known answers; target agreed in ai.md, draft 90%). Every answer shows the line it matched. Nothing is saved until the CA confirms.
14. **Release:** every change to `main` deploys by itself once checks pass. Daily backups, and one test restore done. Error alerts reach Lakshay.
15. **Demo (F12):** the "Done when" list above is met.

## Tasks by stage
Each task has an ID and a track. Tick the box when its "done when" check passes.

### Stage 0: Plan & Research [PM]
- [x] v1-PM-1 Due-date research → [due-dates.md](research/due-dates.md)
- [x] v1-PM-2 Licence research → [licences.md](research/licences.md)
- [x] v1-PM-3 Competitor research → [competitors.md](research/competitors.md)
- [x] v1-PM-4 Privacy (DPDP) research → [privacy.md](research/privacy.md)
- [x] v1-PM-5 CSV import format → [import-formats.md](research/import-formats.md)
- [x] v1-PM-6 Pilot interview script → [pilots.md](research/pilots.md)
- [x] v1-PM-7 Choose the core workflow and lock the scope (2026-10-17) → this file
- [x] v1-PM-8 Delhi + Haryana licence rules: factory licence (size limits under the OSH Code, the new labour law), fire NOC, boiler, pollution consent, hazardous waste. Include test factories with their expected licence list → research/applicability-delhi-haryana.md. Done when every rule has an official source (rules with no official source are marked ⚠️ and give "ask your CA")
- [x] v1-PM-9 The official CPCB industry category list (5 colours: red, orange, green, white, blue), copied once into research/data/cpcb-categories-2025.csv, and whether Delhi/Haryana change it → research/pollution-categories.md. Done when the list's official source is linked and the count per colour matches CPCB's totals
- [x] v1-PM-10 MSME Form-1 due dates checked on the official MCA site → due-dates.md. Done when marked ✅. Closed as ⚠️ by Lakshay (2026-10-18): the MCA site refuses automated reading; the filing duty is ✅, the two dates are ⚠️ and out of the app until a CA confirms them in the demo calls
- [x] v1-PM-14 Confirm every ⚠️ row in due-dates.md and licences.md on official sites. Good enough, not perfect: a row we can't confirm stays ⚠️ and out of the app. If a site is blocked, a PDF is unreadable, results look stale or sources disagree, stop and ask Lakshay how to go on. Done when every row is ✅ or listed as staying out
- [x] v1-PM-11 **Gate:** Lakshay approves stage 0 (approved 2026-10-18)

### Stage 1: Design [UX] → design.md
- [x] v1-UX-1 "Learn first" notes and user flows: firm sign-up → add clients → invite owner → factory questions → calendar → item thread → mark done. Done when every feature has a flow (approved by Lakshay 2026-10-20)
- [x] v1-UX-2 Screen list and wireframes (rough layouts) for both sides, desktop for the CA and phone for the owner. Done when every step of every flow has a screen (approved by Lakshay 2026-10-20)
- [x] v1-UX-3 Brand and design basics: logo, app icon, favicon, colours, fonts, spacing, status chips. Status is never shown by colour alone. Done when text contrast passes WCAG AA (the standard readability check) and the logo reads at 16 px (brand added 2026-10-19; approved by Lakshay 2026-10-21)
- [ ] v1-UX-4 Detailed calendar and item thread screens; agree the reminder days. Done when Lakshay can walk the demo story on the designs
- [ ] v1-PM-12 **Gate:** Lakshay approves the design

### Stage 2: Build [FS] → tech.md
Before any code, we agree the design together: folder and file structure, how the code is split, naming (see AGENTS.md). The deploy pipeline comes first.
- [ ] v1-FS-1 Choose the stack, one ADR (short decision record) each: app framework; database, login and file storage; hosting; India data region. Decide whether to reuse or reset the old Supabase project
- [ ] v1-QA-1 Deploy pipeline: automatic checks on every change (lint, type check, unit tests), preview deploys, production deploys from `main`, error tracking. Done when a starter page deploys by itself
- [ ] v1-FS-2 Data structure, API shapes (what the server sends and receives) and RLS rules (database rules that keep firms apart), with tests → criterion 2
- [ ] v1-FS-3 Login, firm sign-up, consent, invite colleagues → criterion 1
- [ ] v1-FS-4 Clients: add, edit, archive; choose the filings that apply
- [ ] v1-FS-5 Due-date engine: write the ✅ rows (confirmed in v1-PM-14) as a pure function (same inputs, same answer) → criterion 6
- [ ] v1-FS-6 Shared calendar, CA view and owner view → criterion 8
- [ ] v1-FS-7 Item thread: messages, tags, files in private storage, mark done with ARN and receipt → criterion 11
- [ ] v1-FS-8 CSV import with a report of bad rows → criterion 3
- [ ] v1-FS-9 Backups on, breach runbook (what to do if data leaks), demo data only guard
- [ ] v1-FS-10 Licence tracker and "due soon" list → criterion 9
- [ ] v1-FS-11 Override dates (settings screen) → criterion 7
- [ ] v1-FS-12 Invite owner and email login → criterion 4
- [ ] v1-FS-13 Factory questions and licence rules for Delhi/Haryana, CA confirms → criterion 5
- [ ] v1-FS-14 CA's own repeating tasks → criterion 10
- [ ] v1-FS-15 Email reminders → criterion 12
- [ ] v1-FS-16 Demo data set: sample firms, factories, owners and threads

### Stage 3: Intelligence [AI] → ai.md
- [ ] v1-AI-1 "Learn first" notes. Check the data is clean. Pick the numbers we watch, e.g. how often the CA accepts or changes a suggestion
- [ ] v1-AI-2 Eval set: plain-words factory descriptions with the correct category, built from the official CPCB list. Agree the target score
- [ ] v1-AI-3 The matcher: plain words → category, showing the matched line; the CA confirms. It's a new service, so write an ADR first
- [ ] v1-AI-4 Run the eval and ship only if it reaches the target → criterion 13

### Stage 4: Test & Release [QA] → test.md
- [ ] v1-QA-2 E2E tests (automated tests that click through the app like a user) for 3 flows: sign-up → add client → mark done; CSV import; owner reply in a thread
- [ ] v1-QA-3 Security checks: cross-firm and cross-owner tests on every table and file link; OWASP Top 10 basics (the standard list of common web security holes); dependency audit; secret scan
- [ ] v1-QA-4 Speed test with 200 clients → criterion 8 with room to spare
- [ ] v1-QA-5 Monitoring: uptime check, error alerts, one backup restore → criterion 14
- [ ] v1-PM-15 Re-check the licence rules and due dates on their official sources just before the demo (rules change, e.g. Haryana's labour rules were still a draft in May 2026). Done when every "checked on" date is refreshed
- [ ] v1-PM-13 Pitch: 5-minute demo script and slides
- [ ] v1-QA-6 Show the demo to 2 CAs and write down their feedback

### Stage 5: Checkpoint → review.md
- [ ] All acceptance criteria pass (review.md links the proof for each)
- [ ] No unlisted mocks
- [ ] Deployed to production
- [ ] Demo feedback from 2 CAs collected
- [ ] `docs/SYSTEM.md` written
- [ ] Tagged `v1.0.0` + CHANGELOG entry
- [ ] Retro written; v2 planned
- [ ] v1 folder frozen; anything still true moved into SYSTEM.md

## Testing plan
| Level | What it covers | When it's written |
|---|---|---|
| Unit | Due-date engine, licence rules, licence warnings, repeating tasks, CSV parser, GSTIN/PAN checks | With each FS task |
| Database | RLS: cross-firm and cross-owner access blocked on every table and file | From v1-FS-2, runs on every change |
| Integration | API + real database with RLS on | From v1-FS-3 |
| E2E | The 3 critical flows | v1-QA-2 |
| AI eval | The factory type matcher against the eval set | v1-AI-4 |

A task is done only when its tests pass. v1 has no money calculations.

## Risks
| Risk | What we do |
|---|---|
| A licence rule is wrong, so an owner thinks they're safe | Every rule links its official source; the CA confirms; unit tests; unknown cases say "ask your CA" |
| Haryana is new research | v1-PM-8 must finish before v1-FS-13 starts (done; its ⚠️ rules say "ask your CA") |
| Delhi and Haryana use different pollution lists (Delhi's own 4-colour list vs CPCB's 5-colour list) | Decided 2026-10-18: Delhi → Delhi's list, Haryana → CPCB's list ([pollution-categories.md](research/pollution-categories.md)); the eval set (v1-AI-2) must cover both |
| Official sources disagree on the factory size limit (Delhi's labour page: 10/20 workers; OSH Code and PIB: 20/40) | Workers in the grey band give "ask your CA" ([applicability-delhi-haryana.md](research/applicability-delhi-haryana.md), rule FL-2) |
| No time limit, so scope keeps growing | Scope is locked; new ideas go to idea.md |
| Owners ignore email | WhatsApp comes in v2; ask about it in the CA demos |
| Due-date rules change (new Income-tax Act, labour codes, extensions) | Confirm every ⚠️ row in v1-PM-14; re-check before the demo (v1-PM-15); override dates; show new and old form names |
| CTO (pollution consent to run) no longer expires | The licence tracker allows "no expiry date" |
| Solo developer and student | One task at a time; cut scope, not quality |
| The old Supabase project may still hold prototype data | v1-FS-1 decides whether to reuse or reset it |

## Mocks & debt
None. Any `// MOCK:` in the code must be listed here.

# v1 design: stage-wise plan

Snapshot 2026-10-20. Written in plain words on purpose. The authority for scope is the [v1 plan](context/docs/versions/v1/README.md); for the design work it is [design.md](context/docs/versions/v1/design.md). If they disagree with this file, stop and ask Lakshay.

## 1. The plan at a glance
Every version goes through the same six stages. The next stage starts only after Lakshay approves the gate of the one before.
| Stage | Track | Makes | Status |
|---|---|---|---|
| 0 Plan and research | PM | v1 plan, research files | **Done**, approved 2026-10-18 (gate v1-PM-11) |
| **1 Design** | UX | design.md, Figma file, FigJam flows | **In progress** (this folder) |
| 2 Build | FS | tech.md, the app | Not started. Stack decided by ADRs (short decision records) first |
| 3 Intelligence | AI | ai.md, the factory type matcher | Not started |
| 4 Test and release | QA | test.md, E2E tests, deploy, 2 CA demos | Not started |
| 5 Checkpoint | | review.md, SYSTEM.md, tag v1.0.0, retro | Not started |

## 2. Stage 1 in detail
Task IDs are from the v1 plan. "Done when" is the plan's own check.
| Phase | Task | What it makes | Where | Done when | Status |
|---|---|---|---|---|---|
| 0 | (setup docs) | design.md, reference study, competitor re-check | Repo | n/a | **Done** 2026-10-19 |
| 1 | (setup) | Drawing test, 7 Figma pages, References board (26 windows), font and library check, ID ledger | Figma | Pages exist; fonts listed | **Done** 2026-10-19 |
| 2 | **v1-UX-1** | User flows, demo story outline, edge cases | flows.md, FigJam | Every feature has a flow | **Drawn** 2026-10-19. **Waiting for Lakshay's review** |
| 3 | **v1-UX-2** | The app's map, screen list, grey wireframes (desktop for the CA, phone for the owner) | design.md, Figma `02 Wireframes` | Every step of every flow has a screen | Not started |
| 4 | **v1-UX-3** | Brand and design basics: logo, app icon, favicon, colours, fonts, spacing, status chips; variables, styles, components | Figma `03`, `04`, `05` | Text contrast passes WCAG AA; the logo reads at 16 px; status never by colour alone | Not started |
| 5 | **v1-UX-4** | Detailed screens, clickable demo, reminder days agreed | Figma `06 Screens` | Lakshay can walk the demo story on the designs | Not started |
| 5 | **v1-PM-12** | **Gate** | | Lakshay approves the design | Not started |

### Phase 3: UX-2 screens and wireframes
1. **The app's map** (information architecture), drawn in FigJam. CA side menu: Calendar (home), Clients, Licences, Tasks, Settings (firm, team, due-date changes, privacy). Owner tab bar: Home ("what needs me"), Calendar, Licences.
2. **Screen inventory** in design.md. IDs `CA-xx` and `OW-xx`. For each: the flow steps and features it covers, its states, its key content. First guess is about 27 screens, listed in design.md under "UX-2".
3. **Grids:** CA screens 1440 px wide, 12 columns, checked at 1366. Owner screens 390 px wide, 4 columns, checked at 360.
4. **Grey wireframe kit** (local components on `02 Wireframes`): button, input, select, checkbox, text block, table row, calendar cell, side menu, tab bar, chip, card.
5. **Wireframes:** one Figma Section per flow, frames left to right in step order, numbered steps, behaviour notes. Real plain-word copy and made-up Indian demo data. Include empty, error and heavy-data states (a calendar with 100 clients).
6. **Checks:** a self-review against NN/g's 10 usability heuristics (issue, fix table); a script checks every inventory ID has a frame; one screenshot per Section.

### Phase 4: UX-3 brand and design system
1. **Brand interview** with Lakshay, one question at a time: the story and promise · a real CA and owner to picture · 3 words it is and isn't · what "Pilot" means · symbols and colours liked or off-limits · whether owner copy may use Hinglish · the pitch audience and room · domain and trademark check (IP India, with the date).
2. **Three brand directions,** each with a logo idea (its meaning and how it is built), a palette, a font pair and one sample calendar snippet. Lakshay picks one. Checks: the logo reads at 16 px and works in one colour.
3. **Brand accent:** from outside the colours competitors and statuses already use (blue, green, indigo or violet, coral; plus red, amber, green, blue for status). See [design-references.md](context/docs/versions/v1/research/design-references.md).
4. **Fonts:** Hindi-ready pair. Candidates, all available in Figma: IBM Plex Sans + Devanagari, Noto Sans + Devanagari (the Government of India's UX4G uses it), Anek Latin + Devanagari. Tabular numbers (digits of equal width) are set by hand on number styles.
5. **Foundations in Figma:** variable collections Primitives, Color (Light mode only in v1), Spacing (4-point steps), Radius (one system). Each variable gets scopes and a CSS name. Plus text styles, shadow styles, grid styles, and a specimen page with a contrast table computed by script.
6. **Status system:** at most 6 statuses. Each is a word + an icon + a colour. Light background, dark text, not clickable. "Done" stays quiet. A calendar day shows its most urgent status. Must pass a grayscale test.
7. **Components,** in this order: icons (Phosphor SVG) → button → input, select, checkbox, radio → status chip → tag → avatar → file chip → side menu, tab bar, top bar → table row → calendar day cell and item chip → thread message → licence card → licence result row (Required / Not required / Inform / Ask CA, with its source) → step indicator → toast → modal → empty state. At most 30 variants per set.
8. **Brand board** (3×3), logo lockups, app icon and favicon (16/32/180/512). Figma AI images spend credits: ask Lakshay first.

### Phase 5: UX-4 detailed screens and demo
1. **Agree the reminder days.** The standard is 90, 60 and 30 days. Some licences need earlier: Delhi fire certificate renewal about 6 months ahead, Delhi factory licence about 60 days ahead ([licences.md](context/docs/versions/v1/research/licences.md)).
2. **Demo-path screens first,** built from the components, then the rest of the inventory with empty, error and loading states, plus the 100-client stress frame. Check CA screens at 1366, owner screens at 360.
3. **Dev Mode annotations** for behaviour, e.g. "row click opens the thread panel".
4. **Prototype (clickable demo): the demo path only.** About 15 to 20 screens, from the CA calendar to "Mark done". Other screens stay static. A flow start named "Demo".
5. **Design QA** (section 7). Then Lakshay walks the demo from start to "Mark done" → **gate v1-PM-12**.

## 3. Review points (stop and wait for Lakshay)
| # | When | Lakshay decides |
|---|---|---|
| 1 | After the flows | Do the flows and the demo story match the product? |
| 2 | After the map and wireframes | Is every screen there, and is the layout right? |
| 3 | During the brand interview | The answers (live, one question at a time) |
| 4 | After the three brand directions | Which direction |
| 5 | After foundations and components | Approve the look and the building blocks |
| 6 | After the clickable demo | Walks the demo → the gate |
Each review ends the same way: fix what Lakshay says, update design.md and the v1 plan (tick the task), commit docs to `main`, stop for approval.

## 4. Decision log
| Date | Decision |
|---|---|
| 2026-10-18 | Name **ComplyPilot**. Feel: calm, trustworthy, crisp; bold only in brand moments. English now, Hindi-ready fonts, free Google Fonts. Phosphor icons in one style. Light mode only in v1, colours as variables so dark mode can come later. |
| 2026-10-18 | Delhi uses its own pollution list; Haryana uses CPCB's. Workers in the factory-size grey band give "ask your CA". Unconfirmed rows stay ⚠️ and out of the app. |
| 2026-10-19 | Order of stage 1: flows → wireframes → brand and basics → detailed screens (the README order). Brand work is part of UX-3. |
| 2026-10-19 | One Figma design file with 7 pages, plus one FigJam board for the flows. |
| 2026-10-19 | Prototype: the demo path only. |
| 2026-10-19 | The real app (stage 2) is built from this Figma file through the Figma MCP. |
| 2026-10-19 | **Login:** CA staff and owners both sign in with an email link. No passwords. |
| 2026-10-19 | **Factory questions:** the owner answers on the phone; the CA can fill them in or correct them on the desktop. |
| 2026-10-19 | **Before the CA checks,** the owner sees "Your CA will check". Licences reach the owner's calendar only after the CA confirms. |
| 2026-10-19 | **The owner ticks off only tasks the CA gives them.** Filings and licences are marked done by the CA (ARN and receipt). The owner can upload a new certificate in the thread. |
| 2026-10-20 | The stray line on the Figma `Cover` page was deleted. Lakshay saves a named version by hand later, before the wireframes. |

## 5. Traceability: feature → flow → screen
Screens and components are filled in as phases 3 to 5 finish.
| Feature | Flows ([flows.md](context/docs/versions/v1/flows.md)) | Screens | Components |
|---|---|---|---|
| F1 Firm sign-up, consent, colleagues | F-01, F-02 | UX-2 | UX-3 |
| F2 Clients, CSV import, filings | F-03 | UX-2 | UX-3 |
| F3 Invite the owner, email-link login | F-04, F-01 | UX-2 | UX-3 |
| F4 Factory questions, licence rules | F-05 | UX-2 | UX-3 |
| F5 Due dates, override dates | F-03, F-11 | UX-2 | UX-3 |
| F6 Shared calendar | F-06 | UX-2 | UX-3 |
| F7 Licence tracker | F-07 | UX-2 | UX-3 |
| F8 CA's repeating tasks | F-08 | UX-2 | UX-3 |
| F9 Item thread, Mark done | F-09 | UX-2 | UX-3 |
| F10 Email reminders | F-10 | UX-2 (reminder emails) | UX-3 |
| F11 AI factory type matcher | F-05 | UX-2 | UX-3 |
| F12 Demo | F-12 and the demo story | UX-4 | UX-3 |

## 6. Deliverables register
| Deliverable | Where | Status |
|---|---|---|
| Stage 1 doc | `context/docs/versions/v1/design.md` | Started; grows each phase |
| User flows (text) | `context/docs/versions/v1/flows.md` | Done, waiting for review |
| User flows (drawn) | FigJam board "ComplyPilot v1 flows" | Done, waiting for review |
| Reference study | `research/design-references.md`; Figma `01 References` | Done |
| Wireframes | Figma `02 Wireframes` | Not started |
| Brand: logo, app icon, favicon, brand board | Figma `03 Brand` | Not started |
| Variables, text styles, shadows, grids | Figma `04 Foundations` | Not started |
| Components | Figma `05 Components` | Not started |
| Detailed screens, clickable demo | Figma `06 Screens` | Not started |
| Figma ID ledger | `figma-ledger.json` | Kept up to date by whoever draws |

## 7. Quality checks (every phase ends with the ones that apply)
- Every reference has a link and a "checked on" date. Anything unchecked is `UNVERIFIED`.
- **Contrast (WCAG AA):** text 4.5:1; large text (24 px, or about 18.5 px bold) and UI parts 3:1. Computed by script into a table.
- **Never colour alone:** a word or an icon goes with every colour. Grayscale test of the status chips.
- **Tap targets:** at least 44 px on the owner's phone (24 px is the AA minimum).
- **Every screen has its states:** default, empty, error, plus loading where data arrives, plus the heavy-data case.
- **Plain copy:** plain words, realistic Indian demo names, no em-dashes in product copy, no label above every section.
- **Taste pre-flight** on brand moments: one accent, one corner-size system, contrast on every button.
- **Figma read-back by script:** components use variables (no raw hex), every variable has scopes, the font family is right, every inventory ID has a frame.
- **Heuristic pass** (NN/g's 10) on wireframes and screens, as an issue-and-fix table.
- **Motion review table** (Before / After / Why) on every animated moment.
- **Builder check:** a fresh agent reads design.md and lists what it would have to guess. Fix those gaps.
- **Fresh-eyes pass** the next day before asking Lakshay for the gate.

## 8. Motion (Emil Kowalski's design engineering rules, applied)
Source: [animations.dev](https://animations.dev/). Rules: animate by how often people see it; custom curves, not the weak defaults; UI motion under about 300 ms; exits faster than entries; nothing grows from zero size (start near 0.95); pressed buttons shrink to 0.97; keep motion calm for "reduce motion" (fades stay, movement goes).
Curves: ease-out `cubic-bezier(0.23, 1, 0.32, 1)` · in-out `cubic-bezier(0.77, 0, 0.175, 1)` · drawer `cubic-bezier(0.32, 0.72, 0, 1)`.
**Planned motion** (agreed in the plan; confirmed with the prototype in UX-4):
| Moment | Animation | Why |
|---|---|---|
| Calendar paging, filters, hover | None | Done many times a day |
| Button press | Shrinks to 0.97 for about 120 ms | Feedback that the app heard you |
| Thread panel | Slides in 200 ms on the drawer curve; closes in 150 ms | Shows where it came from; exit faster |
| Modal | Fades in from scale 0.96 in 200 ms, ease-out; exits in 150 ms | Nothing appears from nothing |
| Toast | 200 ms in, 150 ms out | Same direction in and out |
| Owner screen push | 250 ms, in-out | Movement on screen |
| **Mark done** | A check mark and the row settling, at most 450 ms; fade only under "reduce motion" | **The one moment of delight** |

## 9. How we work in Figma
**Tools and skills.** Figma's `use_figma` runs small scripts against Figma's Plugin API. Load the matching Figma skill before each kind of call: `figma-use` always; `figma-generate-design` for screens; `figma-generate-library` for variables, styles and components; `figma-generate-diagram` and `figma-use-figjam` for FigJam. Design guidance: ux-principles and wireframing (flows, heuristics), ui-ux-pro-max (palette and font pairs), brandkit and design-taste-frontend (brand moments only), emil-design-eng (motion).
**Procedure.**
- Inspect before writing. Give every layer a fixed, predictable name. Return the IDs from every call and keep them in `figma-ledger.json`.
- One writing call at a time. Reading calls may run side by side.
- Variables, never raw hex. Text styles for text. Auto layout everywhere. Repeated parts are components. Icons are SVG components with an instance-swap setting.
- Name things the way code will: variables get a CSS name (`var(--color-bg-default)`); components and options too (`StatusChip` with `status=overdue`).
- One screenshot per finished view, plus one after a fix.
**Limits and gotchas** (checked 2026-10-19; see [design.md](context/docs/versions/v1/design.md) for sources).
- The Education plan allows 200 MCP calls a day (10 a minute). Aim for 150. Each call returns at most 20 KB. Writing through the MCP is free in beta, paid later.
- `use_figma` can't add images; `upload_assets` does. Images over 4096 px are shrunk, so cut tall screenshots into pieces.
- A page's children look empty until the page is opened; don't conclude a page is empty from a quick read.
- Never move nodes made by the diagram tool; put cards behind them.
- Font styles are file-dependent: Inter writes "Semi Bold", the others "SemiBold".
- The API can't save a named version or switch on tabular numbers. Lakshay does these by hand.
**Names in use.** Pages: `Cover`, `01 References`, `02 Wireframes`, `03 Brand`, `04 Foundations`, `05 Components`, `06 Screens`. Frames on the References page: `References board`, `ref-row/<n>`, `ref/<image>`. Flows: FigJam cards `F-01` to `F-12`.

## 10. Risks and open questions
| Item | What we do |
|---|---|
| Writing to Figma through the MCP is beta; it may become paid | Keep the Figma file as the source for design; keep flows as text in the repo |
| Code Connect (links Figma parts to code) is `UNVERIFIED` on the Education plan | Check in stage 2; fall back to a mapping table in tech.md |
| A licence rule is wrong and an owner thinks they are safe | Every result screen shows its source; "Ask your CA" is a real result; nothing reaches the calendar until the CA confirms |
| Some due dates and licence facts are ⚠️ (not confirmed) | They stay out of the app; screens must not show them as fact |
| Delhi fire certificate validity: two official sources disagree | Reminder days and copy for that licence follow what Lakshay agrees in UX-4 |
| Two agents writing to Figma at once | One writer per file at a time |
| Scope grows | Scope is locked; new ideas go to idea.md |
| Open: reminder days, brand answers, trademark check, a named version of the design file (Lakshay, by hand) | Raised at the matching phase |

## 11. After the gate: stage 2 (build)
The real app is built from the Figma file through the Figma MCP. So during design:
- Every variable has a CSS name, so stage 2 can read them (`get_variable_defs`) and make the token file once.
- Components are named like code; frames use auto layout, so generated layouts are flexible, not fixed positions.
- Behaviour notes are Dev Mode annotations. Lakshay marks finished screens "Ready for dev" by hand.
- Stage 2 builds screen by screen with `get_design_context` (skill `figma-design-to-code`), then compares the running app with the Figma screenshot at 1440 and 390 px.
- Before any code: agree the data shapes and API first, then folders, files and naming, then record the stack in ADRs. Every table must keep one firm's data from another (Postgres row-level security). Tasks for stages 2 to 5 are in the [v1 plan](context/docs/versions/v1/README.md).

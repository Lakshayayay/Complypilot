# v1 Design (stage 1)

**Stage:** 1 Design [UX], started 2026-10-19. **Tasks:** UX-1 to UX-4 and the gate PM-12, in the [README](README.md). **Study:** [design-references.md](research/design-references.md).
**Figma:** design file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) · FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh) · **Flows:** [flows.md](flows.md).

## Learn first
New ideas this stage uses. All sources opened 2026-10-19.
| Idea | What it is, simply | Why we need it | What we give up | Source |
|---|---|---|---|---|
| User flow | The steps a person takes to finish one task, e.g. sign up → add a client | Shows every screen we need before we draw any | Time before anything looks "real" | [NN/g: User Journeys vs. User Flows](https://www.nngroup.com/articles/user-journeys-vs-user-flows/) (Kaplan, 2023) |
| Mermaid | A way to write a diagram as plain text (`A --> B`) that a tool then draws | The flows live as text in this file; FigJam draws them from it | Less control over how the picture is laid out | [Mermaid: Flowcharts syntax](https://mermaid.js.org/syntax/flowchart.html) |
| Wireframe | "A skeletal outline of a design layout": grey boxes and real labels, no colour or brand | Fix the layout cheaply, before any styling | It doesn't show the final look | [NN/g: UX Deliverables Glossary](https://www.nngroup.com/articles/ux-deliverables-glossary/) (2024) |
| Usability heuristics | 10 rules of thumb for checking a design, e.g. "Visibility of system status" | A quick self-check of the wireframes | Rules of thumb, not tests with real users | [NN/g: 10 Usability Heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/) (Nielsen, reviewed 2024-01-30) |
| Variables (design tokens) | Named values, e.g. `color/text/default`, used instead of typing the value each time | Change a colour once and it changes everywhere; the code later uses the same names | Naming takes thought up front | [Figma: Guide to variables](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma) |
| Component, instance, variant | A component is a reusable part (e.g. a button). An instance is a linked copy of it. Variants are its versions (primary, secondary…) kept in one set | Screens look the same everywhere and update together | Parts must be built before screens | [Figma: Guide to components](https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma) · [Create and use variants](https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants) |
| Auto layout | A frame that places its children by rules (direction, gap, padding) and resizes by itself | Screens survive text changes; code made from them gets real layouts | A little setup per frame | [Figma: Guide to auto layout](https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout) |
| Contrast (WCAG AA) | How much text stands out from its background, as a ratio. Text ≥ 4.5:1; large text (24 px, or about 18.5 px bold) ≥ 3:1; buttons, borders and icons ≥ 3:1 | People with weak eyesight, or a phone in sunlight, can still read it | Some pale colours are not allowed | W3C WCAG 2.2: [1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) · [1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |
| Never colour alone | Colour is never the only sign of meaning; a word or an icon goes with it | Colour-blind users, and grey printouts, still tell statuses apart | Chips need a little more room | [W3C WCAG 2.2: 1.4.1](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html) |
| Target size | Anything you tap is at least 24 × 24 px (AA). On the owner's phone we aim for 44 px | Big fingers, small phones | Fewer items fit on a phone screen | [W3C WCAG 2.2: 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) |
| Prototype | Screens linked so a click moves to the next one, like the real app | We can walk the demo story before any code | Only the demo path clicks | [Figma: Guide to prototyping](https://help.figma.com/hc/en-us/articles/360040314193-Guide-to-prototyping-in-Figma) |
| Figma MCP | A connection that lets Claude read and change the Figma file through small scripts | Claude draws the design now and turns it into code in stage 2 | In beta: free now, paid later; about 200 calls a day | [Figma: write to canvas](https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/) · [rate limits](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/) |

## Decisions so far
| Date | Decision |
|---|---|
| 2026-10-18 | Name **ComplyPilot**. Feel: **calm, trustworthy, crisp**, and **bold only in brand moments** (logo board, sign-up, empty screens, "Done", pitch). |
| 2026-10-18 | English now, **Hindi-ready fonts**, free Google Fonts. **Phosphor** icons, in one style only. |
| 2026-10-18 | The brand kit is the app's look plus a **logo, app icon and favicon**. |
| 2026-10-18 | Claude's calls, which Lakshay can change: light mode only in v1, with colours stored as variables so dark mode can come later. CA screens 1440 px wide, checked at 1366. Owner screens 390 px. Reference screenshots kept out of git. |
| 2026-10-19 | **Order:** flows → grey wireframes → brand and basics → detailed screens (the README order). |
| 2026-10-19 | The brand work is part of UX-3, not a new task. |
| 2026-10-19 | **One Figma design file with 7 pages, plus one FigJam board** for the flows. |
| 2026-10-19 | **Prototype: the demo path only.** The other screens stay static. |
| 2026-10-19 | **The real app (stage 2) is built from this Figma file through the Figma MCP.** |
| 2026-10-19 | **Login:** CA staff and owners both sign in with an email link. No passwords. |
| 2026-10-19 | **Factory questions:** the owner answers on the phone; the CA can fill them in or correct them on the desktop. |
| 2026-10-19 | **Before the CA checks,** the owner sees "Your CA will check". Licences reach the owner's calendar only after the CA confirms. |
| 2026-10-19 | **The owner ticks off only tasks the CA gives them.** Filings and licences are marked done by the CA (ARN and receipt). The owner can upload a new certificate in the thread. |
| 2026-10-20 | **Odoo is the main design reference** (colours, elements; a formal app with quirky brand moments). Tally and Winman add CA-style density and shortcuts. A light touch: guides, not rules, and new references can join any time. |
| 2026-10-20 | **Brand picked (review point 4):** direction C's colours and type (mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin + Anek Devanagari) with direction B's logo (a calendar page with a tick), all mulberry with a white tick. Teal stays in the app, not in the logo. The three explorations stay on `03 Brand`, labelled "not picked". |
| 2026-10-20 | **Status words approved** (10 statuses, table in UX-3) and **icons: Phosphor Bold**, one weight everywhere (Lakshay). |
| 2026-10-20 | **Vision: a modern look** (rounder corners, soft floating shadows, gentle animations), applied in a **polish pass in UX-4**. Today's base stays until then. Corners are `Radius` variables and shadows are effect styles (with `shadow/float`), so the change is a value edit, not a redraw. Motion keeps the agreed rules (≤ 200 ms for frequent actions, ease-out, "reduce motion"), and the brand's "isn't" words still apply: no glow, no gradients, no animation everywhere. |
| 2026-10-20 | **Flows approved** (UX-1). **App map, as in the flows:** CA side menu Calendar (home) · Clients · Licences · Tasks · Settings (Firm, Team, Due-date changes, Privacy); an item opens its thread as a side panel. Owner bottom tabs Home ("What needs me") · Calendar · Licences; an item opens its thread full screen. The owner side is a phone web app opened from the email link ([idea.md](../../../idea.md): "Mobile-First Web App"), not an app-store app. |

## Design read
From the design-taste-frontend skill: "Reading this as **a work tool for small Indian CA firms (desktop, dense) plus a phone companion for factory owners**, with a **calm, trust-first, crisp** language, leaning toward **Carbon-style data patterns and GOV.UK/UX4G plain-word status rules**. It's bold only in brand moments."
| Surface | Variance (how unusual the layout) | Motion | Density |
|---|---|---|---|
| CA desktop app | 3 | 2 | 7 |
| Owner phone app | 3 | 3 | 4 |
| Brand moments | 6 | 5 | 3 |

## How the design skills are used
| Skill | Where | Rules we adopt |
|---|---|---|
| ux-principles, wireframing | Flows, wireframes, the heuristic check | Flows before screens; every flow step gets a screen |
| ui-ux-pro-max | Palette and font-pair search | Only candidates that pass the contrast checks |
| brandkit | Brand strategy, logo, brand board | Strategy before visuals. The logo comes from one meaning and reads at 16 px. One palette, little text. A 3×3 board: logo, construction, app use, tagline, colour, type, physical use, image, system detail |
| design-taste-frontend | **Brand moments only** (the skill says it is not for dashboards or tables) | Avoid the "AI look": purple glow, Inter by default, a small label above every section, em-dashes in copy, many accents, mixed corner shapes |
| emil-design-eng | Motion rules and the prototype | Actions done many times a day get no animation, or a very short one: ≤ 200 ms, ease-out. Buttons shrink to 0.97 when pressed. **"Mark done" is the one moment of delight.** Respect "reduce motion" |
| Figma: figma-use + figma-generate-library | Variables, styles, components | Variables, never raw hex. Components with variants. Icons imported as SVG, never redrawn |
| Figma: figma-generate-design | Wireframes and screens | Screens built from our components. One screenshot check per screen. The font family is checked after building |
| Figma: figma-generate-diagram, figma-use-figjam | Flows in FigJam | Simple diagrams; at most 2 redraws per flow |
| Figma: figma-design-to-code | Stage 2 | Code is built from Figma's design data, then compared with the Figma screenshot |

The six non-Figma skills above are "only you can start them" in Lakshay's user settings. For this project they are switched on in `.claude/settings.local.json` (private, not in git; 2026-10-20). design-taste-frontend is listed there by its folder name, `taste-skill`.

## How we work in Figma
**Connection (checked 2026-10-20).** Figma's own Claude Code plugin (`figma@claude-plugins-official`) is installed for Lakshay's whole user account and is connected. His claude.ai Figma connector reaches the same Figma server, and Claude Code connects only once, preferring the plugin ([Claude Code MCP docs](https://code.claude.com/docs/en/mcp)). Don't add a hand-made Figma server: it would hide the plugin.
**Files.** `complypilot` (design file) has 7 pages: `Cover` · `01 References` · `02 Wireframes` · `03 Brand` · `04 Foundations` · `05 Components` · `06 Screens`. `06 Screens` holds the CA desktop and owner phone screens side by side, because a Figma prototype works within one page. The flows live in one FigJam board, drawn from the Mermaid text in this file.
**Rules.**
- Load Figma's skill for the job before every call (table above).
- Look before writing. Every layer gets a fixed, predictable name, and every call returns the IDs it made. The IDs are kept in [figma-ledger.json](figma-ledger.json) (a list from name to Figma ID), so a new chat can pick up where the last one stopped.
- One writing call at a time; reading calls may run side by side.
- Saving a named version before a phase (File → Save to version history) is optional, Lakshay's call. He skips it from 2026-10-20; Figma's own history still keeps changes.
- At most about 150 calls a day, under the limit of 200. One screenshot per finished view, plus one after a fix.
- Colours, spacing and corner sizes come from variables, never typed-in hex codes. Text uses text styles. Frames use auto layout. Repeated parts are components (at most 30 variants per set). Icons are SVG components, swapped with an instance-swap setting.
- Made-up demo data only (the README data rule), with realistic Indian names.
- Every phase ends the same way: screenshots → Lakshay reviews in Figma (comments pasted in chat) → fixes → this file and the README updated → docs commit → stop for approval.

**Limits checked 2026-10-19.** Each call returns at most 20 KB. `use_figma` can't add images; `upload_assets` does ([write to canvas](https://developers.figma.com/docs/figma-mcp-server/write-to-canvas/)). Images over 4096 px are shrunk on upload, so tall screenshots are cut into pieces ([Figma: Add images](https://help.figma.com/hc/en-us/articles/360040028034-Add-images-and-videos-to-designs)). Fonts must be in the Figma account. Tabular numbers (digits of equal width) can't be switched on by script, so Lakshay sets them by hand on the number styles.

## Stage 1 order
| Task | What it makes | Where | Done when |
|---|---|---|---|
| Setup | Pages, a drawing test, a font check, the references page | Figma `Cover`, `01 References` | Pages exist; fonts listed below |
| UX-1 | User flows (Mermaid here, drawn in FigJam) and a 5-minute demo story outline | This file, FigJam | Every feature F1–F12 has a flow |
| UX-2 | Screen list and grey wireframes, CA desktop and owner phone | This file, `02 Wireframes` | Every step of every flow has a screen |
| UX-3 | Brand and basics: logo, app icon, favicon, colours, fonts, spacing, status chips; then variables, styles and components | This file, `03 Brand`, `04 Foundations`, `05 Components` | Text contrast passes AA and the logo reads at 16 px |
| UX-4 | Detailed screens, the demo prototype, agreed reminder days | `06 Screens` | Lakshay walks the demo story on the prototype |
| PM-12 | Gate | | Lakshay approves the design |

## Stage 1 plan: done and remaining
_Updated 2026-10-20 at the wrap-up. Tick a box when its check passes. Figma IDs are in [figma-ledger.json](figma-ledger.json). Review points stop the work until Lakshay answers._

**Setup and UX-1 (done)**
- [x] Setup: 7 Figma pages, References board, fonts, ID ledger (2026-10-19)
- [x] Cover sheet and a brief on pages 02 to 06 (2026-10-20)
- [x] UX-1: 12 flows, demo story, edge cases. Approved by Lakshay (review point 1, 2026-10-20)
- [x] Figma connection checked; six design skills switched on for this project (2026-10-20)

**UX-2 Wireframes (approved by Lakshay 2026-10-20)**
- [x] App map agreed and drawn on the FigJam board
- [x] Screen list and flow coverage: [screens.md](screens.md)
- [x] Grey kit (16 parts) on `02 Wireframes`
- [x] Wireframes for F-01 to F-11: 65 frames, a behaviour note on each
- [x] Checks: flow-coverage script, text audit, heuristic self-check (UX-2 section)
- [x] Lakshay saves a named version in Figma (by hand, 2026-10-20)
- [x] Review point 2: Lakshay approved the wireframes and all 7 proposals (2026-10-20). Feedback "too minimal" → study 2 opens UX-3
- [ ] Optional: one CA looks at the wireframes for 15 minutes
- [x] Tick v1-UX-2 in the README; Cover and brief chips to "Done"; commit

**UX-3 Brand and design basics (started: interview question 1 asked)**
- [x] Study 2 (light, 2026-10-20): Odoo as the main guide, plus Tally and Winman. Basic principles and a few images in [design-references.md](research/design-references.md#study-2-light-odoo-tally-winman). Guides, not rules
- [x] Brand interview, 8 questions, one at a time (review point 3, done 2026-10-20). Answers: UX-3 section below
- [ ] Domain and trademark check (IP India and domains), with the date. Lakshay does it later, by hand (wants complypilot.com)
- [x] Strategy: category, promise, one metaphor (confirmed by Lakshay 2026-10-20)
- [x] 3 brand directions, each with a logo idea, accent colour, font pair and calendar sample. Drawn 2026-10-20 (section `brand-directions` on `03 Brand`; results in UX-3 below). Review point 4 (2026-10-20): C's colours and type with B's logo, drawn as `brand/picked`
- [x] Foundations on `04`: variables (Primitives, Color, Spacing, Radius) with scopes and CSS names; text styles; shadows; grids (2026-10-20)
- [x] Contrast table worked out by script (WCAG AA): 27 pairs, all pass (2026-10-20)
- [x] Status system: at most 6 in one place, each a word + icon + colour; grayscale test; record pairs like "Waiting on owner" / "Needs you" (2026-10-20, `StatusChip`)
- [x] Icons: Phosphor, one weight, as components (Bold 2.1.1, 47 icons, 2026-10-20)
- [x] Components on `05`, in the order listed in UX-3 (38 sets in 5 groups, 2026-10-20)
- [ ] Logo lockups, app icon, favicon (16, 32, 180, 512 px), 3×3 brand board; the logo reads at 16 px and in one colour. Ask before any Figma AI image
- [ ] Lakshay: tabular numbers on the number styles (by hand)
- [ ] Review point 5: Lakshay approves the look and the parts; tick v1-UX-3

**UX-4 Detailed screens and the clickable demo**
- [ ] Agree the reminder days (licences: 90/60/30 plus earlier ones where needed; filings)
- [ ] Demo-path screens first (the 11 demo beats), then the rest with empty, error and loading states and the 100-client frame
- [ ] Apply the UX-4 fixes from the heuristic self-check (UX-2 section)
- [ ] Check CA screens at 1366 px and owner screens at 360 px
- [ ] Behaviour notes as Dev Mode annotations; Lakshay marks finished screens "Ready for dev" (by hand)
- [ ] Clickable demo: demo path only, start point "Demo", agreed motion, motion review table
- [ ] Design QA: every item in "Checks" below; builder check by a fresh helper agent; fresh-eyes pass the next day
- [ ] Gate v1-PM-12: Lakshay walks the 5-minute demo on the prototype; tick UX-4 and PM-12

## Checks
- Every reference has a link and a "checked on" date. Anything unchecked is marked `UNVERIFIED`.
- Every text and background pair passes WCAG AA (4.5:1 text, 3:1 large text and UI parts).
- **Grayscale test** of the status chips: every status is still clear without colour.
- **Taste pre-flight** on brand-moment screens: one accent, one corner-size system, no em-dashes in copy, no label above every section, contrast on every button.
- **Motion review table** (Before / After / Why) for the prototype.
- Figma read-back: components use variables, no raw hex, and the font family is right.
- The logo reads at 16 px and works in one colour.
- **Builder check:** a fresh agent reads this file and lists what it would have to guess.
- Final: Lakshay walks the 5-minute demo on the prototype.

## Ready for building (stage 2)
The real app is built from this Figma file through the MCP. So during design:
- Every variable gets a CSS name (e.g. `var(--color-bg-default)`). Stage 2 reads them to make the token file, so each colour is defined in one place.
- Components and their options are named the way code will name them, e.g. `StatusChip` with `status=overdue`.
- Auto layout everywhere, so the MCP returns flexible layouts, not fixed positions.
- Behaviour notes go on screens as Dev Mode annotations, e.g. "row click opens the thread panel". Lakshay marks finished screens "Ready for dev" by hand.

How stage 2 uses it goes in tech.md. **Code Connect** (links each Figma component to its code version) is `UNVERIFIED` for our Education plan: Figma's [developer docs](https://developers.figma.com/docs/code-connect/) list Professional, Organization and Enterprise, but not Education. If we can't use it, a mapping table in tech.md does the same job.

## Setup (done 2026-10-19)
- **Drawing test passed:** Claude can write to `complypilot`. The 7 pages exist; their IDs are in `figma-ledger.json`.
- **References board** on `01 References`: the 5 lessons and 26 windows from the study, each with its caption and link ([board](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=10-2)). Its colours are typed in by hand, because it's a working page made before the colour variables exist.
- **Fonts in Figma:** all 6 candidates are there (IBM Plex Sans and Plex Sans Devanagari, Noto Sans and Noto Sans Devanagari, Anek Latin and Anek Devanagari), plus Inter. Watch the style names: Inter writes "Semi Bold", the others "SemiBold".
- **Libraries:** none attached. The free kits on offer (Material 3, Simple Design System, Apple's iOS and macOS kits) have no Phosphor icons, so the icons come in as SVGs in UX-3.
- **Cover and page briefs (2026-10-20):** Lakshay's stray "Vector 1" line was deleted at his request. `Cover` now has a sheet (title, status, page index with status chips, decisions so far). Pages `02` to `06` each have a `page-brief` frame: what goes there, the rules, the inputs, done-when, and where we already have content (the first-guess screen list on `02`, the colours already taken on `03`, the component build order on `05`, the demo story on `06`). They are neutral working pages (grey and white, Inter); no brand choice is made. IDs are in `figma-ledger.json`.
- **Figma text lesson:** a wrapping text box can silently become fixed-height after `resize()`, so only its first line shows. Set auto-resize to `HEIGHT` after setting the text, run a repair pass, and check with a fresh `get_screenshot`. A screenshot taken inside the same call that built the layout can be stale.
- **Named version:** Lakshay saves one by hand (File → Save to version history) when we move on, before the wireframes. The API can't do it.

## UX-1 User flows
_Drawn 2026-10-19. **Approved by Lakshay 2026-10-20** on the FigJam board._ The three open questions were settled first (see Decisions so far).
- **12 flows, the demo story and the edge cases:** [flows.md](flows.md). They live in their own file to keep this one under its 400-line limit. The text there is the source.
- **FigJam board:** [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh), with a "Read me" card, then F-01 to F-12 from left to right.
- **Check:** every feature F1–F12 maps to a flow, and every edge case from the research files appears in one (both tables are in flows.md).
- **Lesson for later Figma work:** don't move nodes made by the diagram tool, because their arrows keep their old routes. Place cards behind them instead.

## UX-2 Screens and wireframes
_Drawn 2026-10-20. **Approved by Lakshay 2026-10-20** (review point 2): the journeys and screens are good. Feedback: the look is "too minimal", so study 2 (Odoo, Tally, Winman) opens UX-3, and its patterns go into the UX-3 components and the UX-4 screens._
- **Screen list and flow coverage:** [screens.md](screens.md): 25 desktop screens, 12 phone screens, 7 emails and 21 extra states (65 frames). App map: on the FigJam board, card "App map (UX-2)".
- **Figma:** page `02 Wireframes`. The `wf kit` section holds 16 grey parts (components with text properties). Then one section per flow, F-01 to F-11 (the F-12 demo path reuses their screens). Each frame has a yellow note on its behaviour. IDs are in figma-ledger.json.
- **Check (passed 2026-10-20):** a script read flows.md, screens.md and the Figma frame names. All 138 flow steps are covered: 123 by a screen, 15 are decisions, system steps or outside the app. The 65 frames match the list exactly. A text audit found no clipped text boxes.
- **Exception:** the grey kit uses a few fixed greys instead of variables, like the References page. Wireframes are thrown away after UX-4, and the colour variables only arrive in UX-3.

**Proposals in the wireframes.** All 7 accepted by Lakshay on 2026-10-20.
| # | Proposal | Where | Why |
|---|---|---|---|
| 1 | The firm gets one reminder list each morning, not one email per item | EM-06 | 100 clients would mean hundreds of emails a day |
| 2 | A new client only gets items due from today on | CA-08 | Earlier items were handled before ComplyPilot; adding them would show false "overdue" |
| 3 | In unsure cases the CA sees "You decide" and must choose before confirming; the owner sees "Ask your CA" | CA-13b | Nothing unsure reaches a calendar without the CA's choice |
| 4 | Unconfirmed filings (PF, Forms 140/143/144, MSME Form-1, non-audit ITR) are listed but can't be ticked; the CA tracks them as own tasks for now | CA-08, CA-18 | ⚠️ dates stay out of the app (stage 0) |
| 5 | Working status words: "N days late", Due soon / "N left", Waiting on owner, Upcoming, Done; licences: Expired, Renew soon, Details needed, Valid, Valid until cancelled | All | UX-3 settles the final set (at most 6 in one place), with icons |
| 6 | A licence the CA confirmed but whose certificate isn't in yet shows "Details needed" | CA-16, OW-10 | A state the flows didn't name |
| 7 | "Due this week" outlines the week and lists what is left beside the month | CA-14b | 48 GSTR-3B returns can't fit in one day box |

**Heuristic self-check** ([NN/g's 10 usability heuristics](https://www.nngroup.com/articles/ten-usability-heuristics/), 2026-10-20). Fixes marked UX-4 are made on the detailed screens.
| Heuristic | Issue found | Fix |
|---|---|---|
| 1 Visibility of system status | No loading or saving states yet | UX-4: loading, saving and empty states on the detailed screens |
| 2 Match with the real world | The factory review shows rule codes (FL-1, OSH-1) in "Why" | UX-4: plain reason first; the code moves into the source link |
| 3 User control and freedom | "Mark done" can't be undone | UX-4: "Undo" in the done toast for a short time, and "Edit" on the done banner |
| 4 Consistency and standards | One state, two names: "Waiting on owner" (CA) and "Needs you" (owner) | Keep both (different readers); UX-3 records the pair in the status system |
| 5 Error prevention | "Confirm and add to calendars" commits several licences in one click | UX-4: put the count on the button, e.g. "Confirm 5 licences" |
| 6 Recognition rather than recall | Month boxes show counts, not client names | By design: the panel (CA-14b) and the grid (CA-15) list the clients |
| 7 Flexibility and efficiency | No bulk actions or keyboard shortcuts | Each filing needs its own ARN, so no bulk "done" in v1; shortcuts only if CAs ask in the demos |
| 8 Aesthetic and minimalist design | The client grid (CA-15) is dense | Needed for 100 clients; UX-3's type scale and spacing make it calmer |
| 9 Recognise and recover from errors | None: GSTIN, CSV rows, file type and size each say what to fix | — |
| 10 Help and documentation | Owners get "What it is / Where to apply" (OW-12); CAs get no help on screens | Fine for v1 (CAs know the filings); revisit after the CA demos |

## UX-3 Brand and design basics
_Started 2026-10-20. Brand interview done the same day._
**Brand interview** (review point 3). One question at a time; each answer is written here as soon as it is given. **Done 2026-10-20** (review point 3).
| # | Question | Answer |
|---|---|---|
| 1 | The story and the promise: what one promise does ComplyPilot make? Options offered on 2026-10-20: "No missed deadlines" (the v1 plan's promise: no penalties for missed deadlines) · "One calendar both trust" (the demo's closing line) · "Tax and licences, one place" (the edge over competitors). Lakshay may also write his own | **No missed deadlines** (Lakshay, 2026-10-20) |
| 2 | Picture a real CA and a real owner: who are they? | **CA:** a small firm, one or two partners with 3 to 5 staff, about 100 clients, many of them factories; busy at month-end, chasing owners on WhatsApp. **Owner: both, equally:** a hands-on owner of 45 to 55 (20 to 50 workers in Delhi or Haryana, on the phone and WhatsApp, rarely at a computer) and a next-gen owner of 28 to 35 (at home with UPI and DigiLocker). The owner screens must be big and simple for the first and quick for the second (Lakshay, 2026-10-20) |
| 3 | Three words ComplyPilot is, and three it isn't | **Is:** calm, reliable, a bit playful (formal where work happens, a small smile in brand moments, as Odoo does). **Isn't:** flashy, trendy, gimmicky (no gradients, glow or animation everywhere) (Lakshay, 2026-10-20) |
| 4 | What does "Pilot" mean to you? | **A co-pilot beside you:** it watches the dates and nudges, but the CA stays in charge and confirms (Lakshay, 2026-10-20) |
| 5 | Symbols and colours you like, or want off-limits | **Symbols:** two seats side by side (the CA and the owner, the co-pilot idea) and a date with a tick. **Colours:** in Odoo's spirit (deep muted main colour, teal, warm greys); 3 palettes come with the 3 brand directions and Lakshay picks one at review point 4 (Lakshay, 2026-10-20) |
| 6 | May owner copy use Hinglish (EnvironDesk does)? | **Plain English only** in v1; Hindi can come in a later version (Lakshay, 2026-10-20) |
| 7 | The pitch: who is the audience, and what is the room like? | **A college jury, on a projector:** professors or judges in a classroom or hall, so demo text and statuses must read from the back row (Lakshay, 2026-10-20) |
| 8 | Domain and trademark: names you'd want. Claude then checks IP India and domains, with the date | **complypilot.com.** Lakshay checks the domain and the trademark later, by hand (2026-10-20) |

**Strategy (from the interview; confirmed by Lakshay 2026-10-20):**
- **Category:** a shared compliance calendar for a CA firm and its factory clients. Not an ERP, not a tax engine.
- **Promise:** no missed deadlines.
- **Metaphor:** the co-pilot. Two seats side by side: the CA flies, ComplyPilot watches the dates and calls out what's coming, and the owner sees the same view.
- **Personality:** calm, reliable, a bit playful. Never flashy, trendy or gimmicky.
- **Logo seeds:** two seats side by side; a date with a tick.
- **Readers:** a small CA firm (~100 clients) on a desktop; owners of 45 to 55 and of 28 to 35 on a phone (big and simple, and quick); a college jury on a projector.
- **Font candidates:** IBM Plex Sans + IBM Plex Sans Devanagari · Noto Sans + Noto Sans Devanagari (UX4G uses this pair) · Anek Latin + Anek Devanagari. All are in Figma (setup, 2026-10-19).
- **Brand accent:** Odoo's palette is the main guide: a deep, muted main colour, a teal second colour, greys ([study 2](research/design-references.md#study-2-light-odoo-tally-winman)). Close to its feel, not a copy of its exact plum. Keep it apart from the status colours, and note the colours competitors use ([lesson 4](research/design-references.md#what-we-take-from-it)).
- **Steps:** interview → strategy (category, promise, one metaphor) → 3 logo directions, each with its meaning and construction → Lakshay picks one → colour and a contrast table → type scale (tabular numbers on number styles) → spacing on a 4-point scale, one corner-size system, layout grids (CA 12 columns, owner 4) → status system (at most 6: word + icon + colour) → voice (plain words, no em-dashes, realistic Indian demo names) → motion → variables, styles and components in Figma → 3×3 brand board, logo, app icon, favicon (16/32/180/512).
- **Components** (built in this order): icons → button → input, select, checkbox, radio → status chip → tag → avatar → file chip → side menu, phone tab bar, top bar → table row → calendar day cell and item chip → thread message → licence card → licence result row (Required / Not required / Inform / Ask CA, with its source) → step indicator → toast → modal → empty state.
- **More study, done here:** a 10-heuristic audit of Jamku, Zoho Practice, Karbon and Winman, and phone references at 390 px (e.g. Typeform, a mobile import screen).
- The draft's prompt pack (`figma-prompts.md`) is replaced by drawing through the MCP. Before each Figma task runs, its goal, skills, references, musts and must-nots, frame size and done check are stated in chat.
- `brand-kit.md` is made only if this file nears its 400-line limit.

**Brand directions (drawn 2026-10-20). Picked: C's colours and type with B's logo,** all mulberry with a white tick (review point 4). The picked version is section `brand-picked` at the top of `03 Brand` ([open](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=53-3)): direction C's frame with every mark swapped for B's. Its 16 px mark reads clearly, and it fixes C's one weak point (seats too small below 24 px). Still open: mulberry is about 32° from the "late" red, so phase C checks chips beside the brand colour; if they're confused, the late red moves. The explorations sit below it, labelled "not picked": section `brand-directions` ([open](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=47-2)). IDs are in figma-ledger.json. Each direction is a 1552 px frame with the same 5 blocks: name and meaning, logo (large, with name, at 32 and 16 px, one colour and reversed), colour, type (with a Hindi line), and a CA week-view calendar sample drawn at the real 1440 px width.
| | A "Side by side" | B "Ticked date" | C "Same page" |
|---|---|---|---|
| Logo | Two seats, one a step ahead: plum (the CA) and teal (the owner) | A calendar page with a tick cut out | A calendar page holding the two seats |
| Main / second colour | `#5C3A5E` plum / `#0F7B80` teal | `#0B5C63` petrol teal / `#7A4A6E` muted plum | `#7A2E57` mulberry / `#0E7A79` teal |
| Text / quiet text / page | `#2A2428` / `#675E65` / `#FAF8F7` | `#1D2A2E` / `#52646A` / `#F6F9FA` | `#2B2427` / `#67595F` / `#FBF8F7` |
| Fonts | IBM Plex Sans + Plex Sans Devanagari | Noto Sans + Noto Sans Devanagari | Anek Latin + Anek Devanagari |
| Lowest text ratio · input border | 5.04 · 3.50 | 5.86 · 3.23 | 5.15 · 3.48 |

Status colours are shared by all three: late `#9B1C1C` on `#FCE9E7`, due soon `#6B4200` on `#FDF0D2`, waiting `#1E4E79` on `#E4EEF8`, upcoming `#3F4A50` on `#EAEEF0`, done `#1B6137` with no background (lowest ratio 6.48).
- **Contrast (WCAG AA):** a small script (Python, formula from WCAG 2.2; its black-on-white = 21:1 self-check passed) checked 16 pairs per direction: text needs 4.5:1, input borders 3:1. **All pass.** The script is not kept in the repo; the hex values here are enough to repeat it.
- **Hue** (a colour's place on the colour wheel, in degrees): the nearest competitor colour ([lesson 4](research/design-references.md#what-we-take-from-it)) is 32° away for A (violet and blue), 30° for B (blue) and 34° for C (green). C's mulberry is also about 32° from the "late" red; the chip's word and icon carry the meaning, never colour alone.
- **Logo at 16 px:** B reads clearly. A reads as two seat shapes, but is close to a generic "users" icon. C reads as a calendar with two dots; its seats are too small below about 24 px, so the favicon could drop them. All three work in one colour and reversed.
- **Projector:** the calendar sample rendered at 1024 px wide still shows chip words, dates and client names clearly. 1024 px as a projector width is an assumption (`UNVERIFIED`); a real projector test is optional.
- **Taste pre-flight:** one main and one second colour per direction, corner sizes 6 / 10 / 16 only, no em-dashes in copy, no small label above every section.
- **Sample data:** dates use only ✅ rows of [due-dates.md](research/due-dates.md): GSTR-3B monthly 20 Oct, tax audit report 21 Oct (extended), ESIC 15 Oct (so "5 days late"), GSTR-3B quarterly for Delhi and Haryana 24 Oct, PMT-06 25 Oct. The licence and the two tasks are made-up demo items.
- **Exceptions (like the References page):** these frames use typed-in hex colours (variables come in phase B). The status icons are simple glyphs drawn for this sample (Phosphor icons arrive in phase C). The logo cut-outs are paper-coloured strokes; real cut-out shapes come with the logo files.

**Foundations (phase B, built 2026-10-20).** Figma: `04 Foundations`, frame `foundations-sheet` ([open](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=56-2)). Every colour, gap, corner and text on the sheet is bound to a variable or a style (read-back: 552 bound paints, 0 typed-in; 278 texts, all with a style, all Anek).
| Collection (mode) | What's in it | Scopes | Code name, e.g. |
|---|---|---|---|
| `Primitives` (Default) | 21 raw shades, only the ones in use: `mulberry/50, 500, 700, 800`, `teal/700`, `grey/0, 50, 200, 500, 600, 900`, `red`, `amber`, `blue`, `slate`, `green` (50 and 700; amber 800). New: hover `mulberry/800` `#642647`, focus ring `mulberry/500` `#975C7C` (mixed by script) | none (hidden) | `var(--mulberry-700)` |
| `Color` (Light) | 28 meanings, each pointing to a primitive: `bg/page, surface, subtle, brand, brand-hover`; `text/default, muted, on-brand, brand, link`; `border/default, strong, focus`; `status/<late, soon, waiting, upcoming, done>/<bg, text, icon>` | fills, text or strokes | `var(--color-bg-page)` |
| `Spacing` (Default) | `space/0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64` | gap and padding | `var(--space-16)` |
| `Radius` (Default) | `radius/sm` 6, `md` 10, `lg` 16, `full` 999 | corner radius | `var(--radius-md)` |
- **Contrast:** a script (same WCAG 2.2 formula) checked 27 pairs: every text colour on every background it meets, the two borders, and each status text on its chip and on white. **All pass.** The lowest are `text/link` on `bg/page` 4.87 and `border/strong` on `bg/page` 3.48 (needs 3). The full table is on the sheet.
- **Text styles (17):** CA desktop `ca/caption` 12, `ca/label` 14 Medium, `ca/body` 14, `ca/body-lg` 16, `ca/title-s` 20, `ca/title-m` 24, `ca/title-l` 32; owner phone `owner/body` 16, `owner/label` 16 Medium, `owner/body-lg` 18, `owner/title` 22, `owner/title-l` 28; `demo/heading` 40 (projector); `num/body` 14, `num/title` 24; Hindi `hi/body` 16, `hi/title` 28. Line height 140 to 145% for body text, 115 to 125% for titles.
- **Fact-checks (font files from the official [google/fonts](https://github.com/google/fonts) repo, read by script 2026-10-20):** Anek Latin has tabular numbers (`tnum`), but its default digits have different widths, so **Lakshay turns on tabular numbers by hand on `num/body` and `num/title`** (the API can't). Anek Devanagari's own line height is 171% of the font size (Latin: 110%), so the Hindi styles use 170% and 160%.
- **Shadows:** `shadow/sm` (cards), `shadow/md` (menus, the thread panel), `shadow/lg` (modals), and `shadow/float`, a soft, layered one kept for the UX-4 polish pass.
- **Grids:** `grid/ca-1440` (12 columns, 24 gutter, 32 margin) and `grid/owner-390` (4 columns, 16 gutter, 16 margin). Grid lines show in Figma, not in screenshots.

**Status system and icons (phase C, built 2026-10-20).** Figma: `05 Components`, sections `icons` ([open](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=63-2)) and `status-chip` ([open](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=64-2)).
- **Icons:** [Phosphor](https://github.com/phosphor-icons/phosphor-core) **Bold**, version **2.1.1**, MIT licence (npm registry, checked 2026-10-20). The SVGs came from the pinned package and were imported as shapes, never redrawn. 47 components `Icon/<name>`, 24 px, fill bound to `text/default`; used at 16, 20 or 24 px and recoloured with a Color variable. Screens swap icons through an instance-swap setting.
- **`StatusChip`:** 20 variants, `status` (10) × `size` (`sm` = CA desktop, `ca/label` 14 with a 16 px icon; `md` = owner phone, `owner/label` 16 with a 20 px icon). Colours, gaps, padding and corners all come from variables. Change the text on each instance, e.g. "5 days late". A shared text property was tried, but Figma gives a whole set one default text, so each variant keeps its own word instead.
| `status=` | Word | Colour family | Icon |
|---|---|---|---|
| `late` | "N days late" | late (red) | warning-circle |
| `soon` | Due soon / "N left" | soon (amber) | clock |
| `waiting` | Waiting on owner (CA); **Needs you** (owner) | waiting (blue) | hourglass-medium |
| `upcoming` | Upcoming | upcoming (grey) | calendar-blank |
| `done` | Done (quiet, no background) | done (green) | check-circle |
| `expired` | Expired | late (red) | x-circle |
| `renew` | Renew soon | soon (amber) | arrows-clockwise |
| `details-needed` | Details needed | waiting (blue) | file-arrow-up |
| `valid` | Valid (quiet) | done (green) | seal-check |
| `valid-until-cancelled` | Valid until cancelled (quiet) | done (green) | infinity |
- **Rules (GOV.UK and Carbon, study 1):** a word + an icon + a colour, never colour alone; light background, dark text; not clickable; at most 6 kinds in one place.
- **Checks (frame `status-checks`):** the grayscale test passes (see below)

**Components (phase D, built 2026-10-20).** Figma: `05 Components`, one section per group, each with a review frame that uses the parts as instances. 38 sets; IDs in figma-ledger.json. Each set's description has its code signature, e.g. `<Button variant="primary" size="md" label="Save" />`.
| Group | Sets (variants) |
|---|---|
| 1 Basics | `Button` (24: variant primary, secondary, ghost, danger × size md 40 px, lg 48 px × state default, hover, disabled; `label`, `icon`, `iconLeft`, `focus`) · `Input` (8) · `Select` (8) · `Checkbox` (9) · `Radio` (6) · `Tag` (3) · `Avatar` (6, brand = CA staff, accent = owner) · `FileChip` (3) |
| 2 Navigation | `LogoMark` · `NavItem` (3) · `SideMenu` (240 px, the CA menu) · `PageHeader` (2) · `SearchBar` (search + Filters, Group by, Favourites) · `MenuItem` (6) · `Menu` · `ViewSwitchItem` (2) · `ViewSwitch` · `TabItem` (2) · `PhoneTabBar` · `PhoneHeader` (2) |
| 3 Data | `TableHeaderCell` (2) · `TableCell` (6) · `TableRow` (3) · `CalendarItemChip` (10) · `CalendarDayCell` (5) · `LicenceCard` (6) · `LicenceResultRow` (5) · `StageStep` (3) · `StageBar` |
| 4 Thread | `ThreadMessage` (6: CA or owner message, with a file, internal note, event) · `Composer` (4) · `ChatterPanel` (3 tabs: Messages, Notes, Activity) |
| 5 Feedback | `StepIndicator` (10) · `Toast` (3) · `Banner` (4) · `Modal` (3 sizes) · `EmptyState` (2) |
- **Decided 2026-10-20:** the CA desktop uses the **side menu** from the approved app map; the brand sample's top bar is not used. The page top is `PageHeader`.
- **New tokens for the parts (D0, all AA by script):** primitives `grey/100` `#F3EDEE`, `red/800` `#7F1717`, `overlay/40` (text colour at 40%); meanings `bg/hover`, `bg/disabled`, `bg/danger`, `bg/danger-hover`, `bg/accent` (teal, owner avatars), `bg/overlay`, `text/disabled`, `text/on-danger`, `border/danger`; text style `owner/tab` (14 Medium). Icons gained `check`, `minus` and `circle-notch` (50 in all).
- **Slots** (areas a screen fills with its own content): `Menu` items, `CalendarDayCell` items, `ChatterPanel` thread and `Modal` body.
- **Focus** is a `focus` on/off setting (a 2 px `border/focus` ring), not a variant, so the sets stay under 30 variants.
- **Lessons:** a shared text setting gives every variant one default text, so it is used only where one default fits (`Button` "Button"); elsewhere each variant keeps its own words. A spacing step that isn't in the scale (`space/6`) is silently ignored and leaves 0 padding; the final check now tests every gap and padding.
- **Final check (2026-10-20):** 38 sets and 50 icons: 0 typed-in colours, 0 loose corners, 0 unbound gaps or padding, all 682 texts styled and Anek, every set described. `LogoMark` still has white-stroke cut-outs until phase E.
- **Status-chip checks (frame `status-checks`):** the **grayscale test passes**: under a "Saturation" blend layer, every status is still clear from its word and icon. **Brand next to late passes**: the mulberry button is a solid fill, while late and expired are light chips with dark red text and an icon, so the late red stays as it is. Read-back: 0 typed-in colours (225 bound), all 96 texts styled, all Anek.

## UX-4 Detailed screens and demo
_Not started._ Reminder days to agree: [licences.md](research/licences.md) notes that 90/60/30 days can be too late. The Delhi fire certificate must be renewed 6 months ahead, and the Delhi factory licence about 60 days ahead.

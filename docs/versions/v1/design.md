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
- Before each phase, Lakshay saves a named version (File → Save to version history). The API can't do this.
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
_Not started._ First guess at the screens (about 27), to be checked against the flows:
- **CA, desktop:** sign-up, invite colleagues, clients, add client, CSV import and its bad-row report, client detail, invite owner, factory review and confirm, calendar month, client × filing grid (100 clients), item thread panel, mark done, licence tracker, add licence, CA tasks, override dates, settings, reminder email.
- **Owner, phone:** email login, home, calendar, item thread with upload, factory questions, results (including "ask your CA" and "inform the board"), licence detail, reminder email.
- Wireframes use a small grey kit (button, input, select, checkbox, text block, table row, calendar cell, side menu, phone tab bar, chip, card), real labels and demo data, one Figma section per flow.

## UX-3 Brand and design basics
_Not started._
- **Brand interview** (one question at a time): the story and the promise · a real CA and owner you're picturing · 3 words it is and isn't · what "Pilot" means to you · symbols and colours you like or want off-limits · whether owner copy may use Hinglish (EnvironDesk does) · the pitch audience and room · domain and trademark check (Claude checks IP India, with the date).
- **Font candidates:** IBM Plex Sans + IBM Plex Sans Devanagari · Noto Sans + Noto Sans Devanagari (UX4G uses this pair) · Anek Latin + Anek Devanagari. All are in Figma (setup, 2026-10-19).
- **Brand accent:** outside the colours competitors and status already use ([lesson 4](research/design-references.md#what-we-take-from-it)).
- **Steps:** interview → strategy (category, promise, one metaphor) → 3 logo directions, each with its meaning and construction → Lakshay picks one → colour and a contrast table → type scale (tabular numbers on number styles) → spacing on a 4-point scale, one corner-size system, layout grids (CA 12 columns, owner 4) → status system (at most 6: word + icon + colour) → voice (plain words, no em-dashes, realistic Indian demo names) → motion → variables, styles and components in Figma → 3×3 brand board, logo, app icon, favicon (16/32/180/512).
- **Components** (built in this order): icons → button → input, select, checkbox, radio → status chip → tag → avatar → file chip → side menu, phone tab bar, top bar → table row → calendar day cell and item chip → thread message → licence card → licence result row (Required / Not required / Inform / Ask CA, with its source) → step indicator → toast → modal → empty state.
- **More study, done here:** a 10-heuristic audit of Jamku, Zoho Practice, Karbon and Winman, and phone references at 390 px (e.g. Typeform, a mobile import screen).
- The draft's prompt pack (`figma-prompts.md`) is replaced by drawing through the MCP. Before each Figma task runs, its goal, skills, references, musts and must-nots, frame size and done check are stated in chat.
- `brand-kit.md` is made only if this file nears its 400-line limit.

## UX-4 Detailed screens and demo
_Not started._ Reminder days to agree: [licences.md](research/licences.md) notes that 90/60/30 days can be too late. The Delhi fire certificate must be renewed 6 months ahead, and the Delhi factory licence about 60 days ahead.

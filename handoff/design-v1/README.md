# ComplyPilot v1: handoff

Everything you need to carry on v1 without the chat history: where we are, the plan stage by stage, the decisions, the user flows, the research, and the rules for working with Lakshay and with Figma. **The design (stage 1) is approved and finished; the build (stage 2) has started.**

**Snapshot:** refreshed 2026-10-22, after commit `e28959d` (gate PM-12 passed, stage 2 started, ADR 0011). If a file in `context/` differs from the same file under `docs/` in the repository, `docs/` is right.
**Figma links:** Lakshay gives you these himself. (The file keys are also in `context/docs/versions/v1/design/figma-ledger.json`.)

## The product in one minute
- **ComplyPilot** is a shared compliance calendar between an Indian **CA firm** (chartered accountants) and its **factory-owner clients** (MSMEs, small and medium factories). It sits on top of Tally/Winman. It is not a ledger, a tax engine or an ERP.
- **v1 goal:** the CA and the owner share one calendar. Every filing deadline, licence renewal and task is in one place. Each item has its own thread, where they talk, swap files and mark it done.
- **Who uses it:** the CA on a desktop (dense work tool); the owner on a phone (simple companion, sees only their own items).
- **What makes it different:** tax filings **and** factory licences on one calendar that both sides use. Other tools have client portals; none we found does that ([competitors.md](context/docs/versions/v1/research/competitors.md)).
- **v1 is for engineering and a college pitch, not sales.** It uses made-up demo data only.
- **12 features (F1 to F12)** are listed in [the v1 plan](context/docs/versions/v1/README.md). Scope is locked; new ideas go to [idea.md](context/idea.md), not into v1.

## Where we are
**v1 · Stage 2 (Build) · task FS-1 (setup close-out), then QA-1 (starter app)**

| Stage | State | Gate |
|---|---|---|
| 0 Plan & Research | Done | PM-11 passed 2026-10-18 |
| 1 Design | **Done**: 66 frames in Figma, a clickable demo, notes on every frame | PM-12 passed 2026-10-22, no changes |
| **2 Build** | **Started 2026-10-22** | PM-16 |
| 3 AI | Not started | PM-17 |
| 4 Test & Release | Not started | PM-18 |
| 5 Checkpoint | Not started | PM-19 |

| Inside Build | State |
|---|---|
| Stack and decisions (D1 to D16, ADRs 0001 to 0011) | Agreed |
| FS-1 setup close-out | Nearly done: the Supabase tool is set to the training project, Node 24 is installed. **Left:** wipe the old v0 data in the training project (Lakshay confirms the table list first) |
| QA-1 starter app on Vercel | Next |
| FS-2 tables, API shapes, security rules, tests | After QA-1; starts with "what is a calendar item" |
| Logic cores (due dates, tasks, licences, factory rules, CSV) | After FS-2 |
| Screens | In demo order, from Figma's own design-to-code tool (D14) |

**No application code exists yet.** The next steps and the by-hand list are in [STATUS.md](context/docs/STATUS.md) and [tech.md](context/docs/versions/v1/tech.md).

## Read in this order
1. This file.
2. [context/docs/STATUS.md](context/docs/STATUS.md): the short "where are we" note.
3. [context/docs/versions/v1/README.md](context/docs/versions/v1/README.md): the v1 plan (goal, features, acceptance criteria, tasks by stage).
4. [context/docs/versions/v1/tech.md](context/docs/versions/v1/tech.md): the build stage (decisions, environments, code layout, order of work, Figma to code, "Smooth and subtle"). Decisions in detail: [context/docs/adr/README.md](context/docs/adr/README.md).
5. [context/docs/versions/v1/design/design.md](context/docs/versions/v1/design/design.md): the design stage (concepts, decisions, motion rules). It is finished and frozen. Then [screens.md](context/docs/versions/v1/design/screens.md): the screen list and what each frame shows.
6. [context/docs/versions/v1/design/flows.md](context/docs/versions/v1/design/flows.md): the 12 user flows, the demo story, the edge cases.
7. As needed: the research in [context/docs/versions/v1/research/](context/docs/versions/v1/research/) (see the table below), and [context/AGENTS.md](context/AGENTS.md), the project rules.

## What is in this folder
| Path | What it is |
|---|---|
| `README.md` | This guide |
| `context/AGENTS.md` | The project rules (working agreement, engineering and documentation rules) |
| `context/idea.md` | The vision and ideas log (v1 is drawn from it) |
| `context/README.md` | The repository's own README |
| `context/docs/STATUS.md` | Short status note |
| `context/docs/adr/` | The 11 decision records (ADRs), with an index |
| `context/docs/versions/v1/README.md` | The v1 plan: goal, 12 features, acceptance criteria, tasks for stages 0 to 5, risks |
| `context/docs/versions/v1/tech.md` | The build stage doc |
| `context/docs/versions/v1/design/design.md` | The design stage doc (frozen) |
| `context/docs/versions/v1/design/flows.md` | User flows as text (the source for the FigJam board) |
| `context/docs/versions/v1/design/screens.md` | The 66 frames, which flow step each covers, and what each shows |
| `context/docs/versions/v1/design/figma-ledger.json` | Figma file keys and the IDs of pages and frames |
| `context/docs/versions/v1/research/design-references.md` | The reference study: 16 pages, what we learned, what to avoid |
| `context/docs/versions/v1/research/design-refs/` | The full-page reference screenshots (kept out of git) |
| `context/docs/versions/v1/research/applicability-delhi-haryana.md` | The licence rules behind the factory questions, with 9 test factories |
| `context/docs/versions/v1/research/licences.md` | Licence types, expiry and warning rules |
| `context/docs/versions/v1/research/due-dates.md` | The filing list and due dates (✅ confirmed, ⚠️ not confirmed) |
| `context/docs/versions/v1/research/pollution-categories.md` | The pollution category lists (CPCB and Delhi) |
| `context/docs/versions/v1/research/import-formats.md` | CSV import fields and the bad-row report |
| `context/docs/versions/v1/research/privacy.md` | Privacy law (DPDP) duties that shape sign-up and data screens |
| `context/docs/versions/v1/research/competitors.md` | Competitors and our edge |
| `context/docs/versions/v1/research/pilots.md` | The interview script for CAs |
| `context/docs/versions/v1/research/data/` | The pollution lists and the exempt-sector list as CSV files |

## How to work with Lakshay
These come from [AGENTS.md](context/AGENTS.md). Follow them even if your tools are different.
- **Plain words.** Lakshay is new to development. Short sentences. Explain every technical term in a few words where it first appears. When a task brings a new idea, explain it simply (what it is, why we need it, what we give up) and link a primary source.
- **Plan together, one decision at a time.** You recommend; Lakshay decides. Ask when unsure; never assume. State any assumption you must make and get it confirmed. Skip planning for things he has already done before (he has deployed on Vercel's free plan).
- **Never one-shot.** One stage, one task, one file at a time. Stop at every gate for approval. If you are asked only to read, acknowledge or wait, do exactly that.
- **Fact-check** any rule, government process, price or tool behaviour before relying on it. Prefer official sources. Give the source and the date. Mark anything unchecked `UNVERIFIED`.
- **Made-up demo data only** in v1. No real person's data. Never ask for or store government-portal passwords. **No keys in chat, docs or git**: keys live only in env files and settings pages.
- **Mock data** in a design or code is marked `// MOCK:` and listed in the v1 plan. A version cannot ship with an unlisted mock.
- **Code:** stage 2 has started, but before each task agree its design questions with Lakshay (options and a recommendation). Code goes on a branch `<type>/v1-<slug>` and merges when the checks pass. Screens are built from Figma's own design-to-code tool (D14), not copied from screenshots.
- **Docs:** short; update docs in the same commit as the change; link, don't duplicate. Docs-only changes go straight to `main`. Commit messages follow Conventional Commits (`docs: ...`, `feat: ...`).
- **Feel of the product:** proper screens, subtle animation, a smooth experience ([tech.md](context/docs/versions/v1/tech.md), "Smooth and subtle"). Normal desktop software sizes, no projector sizing.

## Working in Figma
The full rules are in design.md ("How we work in Figma"). In short:
- Look before you write. Give every layer a fixed name. Record the IDs you create in `figma-ledger.json`.
- Colours, spacing and corner sizes come from variables, never typed-in hex codes. Frames use auto layout. Repeated parts are components.
- One writing call at a time. About 150 calls a day at most (the Figma limit for our plan is 200).
- Never move nodes made by the diagram tool: their arrows keep their old routes. Put cards behind them instead.
- Lakshay saves named versions by hand (the API can't).
- From stage 2, the Figma file is read, not redrawn, unless Lakshay asks for a design change.

## If more than one agent works at the same time
Proposed on 2026-10-20; Lakshay confirms or changes these.
- **One writer per Figma file at a time.** Lakshay says who draws. Others read, review or write docs.
- **Claim a task before you start** (name the task ID, e.g. `v1-QA-1`), so two agents don't do the same work.
- **Small, separate commits,** and pull before you push. Don't edit a file another agent is changing.
- **Don't change a decision** in the decision log without Lakshay. Raise it as a question.
- **Report back in the same format:** what you did, the evidence (screenshots, counts), what is still open.

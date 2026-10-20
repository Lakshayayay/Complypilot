# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-3) · **Last updated:** 2026-10-20 (update status)
**Where we stopped:** UX-2 approved. Light reference pass done (Odoo is the main design guide). UX-3 brand interview done and strategy confirmed. **Next: the 3 brand directions** (review point 4), in a new chat.
**Plan for this version:** [v1 README](versions/v1/README.md) · **Stage doc, with the done/remaining checklist, interview answers and strategy:** [design.md](versions/v1/design.md) · **References:** [design-references.md](versions/v1/research/design-references.md) · **Screens:** [screens.md](versions/v1/screens.md) · **Flows:** [flows.md](versions/v1/flows.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18.** v1 scope is locked: 12 features F1–F12.
- **Stage 1 set-up (2026-10-19/20):** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) with 7 pages, References board, Cover sheet, a brief on pages 02 to 06. Every Figma ID is in [figma-ledger.json](versions/v1/figma-ledger.json). Figma's Claude Code plugin is connected; six design skills are on for this project only.
- **UX-1 approved 2026-10-20:** 12 flows, demo story and edge cases in [flows.md](versions/v1/flows.md) and on the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **UX-2 approved 2026-10-20:** 65 grey frames on `02 Wireframes`, the screen list and the app map. All 7 proposals accepted. Lakshay saved a named Figma version. Feedback: the look is "too minimal", so the detailed design leans on Odoo.
- **Study 2 (light), 2026-10-20:** Odoo is the main guide. Colours: a deep, muted main colour, teal, greys. Elements: search with Filters / Group By / Favorites; list, cards and calendar views; a "chatter" beside each record. Tone: a formal app with quirky brand moments. Tally and Winman add density and keyboard shortcuts. Guides, not rules.
- **UX-3 brand interview and strategy, 2026-10-20** (design.md, UX-3):
  - Promise: no missed deadlines. Metaphor: the co-pilot (the CA flies, ComplyPilot calls out what's coming, the owner sees the same view).
  - Readers: a small CA firm (~100 clients); owners aged 45 to 55 and 28 to 35, equally; a college jury on a projector.
  - Calm, reliable, a bit playful; never flashy, trendy or gimmicky. Plain English only.
  - Logo seeds: two seats side by side; a date with a tick. Colours: 3 palettes in Odoo's spirit, one per direction.

## Next (in this order)
1. **New chat: 3 brand directions** on `03 Brand`. Each has a logo idea from the two seeds, a palette in Odoo's spirit, one of the 3 Hindi-ready font pairs, and a calendar sample readable on a projector. **Review point 4:** Lakshay picks one. Ask before any Figma AI image.
2. Then foundations (variables, type, spacing, grids, contrast table), the status system, icons, and components, adding Odoo-style parts (search with filters, view switch, chatter panel, stage bar). Then logo files and the brand board (review point 5).
3. UX-4 detailed screens and the clickable demo, then gate PM-12. Full checklist: design.md, "Stage 1 plan: done and remaining".

## Open questions
- **Lakshay, later and by hand:** check complypilot.com and the trademark (IP India). Optional: 3 Odoo screenshots (design-references.md, row O1); odoo.com blocks automated browsers.
- Reminder days (UX-4).
- Still ⚠️ and out of the app: TDS forms 140/143/144, advance tax 15 Sep/15 Dec, non-audit ITR dates, PF 15th, MSME Form-1 dates. Haryana boiler office, fire portal and licence validity not found ("ask your CA").
- Code Connect (links Figma parts to code) is `UNVERIFIED` on the Education plan. Check it in stage 2.

## Watch out
- **Figma:** about 200 MCP calls a day; aim for 150 (about 50 used on 2026-10-20). A `use_figma` call that fails is rolled back whole: fix it and rerun. Never move nodes made by `generate_diagram`. Load Figma's skills before drawing.
- Reference work stays light: a few principles and images, then move on.
- Reference screenshots in `research/design-refs/` stay out of git. v1 uses made-up demo data only. No app code until stage 2; before any code we agree folders, files and naming together.
- New ideas go into idea.md, not into v1.

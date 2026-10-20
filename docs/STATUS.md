# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress (UX-3, phase E next) · **Last updated:** 2026-10-21 (wrap up)
**Where we stopped:** UX-3 phases A to D are done: brand picked, foundations, status chips and icons, 38 components. **Next: phase E (logo files and brand board), in a new chat**, then review point 5.
**Plan for this version:** [v1 README](versions/v1/README.md) · **Stage doc, with the done/remaining checklist and every UX-3 result:** [design.md](versions/v1/design.md) · **Figma IDs:** [figma-ledger.json](versions/v1/figma-ledger.json) · **Screens:** [screens.md](versions/v1/screens.md) · **Flows:** [flows.md](versions/v1/flows.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 approved 2026-10-18.** v1 scope is locked: 12 features F1–F12.
- **Stage 1 set-up, UX-1 flows and UX-2 wireframes approved (2026-10-19/20).** Figma file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) and the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh). Odoo is the main design guide.
- **UX-3 (2026-10-20), in design.md, UX-3:**
  - **A Brand:** 3 directions drawn and checked. **Picked: C's colours and type with B's logo** (mulberry `#7A2E57`, teal `#0E7A79`, Anek Latin + Anek Devanagari; a calendar page with a tick, all mulberry). Explorations kept on `03 Brand`, labelled "not picked".
  - **B Foundations (`04`):** variables Primitives 24 · Color 37 · Spacing 12 · Radius 4, each with a CSS name; 18 text styles; 4 shadows (incl. `shadow/float`); 2 grids. Every colour pair passes WCAG AA. Tabular numbers on `num/…` (Lakshay, checked).
  - **C Status and icons (`05`):** 10 statuses as `StatusChip` (word + icon + colour; grayscale test passes); 50 Phosphor Bold icons (v2.1.1, MIT).
  - **D Components (`05`):** 38 sets in 5 groups (basics, navigation, data, thread, feedback), each with a review frame. Final check: 0 typed-in colours, corners or spacing; all text styled, all Anek.
- **Decisions (2026-10-20):** status words approved; icons Phosphor Bold; CA desktop uses the **side menu**; vision: a **modern look** (rounder corners, soft floating shadows, gentle motion) in a UX-4 polish pass; named Figma versions are optional (skipped).

## Next (in this order)
1. **New chat: phase E** on `03 Brand`. Logo lockups with real cut-outs (they replace the white strokes in `LogoMark`, so every copy updates), app icon 512 and 180, favicon 32 and 16, a 3×3 brand board. **Starts with 3 tagline options** around "No missed deadlines" for Lakshay to pick. Ask before any Figma AI image.
2. **Review point 5:** Lakshay approves the look and the parts; tick v1-UX-3.
3. **UX-4:** agree reminder days → the 11 demo-path screens → other screens and states → heuristic fixes → 1366 and 360 px checks → polish pass (modern look) → clickable demo → design QA → gate PM-12. Checklist: design.md, "Stage 1 plan: done and remaining".

## Open questions
- **Lakshay, later and by hand:** check complypilot.com and the trademark (IP India). Optional: 3 Odoo screenshots (design-references.md, row O1).
- Reminder days (UX-4).
- Still ⚠️ and out of the app: TDS forms 140/143/144, advance tax 15 Sep/15 Dec, non-audit ITR dates, PF 15th, MSME Form-1 dates. Haryana boiler office, fire portal and licence validity not found ("ask your CA").
- Code Connect (links Figma parts to code) is `UNVERIFIED` on the Education plan. Check it in stage 2.

## Watch out
- **Figma:** about 200 MCP calls a day; aim for 150. A `use_figma` call that fails is rolled back whole: fix it and rerun. Never move nodes made by `generate_diagram`. Load Figma's skills before drawing.
- **Build only from variables and styles.** A spacing step outside the scale (e.g. `space/6`) is silently ignored and leaves 0. A slot must be a direct child of its component. A shared text property gives a whole set one default text.
- Reference screenshots stay out of git. v1 uses made-up demo data only. No app code until stage 2; before any code we agree folders, files and naming together.
- New ideas go into idea.md, not into v1.

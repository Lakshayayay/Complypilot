# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX], in progress. User flows (UX-1) are drawn and **wait for Lakshay's review** · **Last updated:** 2026-10-20
**Plan for this version:** [v1 README](versions/v1/README.md) · **Stage doc:** [design.md](versions/v1/design.md) · **Flows:** [flows.md](versions/v1/flows.md) · **Vision and ideas:** [idea.md](../idea.md) · **Rules:** [AGENTS.md](../AGENTS.md)

## Done
- **Stage 0 (research) approved 2026-10-18.** v1 scope is locked: 12 features F1–F12.
- **Stage 1 started 2026-10-19.** Order agreed: flows → grey wireframes → brand and design basics → detailed screens and demo → gate PM-12.
  - Docs: [design.md](versions/v1/design.md) ("Learn first", decisions, Figma rules), [design-references.md](versions/v1/research/design-references.md) (16-page study), competitor re-check in [competitors.md](versions/v1/research/competitors.md).
  - **Figma set up:** design file [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot) with 7 pages and a References board (26 study windows). Fonts checked. IDs are in [figma-ledger.json](versions/v1/figma-ledger.json).
  - **UX-1 drawn:** 12 flows, a demo story and 15 edge cases in [flows.md](versions/v1/flows.md), and on the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh).
- **Decisions (2026-10-19):** one email-link login for CA and owner · the owner answers the factory questions and the CA can correct them · the owner sees "Your CA will check" until the CA confirms · the owner ticks only tasks the CA gives them · prototype = demo path only · the real app is built from Figma through the MCP.

## Next (in this order)
1. **Review point 1:** Lakshay reviews the flows and the demo story on the FigJam board. Fix what he says, then tick v1-UX-1 in the README.
2. **Phase 3 (UX-2):** the app's map (CA side menu, owner tabs), the screen list (about 27 screens), then grey wireframes in Figma page `02 Wireframes`.
3. **Then UX-3 (brand interview, logo, colours, fonts, components) and UX-4 (detailed screens, clickable demo, reminder days),** then the PM-12 gate. The full plan is in `design.md`.

## Open questions
- Before Phase 3: Lakshay saves a named version in Figma (File → Save to version history), and says whether to delete the stray "Vector 1" line on `Cover`.
- Still ⚠️ and out of the app: TDS forms 140/143/144, advance tax 15 Sep/15 Dec, non-audit ITR dates, PF 15th, MSME Form-1 dates. Haryana boiler office, fire portal and licence validity not found ("ask your CA").
- Code Connect (links Figma parts to code) is `UNVERIFIED` on the Education plan. Check it in stage 2.

## Watch out
- **Figma:** about 200 MCP calls a day. Writing through the MCP is free in beta and paid later. Never move nodes made by `generate_diagram`: their arrows keep old routes (put cards behind them). Load Figma's skills before drawing. A new chat can read `figma-ledger.json` to find every ID.
- The reference screenshots in `research/design-refs/` stay out of git (other companies' pages).
- v1 uses made-up demo data only. No app code until stage 2, and before any code we agree the folders, files and naming together.
- New ideas go into idea.md, not into v1.

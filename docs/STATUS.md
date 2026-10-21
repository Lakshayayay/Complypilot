# Status

**Version:** v1 — Shared Compliance Calendar · **Stage:** 1 Design [UX] is built and **waiting at gate PM-12 (Lakshay is reviewing it)** · 2 Build [FS] is planned and starts after the gate · **Last updated:** 2026-10-22 (wrap-up)
**First thing next session: ask Lakshay for his gate progress and notes** (list below). Start no new work until he answers. Comments he left in Figma are not visible to Claude: ask him to paste them in chat.
**Plan for this version:** [v1 README](versions/v1/README.md) (tasks and gates) · **Design** [design/](versions/v1/design/): [design.md](versions/v1/design/design.md) (checklist, decisions, click path) · [screens.md](versions/v1/design/screens.md) · [flows.md](versions/v1/design/flows.md) · [figma-ledger.json](versions/v1/design/figma-ledger.json) (Figma IDs) · **Build** [tech.md](versions/v1/tech.md) · ADRs [adr/](adr/) · **Rules:** [AGENTS.md](../AGENTS.md)

## Gate PM-12 (design approval): ask Lakshay, one point at a time
Built and checked: 66 frames on `06 Screens`, a clickable demo, a behaviour note on every frame, read-back and content checks, a helper-agent builder check (24 findings; contradictions fixed in the README, the rest is an agenda in tech.md). Lakshay started his own review on 2026-10-22.
1. **Progress:** how far did he get, and what is left?
2. **Dev Mode:** do the notes show on a frame (`UNVERIFIED` on the Education plan)? Did he mark finished screens "Ready for dev"?
3. **Demo walk:** Figma page `06 Screens`, select CA-14, press Present (click path in design.md). Anything wrong, slow or unclear?
4. **His two decisions** (design.md, "Decide at PM-12"): (a) consent for colleagues and owners, default: firm sign-up only in v1, the rest before real data; (b) small screens without a frame (edit or archive a client, edit a licence or task, session expired), default: built in stage 2 from existing parts.
5. **Review later** points (below) and his Figma comments.
6. **Verdict:** approved, or changes. If changes: fix them, then do a fresh-eyes pass in a new session. **On "approved":** tick UX-4 and PM-12 in the README and design.md, set the Cover sheet chips to Done, rewrite this file, commit.

## Done
- **Stage 0 approved 2026-10-18** (PM-11): 12 features F1–F12. **UX-1 flows, UX-2 wireframes (2026-10-20) and UX-3 brand and parts (2026-10-21) approved.** Figma [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot), FigJam [flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh). Brand: mulberry, teal, Anek Latin. No Hindi in new work.
- **UX-4 (2026-10-21 and 22):** 65 frames plus a loading frame (CA-14c); width checks at 1366 and 360 px; polish (corners 8/12/20, soft shadow); reminder days agreed; clickable demo (flow "Demo", 21 links); notes in Dev Mode form.
- **Build decisions (2026-10-21/22):** one Next.js app · Supabase, "comply pilot" (Tokyo) = training, "comply-pilot-new" (Seoul) = demo · Vercel free · Gmail sends email · Tailwind + shadcn/ui · Vitest + Playwright · Vercel Cron + encrypted GitHub backups · fully free, no domain · demo data in Seoul, the app names no place, Mumbai before real users · **repo goes private (ADR 0010)**.

## Next
**After PM-12, build from [tech.md](versions/v1/tech.md):** close FS-1 (Lakshay's by-hand steps; wipe the training project) → QA-1 deploy pipeline → FS-2 tables, API shapes, RLS (start with the item model, tech.md "Builder check") → FS-5 and the logic cores of FS-14, FS-10, FS-13, FS-8 → screens in demo order → gate PM-16.

## Open questions
- **Lakshay, by hand** (tech.md): make the repo private and apply for GitHub Pro via the Student Developer Pack (the branch rule needs it); tell Claude when "comply pilot" has restored; Gmail account and app password; Node 24 LTS; `gh auth login`; keys only in env files, never in chat.
- **Review later**, defaults taken: "Confirm 5 licences", projector chip size, CA-13 status word, notice text (stage 2), demo licence numbers and "e-District Delhi"; 5 small points on the Settings frames (screens.md, batch 6).
- **Data is good enough for now** (Lakshay): crawlers and scripts come later. Out of the app: Forms 143/144, non-audit ITR, PF, MSME Form-1. `UNVERIFIED`: Code Connect on the Education plan; open tech checks are in tech.md.

## Watch out
- **Figma:** 200 MCP calls a day and 10 a minute; about 142 used on 2026-10-21, about 105 on 2026-10-22. A failed `use_figma` call is rolled back whole. `clone()` of a frame inside a section lands on the page root: append it to the section. More in the memory note "Figma files".
- **No keys or real data in commits, docs or chat** (the repo is private now, but could leak). v1 uses made-up data and English only. New ideas go into idea.md.

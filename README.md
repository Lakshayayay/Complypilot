# ComplyPilot

A shared workspace for Indian CAs (chartered accountants) and MSME factory owners. It tracks filings, collects documents over WhatsApp, and warns about factory licence renewals. It works alongside Tally and Winman; it doesn't replace them.

**Status:** v1, the shared compliance calendar ([plan](docs/versions/v1/README.md)). The design was approved on 2026-10-22 and the Build stage has started. The code is an empty Next.js app skeleton so far (run it with `npm install`, then `npm run dev`; it needs Node 24). It isn't deployed yet.

## Where things are
- `AGENTS.md`: the rules every AI assistant follows (Claude loads them through `CLAUDE.md`).
- `docs/STATUS.md`: where we are right now and what's next.
- `idea.md`: the product vision, plus a list of every decision and idea from our planning chats.
- `docs/versions/`: one folder per version (v1–v5) with its plan, research, and stage docs.
- `docs/adr/`: records of big decisions (0001 to 0010 are v1's tools: framework, database, hosting, email and more).

## The old prototype
The earlier prototype is saved in git under the tag `v0-prototype`. To look at an old file: `git show v0-prototype:<path>`.

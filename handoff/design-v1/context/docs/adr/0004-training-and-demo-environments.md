# 0004 Two environments: training and demo

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended; Lakshay named the two projects) · **Task:** v1-FS-1

## Context
We need a safe place to build and break things, and a clean place for the demo. The Mac has 8 GB of memory and no Docker. The free Supabase plan allows 2 active projects, and Lakshay has two.

## Options
| Option | For | Against |
|---|---|---|
| **Two cloud projects** (training and demo) | Light on the Mac; a bad test can't break the demo | Two sets of keys; migrations run twice |
| Database on the Mac (Docker + Supabase CLI) | Works offline, usual best practice | Heavy on 8 GB of memory |
| One project | Simplest | Tests and the demo share data |

## Decision
Two Supabase projects in one account:
| Name | Region | Role |
|---|---|---|
| **comply pilot** | Tokyo (ap-northeast-1) | **Training:** the Mac, tests and Vercel preview links use it. Its old v0 prototype data is wiped once Lakshay has seen the table list |
| **comply-pilot-new** | Seoul (ap-northeast-2) | **Demo / live:** Vercel production (`main`) uses it |
Env files pick the project; keys are never committed. Table changes are SQL files in `supabase/migrations/`, run on training first, then demo. The automatic security tests (firm A can't see firm B) run in GitHub Actions against a throwaway local Supabase (GitHub's computers have Docker), not on the Mac. The Supabase tool in Claude Code is pointed at training only.

## Consequences
- Open check: the project the Supabase tool in Claude Code points at should be "comply pilot". Claude shows its address and Lakshay compares it with the dashboard.
- Whether `supabase db push` needs Docker is `UNVERIFIED` ([CLI docs](https://supabase.com/docs/guides/local-development/cli/getting-started)); we try it at FS-2. If it does, Claude applies migrations through the Supabase tool or from GitHub Actions.
- Training may pause when quiet; Supabase restores paused projects for up to a year ([pausing](https://supabase.com/docs/guides/platform/free-project-pausing)).
- Region and the Mumbai move: [ADR 0003](0003-hosting-and-data-region.md).

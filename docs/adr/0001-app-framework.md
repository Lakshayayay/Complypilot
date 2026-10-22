# 0001 App framework: one Next.js app

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended) · **Task:** v1-FS-1 · **Detail:** [tech.md](../versions/v1/build/tech.md)

## Context
One developer, a new one, on free plans. v1 needs screens for the CA (desktop) and the owner (phone web page), plus some server code: sign-up, CSV import, reminder emails. v0 split this into Next.js plus a separate NestJS server.

## Options
| Option | For | Against |
|---|---|---|
| **One Next.js app** (screens and server code together) | One language, one project, one deploy, least to learn and run | Server code lives inside the web app |
| Next.js + separate server (like v0) | Clean split | Two projects, two deploys, and the server needs its own free host that sleeps when idle |

## Decision
**One Next.js app** (App Router, TypeScript), run on **Node 24 LTS** with **npm**. We pick the newest stable Next.js at QA-1 (16.4.2 on npm, 2026-10-21; it needs Node 20.9 or newer). Server code is server actions (functions the screens call) and a few route handlers (web addresses that return data, e.g. the timed jobs). Node 24 is "Maintenance" since 2026-10-20 and supported to 2028-04-30; Node 26 becomes LTS on 2026-10-28 ([Node releases](https://nodejs.org/en/about/previous-releases)). Vercel supports Node 24 ([Vercel Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions)).

## Consequences
- The folder layout and layers are in [tech.md](../versions/v1/build/tech.md#code-layout-and-naming).
- If we later need a long-running service (WhatsApp in v2, the AI matcher in stage 3), it is a separate service and gets its own ADR.
- Zod (checks what comes into a server action) is added at FS-3 with a short note in tech.md.
- Lakshay's Mac has Node 25, which is past end of life: install Node 24 before QA-1.

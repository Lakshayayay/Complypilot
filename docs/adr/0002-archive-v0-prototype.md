# ADR-0002: Archive the v0 prototype and start clean

**Status:** Accepted · 2026-09-18

## Context
The earlier prototype (Next.js + NestJS + Prisma + Supabase, "phases 1–6") had problems:
- It ran mostly on mocks (fake services that return made-up data).
- It mixed two login systems (NextAuth and Supabase Auth).
- It had few tests.
- It still carried dead files from an older Vite setup.

## Decision
Save it under git tag `v0-prototype` and remove it from the project. Rebuild from v1, step by step. Old files are reference only: `git show v0-prototype:<path>`.

## Consequences
- Nothing is lost; any old file can be viewed or restored.
- The stack is chosen again, deliberately, in v1 stage 2, and each choice is recorded as an ADR.
- Local secrets are kept and ignored by git: `.env.local`, plus the old backend's `.env`, moved to `.env.v0-backend`.
- The remote Supabase project still holds the old database. v1 stage 2 decides whether to reuse it or reset it.

# ADR-0003: Write the app in TypeScript

**Status:** Accepted · 2026-10-02

## Context
Lakshay asked to start coding during stage 0. The due-date engine (v1-FS-5) is pure logic and doesn't depend on the web framework or the database, so it can start first. It still needs a language. The framework, database and hosting are chosen later, in v1-FS-1.

## Decision
- TypeScript (JavaScript plus types, which catch mistakes before the code runs).
- Node.js runs `.ts` files directly by stripping the types out. There's no build step.
- Tests use Node's built-in test runner (`node --test`), so we install no test framework.
- Only two packages, both used during development only: `typescript` (the type checker, `npm run typecheck`) and `@types/node` (type information for Node's own modules).

## Why
- It runs in the browser and on the server, and the frameworks we're likely to pick use it. The v0 prototype used it too.
- Type stripping is stable from Node 25.2: https://nodejs.org/api/typescript.html (checked 2026-10-02)
- `node --test` finds `*.test.ts` files by default: https://nodejs.org/api/test.html (checked 2026-10-02)

## Consequences
- Only syntax Node can strip: no `enum` and no `namespace`. Imports must include the `.ts` extension. `tsconfig.json` enforces both.
- Node 25.2 or newer is needed. CI will pin the Node version when it's set up (v1-QA-1).

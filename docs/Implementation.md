# ComplyPilot — Implementation Plan

> **Engineering Law:** Every step in this file maps 1:1 to a specific file path. Never skip ahead. Each step is a prerequisite for the next.

---

## PHASE 1: Foundation & Setup

**Goal:** Migrate the Vite prototype scaffold to the canonical Next.js 15 App Router architecture defined in `techstack.md`, wire up the Supabase database connection, and establish the protected routing skeleton for both user portals (CA Dashboard & MSME Owner Portal).

**Status:** ✅ Done (Database connected, Prisma Schema pushed, RLS policies deployed, and NestJS Auth tested)

---

### Step 1.1 — Initialize the Next.js 15 Frontend Application

**Objective:** Replace the current Vite + React scaffold with a Next.js 15 (App Router) project as specified in `techstack.md`. The new project lives at the root, migrates the existing shadcn/ui component library, and installs all authorized dependencies from `techstack.md §2`.

**Why this is first:** Every subsequent UI screen, route, and Supabase client hook depends on the Next.js runtime existing. The Vite scaffold is currently an architectural mismatch with the spec.

**Atomic Actions:**
1. Run `npx create-next-app@15.1.0` into a temp directory, extract config files (`next.config.ts`, `tsconfig.json`, `tailwind.config.ts`, `postcss.config.js`).
2. Install the exact package set from `techstack.md §2`:
   - `@supabase/supabase-js@^2.46.1`, `@tanstack/react-query@^5.61.5`, `zustand@^5.0.1`, `lucide-react@^0.460.0`, `framer-motion@^11.11.17`, `date-fns@^4.1.0`, `react-day-picker@^9.4.0`, `clsx@^2.1.1`, `tailwind-merge@^2.5.4`, `class-variance-authority@^0.7.0`, `tailwindcss-animate`.
3. Configure `tailwind.config.ts` with the full design token set from `frontend.md §1` (brand colors, accent colors, sticker shadows, handwritten fonts).
4. Add Google Fonts (`Inter` + `Caveat`) to `app/layout.tsx`.

**Files to create / modify:**
- `package.json` ← install all Next.js + authorized deps
- `next.config.ts` ← create
- `tailwind.config.ts` ← create with full `frontend.md` token set
- `postcss.config.js` ← create
- `tsconfig.json` ← update for App Router paths
- `app/layout.tsx` ← root layout with font imports and `<ThemeProvider>`
- `app/globals.css` ← Tailwind directives + CSS custom properties

**✅ Done When:** `npm run dev` serves a blank Next.js page at `localhost:3000` with the correct Tailwind design tokens active (verified by inspecting CSS variables in DevTools).

---

### Step 1.2 — Configure Environment Variables & Supabase Client

**Objective:** Establish the secure environment variable layer and create the Supabase client singleton that every server component, client component, and API route will import. This implements the Supabase connection defined in `techstack.md §4` and the RLS security model from `backend.md §3`.

**Why this is second:** Zero database operations — auth, client queries, document uploads — are possible without a correctly initialized Supabase client bound to validated environment variables.

**Atomic Actions:**
1. Create `.env.local` with the four required variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=
   NEXTAUTH_SECRET=
   ```
2. Create the **browser client** singleton at `lib/supabase/client.ts` using `createBrowserClient` from `@supabase/ssr`.
3. Create the **server client** factory at `lib/supabase/server.ts` using `createServerClient` (cookie-aware, for Server Components and Route Handlers).
4. Add `.env.local` to `.gitignore` (verify it is excluded).

**Files to create / modify:**
- `.env.local` ← create (git-ignored, placeholder values)
- `.env.example` ← create (committed, documents required keys)
- `lib/supabase/client.ts` ← browser Supabase singleton
- `lib/supabase/server.ts` ← server-side Supabase factory
- `.gitignore` ← verify `.env.local` is excluded

**✅ Done When:** A test Server Component can call `supabase.from('User').select('count')` without a TypeScript error or runtime crash. Connection failure (empty credentials) returns a clean Supabase error, not an uncaught exception.

---

### Step 1.3 — Build the Protected App Router Route Skeleton

**Objective:** Create the complete Next.js App Router directory structure with middleware-enforced authentication guards for all three user portals defined in `appflow.md §1`: the CA workspace (`/ca/*`), the MSME Owner portal (`/owner/*`), and the public WhatsApp drop-zone (`/drop/[token]`).

**Why this is third:** All feature screens (Calendar, Approvals, Safety Center, Credit Hub) are children of these routes. Without the route groups, middleware guards, and layout shells in place, no screen can be scaffolded into its correct location.

**Atomic Actions:**
1. Create Next.js route groups with shared layouts:
   - `app/(ca)/layout.tsx` — desktop-oriented shell (sidebar + top nav) for CA screens.
   - `app/(owner)/layout.tsx` — mobile-first shell (bottom nav bar) for MSME screens.
   - `app/(public)/layout.tsx` — minimal shell for unauthenticated routes (`/drop/[token]`, `/auth/*`).
2. Create stub page files for all primary routes from `appflow.md §2`:
   - `app/(ca)/ca/dashboard/page.tsx`
   - `app/(ca)/ca/clients/[id]/page.tsx`
   - `app/(ca)/ca/approvals/page.tsx`
   - `app/(owner)/owner/dashboard/page.tsx`
   - `app/(owner)/owner/compliance/page.tsx`
   - `app/(owner)/owner/credit/page.tsx`
   - `app/(public)/drop/[token]/page.tsx`
   - `app/(public)/auth/ca-login/page.tsx`
   - `app/(public)/auth/owner-login/page.tsx`
3. Create `middleware.ts` at the project root. It reads the Supabase session cookie and:
   - Redirects unauthenticated requests to `/ca/*` or `/owner/*` routes → `/auth/ca-login` or `/auth/owner-login`.
   - Allows all `/drop/*` and `/auth/*` routes to pass through without a session check.
   - Enforces role-based guards: a `MSME_OWNER` session attempting to access `/ca/*` is redirected to `/owner/dashboard`.

**Files to create / modify:**
- `middleware.ts` ← root-level auth + role guard
- `app/(ca)/layout.tsx` ← CA desktop shell layout
- `app/(owner)/layout.tsx` ← Owner mobile shell layout
- `app/(public)/layout.tsx` ← Public/unauthenticated shell
- `app/(ca)/ca/dashboard/page.tsx` ← stub
- `app/(ca)/ca/clients/[id]/page.tsx` ← stub
- `app/(ca)/ca/approvals/page.tsx` ← stub
- `app/(owner)/owner/dashboard/page.tsx` ← stub
- `app/(owner)/owner/compliance/page.tsx` ← stub
- `app/(owner)/owner/credit/page.tsx` ← stub
- `app/(public)/drop/[token]/page.tsx` ← stub
- `app/(public)/auth/ca-login/page.tsx` ← stub
- `app/(public)/auth/owner-login/page.tsx` ← stub

**✅ Done When:** Navigating to `localhost:3000/ca/dashboard` without a session redirects to `/auth/ca-login`. Navigating to `localhost:3000/drop/abc123` renders the stub page without a redirect.

---

## PHASE 2: Core Feature Implementation

> ⚠️ Do not begin Phase 2 until all three Phase 1 steps are marked ✅ Done.

*Steps 2.1–2.N to be defined upon Phase 1 completion.*

**Planned modules (from PRD):**
- **2.1** — NestJS backend: Prisma schema migration (`backend.md §1`) + Supabase DB seed
- **2.2** — Auth screens: CA Login + Owner Login UI with Supabase Auth session flows
- **2.3** — CA Dashboard: Multi-Client Compliance Calendar with `react-day-picker`
- **2.4** — Calendar Slide-Out Drawer: Document grid + status selector + comment thread
- **2.5** — MSME Owner Dashboard: Mobile-first compliance calendar + health score card
- **2.6** — WhatsApp Drop-Zone: Signed token validation + write-only Supabase Storage upload
- **2.7** — Safety Center: SPCB state engine (Punjab / Delhi / Maharashtra) with expiry matrix
- **2.8** — Document Approval Queue: Split-screen CA verification workspace
- **2.9** — Tally XML/Excel Parser: NestJS ingestion pipeline
- **2.10** — Credit Passport: OCEN + TReDS export module

---

## PHASE 3: Testing & Production Hardening

> ⚠️ Do not begin Phase 3 until all Phase 2 steps are marked ✅ Done.

*Steps 3.1–3.N to be defined upon Phase 2 completion.*

**Planned scope:**
- **3.1** — Supabase RLS policy deployment and penetration testing (`backend.md §3`)
- **3.2** — End-to-end flow test: WhatsApp token → upload → CA dashboard real-time update
- **3.3** — Performance audit: Tally XML parser `< 3s` SLA for 10MB files (`prd.md §6`)
- **3.4** — Mobile PWA configuration: `manifest.json`, service worker, offline shell
- **3.5** — Vercel (frontend) + Railway (NestJS backend) production deployment

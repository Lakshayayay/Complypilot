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

**Goal:** Implement the multi-tenant compliance calendar, slide-out contextual drawer workspaces, document grid integration, and realtime subscription modules.

**Status:** ✅ Done (Prisma schema synchronized, NestJS modules set up, Client/Calendar controller routes established)

**Key Accomplishments & File Trees Built:**
- Synchronized database models with prisma client (`backend/prisma/schema.prisma`).
- Created Client management modules (`backend/src/clients/`).
- Created Calendar and comments systems (`backend/src/calendar/`).
- Established CA desktop routes and MSME owner portal stubs.

---

## PHASE 3: Fast Ingestion & WhatsApp Secure Drop-Zone

**Goal:** Build backend ingestion pipelines (Tally XML / Excel parser), a secure document request token system, and a mobile-first "no-login" write-only drop-zone page.

**Status:** ✅ Done (XML parsing, cryptographically secure token hash checks, mock WhatsApp dispatcher, React Dropzone storage upload integrated)

**Key Accomplishments & File Trees Built:**
- Installed and configured `@fastify/multipart` for handling file uploads.
- Created trial balance/voucher parser using `fast-xml-parser` and `xlsx` (`backend/src/ingestion/`).
- Created WhatsApp Meta API dispatcher simulator and document requests token validation service using strict `SHA256` hash comparison (`backend/src/documents/`).
- Built CA workspace trigger popup modal (`components/whatsapp-trigger-modal.tsx`).
- Built secure mobile drop-zone view with automatic tenant file isolation (`app/(public)/drop/[token]/page.tsx` and `components/dropzone/secure-dropzone.tsx`).

---

## PHASE 4: SPCB & Regional Factory Safety Tracker

**Goal:** Implement state-specific environmental and safety tracking rules (Punjab, Delhi, Maharashtra), daily automated check cron jobs, and MSME dashboard alerts.

**Status:** ✅ Done (State rules engine implemented, NestJS schedule task processor running, warning cards and custom alerts operational)

**Key Accomplishments & File Trees Built:**
- Coded state rules engine calculating validity periods for Punjab (October 31 Form 2-F), Delhi (exempt White category undertaking form), and Maharashtra (half-yearly Form B Fire reports) (`backend/src/compliance/compliance-engine/`).
- Configured automated cron checks at midnight (`backend/src/compliance/compliance-cron/`).
- Built Next.js owner safety dashboard page (`app/(owner)/owner/compliance/page.tsx`) with warning components (`components/compliance/spcb-warning-card.tsx`).
- Created modal override for manual alert entries (`components/compliance/custom-alert-modal.tsx`).
- Added Tab 3 SPCB metrics and highlight styling (`border-accent-rose text-brand-navy`) on the desktop CA client workspace.

---

## PHASE 5: GSTR Auditing, AI Parsing, and Credit Passport (Next Session Roadmap)

**Goal:** Implement Module 4 (GSTR-2B vs 3B match auditing & low-cost LLM tax notice summaries) and Module 5 (Credit Readiness Passport, Account Aggregator consent, and TReDS invoice export).

### Step 5.1 — GSTR-2B Match Engine & LLM Circular Summarizer
- Create backend audit service mapping and reconciling supplier-reported GSTR-2B purchase entries against internal registers, flagging >1% variances.
- Integrate Gemini 1.5 Flash (free-tier SDK / Vertex / Google AI Studio) to accept tax notices and parse them into a plain-English 3-sentence action summary.
- Add summary UI modal to the CA Client workspace.

### Step 5.2 — Credit Readiness Passport (CRP) Generator
- Define the CRP JSON schema aggregating historical GST filing timeliness, sales authenticity matched results, SPCB safety status, and cash flow run rate.
- Implement account aggregator digital consent token workflows (simulated Sahamati protocols).
- Build the 1-click TReDS invoice discounting exporter.

---

## PHASE 6: Production Hardening & E2E Testing
- Deploy production RLS policies and validation tests.
- Run multi-tenant database boundary check verification scripts.
- Perform mobile viewport responsive style sweep.

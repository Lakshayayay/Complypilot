This is the production-grade **TECH_STACK.md** specification for **ComplyPilot**. 

This document defines the physical layer of our architecture. Every chosen framework, dependency, hosting provider, and API integration is selected for maximum cost efficiency, ease of deployment, and strict typing with TypeScript.

---

# TECH_STACK.md: Physical Architecture & System Dependencies

## 1. System Architecture Map

```
    ┌────────────────────────────────────────────────────────┐
    │                    Client Viewports                    │
    │  ┌────────────────────────┐    ┌────────────────────┐  │
    │  │  Desktop Web (Next.js) │    │ Mobile Web (PWA)   │  │
    │  │  (CA Dashboard Panel)  │    │ (Owner Portal/Drop)│  │
    │  └───────────┬────────────┘    └─────────┬──────────┘  │
    └──────────────┼───────────────────────────┼─────────────┘
                   │ HTTPS                     │ HTTPS
                   ▼                           ▼
    ┌────────────────────────────────────────────────────────┐
    │                     API Gateway                        │
    │              Next.js Edge Middleware                   │
    │     (Auth Validation, Routing, Rate Limiting)          │
    └──────────────────────────┬─────────────────────────────┘
                               │ Proxy/Forward
                               ▼
    ┌────────────────────────────────────────────────────────┐
    │                 Application Core                       │
    │                 NestJS API Server                      │
    │     (Ledger Parsers, SPCB Logic Engine, AI Agents)     │
    └──────────────┬───────────────────────────┬─────────────┘
                   │ PostgreSQL Protocol       │ REST/gRPC
                   ▼                           ▼
    ┌─────────────────────────────┐ ┌────────────────────────┐
    │     Supabase Platform       │ │  External Services     │
    │  • PostgreSQL DB (RLS)      │ │  • Meta WhatsApp API   │
    │  • Storage (S3 Private)     │ │  • OpenAI API (4o-mini)│
    │  • Supabase Realtime        │ │  • Account Aggregator  │
    └─────────────────────────────┘ └────────────────────────┘
```

---

## 2. Frontend Technology Stack (Next.js Web App)

The client application is built as a unified Next.js project with dynamic routing engines that split the desktop experience for CAs from the mobile experience for MSMEs.

### Core Framework & Build Engine
* **Framework:** Next.js `15.1.0` (App Router structure).
* **Language:** TypeScript `5.6.3`.
* **Runtime Environment:** Node.js `20.x` LTS.
* **Styling Engine:** Tailwind CSS `v3.4.15` (coupled with `tailwindcss-animate` for dashboard drawer transitions).

### Primary Package Dependencies (`frontend/package.json`)
```json
{
  "dependencies": {
    "next": "15.1.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "typescript": "5.6.3",
    "tailwindcss": "3.4.15",
    "@supabase/supabase-js": "^2.46.1",
    "@tanstack/react-query": "^5.61.5",
    "zustand": "^5.0.1",
    "lucide-react": "^0.460.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.5.4",
    "class-variance-authority": "^0.7.0",
    "date-fns": "^4.1.0",
    "react-day-picker": "^9.4.0",
    "framer-motion": "^11.11.17"
  },
  "devDependencies": {
    "@types/node": "20.17.6",
    "@types/react": "19.0.0",
    "@types/react-dom": "19.0.0",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.49"
  }
}
```

### Key UI Library Decisions
* **Shadcn UI & Radix Primitives:** Form elements, dialog popups, and dropdown menus are built using accessible, unstyled Radix primitives.
* **React Day Picker & Date-Fns:** Used to construct the **Collaborative Compliance Calendar**. This library allows us to inject custom CSS markers on specific calendar days to indicate filing statuses.
* **Zustand:** A lightweight state-management store to handle the global `activeClientId` selected by CAs. This changes states instantly without page refreshes.

---

## 3. Backend Technology Stack (NestJS Service)

The backend layer manages processing-heavy tasks: XML file parsing, state engines, scheduled background alerts, and integrations.

### Core Runtime
* **Framework:** NestJS `10.4.7` (with Fastify as the underlying HTTP provider for high throughput).
* **Database Client:** Prisma ORM `5.22.0` (leveraging static typing and automated migration generation).

### Primary Package Dependencies (`backend/package.json`)
```json
{
  "dependencies": {
    "@nestjs/common": "^10.4.7",
    "@nestjs/core": "^10.4.7",
    "@nestjs/platform-fastify": "^10.4.7",
    "@nestjs/config": "^3.3.0",
    "@nestjs/schedule": "^4.1.1",
    "@prisma/client": "^5.22.0",
    "class-validator": "^0.14.1",
    "class-transformer": "^0.5.1",
    "fast-xml-parser": "^4.5.0",
    "xlsx": "^0.18.5",
    "jsonwebtoken": "^9.0.2",
    "openai": "^4.73.0",
    "axios": "^1.7.7"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.4.7",
    "@nestjs/schematics": "^10.4.7",
    "@nestjs/testing": "^10.4.7",
    "prisma": "^5.22.0",
    "typescript": "^5.6.3"
  }
}
```

### Core Engine Decisions
* **Fast-XML-Parser:** Standard library for parsing complex Tally Trial Balance XML structures. Selected for its zero-dependency codebase and high execution speed (<20ms processing times for standard ledgers).
* **XLSX (SheetJS):** Handles Excel processing for parsing monthly GSTR file structures.
* **NestJS Schedule:** Implements the chronological check engines for tracking Punjab, Delhi, and Maharashtra safety certifications.

---

## 4. Managed Services, Database & Storage Layers

To maintain a low-overhead MVP, we run on reliable cloud infrastructure providers with robust free tiers.

### Database (Supabase Managed Postgres)
* **Instance:** Managed PostgreSQL `15.x`.
* **Row-Level Security (RLS):** Strictly enforced across tables using Postgres policies mapping `auth.uid()` to client schema references.
* **Realtime Replication:** Employs PostgreSQL Wal2json replication logical slots. This pushes instant update notifications (such as calendar comments or status changes) to Next.js clients over WebSockets.

### File Storage (Supabase S3-Compatible Buckets)
* **Configuration:** Two isolated buckets:
  1. `public-assets` (Read-only access for static application icons).
  2. `private-documents` (Private, write-only by default. Requires time-limited AWS Signature Version 4 pre-signed URLs generated by NestJS for downloading or viewing).

### User Authentication (Supabase Auth)
* Handles signup/login workflows, issuing cryptographically signed JWT tokens passed to the NestJS application backend via standard HTTP Bearer headers.

---

## 5. Third-Party API Integration Grid

```
                     ┌──────────────────────────────┐
                     │          ComplyPilot         │
                     └──────────────┬───────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐       ┌──────────────────┐       ┌──────────────────┐
│   Meta Cloud     │       │    OpenAI API    │       │ Account Aggreg.  │
│  (WhatsApp API)  │       │  (gpt-4o-mini)   │       │ (Sahamati / AA)  │
│  • File Chasers  │       │  • PDF Auditing  │       │ • Secure Bank    │
│  • Alerts        │       │  • Circulars     │       │   Data Pulls     │
└──────────────────┘       └──────────────────┘       └──────────────────┘
```

| Integration Target | Protocol | Dependency Library | Purpose / SLA |
| :--- | :--- | :--- | :--- |
| **Meta WhatsApp Business API** | REST / HTTPS | `axios` | Sends transactional file-chasing links and automatic filing alerts directly to owners. |
| **OpenAI API Gateway** | HTTPS | `openai` | Accesses the cost-efficient `gpt-4o-mini` model (priced at \$0.150 / million input tokens) for parsing and summarizing tax notices. |
| **Account Aggregator Portal** | REST / HTTPS | Proprietary SDK | Integrates with approved Sahamati Account Aggregators (AAs) for secure, consent-based credit verification. |

---

## 6. Hosting & Deployment Environment

* **Frontend Hosting:** **Vercel** (Free Tier). Provides optimal caching and serverless function scaling for global Next.js instances.
* **Backend API Hosting:** **Railway** or **Render** (Starter Tier, approximately \$5–\$7/month). Houses the persistent, long-running NestJS Node.js processes.
* **Database Hosting:** **Supabase Cloud** (Free Tier). Provides 500MB of managed Postgres storage, 1GB file storage, and integrated user authentication management.

---

### What's Next?
Please review this **TECH_STACK.md** blueprint. If you are satisfied with this architecture, we will proceed directly to **Document 4: FRONTEND_GUIDELINES.md** to define the design tokens, visual structure, state flows, and interactive components of our collaborative calendars.
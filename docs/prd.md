


# PRD.md: Product Requirements Document

## 1. Executive Summary & Product Vision
**ComplyPilot** is a connected compliance, document automation, and operational safety operating system. It acts as a collaborative, single-source-of-truth layer between Chartered Accountants (CAs) and MSME factory owners. 

Instead of replacing the existing financial workflows of Tally or tax calculation engines of Winman, ComplyPilot resolves the persistent communication asymmetry, manual document-chasing, and physical regulatory risks (e.g., State Pollution Control Board shutdowns) that plague the Indian manufacturing sector.

---

## 2. User Personas & Device Targets

### Persona A: The Busy CA / Article Assistant (Admin Panel)
* **Demographics:** CAs, CSs, and their junior article assistants managing 50–200 corporate clients.
* **Core Pain Points:** Manual client chasing, cluttered WhatsApp groups, files lost in email threads, lack of transparent work-status tracking for junior staff.
* **Form Factor:** **Desktop Web App.** CAs operate primarily on dual-monitor setups with complex spreadsheets and tax software. They require a data-dense, keyboard-friendly UI.

### Persona B: The MSME Factory Owner (Client Portal)
* **Demographics:** SME manufacturers (e.g., textiles, chemicals, plastics) with 20–150 employees. 
* **Core Pain Points:** Lack of filing transparency, fear of surprise state inspections (SPCB, Factory Act violations), high penalties for late filings, zero visibility of cash flow relative to tax liabilities.
* **Form Factor:** **Mobile-First Responsive Web Design.** Factory owners are on the move on the factory floor. They manage their entire business from their mobile devices and need a highly simplified, visual, card-based interface.

---

## 3. Core Functional Modules (MVP Scope)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          ComplyPilot Platform                           │
└──────┬───────────────────────────────────────────────────────────┬──────┘
       │                                                           │
       ▼                                                           ▼
┌──────────────────────────────┐                            ┌──────────────────────────────┐
│  CA / Admin Workspace        │                            │  MSME Owner Portal           │
│  • Desktop Web UI            │                            │  • Mobile-Responsive Web UI  │
│  • Client Kanban Grid        │                            │  • Traffic-Light Health KPI  │
│  • Automated WhatsApp Chaser │                            │  • Expiry Early-Warning      │
│  • Document Approval Queue   │                            │  • Credit Passport Export    │
└──────┬───────────────────────┘                            └──────────────┬───────────────┘
       │                                                                   │
       └─────────────────────────────────┬─────────────────────────────────┘
                                         │
                                         ▼
┌─────────────────────────────────────────────────────────────────────────┐
│  Shared Core Infrastructure (Supabase PostGres + NestJS)                 │
│  • Module 1: Tally XML/Excel Upload Parser                              │
│  • Module 2: Secure One-Way Write-Only WhatsApp Upload API              │
│  • Module 3: State-Specific Safety & Environmental Compliance (SPCB)     │
│  • Module 4: Grounded AI Auditing Engine (GSTR-2B vs 3B Ledger Matcher)   │
│  • Module 5: Credit Readiness Passport (OCEN & TReDS Monetization Engine)│
└─────────────────────────────────────────────────────────────────────────┘
```

### Module 1: The Fast-Ingestion Pipeline
* **Tally XML & Excel Parser:** A cloud-based drag-and-drop parsing module on our backend. CAs or business owners upload standard exported Tally trial balances or GSTR register files. The backend extracts ledger balances, purchases, and cash transactions to populate the dashboard without manual data entry.
* **Government Portal Tracker (Mock GSP):** A background task processor in NestJS that simulates API integration with the GSTN and Income Tax portals. It tracks filing milestones (Pending, Draft, Filed) using mock state transitions. It is ready to link with third-party Sandbox/Setu APIs as soon as budget permits.

### Module 2: The Secure One-Way WhatsApp Document Chaser
* **Targeted Trigger:** From the desktop dashboard, the CA marks a specific document (e.g., "Bank Statement") as missing.
* **WhatsApp Notification Dispatcher:** Connects via a free-tier/low-cost transactional WhatsApp service (or Twilio/Meta API). It triggers a message containing a cryptographically signed, secure token URL.
* **The Safe "No-Login" Write-Only Page:** 
  * The link redirects the owner to a lightweight, mobile-first upload page.
  * **Zero-Read Policy:** The upload page contains absolutely *no read operations*. The user cannot view previously uploaded files, preventing cross-tenant data leaks.
  * **Signed POST URLs:** Uploads write directly to secured Supabase Storage buckets via a signed token that expires after 48 hours.

### Module 3: State-Specific Safety & Environmental Compliance (SPCB & Factory Layer)
This module acts as a state-specific rules engine targeting local pollution, factory safety, and operational renewals. For the MVP, the automation engine is deeply mapped to **Punjab**, **Delhi**, and **Maharashtra**, with a fallback manual template engine for other regions.

```
                   ┌──────────────────────────────────────┐
                   │     Module 3 SPCB Selection Logic    │
                   └──────────────────┬───────────────────┘
                                      │
              ┌───────────────────────┼───────────────────────┐
              ▼                       ▼                       ▼
    ┌───────────────────┐   ┌───────────────────┐   ┌───────────────────┐
    │      PPCB         │   │      DPCC         │   │      MPCB         │
    │    (Punjab)       │   │     (Delhi)       │   │   (Maharashtra)   │
    └─────────┬─────────┘   └─────────┬─────────┘   └─────────┬─────────┘
              │                       │                       │
              ├───────────────────────┴───────────────────────┤
              ▼                                               ▼
   ┌────────────────────────────────┐              ┌───────────────────────┐
   │ CTO / CTE Expiry Matrix Run    │              │ Factory / Safety NOC  │
   │ • Red: 1-5 Years               │              │ • Punjab: Form 2-F    │
   │ • Orange: 5 Years              │              │ • Delhi: DFS 3-Year   │
   │ • Green: 10 Years              │              │ • Maha: DISH Form 1   │
   └────────────────────────────────┘              └───────────────────────┘
```

#### A. Punjab (Punjab Pollution Control Board - PPCB)
* **Categories & Consent Validity:**
  * **Red Category:** High pollution index (60+). Consent to Operate (CTO) valid for 1 year or 5 years depending on classification. Requires strict quarterly log uploads.
  * **Orange Category:** Moderate index (41-59). CTO valid for 5 years.
  * **Green Category:** Low index (21-40). CTO valid for 10 years.
* **Factories Act & Safety NOCs:**
  * Punjab Directorate of Factories: Renewal of Factory License (Form 2-F) due by October 31st annually.
  * Fire NOC: Repetitive 3-year validation checks with alert tracks.

#### B. Delhi (Delhi Pollution Control Committee - DPCC)
* **Categories & Consent Validity:**
  * **Red Category:** Strict prohibitions in conforming/non-conforming industrial areas. CTO valid for 5 years.
  * **Orange Category:** (e.g., small-scale dyeing, plastic molding). CTO valid for 5 years.
  * **Green Category:** (e.g., apparel packing, light engineering). CTO valid for 10 years.
  * **White Category:** (Pollution Index 0-20, non-polluting). **Exempted from CTE/CTO**. *System Automation Hook:* Instead of tracking expirations, the system generates and auto-submits the mandatory **Online DPCC Undertaking Form** to the DPCC portal within 30 days of industrial establishment.
* **Factories Act & Safety NOCs:**
  * **Delhi Fire Service (DFS) NOC:** Mandatory for buildings above 15 meters or high-occupancy hazard units. Valid for 3 years. T-90 notification triggers.
  * **Delhi Shops & Establishments Act:** Renewal triggers based on municipal corporate registration.

#### C. Maharashtra (Maharashtra Pollution Control Board - MPCB)
* **Categories & Consent Validity:**
  * Uses the OCMMS (Online Consent Management and Monitoring System) infrastructure.
  * **Red Category (L.S.I / M.S.I / S.S.I):** CTO valid for 1 to 5 years depending on scale and capital investment.
  * **Orange Category:** CTO valid for 5 years.
  * **Green Category:** CTO valid for up to 10 years.
  * **Blue Category (EES - Essential Environmental Services):** Introduced to recognize resource recovery and plastic/e-waste recycling units. *System Automation Hook:* Automatically triggers a **2-year extension bonus application** when regenerating CTO renewals in Maharashtra.
* **Factories Act & Safety NOCs:**
  * **DISH Maharashtra (Director of Industrial Safety and Health):** Factory license renewal tracking under Form 1 (and Form 2) with mandatory fee calculation engine based on maximum horsepower and peak workforce size.
  * **Maharashtra Fire Services NOC:** Valid for 1 year. The module tracks and alerts on the submission of the mandatory **"Form B" certificate** (half-yearly progress reports from a licensed fire safety agency due before January and July).

* **Generic Manual Fallback Template Engine:**
  * For other states, users can select a custom alert interval (e.g., 30, 90, 365 days).
  * Dynamic email and WhatsApp reminders are triggered on a T-90, T-30, and T-7 countdown leading up to custom expiry dates.

---

### Module 4: Grounded AI Auditing & Reconciliation
* **GSTR-2B vs 3B Auditing Engine:** A rule-based NestJS service that reconciles the uploaded GSTR-2B file (purchases reported by suppliers) with the client's internal purchase records from Tally. It flags any mismatch greater than 1% to the CA.
* **Low-Cost LLM Parser:** Leverages highly cost-effective, external APIs (such as Gemini 1.5 Flash or GPT-4o-mini on their respective free tiers). The engine processes uploaded tax notices or state circulars, returning a plain-English 3-sentence summary of the action required.

---

### Module 5: Credit Readiness Passport (The Monetization Engine)
This module helps MSMEs leverage their compliance record to solve cash flow issues. It converts compliance logs, timely tax payments, and certified financial transactions into a secure asset class.

```
 ┌──────────────────────┐   ┌──────────────────────┐   ┌──────────────────────┐
 │   Tally Cash Flow    │   │  GSTR-1 Sales Data   │   │  GSTR-3B Tax Paid    │
 └──────────┬───────────┘   └──────────┬───────────┘   └──────────┬───────────┘
            │                          │                          │
            └──────────────────────────┼──────────────────────────┘
                                       ▼
                       ┌──────────────────────────────┐
                       │   Credit Readiness Passport  │
                       │   • Standard JSON Schema     │
                       │   • Verification Hash        │
                       └──────────────┬───────────────┘
                                      │
            ┌─────────────────────────┴─────────────────────────┐
            ▼                                                   ▼
┌──────────────────────────────┐                    ┌──────────────────────────────┐
│       OCEN API Bridge        │                    │      TReDS Export Engine     │
│   • Consent Management (AA)  │                    │   • GSTR-1 Verified Invoices │
│   • LSP Embedded Lending     │                    │   • 1-Click Invoice Upload   │
└──────────────────────────────┘                    └──────────────────────────────┘
```

#### A. The Credit Passport Data Schema
ComplyPilot dynamically aggregates several database fields to construct an immutable **Credit Readiness Passport (CRP)**. This passport packages:
1. **GST Filing Health Index:** Historical percentage of on-time GSTR-1 and GSTR-3B filings over a rolling 12-month period.
2. **Sales Trail Authenticity:** A digital invoice map generated by matching the client's Tally Sales Ledger against their official GSTR-1 filed invoices.
3. **PPCB/DPCC/MPCB Operational Health:** Safety status confirmation demonstrating no active environmental notices or license expirations.
4. **Cash Flow Run Rate:** Debt serviceability metrics derived from automated parsing of standard bank statements.

#### B. The OCEN (Open Credit Enablement Network) API Bridge
ComplyPilot acts as a **Loan Service Provider (LSP)** under the OCEN protocol framework.
* **Consent Management (Account Aggregator Integration):** Links with Sahamati-approved Account Aggregators (AA) to allow MSMEs to securely share their bank transactions with prospective lenders using standard, single-use digital consent tokens.
* **Frictionless Underwriting Pipelines:** Translates database states into standard OCEN APIs, allowing partner banks and NBFCs to pull real-time cash flow and tax histories directly. This eliminates the manual paperwork cycle and enables instant, unsecured business loans.

#### C. Frictionless Invoice Discounting (TReDS)
* **Double-Verification Pipeline:** By verifying sales invoices against GSTR-1 filings, the system confirms the authenticity of invoices.
* **TReDS Aggregation:** ComplyPilot formats and packages these verified, undisputed invoices for export to India's central TReDS (Trade Receivables Discounting System) exchanges—such as M1xchange, Invoicemart, or RXIL.
* **1-Click Funding Requests:** Users can instantly request invoice discounting directly from their dashboard. This allows institutional financiers to bid on and fund their unpaid corporate invoices at low interest rates, transforming their accounts receivable into immediate working capital.

---

## 4. Non-Goals (Out of Scope for MVP)

To ensure rapid, cost-effective development, the following features are **strictly out of scope** for Phase 1:
1. **Direct Tax Filing execution:** ComplyPilot will *not* submit filings directly to government servers (no CAPTCHA solvers, no direct tax writing APIs). The platform is purely a tracking, verification, and status monitoring layer.
2. **Native Mobile App Stores:** ComplyPilot will not be published on iOS or Android stores in Phase 1. The MSME Owner portal is built strictly as a mobile-optimized responsive progressive web application (PWA).
3. **Custom LLM Hosting:** No local hosting of Llama/Mistral models. We will rely entirely on external, pay-as-you-go APIs (GPT-4o-mini) to stay within the free-tier operational boundaries.
4. **Active Windows/Tally Service Agent:** We will not ship an installable `.exe` Windows background service for Tally in the MVP. All data ingestion will rely on web-based Tally XML/Excel drag-and-drop file parsing.

---

## 5. Security & Privacy Framework

Since the application handles sensitive MSME financial ledgers, the platform will enforce:
* **Row Level Security (RLS):** Implemented in Supabase Postgres to guarantee that tenant `X` can never view files, ledgers, or compliance dates belonging to tenant `Y`.
* **Stateful Tokenization:** Document links sent over WhatsApp will use cryptographically secure HMAC hashes with built-in expiration parameters (48-hour timeouts).
* **Document Isolation:** Client tax receipts and bank statements will be stored in private, non-public Supabase S3-compatible buckets. Download URLs will require authenticated tokens.

---

## 6. Success Metrics & Performance Criteria

* **System Latency:** Drag-and-drop XML parser completes compilation and database injection in `< 3 seconds` for a 10MB Tally ledger file.
* **Drop-off Mitigation:** Over 80% of WhatsApp-triggered document requests completed without necessitating a standard username/password login.
* **Financial Accuracy:** The GSTR reconciler must flag 100% of arithmetic differences between matched 2B invoices and purchase registers.
### Module 7: Collaborative Compliance Calendar Engine
This is the core interactive hub of the homepage for both CAs and MSME owners, linking deadlines directly to document sharing and status tracking.

*   **Multi-Tenant Calendar Views:**
    *   **CA Profile Selector:** From a single homepage calendar view, the CA can select any client profile from a dropdown. Selecting a client instantly wipes and re-populates the calendar grid with that specific client's custom deadline matrix (e.g., loading PPCB for a Punjab textile client, or DPCC and DFS fire safety dates for a Delhi client).
    *   **MSME Unified View:** The MSME owner sees a single, locked view of their company's calendar, keeping them aligned with their CA's targets.
*   **Contextual Drawer Navigation (Calendar Cells as Workspaces):**
    *   Clicking any event or deadline cell on the calendar (e.g., "GSTR-3B Due") slides out a contextual side drawer.
    *   **Direct Document Drop:** Users can drag and drop required files directly into the drawer to bind them to that specific deadline task.
    *   **Filing Status Lifecycle:** The calendar cell dynamically changes color based on the task state: Grey (Draft/Upcoming), Amber (Action Required / Pending Document), Blue (Pending CA Filing/Verification), Green (Filed/Receipt Uploaded), and Red (Overdue).
    *   **Audit Comment Thread:** Provides a lightweight, task-specific chat panel in the drawer where the CA and owner can communicate regarding that specific filing (e.g., CA: *"PDF is blurred, re-upload page 2"*, Owner: *"Done, check now"*).
---


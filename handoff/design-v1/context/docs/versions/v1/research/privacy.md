# Data Protection & DPDP Compliance (v1 Research, Task v1-PM-4)

Researched 2026-10-05.
- ✅ = Confirmed on an official government website or Press Information Bureau (PIB).
- ⚠️ = Legal interpretation / secondary source (marked UNVERIFIED; formal legal review needed before commercial billing).

## Legal Framework: The DPDP Act & Rules 2025 ✅
1. **Notification:** The Digital Personal Data Protection (DPDP) Rules, 2025 were officially notified on **14 November 2025** under the DPDP Act, 2023.
2. **Transition Timeline:** Regulated entities have an 18-month phased timeline to achieve full operational compliance (effective May 2027). ComplyPilot builds security and consent safeguards from Day 1 to avoid costly retrofitting.
3. **Statutory Penalties:**
   - Up to **₹250 crore** for failure to adopt reasonable security safeguards to prevent data breaches.
   - Up to **₹200 crore** for failure to notify the Data Protection Board and affected data principals in the event of a breach.
   - Up to ₹50 crore for other non-compliances.

## Roles & Responsibilities under DPDP
- **Data Fiduciary:** The entity that determines the purpose and means of processing personal data.
  - The **CA Firm** is the Data Fiduciary for its MSME clients' data.
  - **ComplyPilot** is the Data Fiduciary solely for the CA firm's own registered user accounts (staff names, emails, phone numbers).
- **Data Processor:** The entity that processes personal data on behalf of a Data Fiduciary.
  - **ComplyPilot** acts as a Data Processor regarding the client data, filings, and documents uploaded by CA firms.
- **Personal Data Identified in v1:**
  - Contact names, mobile numbers, and emails.
  - PAN cards of sole proprietorships (a proprietor's PAN is legally considered personal data).
  - Aadhaar / PAN numbers visible on uploaded GST certificates or registration receipts.

## Concrete Technical Guardrails Built in v1
| Safeguard | Implementation Mechanism | Task Reference |
|---|---|---|
| **Explicit Consent Capture** | Unambiguous privacy notice and consent checkbox recorded with user ID, timestamp, and terms version during firm sign-up | v1-FS-3 |
| **Strict Tenant Isolation** | PostgreSQL Row Level Security (RLS) policies on every table ensuring Firm A can never view or query Firm B's records | v1-FS-2 |
| **Zero Government Credentials** | Strict policy: ComplyPilot **never** prompts for or stores government portal login passwords (violating tools like Jamku store these) | Architecture Rule |
| **Private Document Storage** | Filing receipts and licence PDFs stored in private cloud buckets; accessible only via short-lived, signed URLs | v1-FS-7 |
| **Right to Data Portability** | One-click export enabling a firm to download all metadata (JSON) and uploaded files (ZIP) for any client | v1-FS-9 |
| **Right to Erasure** | Complete hard-delete cascading across client tables and object storage upon firm request | v1-FS-9 |
| **Data Residency** | Deploy database and object storage in Indian cloud data centers (e.g. AWS Mumbai / Supabase India region) | v1-FS-1 |
| **Breach Protocol** | Defined runbook establishing 72-hour incident evaluation and notification procedures | v1-FS-9 |

## Primary Sources
- ✅ PIB: Digital Personal Data Protection Rules, 2025 Notified: https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=156054&ModuleId=3&reg=3&lang=2
- ✅ PIB Press Release on DPDP Enforcement: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&reg=3&lang=2
- ⚠️ Analysis of DPDP Rule Timelines: https://www.amsshardul.com/insight/enforcement-of-the-dpdp-act-and-notification-of-the-dpdp-rules/

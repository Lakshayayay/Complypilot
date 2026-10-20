# Pilot Recruitment & Discovery Script (v1 Research, Task v1-PM-6)

Started 2026-10-05.  
**Privacy Rule:** Record firm and contact initials only. Do not commit actual phone numbers, email addresses, or client names to version control.

## Pilot Engagement Pipeline Tracker
| Firm Ref | Introduced By | Manufacturing Client Base? | Outreach Status | Discovery Interview Date | Pilot Agreement? |
|---|---|---|---|---|---|
| Firm A | (Contact 1) | ~15 manufacturing units | Scheduled | Pending | Pending |
| Firm B | (Contact 2) | ~8 manufacturing units | Contacted | Pending | Pending |
| Firm C | (Direct intro) | ~20 fabrication & engineering units | Outreach drafted | Pending | Pending |

**Target:** show the v1 demo to at least 2 CAs before the v1 checkpoint (task v1-QA-6). Earlier interviews are welcome but don't block stage 0; scope was locked on 2026-10-17.

## Standardized Outreach Messages

### Template 1: Message to Professional Contacts (WhatsApp / Phone)
> "Hi [Name], I'm developing a software tool called ComplyPilot designed specifically for CA firms with manufacturing and factory clients. It tracks statutory tax deadlines (GST, TDS, PF, ESIC) alongside industrial factory licences (PCB CTE/CTO, Factories Act, Fire NOC) in a single unified dashboard instead of messy spreadsheets. It's completely free for our initial pilot cohort. Could you introduce me to 2–3 CAs who handle manufacturing accounts and would be willing to give 25–30 minutes for a quick feedback call? I would really appreciate the connection!"

### Template 2: Introduction to CA Partner
> "Hello [CA Name], [Contact Name] recommended I get in touch with you. I am building a dedicated compliance and licence tracking workspace for CA firms serving manufacturing units. Before writing production code, I'm conducting research into how top firms manage client deadlines, acknowledgements (ARNs), and industrial licence renewals during peak seasons. Would you have 30 minutes for a brief call or in-person discussion this week? Happy to work around your filing schedule."

---

## 30-Minute Structured Discovery Script

### 1. Practice Overview (5 Minutes)
- How many team members work in your compliance practice?
- Are clients assigned to specific assistants, or does everyone share the portfolio? (Validates v1 flat access model.)
- Approximately how many MSME manufacturing clients do you manage?

### 2. Current Compliance Workflow (10 Minutes)
- What system do you rely on today to monitor monthly filing status: Excel, physical register, Jamku, Winman CA-ERP, or memory?
- What are the major friction points when collecting data or confirming filings?
- Where do you store filing proofs (ARNs and official government receipts)?
- When the government unexpectedly extends a due date, how do you notify staff and update target deadlines?
- About how much time do you and your staff spend each week asking owners for documents or answers? Where does it happen: WhatsApp, calls, email? (Checks our guess that this wastes a lot of CA time; no Indian survey found, 2026-10-17.)

### 3. Industrial Licence Management (8 Minutes)
- Which states are your factory clients in? (v1 licence rules cover Delhi and Haryana only.)
- Do your factory clients ask for assistance tracking operational licences (Factories Act renewal, PCB Consent to Operate, Fire NOC, Boilers)?
- Has a client ever suffered factory downtime, fines, or supply disruption due to an unnoticed licence lapse?
- With the recent central guideline change making Consent to Operate (CTO) valid until cancelled, are your state boards still issuing renewals or requiring one-time fees?

### 4. Demo Feedback (7 Minutes)
v1 runs on made-up demo data only, so we ask for feedback, not real client data.
- If each deadline had one thread with the owner (messages, files, the receipt), would it replace your WhatsApp follow-ups? What's missing?
- Would your factory clients log in by email, or only use WhatsApp?
- Would you share an anonymized client spreadsheet (no real names or numbers) so our CSV import matches your columns?
- Could you describe 3–5 of your factory clients' products in plain words, without names? (Helps test our AI factory type matcher.)

---

## Post-Interview Synthesis Template
### Firm Ref: [Initials], Interview Date: [Date]
- **Firm Profile:** [Headcount] staff | [Total] clients | [Manufacturing] factories
- **Current System:** [Excel / Jamku / Winman / Other]
- **Top Priority Filings:** [GSTR-3B / QRMP / TDS / PF / ESIC]
- **Licence Tracking Need:** [High / Moderate / Handled by third-party consultant]
- **Client States:** [Delhi / Haryana / Other]
- **Time Spent Chasing Owners:** [Hours per week, channel]
- **Thread Idea Reaction:** [Would use / Unsure / Wouldn't use]
- **Identified Blockers:** [List specific concerns]
- **Actionable Scope Adjustments:** [Any required tweaks to v1 plan]

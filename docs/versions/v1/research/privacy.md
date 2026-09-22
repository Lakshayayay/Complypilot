# Privacy: the DPDP law (v1 research, task v1-PM-4)

Researched 2026-09-22. ✅ = confirmed on an official government site. ⚠️ = not yet confirmed (UNVERIFIED). This is not legal advice. Before charging any firm money, get a lawyer to review it.

## Facts ✅ (PIB note on the DPDP Rules)
- **The law:** the DPDP (Digital Personal Data Protection) Rules 2025 were notified on **14 November 2025**. Together with the DPDP Act 2023, they are India's data protection law.
- **Timeline:** organisations have **18 months** to comply, in phases.
- **Consent:** a clear, separate notice must say why data is collected. People can withdraw consent at any time.
- **Breaches:** if data leaks, the affected people must be told without delay, in plain language: what happened, the likely impact, what was done, and who to contact.
- **Penalties:**
  - up to **₹250 crore** for failing to keep reasonable security safeguards
  - up to **₹200 crore** for not reporting a breach
  - up to ₹50 crore for other breaches of the law

## Phase dates ⚠️ (secondary sources, but they all agree)
- **13/14 Nov 2025:** the Data Protection Board is set up.
- **13 Nov 2026:** consent managers can register (services that manage people's consents).
- **13 May 2027:** the main duties apply:
  - notice and consent
  - security safeguards
  - breach reporting (reportedly within 72 hours to the Board ⚠️)
  - keeping data only as long as needed, then deleting it
  - contracts with data processors

v1 ships in Jan 2027, before May 2027. We build these duties in now anyway: it costs far less than adding them later.

## Who is who
- **Data fiduciary (the one who decides why data is used):**
  - the **CA firm**, for its clients' data
  - **us**, for the sign-up details of firm staff (name, email, phone)
- **Data processor (the one who handles data for someone else):** **us**, for client data. ⚠️ Needs a lawyer's view.
- **Personal data in v1:**
  - contact names, phone numbers and emails
  - the PAN of a proprietor (a sole owner's PAN is personal data)
  - addresses
  - receipts and certificates, which may show names

## What v1 builds before any real client data goes in
| # | What | Task |
|---|---|---|
| 1 | Privacy notice and terms, shown at firm sign-up. We store who accepted, when, and which version | v1-FS-3 |
| 2 | Short, plain data-processing terms between us and each firm (a lawyer should review before paid use) | v1-PM-9 |
| 3 | Security: RLS on every table, so one firm can never see another's rows. Files stay private and open only through short-lived links. Data is encrypted in storage and in transit | v1-FS-2, FS-7 |
| 4 | A firm can export one client's data and delete it, including files. How long backups keep deleted data is written down ⚠️ | v1-FS-9 |
| 5 | Breach runbook: one page saying who does what, who we tell, and how fast | v1-FS-9 |
| 6 | Where the data lives: we prefer an Indian data-centre region. Decided in the stack ADR (the ADR records the decision) ⚠️ check the rules on sending data abroad | v1-FS-1 |
| 7 | We never store government-portal passwords (an AGENTS.md rule). Winman CA-ERP stores them, and Jamku imports them; we won't | Always |

## Sources (accessed 2026-09-22)
- ✅ PIB, "DPDP Rules, 2025 Notified": https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=156054&ModuleId=3&reg=3&lang=2
- ✅ PIB press release on the Rules: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2190014&reg=3&lang=2
- ⚠️ Phase dates: https://protectcomply.com/blog/dpdp-rules-2025-timeline · https://www.amsshardul.com/insight/enforcement-of-the-dpdp-act-and-notification-of-the-dpdp-rules/

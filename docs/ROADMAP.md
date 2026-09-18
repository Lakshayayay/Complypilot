# Roadmap

Five versions, built and shipped one at a time. Only the current version is planned in detail. The others stay short outlines until the version before them ships, because what we learn from real users changes them.

| Version | Name | What users can do after it ships | Status |
|---|---|---|---|
| v1 | CA Workspace | A CA firm keeps all its clients and their filing deadlines in one fast grid instead of Excel. | Planning: stage 0 not started |
| v2 | Document Chaser | The CA asks for a document; the owner uploads it from a WhatsApp link without logging in; the CA checks it. | Outline |
| v3 | Owner Console + Factory Layer | The owner sees a health score, calendar and documents on their phone, and gets early warnings before factory licences expire. | Outline |
| v4 | Grounded AI Auditing | The system spots tax credit at risk and ledger mistakes, and sends short, relevant regulation updates. | Outline |
| v5 | Credit Passport | The owner shares a verified compliance and finance profile with lenders. | Outline |

The order follows the PDP's own plan (Step 1 → 2 → 3). Details: `docs/versions/vN/README.md`.

## Long-lead items
Things that take weeks and are outside our control. Start them during v1, even though later versions need them.
- **WhatsApp Business account:** Meta must verify the business and approve each message template. Needed for v2.
- **Pilot CAs:** 3–5 real CA firms who try each version, plus sample Tally/Winman export files. Needed in v1 stage 0.
- **GST data provider:** only licensed GST Suvidha Providers (GSPs, companies allowed to connect to the GST system) can pull GST data. Compare options before v2–v4. UNVERIFIED; research during v1/v2.
- **Privacy basics:** privacy policy, terms and consent screens under India's data protection law (DPDP Act 2023). Needed before the first real client data in v1.

## Backlog
Ideas not yet scheduled. At each checkpoint we decide whether any move into a version.
- Tally desktop connector (a small Windows app that syncs Tally automatically). v1 uses file uploads instead.
- Live filing status from government portals, through a licensed provider.
- Billing (charging CA firms for ComplyPilot).
- SPCB coverage for more states.

## Risks and open decisions
- **Government portal passwords:** PDP Module 1 says portals are reached "using secured user credentials". Storing clients' portal passwords is a legal and security risk. Recommendation: never store them; use licensed providers. Decide when planning v2/v3.
- **Winman file format:** we don't know yet whether Winman's export format is documented (UNVERIFIED). We need real sample files from pilot CAs.
- **Credit rails:** OCEN, Account Aggregators and TReDS need lending partners and must follow RBI rules. RBI's newer Unified Lending Interface (ULI) also needs a look. Re-check everything when planning v5 (UNVERIFIED).
- **SPCB rules** differ by state and change over time. Every rule we use must cite its official source.
- **Scope creep** (the plan quietly growing): scope freezes at the end of each version's stage 0.

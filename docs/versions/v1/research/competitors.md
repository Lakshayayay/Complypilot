# Competitors (v1 research, task v1-PM-1)

Researched 2026-09-22. Prices come from vendor pages unless marked. Re-check them before quoting to pilots.

## Short answer
- **In India, CA practice software is crowded and cheap.** A client list with due dates and tasks is basic. It gives a CA no reason to switch.
- **None of the tools we found puts a CA's filing tracker together with a factory client's licences.** That is v1's edge.
- **Tools for environmental compliance exist** (EnvironDesk, EHSSaral), but they sell to environmental consultants, not to CAs.
- **Correction to the PDP:** "nobody tracks SPCB" is true of Tally, Winman and Odoo, but not of the whole market.

## CA practice-management tools
| Product | Who it's for | What it does | Price | Source |
|---|---|---|---|---|
| Jamku | Indian CA/CS firms, since 2013 | Clients, tasks, compliance dashboard, billing, documents, timesheets | ₹6,500/yr for a small team; ₹1,300–1,500 per user per year for bigger teams; ₹3,000 setup. Free plan ended in 2018 | Vendor page |
| Zoho Practice | Indian CA firms, especially Zoho Books users | Tasks, workpapers, documents, WhatsApp, client portal (Premium only) | ₹2,950/month for 5 users (Standard); ₹8,950/month (Premium); +₹400 per extra user per month | Vendor page |
| Winman CA-ERP | CA firms already using Winman tax software | Tax computation plus office management: client list, due-date tracking, tasks, billing | Not published (UNVERIFIED) | Vendor site, review site |
| QwikCA | Indian CA firms | Automatic GST/ITR/TDS tasks, fetches data from the GST portal, WhatsApp chasing, billing | ₹1,000–27,000/yr (vendor's own claim) | The vendor's own "best of" list, so it's biased |
| PracticeStacks | Indian CA firms | Compliance tracking, client list, e-signature, WhatsApp automation, client onboarding portal | ₹749/month for 5 users (vendor claim) | Vendor page |
| Turia | Indian CA firms | Replaces the spreadsheets, WhatsApp chats and task lists a firm uses today | Not checked | Vendor page |
| TaxDome | Accounting firms worldwide | Client portal, workflows, e-signature, billing | $800–1,200 per user per year | Vendor pricing page (seen via search) |
| Vyapar TaxOne (formerly Suvit) | CA firms that use Tally | Automates data entry into Tally (bank statements, invoices), GST preparation, WhatsApp | Not checked | Vendor page |

## The three tools from the PDP, updated
- **TallyPrime** is still the ledger (the business's account books). It has no client portal and no factory compliance. It can export data but has no "client list" (see `import-formats.md`).
- **Winman** is no longer only a tax calculator. Its CA-ERP product includes office management with due dates and tasks. We still found no client portal.
- **Odoo** is still too heavy for a 50-person factory. It is not a CA tool.

## Factory and environmental compliance tools
| Product | Who it's for | What it does | Source |
|---|---|---|---|
| EnvironDesk | Environmental consultants who manage 100+ factory clients | Fills in CTE, CTO and Form V applications; tracks deadlines; WhatsApp alerts | Vendor page |
| EHSSaral | Indian SMEs | Environmental compliance system | Vendor blog |
| Enterprise compliance tools (e.g. TeamLease RegTech) | Large companies | Legal compliance across many laws | Not checked in depth (UNVERIFIED) |

## What we copy
- **From Jamku and Winman:** the client × filing grid, and cheap per-firm pricing instead of per-user pricing.
- **From Zoho Practice and TaxDome:** a client portal and WhatsApp. These come later, in v2 and v3.
- **From Vyapar TaxOne:** nothing. We don't compete on typing data into Tally.

## What this means for v1
1. We don't try to beat Jamku on depth (billing, timesheets, task workflows). Those are out of scope.
2. We win on three things:
   - licences next to filings, for CAs whose clients are factories
   - a grid that is fast and clear
   - later, the owner's side (v3)
3. On price, pilots are free in v1 and billing sits in the backlog. For comparison, a small firm pays about ₹6,500–35,000 a year today.
4. The market has changed since the PDP was written. Consent to Operate no longer expires (PIB, Jan 2026), so the value of licence tracking shifts. See `licences.md`.

## Sources (all accessed 2026-09-22)
- Jamku pricing: https://madrecha.com/jamku/pricing/
- Zoho Practice pricing: https://www.zoho.com/practice/pricing
- Winman: https://www.winmansoftware.com/ · https://www.softwaresuggest.com/winman-ca-erp
- QwikCA (vendor-written list): https://www.qwikca.in/best-ca-practice-management-software/
- PracticeStacks: https://www.practicestacks.in/ca-management-software
- Turia: https://turia.in/
- TaxDome: https://taxdome.com/pricing
- Vyapar TaxOne / Suvit: https://www.suvit.io/pricing
- EnvironDesk: https://www.environdesk.com/
- EHSSaral: https://ehssaral.com/blog/best-environmental-compliance-software-india

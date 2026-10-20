# Competitor & Market Analysis (v1 Research, Task v1-PM-3)

Researched 2026-10-05. Prices sourced from public vendor websites.

## Key Market Takeaways
1. **Generic CA Practice Software is Commoditized:** Tools providing task lists, due-date tracking, and client directories are readily available in India at modest prices (₹6,500 to ₹30,000/year). Competing purely on general practice management is ineffective.
2. **Zero Unified Manufacturing Compliance:** No existing CA practice tool combines statutory tax filings (GST/TDS/PF) with operational industrial licences (Factories Act, PCB CTE/CTO, Fire NOC, Boilers) in a single unified client grid.
3. **Environmental Software Ignores CAs:** Dedicated EHS tools (EnvironDesk, EHSSaral) target industrial safety officers and environmental consultants, completely ignoring the CA who is the factory owner's primary outside compliance advisor.
4. **ComplyPilot's Wedge:** Serve CAs whose client base is predominantly factory owners and manufacturing MSMEs, bridging tax compliance and industrial operational legality.

## Competitive Landscape Matrix
| Solution | Primary Audience | Core Capabilities | Pricing Model | Differentiation vs ComplyPilot |
|---|---|---|---|---|
| **Jamku** | Indian CAs / CSs | Compliance dashboard, tasks, billing, staff timesheets, client portal | ~₹6,500/yr (small team) to ₹1,500/user/yr | Strong on office workflows and billing; zero factory licence tracking. |
| **Zoho Practice** | Indian CA firms | Practice tasks, working papers, client document vault, WhatsApp integration | ₹2,950/mo (5 users) to ₹8,950/mo (Premium) | Broad ecosystem integration (Zoho Books); lacks manufacturing licence workflows. |
| **Winman CA-ERP** | Winman tax software users | Tax computation, due-date tracking, office register, billing | Unlisted / bundled with desktop tax suite | Traditional on-premises feel; no collaborative client portal or licence tracking. |
| **PracticeStacks** | Indian CA firms | Compliance tracking, e-sign, client onboarding, WhatsApp notifications | ~₹749/mo (5 users) | Focuses on onboarding speed and WhatsApp; no industrial compliance. |
| **TaxDome** | Global accounting firms | Workflows, pipelines, CRM, e-signature, billing | $800–$1,200/user/year (~₹70,000+) | Prohibitive pricing for typical Indian MSME accounting practices. |
| **EnvironDesk** | Environmental consultants | Pollution CTE/CTO applications, Form V statements, SPCB reminders | Custom enterprise quote | Built for environmental engineers, not CAs or accountants. |

## Feature Strategy: What We Copy vs. What We Ignore
- **Adopt in v1:**
  - High-density Client × Filing grid (inspired by Jamku and spreadsheet familiarity).
  - Simple, flat pricing per firm (no per-seat penalties for audit interns).
  - Direct receipt attachment (PDF/image) linked to the government acknowledgement number (ARN).
- **Defer to Future Releases:**
  - WhatsApp messages and a no-login upload link (v2); a document vault (v3). v1 already has a simple owner login: the owner's own calendar and item threads (README F3, F6, F9).
  - Billing, timesheets, and invoicing (backlog; ComplyPilot is not an ERP).
  - Tally/Winman automatic data sync (backlog; requires dedicated on-premises agent).

## Strategic Implications for v1
- Focus strictly on speed and clarity: A CA partner can scan 100 clients in 10 seconds to see red flags.
- Deliver instant value by displaying factory licence expiry dates directly next to GST/TDS status.
- Pilots are free in v1; paid tiers will be modeled after successful pilot feedback.

## Re-check 2026-10-19: client portals and licences
Done for the stage 1 design study ([design-references.md](design-references.md)). Sources opened 2026-10-19.
| Tool | What the client side does | Factory licences? | Sources |
|---|---|---|---|
| Jamku | A client portal (client.jamku.app, linked from the login page). Clients see document requests, send documents, download task files, and see the task fields and stages the firm marks "client visible". iOS client app since May 2022. The help pages date from 2021–2023 | Not seen | [login page](https://jamku.app) · [client login](https://help.jamku.app/guide/client-login.html) · [documents](https://help.jamku.app/guide/document.html) · [changes 2021-03](https://help.jamku.app/changes/202103.html) · [changes 2022-05](https://help.jamku.app/changes/202205.html) |
| Zoho Practice | A self-service portal: client requests with messages and documents, e-sign requests, reviews, email. The help page doesn't say clients see tasks or due dates | No | [self-service portal](https://www.zoho.com/practice/help/self-service-portal.html) |
| TaxDome | A client portal and mobile app: a to-do dashboard (sign, pay, fill in organisers), chats with to-dos, notifications. **UNVERIFIED:** its site blocks automated reading, so this comes from search snippets of its help centre | No | [client portal](https://taxdome.com/client-portal) · [client home page](https://client-help.taxdome.com/article/64-mobile-client-dashboard) · [chats](https://help.taxdome.com/article/1487-chats-overview) |
| EnvironDesk | For environmental consultancies: "Tracking CTO, CTE & EC compliance for 50+ consultancies across Gujarat", with a compliance calendar and WhatsApp alerts to their clients | Pollution and environment clearances only; no tax filings | [environdesk.com](https://environdesk.com/) |

**Result:** client portals are common, so "the owner can log in" is not an edge on its own. Our edge is narrower: **tax filings and factory licences on one calendar that the CA and the owner both use.** README "Why this can win" now says this.

## Primary Sources
- Jamku Pricing: https://madrecha.com/jamku/pricing/
- Zoho Practice Pricing: https://www.zoho.com/practice/pricing
- Winman Software: https://www.winmansoftware.com/
- PracticeStacks: https://www.practicestacks.in/ca-management-software
- EnvironDesk: https://www.environdesk.com/

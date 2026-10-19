# Design References (v1 Research, for Stage 1 Design)

A study of 16 pages from similar or admired products: what to copy and what to avoid. Used by [design.md](../design.md).

- **Captured 2026-10-19**, full page at 1440 px wide, with Playwright. The images are in [design-refs/](design-refs/) and stay out of git (they are other companies' pages).
- **Checked 2026-10-19:** quoted words were matched against each live page's text; claims about images were checked by eye on the captures; colours were measured with ImageMagick (the top 1800 px of each page).
- "Window N" means the Nth 900 px slice of a full-page image (window 1 is the top).
- **In Figma:** the 26 windows used below, each with its caption, are on page `01 References` ([board](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=10-2)).

## The study
| # | Page | Image · where | What we learned | Feeds |
|---|---|---|---|---|
| 1a | [Jamku](https://madrecha.com/jamku) | `01a-jamku-info` · windows 1–3 | Busy and dated: a cartoon mascot, rainbow-coloured feature icons, a "15% FLAT DISCOUNT" badge, an emoji in the headline | What to avoid |
| 1b | [Jamku login](https://jamku.app) | `01b-jamku-app-login` · window 1 | Sends clients to a separate client portal ("Looking for Client Portal? Visit client.jamku.app") | Competitor check |
| 2 | [Zoho Practice](https://www.zoho.com/practice/) | `02-zoho-practice` · windows 4–5 | "Real-time client collaboration": a chat card "Tax Return Filling : FY 2024 · 4 Participants" (their spelling). Documents marked "Processed / Not Processed". Tasks with "High Priority", "IN PROGRESS", "YET TO START". Green brand, a small label above every section | Thread (F9), status |
| 3 | [Karbon](https://karbonhq.com/) | `03-karbon` · window 4 | A task "Prepare draft tax return · Due Friday" with comments and "32 Colleagues can see this conversation": thread and due date in one card. Confident coral brand with a warm dark brown | Thread, brand confidence |
| 4 | [PracticeStacks](https://practicestacks.in/ca-management-software) | `04-practicestacks` · window around y 700 | Pain points in its own words: "Tracking compliance deadlines in Excel sheets", "Manually chasing clients on WhatsApp for documents", "Missing GST/TDS deadlines for clients". Template look, navy and indigo | Pitch story; what to avoid |
| 5 | [Winman](https://winmansoftware.com/) | `05-winman` · window 2 | The dense, old desktop grid CAs are used to (Winman CA-ERP). Blue | CA grid density |
| 6 | [EnvironDesk](https://environdesk.com/) | `06-environdesk` · window 1 + page text | Closest on factory licences: chips "CCA, HW Auth, CGWA NOC"; "60·30·7 day reminders"; pain cards "A renewal slips. A factory shuts." and "Kya hua mera NOC?" (Hinglish); a stage board with stuck items. Sells to environmental consultancies in Gujarat, not to CAs. Green | Licence tracker (F7), owner voice, pitch |
| 7 | [ClearTax](https://cleartax.in/) | `07-cleartax` · window 1 | Trust claimed in words ("India's Most Trusted Tax Filing Platform", "100% Accuracy", "8M+ users"), bright blue, a real person's photo | Indian trust cues |
| 8 | [Vanta](https://www.vanta.com/) | `08-vanta` · windows 1–2 | A compliance brand can feel warm and editorial: serif headline "Get your compliance together", a checklist "Connect your tools · Remediate tests · Upload evidence · Find a trusted auditor". Lilac and purple, a llama mascot | Brand tone |
| 9 | [Stripe India](https://stripe.com/in) | `09-stripe-in` · windows 2–3 | Crisp light UI: product cards and a tidy data table with aligned numbers. A purple, pink and orange gradient | Tables, polish |
| 10 | [Notion Calendar](https://www.notion.com/product/calendar) | `10-notion-calendar` · window 5 | A calm calendar: a mini-month with today in red; task status shown as a dot and a word ("Not started", "In progress") | Calendar (F6) |
| 11 | [GOV.UK Tag](https://design-system.service.gov.uk/components/tag/) | `11-govuk-tag` · page text | "Tags are only used to indicate a status. Do not make a tag interactive." Adjectives, not verbs. "Do not use colour alone" (WCAG 1.4.1), and keep a tag's colour the same everywhere. In February 2026 tags moved to light backgrounds with dark text, because users took dark tags for buttons | Status chips |
| 12 | [GOV.UK Task list](https://design-system.service.gov.uk/components/task-list/) | `12-govuk-task-list` · research section, near the end | The whole task row is the link. Statuses in sentence case, not CAPITALS. "Completed" is plain black text with no background, so tasks that need action stand out | Calendar rows, status |
| 13 | [Carbon status indicators](https://carbondesignsystem.com/patterns/status-indicator-pattern/) | `13-carbon-status` · page text | A group shows its highest-attention colour (green + yellow + red shows red). "More than five or six indicators can overwhelm users" (no strict limit) | Calendar day cells |
| 14 | [UX4G 3.0](https://ux4g.gov.in/) | `14-ux4g` · windows 1 and 4 | The Government of India's design system: indigo and violet, built around WCAG 2, DPDP and GIGW 3.0. Its live page uses Noto Sans, then Noto Sans Devanagari and other Indian-script Noto fonts | Hindi-ready type, Indian standard |
| 15 | [DigiLocker](https://www.digilocker.gov.in/) | `15-digilocker` · window 1 | Government header, A- / A / A+ text-size buttons, a language switcher, "Trending Now" document chips. Lavender, navy and indigo | Owner familiarity, licence cards |

## What we take from it
1. Indian CA tools look busy, dated or like templates, and they claim trust in words ("most affordable", "Most Trusted", "100% Accuracy"). **Our chance: show trust through calm, careful design.**
2. **Status rules** (GOV.UK + Carbon): a word + an icon + a colour. Done items stay quiet; late or due-soon items stand out. A calendar day shows its most urgent status. Keep to about 5–6 status types. Status tags are not clickable, and use light backgrounds with dark text.
3. **Threads:** Zoho and Karbon prove the "one task, one conversation" pattern. Our edge is putting **factory licences and the owner on the same calendar**, not the thread itself.
4. **Colours already taken** (measured): blue (Winman, ClearTax), green (Zoho, EnvironDesk), indigo or violet (PracticeStacks, Jamku, Vanta, UX4G, DigiLocker), coral (Karbon); Stripe uses a purple, pink and orange gradient. Green, amber, red and blue are also needed for status. So **the brand accent must come from outside these.**
5. Avoid the template look we saw: a small label above every section, numbered sections, indigo gradients, three identical cards.

## Screens Lakshay captures by hand
These sites block automated browsers, or need an account or a phone. Save as `NN-app-window.png` in [design-refs/](design-refs/). Phone screenshots are fine.
| # | App | Exact window | Why |
|---|---|---|---|
| M1 | Linear (free account) | Issue list grouped by status · one issue open with comments and activity | Status icons, thread |
| M2 | TaxDome (taxdome.com, in a normal browser) | Home page product images · the "Client portal" or mobile app page | Owner-side portal |
| M3 | Google Calendar (your own) | A busy month view with "+3 more" · one event's detail popup | Calendar overflow |
| M4 | Notion Calendar (free, web) | Month view | Calendar calm |
| M5 | WhatsApp (phone) | A chat with a PDF and a photo, showing ticks · the attach menu | Owner thread |
| M6 | Google Pay or PhonePe (phone) | Home screen · transaction history list | Owner home, big tap targets |
| M7 | DigiLocker app (phone) | "Issued documents" list · one document open | Licence cards |
| M8 | Zerodha Kite or Razorpay (optional, if you have an account) | Any table with filters | Calm dense data |

Competitor findings from this study (client portals, EnvironDesk's market) are in [competitors.md](competitors.md#re-check-2026-10-19-client-portals-and-licences).

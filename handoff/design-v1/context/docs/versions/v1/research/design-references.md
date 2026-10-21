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

## Study 2 (light): Odoo, Tally, Winman
Added 2026-10-20 after the UX-2 review ("too minimal"). **Odoo is the main guide** for colours and elements. These are basic principles to steer UX-3 and UX-4, not rules. New references can join any time.
- **Odoo colours:** one deep, muted main colour (plum `#714B67`), a teal second colour (`#017E84`) and a grey (`#8F8F8F`), used sparingly on a calm, light base ([Odoo brand assets](https://www.odoo.com/page/brand-assets)).
- **Odoo elements:** a search bar with **Filters, Group By and Favorites** ([docs](https://www.odoo.com/documentation/19.0/applications/essentials/search.html)); the same records as a list, as cards or on a calendar; a **"chatter"** beside each record with messages, internal notes and activities ([docs](https://www.odoo.com/documentation/19.0/applications/productivity/discuss/chatter.html)); a stage bar on records.
- **Odoo tone:** the app is formal; the website is quirky (doodle arrows, lines like "No corporate bullsh*t"). For us: formal work screens, quirky brand moments.
- **Tally** (`21-tally-reports`, `22-tally-sales-register`, `23-tally-keyboard-first`): keyboard first. Alt+G "Go To" opens any screen from anywhere, a button bar runs down the right, and since release 2.0.1 a bottom bar shows the shortcuts. Dense reports with one highlighted row.
- **Winman** (`24-winman-caerp`, plus `05-winman` from study 1): dense tables in one window, "No navigation through multiple windows. Tables expands as you make entries!"
- odoo.com blocks automated browsers (403, 2026-10-20), so Odoo images come from Lakshay when handy (row O1 below). Optional, and it doesn't hold anything up.

## Study 3 (light): Notion
Added 2026-10-21 (Lakshay): Notion is close to what we do, so it joins Odoo as a second guide, mainly for **feel and motion**. Our colours and brand stay as they are.
- **Calm base:** a light page, lots of space, colour used only where it means something. This matches our "trust through calm design" point above.
- **Side peek:** a record opens as a panel on the right while the list stays visible; each view can choose side peek, centre peek or full page ([Notion release notes, 2022-07-20](https://www.notion.com/releases/2022-07-20)). For us: the thread panel (CA-20) slides over the calendar the same way.
- **Quiet rows:** controls appear on hover, so busy lists stay clean. For us: row actions on the client grid and lists.
- **Gentle, quick motion:** small fades and slides, nothing bouncy. For us: the UX-4 polish pass, inside the agreed motion rules.

**Why we keep references:** Lakshay plans a public case study (LinkedIn, Figma) showing which industry software was studied and which principles shaped each screen, so each reference names what it feeds.

## Screens Lakshay captures by hand
These sites block automated browsers, or need an account or a phone. Save as `NN-app-window.png` in [design-refs/](design-refs/). Phone screenshots are fine.
| # | App | Exact window | Why |
|---|---|---|---|
| O1 | Odoo (free "One App Free": install only the Project app, not Studio, or it becomes paid) | A list with the search menu open · one task with its chatter · the cards view | Colours and elements (study 2) |
| M1 | Linear (free account) | Issue list grouped by status · one issue open with comments and activity | Status icons, thread |
| M2 | TaxDome (taxdome.com, in a normal browser) | Home page product images · the "Client portal" or mobile app page | Owner-side portal |
| M3 | Google Calendar (your own) | A busy month view with "+3 more" · one event's detail popup | Calendar overflow |
| M4 | Notion (free, web) | Calendar month view · a database with one page open in side peek | Calendar calm, thread panel (study 3) |
| M5 | WhatsApp (phone) | A chat with a PDF and a photo, showing ticks · the attach menu | Owner thread |
| M6 | Google Pay or PhonePe (phone) | Home screen · transaction history list | Owner home, big tap targets |
| M7 | DigiLocker app (phone) | "Issued documents" list · one document open | Licence cards |
| M8 | Zerodha Kite or Razorpay (optional, if you have an account) | Any table with filters | Calm dense data |

Competitor findings from this study (client portals, EnvironDesk's market) are in [competitors.md](competitors.md#re-check-2026-10-19-client-portals-and-licences).

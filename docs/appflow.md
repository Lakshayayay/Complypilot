



# APP_FLOW.md: User Navigation Paths & Collaborative Calendar Workflows

## 1. System Entry Points & Authentication Grid

| User Persona | Entry Point | Target Form Factor | Primary Auth Mechanism | Landing Route |
| :--- | :--- | :--- | :--- | :--- |
| **CA / Professional Staff** | Desktop Web | Laptop/Desktop (1280px+) | NextAuth.js (Email/Password or Google OAuth) | `/ca/dashboard` |
| **MSME Owner** | Mobile-Responsive Web | Mobile viewport (320px–480px) | NextAuth.js (Phone Number + Password) | `/owner/dashboard` |
| **WhatsApp Guest** | Encrypted Token Link | Mobile Web (Chrome/Safari) | Cryptographically signed, short-lived JWT URL token | `/drop/[secure_token]` |

---

## 2. Global Navigation Map (Calendar-Centric)

```
                               ┌────────────────────────────────┐
                               │       Landing Page Router      │
                               │          (complypilot.in)       │
                               └──────────────┬─────────────────┘
                                              │
              ┌───────────────────────────────┼───────────────────────────────┐
              ▼                               ▼                               ▼
  ┌───────────────────────┐       ┌───────────────────────┐       ┌───────────────────────┐
  │     /auth/ca-login    │       │   /auth/owner-login   │       │ /drop/[secure_token]  │
  └───────────┬───────────┘       └───────────┬───────────┘       └───────────┬───────────┘
              │ (Desktop Web)                 │ (Mobile-First Web)            │ (No-Login Web)
              ▼                               ▼                               ▼
  ┌───────────────────────┐       ┌───────────────────────┐       ┌───────────────────────┐
  │ /ca/dashboard         │       │ /owner/dashboard      │       │ • Validate Expiry     │
  │ • Client Profile Sel. │       │ • Multi-State Health  │       │ • Display Target Doc  │
  │ • Shared Multi-Cal    │       │ • Shared Owner-Cal    │       │ • Direct Write POST   │
  └───────────┬───────────┘       └───────────┬───────────┘       └───────────┬───────────┘
              │                               │                               │
    ┌─────────┴─────────┐           ┌─────────┴─────────┐                     ▼
    ▼                   ▼           ▼                   ▼         ┌───────────────────────┐
/ca/clients/[id]    /ca/approvals  /owner/compliance  /owner/credit  │ Success Page: Closed  │
• Slide-Out Drawer  • File Viewer  • State Safety     • OCEN Loans   └───────────────────────┘
• WhatsApp Trigger  • Verify/Reject• Fire / SPCB      • TReDS Export
```

---

## 3. The CA User Journey (Desktop Web)

### Screen CA-1: Master Calendar Dashboard (`/ca/dashboard`)
* **Layout:** Left sidebar navigation, top global search & client picker, central area containing the interactive **Multi-Client Compliance Calendar**.
* **Primary UI Controls:**
  * **Global Client Profile Selector:** A searchable dropdown filter displaying all managed companies (e.g., *"Rajesh Textiles"*, *"Delhi Packing Co."*). Selecting a profile filters the calendar to show only that client's specific deadlines.
  * **Multi-Client Heatmap Toggle:** When no client is selected, the calendar displays a heatmap of deadlines across *all* clients, helping CAs prioritize high-volume filing weeks.
  * **Interactive Date Cells:** Days on the calendar are annotated with small status badges (e.g., **GST [3/5] Filed**, **PPCB Due [1]**).

### Screen CA-2: Client Profile Calendar Workspace (`/ca/clients/[id]`)
* **Layout:** Desktop workspace containing the selected client's monthly compliance roadmap.
* **Core Interaction Pattern (The Slide-Out Calendar Drawer):**
  * Clicking on any calendar cell or event card slides out a contextual side-drawer from the right side of the screen.

```
┌───────────────────────────────────────┐ ┌───────────────────────────────────────┐
│        CA Master Calendar Grid        │ │   Calendar Slide-Out Drawer (Active)  │
├───────────────────────────────────────┤ ├───────────────────────────────────────┤
│ [ MON ] [ TUE ] [ WED ] [ THU ] [ FRI ] │ │ Client: Rajesh Textiles               │
│ [ 01  ] [ 02  ] [ 03  ] [ 04  ] [ 05  ] │ │ Target: GSTR-3B Filing (May 2026)     │
│ [ 08  ] [ 09  ] [ 10* ] [ 11  ] [ 12  ] │ │ Status: [ Awaiting CA Verification ]  │
│                 ▲                     │ ├───────────────────────────────────────┤
│                 │ (Click Event)       │ │ • Documents Attached:                 │
│                 └─────────────────────┼─┤   [May_Sales.xlsx]  [May_Purchases.pdf] │
│                                       │ │ • Action: [ Approve ] [ Reject ]      │
│                                       │ ├───────────────────────────────────────┤
│                                       │ │ • Communication Comments:             │
│                                       │ │   [CA Staff]: "Upload missing bank  │
│                                       │ │   statements ASAP."                   │
│                                       │ │   [Owner]: "Just uploaded."           │
└───────────────────────────────────────┘ └───────────────────────────────────────┘
```

* **Interactive Elements inside the Side-Drawer:**
  * **Shared Document Grid:** Displays files attached to this deadline. CAs can drag and drop finalized government receipts (`challans`/`ARN PDFs`) directly into this slot.
  * **Status Update Selector:** Dropdown to update the filing status (`Pending Doc`, `Awaiting Approval`, `Filed & Secured`).
  * **WhatsApp Chaser Button:** If documents are missing, clicking the WhatsApp icon opens a modal to trigger an automated document request containing a unique signed upload token.
  * **Contextual Comments:** An inline chat thread specifically linked to this deadline, allowing staff and the client to communicate directly on this issue without moving to general chat.

### Screen CA-3: Verification & Approval Workspace (`/ca/approvals`)
* **Layout:** Split-screen interface (File Viewport on Left | Audit Controls Panel on Right).
* **Workflow:**
  * Displays files uploaded by MSME clients via WhatsApp.
  * Left side displays the PDF or JPG invoice directly using an interactive viewer.
  * Right side displays details extracted by the OCR parser: Client Name, Document Type, Estimated File Period, GSTIN.
  * **Controls:** 
    * `Approve` Button: Moves the document status to `Verified` and organizes it into the standard client document folder.
    * `Reject` Button: Prompts for a rejection reason (e.g., *"Invoice blurred/unreadable"*), which automatically triggers a correction message to the MSME owner on WhatsApp.

---

## 4. The MSME Owner User Journey (Mobile-First Web App)

### Screen OW-1: Compliance Calendar Dashboard (`/owner/dashboard`)
* **Layout:** Single column, card-based mobile layout. Fixed bottom navigation bar (Home | Compliance | Credit | Profile).
* **Primary Viewport (The Shared Calendar Interface):**
  * **Filing Health Progress Card:** Large visual circle graph showing overall percentage of on-time filings (Green, Amber, Red).
  * **Shared Monthly Calendar view:** Optimized for touch interactions. Days with upcoming tasks display color-coded dots representing status:
    * **Red Dot:** Action required (Missing documents / Approvals needed).
    * **Amber Dot:** In progress (Uploaded by client, awaiting CA review).
    * **Green Dot:** Filed & Secured (Receipt available).
  * **Tapping a Calendar Day:** Opens a bottom drawer displaying details, uploaded files, and an inline comment thread with their CA.

### Screen OW-2: Safety & License Center (`/owner/compliance`)
* **Layout:** Simple list cards categorized by license type.
* **State-Specific Views (DPCC / MPCB / PPCB):**
  * **DPCC (Delhi):** Cards display "Consent to Operate" status. If the category is set to "White", the card displays: *"DPCC Exempted - Online Undertaking Lodged on [Date]"*.
  * **MPCB (Maharashtra):** Shows the 1-year validation tracker for Fire Services NOC. Action button: *"Form B Half-Yearly Certificate Due in [Days]"*.
  * **PPCB (Punjab):** Shows CTO and Factory License (Form 2-F) renewal requirements.
* **Generic Fallback Panel:** If the state is not Punjab, Delhi, or Maharashtra, it displays a standard custom alert panel where the owner can tap "+ Add Custom Alert", input a renewal name (e.g., "Boiler Inspection"), define an expiry date, and configure periodic automated email/WhatsApp reminders.

### Screen OW-3: Credit & Loan Hub (`/owner/credit`)
* **Layout:** Tabbed mobile portal (Credit Passport | Get Loan | Bill Discounting).
* **Tab 1: Credit Passport**
  * Displays a calculated health profile: filing consistency score, audited revenue estimation, and clean ledger verification badges.
  * Action button: *"Export Secure Passport PDF"* or *"Share with Bank Partner via Account Aggregator"*.
* **Tab 2: Get Loan (OCEN Workflow)**
  * Select target working capital amount using an interactive slider.
  * Tap *"Apply Now"* to trigger a secure consent flow. It directs the user to a Sahamati-compliant portal to grant access to their parsed GST and transaction ledgers.
* **Tab 3: Bill Discounting (TReDS Pipeline)**
  * Lists verified unpaid customer invoices extracted from the Tally Sync database.
  * Tap *"Upload to TReDS"* for individual invoice items. ComplyPilot packages the verified invoice alongside GSTR-1 metadata and submits it to M1xchange / Invoicemart APIs, tracking financing bids on-screen.

---

## 5. The WhatsApp Document Drop-Zone Journey (No-Login, Zero-Read)

This flow is designed to maximize completion rates by removing the friction of username/password authentication for the MSME owner.

```
 [ Client receives WhatsApp ] ──► [ Taps link with cryptographic token ]
                                                │
                                                ▼
                                    [ Route: /drop/[token] ]
                                                │
                          ┌─────────────────────┴─────────────────────┐
                          ▼                                           ▼
              [ Token Expired (48h) ]                         [ Token Valid ]
                          │                                           │
                          ▼                                           ▼
               ┌──────────────────────┐                   ┌───────────────────────┐
               │  Error 403 Page      │                   │ Render Target Upload  │
               │  "Link Expired.      │                   │ "Upload: Bank Stmt"   │
               │  Request New Link."  │                   └───────────┬───────────┘
               └──────────────────────┘                               │
                                                                      ▼
                                                          [ Tap Upload / Select File ]
                                                                      │
                                                                      ▼
                                                          [ Direct Secure Write ]
                                                          [ to Supabase Storage ]
                                                                      │
                                                                      ▼
                                                          ┌───────────────────────┐
                                                          │ Render Success Page   │
                                                          │ "Upload Complete!"    │
                                                          └───────────────────────┘
```

### Flow Breakdown & UI Layout:
* **Step 1: Link Landing:** The user lands on `https://complypilot.in/drop/[secure_token]`.
* **Step 2: Security Handshake (Backend Router):**
  * Next.js server decodes the base64 URL token and verifies the payload signature:
    $$\text{Payload: } \{ \text{clientId}, \text{docType}, \text{expiration}, \text{requestId} \}$$
  * **Failure Path:** If the token has expired (exceeding 48 hours) or the signature fails decryption, the page displays: *"This upload link has expired. Your CA has been notified. Please request a new upload request."*
  * **Success Path:** If the token is valid, the page proceeds to load.
* **Step 3: User Interface Rendering (Mobile Drop-Zone):**
  * Displays a simple card layout containing the logo, Client Company name, and the specific target document type requested: *"Request from: [CA Firm Name] to upload [Document Type]"*.
  * **Zero Read Operations Constraint:** To prevent data leaks, this page features **no visual lists, no buttons to view older uploads, and no database lookup indicators**. It is strictly a single-use upload utility.
* **Step 4: The Upload Interaction:**
  * Features a large dropzone with a file icon: *"Tap here to take a photo or select your PDF document"*.
  * On file selection, the page displays a progress bar. The file uploads directly via a signed, write-only Supabase Storage URL.
* **Step 5: Completion State:**
  * On upload success, the dropzone vanishes. The UI shows a green checkmark: *"Upload successful. Thank you! Your CA has been notified of the submission. You can safely close this browser window."*
  * The backend triggers a database status update, marking the target document as `Pending Verification` and updating the CA Dashboard (Screen CA-3) in real-time.

---

### What's Next?

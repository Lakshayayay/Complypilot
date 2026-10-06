# Due Dates (v1 Research, Task v1-PM-1)

Researched 2026-10-05.
- ✅ = Confirmed on an official government website.
- ⚠️ = Secondary source only (marked UNVERIFIED).

**Rule:** Task v1-FS-5 must verify every ⚠️ row against official gazette text before writing code. Unconfirmed items stay out of the app.

## Core Rules That Shape the System Design
1. **Standard Pattern:** Most statutory tax due dates follow "Day N of the month following the filing period".
2. **State-Specific Splits:** GSTR-3B under QRMP (Quarterly Returns, Monthly Payment scheme for businesses with turnover up to ₹5 crore) splits due dates between the 22nd and 24th based on the client's state.
3. **Statutory Extensions:** The GST Council and Ministry of Finance regularly issue notifications extending due dates (e.g. portal glitches, natural disruptions). ComplyPilot needs **override dates** (task v1-FS-11) so updating a date once recalculates deadlines across every client.
4. **Income-tax Act 2025 Transition:** For filings from tax year 2026-27 onward, TDS returns transition to new form numbers (24Q → Form 138, 26Q → Form 140, 27EQ → Form 143, 27Q → Form 144). The app will display both the new and old form numbers side by side.
5. **New Labour Codes:** Four labour codes took effect on 21 November 2025. Standard PF and ESIC monthly contributions remain due on the 15th of the following month.

## Statutory Filing Matrix for v1
| Filing | Category / Scheme | Frequency | Statutory Due Date | Verification |
|---|---|---|---|---|
| GSTR-1 (Sales Statement) | GST: Monthly filer | Monthly | 11th of following month | ⚠️ |
| GSTR-1 | GST: QRMP quarterly | Quarterly | 13th of month after quarter | ⚠️ |
| GSTR-3B (Summary Return + Tax) | GST: Monthly filer | Monthly | 20th of following month | ✅ |
| GSTR-3B | GST: QRMP quarterly | Quarterly | 22nd or 24th of month after quarter (by state) | ✅ Days · ⚠️ States |
| PMT-06 (Challan Tax Payment) | GST: QRMP Month 1 & 2 | Monthly | 25th of following month | ⚠️ |
| CMP-08 (Challan-cum-Statement) | GST: Composition scheme | Quarterly | 18th of month after quarter | ⚠️ |
| GSTR-4 (Annual Return) | GST: Composition scheme | Annual | 30th April | ⚠️ |
| GSTR-9 (Annual Return) | GST: Regular filers | Annual | 31st December | ⚠️ |
| TDS / TCS Deposit | Tax Deducted at Source | Monthly | 7th of next month (March deposit due 30 April) | ✅ March · ⚠️ 7th |
| TDS Return (138/140/143/144) | Tax Deducted at Source | Quarterly | 31 Jul, 31 Oct, 31 Jan, 31 May | ⚠️ |
| Advance Tax Instalments | Income Tax | Quarterly | 15 Jun (15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (100%) | ⚠️ |
| Tax Audit Report | Income Tax: Audit cases | Annual | 30th September | ⚠️ |
| Income Tax Return (ITR) | Non-audit individuals/firms | Annual | 31st July (or 31st Aug under Finance Act 2026) | ⚠️ |
| Income Tax Return (ITR) | Corporate / Audit cases | Annual | 31st October | ⚠️ |
| PF Contribution (ECR Challan) | Employees' Provident Fund | Monthly | 15th of following month (no grace days) | ⚠️ |
| ESIC Contribution | Employees' State Insurance | Monthly | 15th of following month | ⚠️ |

## QRMP GSTR-3B State Division
- **Category 1 (Due 22nd):** Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, Daman & Diu, Dadra & Nagar Haveli, Puducherry, Andaman & Nicobar, Lakshadweep.
- **Category 2 (Due 24th):** Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, Jammu & Kashmir, Ladakh, Chandigarh, Delhi.
- **Statutory Source:** Rule 61 of the CGST Rules, 2017 (amended by Notification No. 82/2020-Central Tax).

## Technical Implementation Notes
- **Pure Function Engine:** The calculation logic will be built as a pure function (code that produces the exact same output for the same inputs with zero side effects). Inputs: Client filing profile, tax period, state. Output: `Date`.
- **Precedence Order:** Global Override Date > Firm Custom Date > Base Statutory Engine Date.
- **Weekend / Holiday Logic:** If a statutory date falls on a Sunday or gazetted holiday, official portals often accept filings the next business day. v1 uses official notified dates by default and handles emergency extensions via the override table.

## Primary Sources
- ✅ GST Portal User Guide on GSTR-3B: https://tutorial.gst.gov.in/userguide/returns/GSTR3B.htm
- ✅ GST Portal QRMP Scheme FAQs: https://tutorial.gst.gov.in/userguide/returns/FAQs_change_profile.htm
- ✅ Income Tax Dept TDS Due Dates: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/tds-compliance
- ⚠️ EPFO Notice on Removal of 5-Day Grace Period: https://www.epfindia.gov.in/site_docs/PDFs/Updates/PressRelease_12012016.pdf

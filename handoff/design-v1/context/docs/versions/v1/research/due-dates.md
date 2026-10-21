# Due Dates (v1 Research, Task v1-PM-1)

Researched 2026-10-05. Re-checked on official sources 2026-10-18 (tasks v1-PM-14 and v1-PM-10).
- ✅ = I opened the official government page or rule text and read the date there.
- ⚠️ = Not confirmed (UNVERIFIED): the official page could not be read, or it is unclear. These rows **stay out of the app** until confirmed.

**Rule:** Task v1-FS-5 writes only ✅ rows. The list of ⚠️ rows is at the end of this file.

## Core Rules That Shape the System Design
1. **Standard Pattern:** Most statutory tax due dates follow "Day N of the month following the filing period".
2. **State-Specific Splits:** GSTR-3B under QRMP (Quarterly Returns, Monthly Payment scheme for businesses with turnover up to ₹5 crore) splits due dates between the 22nd and 24th based on the client's state.
3. **Statutory Extensions:** The GST Council and Ministry of Finance regularly issue notifications extending due dates. ComplyPilot needs **override dates** (task v1-FS-11) so updating a date once recalculates deadlines across every client. **A real example, 28.09.2026:** CBDT Circular 07/2026 moved the AY 2026-27 audit-report date from 30 Sep to 21 Oct and the return date for the audit group from 31 Oct to 21 Nov ✅.
4. **Income-tax Act 2025 Transition:** The new Act applies to income from 1 April 2026; the old Act still governs 2025-26 (the e-filing FAQs say so). For TDS returns, 24Q is now **Form 138** ✅. The other new form numbers (26Q → 140, 27EQ → 143, 27Q → 144) are ⚠️. The app will show new and old form numbers side by side.
5. **New Labour Codes:** Four labour codes took effect on 21 November 2025 ✅ (PIB). PF and ESIC contributions are still understood to be due by the 15th of the following month.

## Statutory Filing Matrix for v1
| Filing | Category / Scheme | Frequency | Statutory Due Date | Verification |
|---|---|---|---|---|
| GSTR-1 (Sales Statement) | GST: Monthly filer | Monthly | 11th of following month | ✅ GST portal FAQ on GSTR-1 |
| GSTR-1 | GST: QRMP quarterly | Quarterly | 13th of month after quarter | ✅ same FAQ |
| GSTR-3B (Summary Return + Tax) | GST: Monthly filer | Monthly | 20th of following month | ✅ CGST Rule 61(1) |
| GSTR-3B | GST: QRMP quarterly | Quarterly | 22nd or 24th of month after quarter (by state; **Delhi and Haryana: 24th**) | ✅ CGST Rule 61(1), state table |
| PMT-06 (Challan Tax Payment) | GST: QRMP Month 1 & 2 | Monthly | 25th of following month | ✅ CGST Rule 61(3) |
| CMP-08 (Challan-cum-Statement) | GST: Composition scheme | Quarterly | 18th of month after quarter | ✅ CGST Rule 62(1) |
| GSTR-4 (Annual Return) | GST: Composition scheme | Annual | 30th April | ✅ CGST Rule 62(1) |
| GSTR-9 (Annual Return) | GST: Regular filers | Annual | 31st December | ✅ CGST Rule 80(1) |
| TDS / TCS Deposit | Tax Deducted at Source | Monthly | 7th of next month; March deposit due 30 April (government deductors paying by challan: 7 April); some property/rent/contractor cases (challan-cum-statement) 30 days after the month | ✅ incometax.gov.in Tax Payments FAQ (new Income-tax Rules 2026, Rule 218, keep the same dates) |
| TDS Return, salary | Form 138 (earlier 24Q) | Quarterly | 31 Jul, 31 Oct, 31 Jan, 31 May | ✅ incometax.gov.in Form 138 user manual |
| TDS Return, other | Form 140 (earlier 26Q) | Quarterly | 31 Jul, 31 Oct, 31 Jan, 31 May (Q4 in the next year) | ✅ Income Tax Dept, Form 140 document (Rule 219, checked 2026-10-21) |
| TDS / TCS Return, other | Forms 143, 144 (earlier 27EQ, 27Q) | Quarterly | Secondary sources agree on 31 Jul, 31 Oct, 31 Jan, 31 May | ⚠️ the official form documents exist, but the dates were not read on them (2026-10-21) |
| Advance Tax Instalments | Income Tax | Quarterly | 15 Jun (at least 15%), 15 Sep (45%), 15 Dec (75%), 15 Mar (all); presumptive taxation: all by 15 Mar | ✅ Income-tax Act 2025, section 408, on incometaxindia.gov.in (checked 2026-10-21) |
| Tax Audit Report | Income Tax: Audit cases | Annual | "one month before the return date, e.g. 30 September 2026"; for AY 2026-27 extended to **21 Oct 2026** | ✅ e-filing FAQ; CBDT Circular 07/2026 |
| Income Tax Return (ITR) | Audit cases | Annual | 31st October; for AY 2026-27 extended to **21 Nov 2026** (the group the circular calls "sl. no. 2") | ✅ CBDT Circular 07/2026 (companies not read) |
| Income Tax Return (ITR) | Non-audit individuals/firms | Annual | The e-filing FAQ says "31st July 2026 or 31st August for non-audit cases": unclear. Secondary sources (2026-10-21): the Finance Bill 2026 moves non-audit business cases to 31 Aug and keeps ITR-1 and ITR-2 at 31 Jul, from tax year 2026-27; the enacted text was not found | ⚠️ |
| PF Contribution (ECR Challan) | Employees' Provident Fund | Monthly | 15th of following month (no grace days) | ⚠️ EPFO pages unreadable (404 from my connection); search results of the EPF Scheme and the EPFO notice agree on the 15th |
| ESIC Contribution | Employees' State Insurance | Monthly | within 15 days of the last day of the month | ✅ esic.gov.in/contribution |
| MSME Form-1 | Companies that owe micro/small suppliers for over 45 days | Twice a year | 30 April and 31 October (for the half-years ending 31 March and 30 September): not confirmed | ⚠️ the duty to file is ✅; the dates are ⚠️ (5 or more professional sites agree; the MCA page is unreadable) |

MSME Form-1 (task v1-PM-10): the duty is confirmed in the Ministry of MSME annual report (order S.O. 5622(E), 2.11.2018: companies whose payments to micro and small suppliers run past 45 days send a half-yearly return to the Ministry of Corporate Affairs). The MCA website blocks automated reading, so the two dates are not confirmed. It applies only to **companies**, not proprietorships or partnerships.

## QRMP GSTR-3B State Division ✅
- **Category 1 (Due 22nd):** Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, Daman & Diu, Dadra & Nagar Haveli, Puducherry, Andaman & Nicobar, Lakshadweep.
- **Category 2 (Due 24th):** Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, Jammu & Kashmir, Ladakh, Chandigarh, Delhi.
- **Statutory Source:** Rule 61(1) of the CGST Rules, 2017, read on the CBIC site 2026-10-18; the state lists match.

## ⚠️ Rows staying out of the app until confirmed
1. TDS and TCS returns Forms 143 and 144 (Form 140 confirmed 2026-10-21).
2. ~~Advance tax 15 Sep, 15 Dec and the percentage split~~: confirmed 2026-10-21 (section 408).
3. ITR for non-audit filers, and ITR dates for tax year 2026-27 under section 263 of the new Act (Finance Bill 2026 says 31 Aug for non-audit business, per secondary sources only).
4. PF 15th. A search of the EPF Scheme 1952 (paragraph 38(1): "within fifteen days of the close of every month") and the EPFO press release of 12.01.2016 (grace period withdrawn) both point to the 15th, but I could not open either page.
5. MSME Form-1 dates (professional sites agree on 30 Apr and 31 Oct).

Lakshay chose on 2026-10-18 to leave items 4 and 5 as ⚠️. The CAs confirm them in the demo calls (v1-QA-6).

## Technical Implementation Notes
- **Pure Function Engine:** The calculation logic will be built as a pure function (code that produces the exact same output for the same inputs with zero side effects). Inputs: Client filing profile, tax period, state. Output: `Date`.
- **Precedence Order:** Global Override Date > Firm Custom Date > Base Statutory Engine Date.
- **Weekend / Holiday Logic:** If a statutory date falls on a Sunday or gazetted holiday, official portals often accept filings the next business day. v1 uses official notified dates by default and handles emergency extensions via the override table.

## Primary Sources (opened 2026-10-18 unless marked)
- ✅ CBIC CGST Rules 61, 62, 80: https://taxinformation.cbic.gov.in/content/html/tax_repository/gst/rules/cgst_rules/active/chapter8/rule61_v1.00.html (change the last part to rule62 or rule80)
- ✅ GST Portal FAQ on GSTR-1: https://tutorial.gst.gov.in/userguide/returns/GSTR_1.htm
- ✅ GST Portal User Guide on GSTR-3B: https://tutorial.gst.gov.in/userguide/returns/GSTR3B.htm (opened by search 2026-10-05)
- ✅ Income Tax Dept, Tax Payments FAQ: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/tax-payments
- ✅ Income Tax Dept, TDS Compliance FAQ: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/tds-compliance
- ✅ Income Tax Dept, Income Tax Returns FAQ: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/income-tax-returns
- ✅ Form 138 user manual: https://www.incometax.gov.in/iec/foportal/newformpage/forms/form138-um
- ✅ CBDT Circular 07/2026 (28.09.2026): https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-09/Circular-7-2026.pdf
- ✅ ESIC contribution page: https://esic.gov.in/contribution
- ✅ PIB, labour codes in force: https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2192463&reg=48&lang=2
- ✅ Ministry of MSME annual report 2018-19 (S.O. 5622(E)): https://www.msme.gov.in/static/uploads/2025/06/07122dc914105f1ed8c869ad3d189e0f.pdf
- ✅ Income Tax Dept, Form 140 document (opened by search 2026-10-21): https://www.incometaxindia.gov.in/documents/d/guest/fn-140
- ✅ Income-tax Act 2025, section 408 (advance tax instalments, opened by search 2026-10-21): https://www.incometaxindia.gov.in/w/section-408-5
- ⚠️ Forms 143 and 144 documents (dates not read): https://www.incometaxindia.gov.in/documents/d/guest/fn-143 · https://www.incometaxindia.gov.in/documents/d/guest/fn-144
- ⚠️ EPFO Notice on Removal of 5-Day Grace Period: https://www.epfindia.gov.in/site_docs/PDFs/Updates/PressRelease_12012016.pdf (returns "not found" now)

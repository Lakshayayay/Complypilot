# Due dates (v1 research, task v1-PM-2)

Researched 2026-09-22. This is the list of filings v1 creates due dates for.
- ✅ = confirmed on an official government site.
- ⚠️ = seen only on secondary sites (UNVERIFIED).

**Rule:** before any code is written, task v1-FS-5 must check every ⚠️ row against the official text. A row we can't confirm stays out of the app.

## Four facts that shape the design
1. **Most due dates follow one pattern:** "day N of the month after the period". One exception depends on the client's state: GSTR-3B under QRMP.
2. **The government often extends due dates** through official notifications (✅ gst.gov.in says this for GSTR-3B). So the app needs **override dates**: we change a date once and every client gets the new one (task v1-FS-11).
3. **A new income-tax law started on 1 April 2026** (the Income-tax Act, 2025). From the first quarter of tax year 2026-27, TDS returns have new form numbers:
   - 24Q → 138 (salary)
   - 26Q → 140 (other payments to residents)
   - 27Q → 144 (payments to non-residents)
   - 27EQ → 143 (TCS)

   Returns for the year ending March 2026 (FY 2025-26) still follow the old Act. The app shows both names, e.g. "TDS return: salary (Form 138, earlier 24Q)".
4. **Four new labour codes started on 21 Nov 2025** and replaced the old PF and ESI laws. As far as we can see, PF and ESIC payments are still due on the 15th (⚠️ check the new schemes).

## Proposed v1 filing list (final list decided at the stage 0 gate, v1-PM-9, after pilot interviews)
Terms used below:
- **QRMP:** GST's quarterly scheme for businesses with turnover up to ₹5 crore. They file returns every quarter but pay tax every month.
- **Composition:** a simple GST scheme for small businesses that pay a fixed rate.

| Filing | Applies when | Period | Due | Check |
|---|---|---|---|---|
| GSTR-1 (sales return) | GST, monthly filer | Month | 11th of next month | ⚠️ |
| GSTR-1 | GST, QRMP | Quarter | 13th of month after quarter | ⚠️ |
| GSTR-3B (summary return + tax) | GST, monthly filer | Month | 20th of next month | ✅ |
| GSTR-3B | GST, QRMP | Quarter | 22nd or 24th of month after quarter, by state (list below) | ✅ days · ⚠️ state list |
| PMT-06 (monthly tax payment) | GST, QRMP, 1st and 2nd month of quarter | Month | 25th of next month | ⚠️ |
| CMP-08 (composition tax statement) | GST, composition | Quarter | 18th of month after quarter | ⚠️ |
| GSTR-4 (composition annual return) | GST, composition | Year | 30 April | ⚠️ |
| GSTR-9 (annual return) | GST, above the turnover limit | Year | 31 December | ⚠️ |
| TDS/TCS payment | Deducts TDS | Month | 7th of next month; March → 30 April | ✅ March · ⚠️ 7th |
| TDS/TCS quarterly return (138/140/143/144) | Deducts TDS | Quarter | 31 Jul, 31 Oct, 31 Jan, 31 May | ⚠️ |
| Advance tax | Income tax | Instalments | 15 Jun, 15 Sep, 15 Dec, 15 Mar | ⚠️ |
| Tax audit report | Income tax, audit case | Year | 30 September | ⚠️ |
| Income tax return | Non-audit individual (ITR-1/2) | Year | 31 July | ⚠️ |
| Income tax return | Non-audit business (ITR-3/4) | Year | 31 August from tax year 2026-27 (Finance Act 2026); 31 July before | ⚠️ |
| Income tax return | Audit case | Year | 31 October | ⚠️ |
| PF (ECR return + payment) | Has PF registration | Month | 15th of next month, no grace days since 2016 | ⚠️ |
| ESIC contribution | Has ESIC registration | Month | 15th of next month | ⚠️ |

Not tracked in v1:
- IFF (optional invoice upload for QRMP, due the 13th) ✅
- transfer-pricing cases
- ROC (company law) filings. We ask pilots about these in v1-PM-7.

## QRMP GSTR-3B: which states file on the 22nd and which on the 24th ⚠️
- **22nd:** Chhattisgarh, Madhya Pradesh, Gujarat, Maharashtra, Karnataka, Goa, Kerala, Tamil Nadu, Telangana, Andhra Pradesh, Daman & Diu, Dadra & Nagar Haveli, Puducherry, Andaman & Nicobar Islands, Lakshadweep.
- **24th:** Himachal Pradesh, Punjab, Uttarakhand, Haryana, Rajasthan, Uttar Pradesh, Bihar, Sikkim, Arunachal Pradesh, Nagaland, Manipur, Mizoram, Tripura, Meghalaya, Assam, West Bengal, Jharkhand, Odisha, Jammu & Kashmir, Ladakh, Chandigarh, Delhi.
- **Official text to check in v1-FS-5:** rule 61 of the CGST Rules, as amended by Notification 82/2020-Central Tax. The state is taken from the client's main place of business.

## Open questions
- **Holidays:** if a due date falls on a Sunday or public holiday, does it move? UNVERIFIED. v1 uses the notified date as it is; override dates cover any exceptions.
- **Monthly vs quarterly GST:** a client can switch between them each quarter (✅ opt-in windows on gst.gov.in). v1 stores which scheme the client is on, per quarter.

## What this means for v1
- **The due-date engine is a "pure function":** code with no side effects that always gives the same answer for the same inputs. Inputs: a rules table (filing, how often, day, month offset, state group), the client's profile and the period. Output: the due date. Every row above gets a unit test (a small automatic check).
- **Override dates** are stored separately, and the engine uses them first.
- **Form names** show the new number and the old one side by side.

## Sources (accessed 2026-09-22)
- ✅ GSTR-3B FAQ (monthly 20th; quarterly 22nd/24th; extension by notification): https://tutorial.gst.gov.in/userguide/returns/GSTR3B.htm
- ✅ QRMP FAQ (₹5 crore limit, opt-in windows, IFF 13th): https://tutorial.gst.gov.in/userguide/returns/FAQs_change_profile.htm
- ✅ TDS for March due 30 April 2026: https://www.incometax.gov.in/iec/foportal/help/all-topics/e-filing-services/tds-compliance
- Form 138/140 pages on the official site (found, not yet read in full): https://www.incometax.gov.in/iec/foportal/newformpage/forms/form140-um
- ⚠️ QRMP state list: https://cleartax.in/s/gstr-3b
- ⚠️ New TDS form numbers and quarterly dates: https://taxguru.in/income-tax/tds-returns-statements-income-tax-act-2025.html
- ⚠️ ITR and tax-audit dates, Finance Act 2026 change: https://cleartax.in/s/section-263-income-tax-act-2025 · https://www.pgtandassociates.com/post/tax-audit-due-date-ay-2026-27-30-september-31-october
- ⚠️ PF (grace period withdrawn in 2016; EPFO press release found, not read): https://www.epfindia.gov.in/site_docs/PDFs/Updates/PressRelease_12012016.pdf
- ⚠️ Labour codes in force 21 Nov 2025, and the ESIC wage change: https://updates.complianceage.com/social-security-code-update/

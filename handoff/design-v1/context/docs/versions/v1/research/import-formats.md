# Client Import Formats & Schema Specification (v1 Research, Task v1-PM-5)

Researched 2026-10-05.
- ✅ = Confirmed on vendor documentation.
- ⚠️ = Secondary observation (marked UNVERIFIED).

## Existing Accounting Tool Limitations
1. **TallyPrime:**
   - CAs maintain separate company data files for each client in Tally. There is no unified "all clients" master export across disconnected companies.
   - Exporting directly from Tally requires either writing custom TDL (Tally Definition Language) scripts or querying via local ODBC, which is out of scope for v1.
2. **Winman CA-ERP:**
   - Winman stores office management data in proprietary, password-protected Access database files (`CommonMIS.mdb`).
   - Third-party tools like Jamku instruct users to extract passwords and client records from this file. **ComplyPilot will not do this**, as it violates security best practices and exposes user credentials.
3. **v1 Design Decision:** Provide a clean, standardized UTF-8 CSV import template that CAs can easily populate from their existing firm spreadsheets or client lists.

## Canonical CSV Schema Specification
| Column Header | Required? | Format / Validation Rule | Example |
|---|---|---|---|
| `client_name` | Yes | Non-empty string (max 255 chars) | Apex Precision Engineering Pvt Ltd |
| `trade_name` | No | Optional string (max 255 chars) | Apex Tools |
| `gstin` | No | 15 alphanumeric characters: `^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$` | 07AAAAA0000A1Z5 |
| `pan` | No | 10 alphanumeric characters: `^[A-Z]{5}[0-9]{4}[A-Z]{1}$` | AAAAA0000A |
| `state` | Yes | Standard Indian State / UT name; must match GSTIN prefix if GSTIN provided | Delhi |
| `gst_scheme` | Yes | Enum: `monthly`, `qrmp`, `composition`, `none` | monthly |
| `tds_applicable` | Yes | Boolean: `yes` / `no` | yes |
| `pf_applicable` | Yes | Boolean: `yes` / `no` | yes |
| `esic_applicable` | Yes | Boolean: `yes` / `no` | no |
| `income_tax_type`| Yes | Enum: `audit`, `non-audit`, `none` | audit |
| `contact_name` | No | String (max 100 chars) | Rajesh Kumar |
| `contact_phone`| No | 10-digit Indian mobile number: `^[6-9][0-9]{9}$` | 9876543210 |
| `contact_email`| No | Standard RFC 5322 email format | accounts@apexprecision.com |

## Validation & Parsing Rules
1. **Partial Success Semantics:** A batch of 100 rows containing 95 valid records and 5 invalid records imports the 95 valid clients immediately. The 5 invalid rows are returned in a downloadable error summary showing row number and exact failure reason.
2. **Deduplication:** A row containing a `gstin` or `pan` that already exists under the same firm is flagged as an error to prevent duplicate records.
3. **Encoding & Size Limits:** File must be valid UTF-8 CSV; maximum file limit of 1,000 rows per upload to maintain sub-2s execution.
4. **Mandatory Unit Tests:** As required by engineering rules, the CSV parser and format validators must be 100% covered by unit tests.

## Primary Sources
- ✅ TallyHelp: Exporting Data in TallyPrime: https://help.tallysolutions.com/export-data-in-tally/
- ⚠️ GSTIN Validation Structure (Goods & Services Tax Network): https://www.gst.gov.in/

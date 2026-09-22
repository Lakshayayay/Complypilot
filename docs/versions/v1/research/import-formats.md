# Import formats (v1 research, task v1-PM-5)

Researched 2026-09-22. ✅ = confirmed on an official or vendor site. ⚠️ = not yet confirmed (UNVERIFIED).

## Tally ✅
- TallyPrime can export:
  - masters (for example ledgers) as XML or SDF files
  - reports as Excel, PDF, XML, JSON and other formats
  - customer and supplier details to Excel, through ODBC (a standard way for other programs to read data)
- A CA's copy of Tally holds **one company per client**, so there is no single "client list" to export. Bringing in a client's details from Tally means one export per client.

## Winman ⚠️
- Winman CA-ERP has Excel import and export for some tables, such as the 3CD (tax audit report) tables and the trial balance.
- We found **no documented way to export the client list**.
- Jamku's makers tell users to open Winman's internal database file (`CommonMIS.mdb`, an MS Access file protected by a vendor password) and copy out name, PAN and portal password. **We won't do this.** It breaks easily, and it copies out portal passwords.

## Decision for v1: one CSV template
CAs already keep their client list in Excel, or can export it from Winman or Tally reports. They paste it into our template and upload it.
- **File type:** CSV (in Excel, use "Save as → CSV UTF-8"). Accepting `.xlsx` files directly would need an extra library. v1-FS-8 decides whether that's worth it.
- **Proposed columns.** We check these against the pilots' own Excel sheets in v1-PM-7. `*` means required.

| Column | Example | Check |
|---|---|---|
| client_name* | Sharma Dyeing Works | Not empty |
| trade_name | Sharma Textiles | none |
| gstin | 03ABCDE1234F1Z5 | 15 characters; first 2 = state code; characters 3–12 = the PAN ⚠️ (checksum rule to confirm) |
| pan | ABCDE1234F | 5 letters, 4 digits, 1 letter ⚠️ |
| state* | Punjab | Must be on our state list; must match the GSTIN state code |
| gst_scheme | monthly / qrmp / composition / none | One of these |
| tds, pf, esic | yes / no | yes or no |
| income_tax | audit / non-audit / none | One of these |
| contact_name, contact_phone, contact_email | none | Phone must be 10 digits; email must look like an email |

## Error rules
- Good rows are saved. Each bad row is listed with its row number and the reason. A row is saved completely or not at all.
- A GSTIN that already exists in the same firm counts as a bad row.
- Limit: 1,000 rows per file.
- Unit tests cover every check above (AGENTS.md: parser logic must have unit tests).

## Backlog
- Direct import from Tally XML files, once pilots give us real sample files.
- `.xlsx` upload, if v1-FS-8 leaves it out.

## Sources (accessed 2026-09-22)
- ✅ TallyHelp, exporting data: https://help.tallysolutions.com/export-data-in-tally/
- ✅ TallyHelp, exporting ledger masters: https://help.tallysolutions.com/developer-reference/case-studies/case-study-3/
- ⚠️ Winman Excel import: https://www.winmansoftware.com/support/training-videos/
- ⚠️ Getting data out of Winman's database (Jamku discussion): https://github.com/madrecha/portal/discussions/34

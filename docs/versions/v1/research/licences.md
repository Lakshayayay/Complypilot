# Factory Licences (v1 Research, Task v1-PM-2)

Researched 2026-10-05.
- ✅ = Confirmed on an official government website or Press Information Bureau (PIB).
- ⚠️ = Secondary source only (marked UNVERIFIED).

## Strategic Context
In v1, the CA or firm assistant records factory licences manually from client certificates. ComplyPilot alerts them when a renewal is coming up.
Note: Dynamic state-by-state applicability ("which licences does a plastic injection moulding unit in Haryana require?") is deferred to v3. v1 focuses on tracking certificates that clients already hold.

## Critical Regulatory Shift: Consent to Operate (CTO) Valid Until Cancelled ✅
Under the amended Uniform Consent Guidelines issued by the Ministry of Environment, Forest and Climate Change (MoEFCC) via PIB:
1. **CTO Validity:** Once granted by a State Pollution Control Board (SPCB), CTO remains valid until cancelled. Traditional 1-year or 5-year renewal cycles are being replaced by risk-based compliance inspections.
2. **One-Time Fees:** State boards may collect a one-time fee covering 5 to 25 years.
3. **Small Scale Industries (MSME):** White category units are exempt; green/orange category units in notified industrial zones can obtain Consent to Establish (CTE) on self-declaration.
4. **Transition Period (⚠️):** CAs report that older CTO certificates still carry printed expiry dates until state boards issue formal digital endorsements.

## Tracked Industrial Licences in v1
| Licence / Approval | Governing Act / Authority | Expiration Model | Alert Thresholds | Verification |
|---|---|---|---|---|
| Factory Licence | Occupational Safety, Health & Working Conditions Code (replaced Factories Act 1948) | State-dependent (1 to 10 years, or auto-renewal upon annual fee payment) | 90, 60, 30 Days | ⚠️ |
| CTE (Consent to Establish) | State Pollution Control Board (Water & Air Acts) | Fixed project term (usually 1–5 years during construction) | 90, 60, 30 Days | ⚠️ |
| CTO (Consent to Operate) | State Pollution Control Board | New: Valid until cancelled. Older: Expiry date on certificate | 90, 60, 30 Days (if expiry set) | ✅ / ⚠️ |
| Fire Safety NOC | State Fire Services Department | Renewable (typically 1, 3, or 5 years depending on building hazard class) | 90, 60, 30 Days | ⚠️ |
| Boiler Registration | Chief Inspector of Boilers (Boilers Act) | Annual hydraulic test & physical inspection | 90, 60, 30 Days | ⚠️ |
| Hazardous Waste Authorisation | SPCB (Hazardous and Other Wastes Rules, 2016) | Usually 5 years; can now be combined with CTO | 90, 60, 30 Days | ⚠️ |
| PESO Licence | Petroleum and Explosives Safety Organization | Variable (1 to 5 years based on gas/chemical storage capacity) | 90, 60, 30 Days | ⚠️ |
| Custom / Other Licence | Municipal trade licences, Weights & Measures, Contract Labour | Variable / user-defined | 90, 60, 30 Days | n/a |

## Technical Data Model Requirements
- **Optional Expiry Date:** `expiry_date` column must be nullable. When null, the UI displays `Valid until cancelled` instead of an alert.
- **Alert State Machine:**
  - `> 90 days remaining`: Normal (Green)
  - `61–90 days remaining`: Early Notice (Blue/Info)
  - `31–60 days remaining`: Warning (Yellow)
  - `1–30 days remaining`: Critical (Orange)
  - `≤ 0 days remaining`: Expired (Red)
- **Document Attachment:** Each licence record supports uploading the official certificate (PDF/JPG/PNG up to 10 MB) into tenant-isolated storage.

## Primary Sources
- ✅ PIB: Environment Ministry Amends Uniform Consent Guidelines: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219415&reg=3&lang=1
- ⚠️ Summary of MoEFCC Notification on Consent Validity: https://www.scconline.com/blog/post/2026/01/30/government-amends-consent-guidelines-2026/
- ⚠️ Ministry of Labour & Employment OSH Code Overview: https://www.pib.gov.in/FactsheetDetails.aspx?Id=150475&reg=48&lang=2

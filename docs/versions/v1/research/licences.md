# Licences (v1 research, task v1-PM-3)

Researched 2026-09-22. ✅ = confirmed on an official government site. ⚠️ = not yet confirmed (UNVERIFIED).

In v1, the CA records each factory client's licences by hand, typing in the details from the certificate. The app warns when a licence is close to expiring. v1 does **not** work out which licences a factory needs; that "state profiler" is v3.

## Big change: Consent to Operate no longer expires ✅
The PIB (the government's press office) announced in January 2026 that the Environment Ministry changed the national consent guidelines under the Air and Water Acts:
- **CTO (Consent to Operate, the pollution board's permission to run a factory):** "CTO, once granted, will remain valid until it is cancelled." Compliance is now enforced by inspections instead of renewals.
- **Fees:** states may charge a one-time CTO fee covering 5 to 25 years.
- **Small factories:** micro and small units in notified industrial estates get their CTE (Consent to Establish, the permission to build) as soon as they apply with a self-certified form.
- **Waste permits:** pollution boards can issue one combined approval covering the Air and Water consents plus waste authorisations.

Open questions (⚠️). We ask pilots in v1-PM-7 and check the websites of the pilots' state pollution boards:
- Do older CTOs that show an expiry date still need renewing until the state adopts the new rule?
- What happens when a one-time fee period ends?

## Licence types v1 tracks
| Type | Law / who issues it | Does it expire? | Check |
|---|---|---|---|
| Factory licence | OSH Code 2020 (in force since 21 Nov 2025, replaced the Factories Act 1948) + state rules; issued by the state factories department | Yes; how long it lasts depends on the state | ⚠️ |
| CTE (Consent to Establish) | State pollution board | Valid for a set period | ⚠️ |
| CTO (Consent to Operate) | State pollution board | New ones: valid until cancelled. Older ones may show an expiry date | ✅ / ⚠️ |
| Fire NOC | State fire service | Usually renewable; the rules depend on the state | ⚠️ |
| Boiler certificate | Boiler inspectorate (check whether the Boilers Act 2025 replaced the 1923 Act) | Periodic inspection | ⚠️ |
| Hazardous waste authorisation | State pollution board (Hazardous Waste Rules 2016); can now be combined with consent | ⚠️ | ⚠️ |
| EPR registration | CPCB EPR portal (EPR: the duty to collect or recycle plastic and other waste) | ⚠️ | ⚠️ |
| Other | Anything with a certificate and an expiry date (trade licence, contract-labour licence, legal metrology) | Depends | n/a |

## What this means for v1
- **Expiry date is optional.** A CTO issued under the new rule shows "Valid until cancelled".
- **Fields for each licence:** type, number, issuing office, issue date, expiry date (optional), certificate file, notes.
- **Warnings:** "Due soon" when 90, 60 or 30 days are left, and "Expired" after the date. These thresholds are fixed in v1, not settable per licence.
- **The pitch changes.** It's no longer "never miss a CTO renewal". It's "every certificate and every expiry date, in the same place as the filings". v1-PM-7 must check that pilots care about this.
- **Idea for the stage 0 gate (not in scope unless Lakshay adds it):** some factory paperwork recurs every year, such as the environmental statement (Form V), the EPR annual return and the factory annual return (⚠️ dates). These would fit the due-date engine with little extra work.

## Sources (accessed 2026-09-22)
- ✅ PIB: amended Uniform Consent Guidelines (CTO valid until cancelled): https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219415&reg=3&lang=1
- ⚠️ Labour codes in force from 21 Nov 2025: https://www.jsalaw.com/corporate/labour-codes-summary-november-2025/
- ⚠️ Official OSH Code factsheet (found, not read): https://www.pib.gov.in/FactsheetDetails.aspx?Id=150475&reg=48&lang=2
- ⚠️ Summary of the Jan 2026 consent changes: https://www.scconline.com/blog/post/2026/01/30/government-amends-consent-guidelines-2026/

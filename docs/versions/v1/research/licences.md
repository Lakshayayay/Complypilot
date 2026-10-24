# Factory Licences (v1 Research, Task v1-PM-2)

Researched 2026-10-05. Re-checked on official sources 2026-10-18 (task v1-PM-14).
- ✅ = Confirmed on an official government website, gazette or Press Information Bureau (PIB).
- ⚠️ = Not confirmed (UNVERIFIED), or official sources disagree.

## Strategic Context
In v1, the CA or firm assistant records factory licences manually from client certificates. ComplyPilot alerts them when a renewal is coming up.
Note: v1 does both. The licence tracker (F7) records certificates clients already hold. The factory questions (F4) suggest which licences a Delhi or Haryana factory needs ("which licences does a plastic injection moulding unit in Haryana require?"), using the rules in [applicability-delhi-haryana.md](applicability-delhi-haryana.md) (task v1-PM-8). More states come in v3.

## Critical Regulatory Shift: Consent to Operate (CTO) Valid Until Cancelled ✅
Under the amended Uniform Consent Guidelines issued by the Ministry of Environment, Forest and Climate Change (MoEFCC), announced by PIB on 28.01.2026:
1. **CTO Validity:** Once granted by a State Pollution Control Board (SPCB), CTO remains valid until cancelled. Compliance is enforced through periodic inspections, and the consent can be cancelled for violations.
2. **One-Time Fees:** States may charge a one-time CTO fee covering 5 to 25 years.
3. **Micro and small units in notified industrial estates:** Consent to Establish (CTE) is deemed granted on a self-certified application. (White-category exemption is a separate notification: see [pollution-categories.md](pollution-categories.md).)
4. **Transition Period (⚠️):** CAs report that older CTO certificates still carry printed expiry dates until state boards issue formal digital endorsements.
5. **State adoption (⚠️):** HSPCB's own order says the Air Act guidelines apply in Haryana, and the Water Act ones apply only once the state adopts the 2024 Water Act amendments. Not confirmed for Delhi or Haryana, so the expiry date stays optional.

## Tracked Industrial Licences in v1
| Licence / Approval | Governing Act / Authority | Expiration Model | Alert Thresholds | Verification |
|---|---|---|---|---|
| Factory Licence | Delhi: Factories Act 1948 and Delhi Factories Rules 1950 (labour department page, still in use). Haryana: Labour Department portal under the Factories Act 1948. OSH Code 2020 in force from 21.11.2025 (s.119, common licence; old licences stay valid to expiry) | Delhi: **1, 5 or 10 years**; renewal online around **60 days before expiry** (FAQ wording unclear); 25% late fee if applied less than 30 days before expiry. Haryana: not found | 90, 60, 30 Days (Delhi: the 30-day reminder is already in late-fee time) | ✅ Delhi (renewal window ⚠️) · ⚠️ Haryana |
| CTE (Consent to Establish) | State Pollution Control Board (Water & Air Acts) | Fixed project term (usually 1–5 years during construction) | 90, 60, 30 Days | ⚠️ (deemed CTE for micro/small units in estates ✅) |
| CTO (Consent to Operate) | State Pollution Control Board | New: Valid until cancelled. Older: Expiry date on certificate | 90, 60, 30 Days (if expiry set) | ✅ national · ⚠️ Delhi/Haryana |
| Fire Safety Certificate (fire NOC) | Delhi Fire Service (Delhi Fire Service Act 2007 and Rules 2010). Haryana: Fire and Emergency Services Act 2022 | Delhi: FAQ says **3 years**, renewal **6 months before expiry**; the 26.05.2026 amendment says valid until cancelled, with a **yearly Form K**. Haryana: **3 years**, renewal 3 years, **yearly self-declaration** | 90, 60, 30 Days (Delhi: 6 months ahead, so add a 180-day reminder) | ✅ Haryana · ⚠️ Delhi (conflict) |
| Boiler Certificate | Chief Inspector of Boilers of the state (Boilers Act 2025, in force 1.05.2025) | Certificate for use: **up to 12 months** (yearly inspection) | 90, 60, 30 Days | ✅ |
| Hazardous Waste Authorisation | SPCB (Hazardous and Other Wastes Rules, 2016, Rule 6) | **5 years**; yearly return (Form 4) due 30 June; can be combined with CTO | 90, 60, 30 Days | ✅ |
| PESO Licence | Petroleum and Explosives Safety Organization | Variable (1 to 5 years based on gas/chemical storage capacity) | 90, 60, 30 Days | ⚠️ not checked; manual entry only, not in the F4 rules |
| Custom / Other Licence | Municipal trade licences, Weights & Measures, Contract Labour | Variable / user-defined | 90, 60, 30 Days | n/a |

## Technical Data Model Requirements
- **Optional Expiry Date:** `expiry_date` column must be nullable. When null, the UI displays `Valid until cancelled` instead of an alert.
- **Alert State Machine:**
  - `> 90 days remaining`: Normal (Green)
  - `61–90 days remaining`: Early Notice (Blue/Info)
  - `31–60 days remaining`: Warning (Yellow)
  - `1–30 days remaining`: Critical (Orange)
  - `≤ 0 days remaining`: Expired (Red)
- **Reminder days (agreed 2026-10-21, see [design.md](../design/design.md), UX-4):** each licence has an apply-by date = expiry minus `lead_days` (default by type: Delhi factory licence 30, Delhi fire certificate 180, others 0; the CA can edit it). The 90/60/30 alerts count back from the apply-by date, not from expiry. **Changed in stage 2 (FS-10, 2026-10-24, [tech.md](../build/tech.md) "FS-10 decisions"):** the licence stores `apply_by_date`, not `lead_days`, and the Delhi fire certificate uses 6 calendar months, not 180 days. The [DFS FAQ](https://dfs.delhi.gov.in/faqs) was re-read on 2026-10-24 (last updated 23 Oct 2026): still 3 years and "at least six months prior to the expiry"; the conflict with the amendment stays ⚠️.
- **Document Attachment:** Each licence record supports uploading the official certificate (PDF/JPG/PNG up to 10 MB) into tenant-isolated storage.

## Primary Sources
- ✅ PIB 28.01.2026: Environment Ministry Amends Uniform Consent Guidelines: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219415&reg=3&lang=1
- ✅ OSH Code 2020 (Labour Ministry copy): https://www.labour.gov.in/static/uploads/2025/07/36fcfa5d8e6b9145e282bf7b950d6c47.pdf
- ✅ PIB 21.11.2025, labour codes in force: https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2192463&reg=48&lang=2
- ✅ Delhi Labour Dept factory licence FAQs: https://labour.delhi.gov.in/labour/faq-grant-licence-under-factories-act-1948
- ✅ Delhi Fire Service FAQ: https://dfs.delhi.gov.in/faqs
- ✅ Haryana Fire and Emergency Services Act 2022 (PRS copy of the gazette): https://prsindia.org/files/bills_acts/acts_states/haryana/2022/Act%20No.%2014%20of%202022%20Haryana.pdf
- ✅ Boilers Act 2025 (PRS copy of the gazette): https://prsindia.org/files/bills_acts/acts_parliament/2025/The_Boilers_Act,_2025.pdf
- ✅ Hazardous and Other Wastes Rules 2016 (HSPCB copy): https://hspcb.org.in/uploads/laws/hsm1.pdf
- ⚠️ Delhi Fire Service (Amendment) Rules 2025, gazette text of 26.05.2026 on a third-party site: https://www.taxheal.com/?p=131819
- ⚠️ Summary of MoEFCC Notification on Consent Validity: https://www.scconline.com/blog/post/2026/01/30/government-amends-consent-guidelines-2026/

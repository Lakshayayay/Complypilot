# Which Licences a Factory Needs: Delhi and Haryana (v1 Research, Task v1-PM-8)

Researched 2026-10-18. These rules become the factory-questions logic (F4) and its tests (v1-FS-13).
- ✅ = Read on an official government page, gazette or Act text (listed under Sources).
- ⚠️ = Not confirmed, or official sources disagree. The app says **"ask your CA"** for these.
- "Checked" for every rule is 2026-10-18.

## How the rules work (plain words)
The owner answers about 10 questions. Each rule below looks at some answers and gives one of four results:
**REQUIRED** · **NOT REQUIRED** · **INFORM** (no licence, but write to the pollution board) · **ASK CA** (we can't be sure). The CA checks the list before it goes on the calendar. Outside Delhi and Haryana every licence is **ASK CA**.
When two rules disagree, the cautious one wins: FL-3 beats FL-1 and FL-2, and PC-3 beats PC-2.

## Answers the rules use (starting list for the factory questions in design)
| Short name | Question to the owner | Used by |
|---|---|---|
| State | Where is the factory? (Delhi / Haryana / other) | all |
| Workers | Most workers on any day in the last 12 months, all shifts and contract workers counted | FL, OSH |
| Power | Do you use power-driven machines in making things? | FL |
| Area | Delhi: is it in a *conforming industrial area* (an area the Master Plan allows for factories)? Haryana: is it in a notified industrial estate? | FL-3, PC |
| Sector | What do you make? (matched to the pollution list, F11) | PC, HW |
| Boiler | Do you have a steam boiler? (a pressure vessel making steam, 25 litres or more, working above 1 kg/cm²; hot-water-only units don't count) | BO |
| Waste | Do you produce waste oil, paint or chemical sludge, spent solvents, used batteries or similar? | HW |
| Floor area | Total covered area of the buildings, and the biggest single floor (sq m) | FN |

## Rules

### Factory licence (labour department)
Plain words: permission from the state labour department to run a factory. Without it, running a factory is an offence.
| ID | Result when | Source | Status |
|---|---|---|---|
| FL-1 | **REQUIRED** if Power and Workers ≥ 20, or no Power and Workers ≥ 40 | OSH Code 2020 s.2(1)(w); PIB backgrounder 22.11.2025 ("raised from 10 to 20 with power, 20 to 40 without") | ✅ |
| FL-2 | **ASK CA** if Power and Workers 10 to 19, or no Power and Workers 20 to 39 | The Code says a state's older number stays until that state changes it (proviso to s.2(1)(w)). Delhi's labour department page **still says 10 / 20** under the Factories Act. PIB says old laws and rules continue during the transition. Haryana: no page found. | ⚠️ |
| FL-3 | Delhi only: **ASK CA** ("cannot be licensed here") if Area is not a conforming industrial area | Delhi Labour Dept FAQ Q8, Q9, Q21 (Supreme Court directions) | ✅ |
| FL-4 | Tracker facts, Delhi: licence is for **1, 5 or 10 years**; renewal is applied for online around **60 days before expiry** (the FAQ wording is unclear); a **25% late fee** applies if applied less than **30 days** before expiry (online licences) | Delhi Labour Dept renewal FAQ (Rule 7, Delhi Factories Rules 1950) | ✅ years and late fee · ⚠️ exact window |
| FL-5 | Tracker facts, Haryana: validity and renewal period not found | Haryana labour portal only shows "registration, licensing, renewal under the Factories Act 1948" | ⚠️ |

Owner note: *Apply as "occupier" (owner, partner or director). Delhi: through the e-District Delhi portal, with building plan, electricity bill, ownership/rent proof and a process flow chart; licence usually comes within a month. Haryana: the Labour Department portal hrylabour.gov.in (Factories Act services) or Invest Haryana.*
New licences under the labour code are issued electronically within 45 days (deemed issued if the office is late); old licences stay valid until their expiry date (OSH Code s.119) ✅.

### Registration under the labour code (not a licence)
| ID | Result when | Source | Status |
|---|---|---|---|
| OSH-1 | **REQUIRED** if Workers ≥ 10: register the establishment within 60 days on the state portal | OSH Code s.3, s.2(1)(v)(iii); Labour Ministry employer handbook (Feb 2026) §5.1 | ✅ rule · ⚠️ whether each state's portal is open yet |

### Pollution consent: CTE and CTO (State Pollution Control Board)
Plain words: CTE = permission to build or start the plant; CTO = permission to run it. Delhi board: DPCC. Haryana board: HSPCB. Details and lists: [pollution-categories.md](pollution-categories.md).
| ID | Result when | Source | Status |
|---|---|---|---|
| PC-1 | **INFORM** (no CTE/CTO; write to the board) if the sector is on the White exempt schedule (87 sectors, 8.07.2026) | MoEF&CC G.S.R. 599(E) (water), 598(E) (air) | ✅ |
| PC-2 | **REQUIRED** (CTE before building, CTO before running) if the sector is Red, Orange or Green and not on the exempt schedule | Air Act s.21; Water Act s.25 (text on DPCC site); Delhi is wholly an air pollution control area (G.S.R. 106(E), 20.02.1987) | ✅ |
| PC-3 | Delhi only: **ASK CA** ("Red industries are not permitted in Delhi") if the sector is Red in Delhi's list, or on Delhi's prohibited list | DPCC "H-category" and "Prohibited industries as per MPD" pages | ✅ page says it · ⚠️ pages are old in style |
| PC-4 | **ASK CA** if the sector is not found in the list (state boards may add sectors) | CPCB corrigendum 16.10.2025 | ✅ |
| PC-5 | Tracker fact: a CTO **stays valid until cancelled** (expiry date optional) | PIB 28.01.2026 | ✅ national · ⚠️ in Delhi/Haryana |
| PC-6 | Haryana: units on the CPCB list use the CPCB colour; HSPCB's own left-over sectors are not copied yet | HSPCB order 2025 | ⚠️ |

Owner note: *Delhi: apply on the DPCC online portal (dpccocmms.nic.in). Haryana: HR-OCMMS portal (hrocmms.nic.in) or Invest Haryana. Micro and small units in notified industrial estates can get CTE on a self-certified application.* (PIB 28.01.2026 ✅; state adoption ⚠️)

### Hazardous waste authorisation (pollution board)
| ID | Result when | Source | Status |
|---|---|---|---|
| HW-1 | **REQUIRED** if the factory handles, stores or produces hazardous waste (Waste = yes). Valid **5 years**. Yearly return (Form 4) due **30 June** for the year ending 31 March | Hazardous and Other Wastes Rules 2016, Rule 6(1), 6(5) (copy on the HSPCB site, amended to 2020) | ✅ |
| HW-2 | Which wastes count (Schedules I to III) is a technical call | same rules | ⚠️ the CA decides; the Delhi list's "Hazardous = YES" column is a hint only |

Owner note: *Apply to the same pollution board. The board can now issue one combined consent and authorisation (PIB 28.01.2026).*

### Fire safety certificate ("fire NOC")
Plain words: the fire department's certificate that the building has the fire-fighting systems it should.
| ID | Result when | Source | Status |
|---|---|---|---|
| FN-1 | Delhi: **REQUIRED** if the industrial building's covered area on all floors is **over 250 sq m** (over 100 sq m if hazardous). Two stages: plan recommendations before building, then the Fire Safety Certificate before use | Delhi Fire Service FAQ; Delhi Fire Service Rules 2010, Rule 27 (re-issued in the 26.05.2026 amendment) | ✅ |
| FN-2 | Haryana: **REQUIRED** if an industrial building has **over 500 sq m on any one or more floors**. Fire-fighting scheme approved before building, certificate after. Valid 3 years; renewal 3 years; **owner gives a self-declaration every year** | Haryana Fire and Emergency Services Act 2022, s.18(2)(b), s.19, s.20 (copy hosted by PRS India; rules and portal not found) | ✅ Act · ⚠️ rules |
| FN-3 | Below those sizes: **NOT REQUIRED** (basic fire safety is still the owner's duty) | derived from FN-1, FN-2 | ✅ |
| FN-4 | Tracker facts, Delhi: the FAQ says **3 years** for non-residential buildings, renewal applied **6 months before expiry**. But the Delhi Fire Service (Amendment) Rules, 26.05.2026, say the certificate stays valid unless cancelled, with a **yearly online Form K**, from about 24.08.2026. A certificate issued 20.11.2025 still shows "3 years" plus Form K. | DFS FAQ; amended Rule 36 (gazette text read on a third-party site) | ⚠️ conflict |

Owner note: *Delhi: Delhi Fire Service (dfs.delhi.gov.in). Haryana: Fire Services department; the online portal is not confirmed (consultant sites name ulbharyana.gov.in or SARAL).* ⚠️

### Boiler certificate (labour department, Boilers Inspectorate)
| ID | Result when | Source | Status |
|---|---|---|---|
| BO-1 | **REQUIRED** if Boiler = yes. The certificate allows use for **up to 12 months**; renew before it expires (using the boiler while the renewal is pending is allowed only if you applied in time) | Boilers Act 2025, s.12(6) and following (in force from 1.05.2025: PIB) | ✅ |
| BO-2 | Delhi: yearly renewal through e-District Delhi; the Delhi FAQ still quotes the old 1923 Act | Delhi Labour Dept boiler FAQ | ✅ |
| BO-3 | Haryana: boiler office and portal not found | none | ⚠️ |

### Other states
| ID | Result | Status |
|---|---|---|
| OT-1 | **ASK CA** for every licence. The CA adds licences by hand | v1 scope |

## Test factories (made up; these are the F4 tests)
Delhi uses the DPCC list; Haryana uses the CPCB 2025 list (decided by Lakshay, 2026-10-18). Result codes: R = required, N = not required, I = inform the board, ? = ask CA.
| # | Factory | Answers | Expected licences | Rules |
|---|---|---|---|---|
| T1 | Gupta Stationery Works, Delhi | 14 workers, power, conforming area, DPCC "Paper stationery items, cutting & book binding" (White, exempt), no boiler, no waste, 180 sq m | Factory licence **?** · Registration **R** · Pollution **I** · Fire N · Boiler N · Waste N | FL-2, OSH-1, PC-1, FN-3 |
| T2 | Sunrise Plastics, Haryana (industrial estate) | 45 workers, power, CPCB I-132 "Polythene and plastic products" (Green), no boiler, waste oil yes, 1,200 sq m total, biggest floor 700 | Factory licence **R** · Registration **R** · CTE/CTO **R** · Hazardous waste **R** · Fire **R** · Boiler N | FL-1, OSH-1, PC-2, HW-1, FN-2 |
| T3 | Metro Beverages, Delhi | 120 workers, power, conforming area, DPCC "Aerated Water and Fruit Beverage with Boiler" (Orange), boiler yes, no waste, 2,400 sq m | Factory licence **R** · Registration **R** · CTE/CTO **R** · Fire **R** · Boiler **R** · Waste N | FL-1, OSH-1, PC-2, FN-1, BO-1 |
| T4 | Shine Platers, Delhi | 30 workers, power, conforming area, DPCC "Plating, nickel and chrome, under 5 KLD" (Red, hazardous), waste yes, 400 sq m | Factory licence **R** · Registration **R** · CTE/CTO **?** (Red not permitted in Delhi) · Hazardous waste **R** · Fire **R** | FL-1, OSH-1, PC-3, HW-1, FN-1 |
| T5 | Kumar Garments, Delhi (residential area) | 25 workers, power, **non-conforming** area, DPCC "Garments stitching, tailoring" (White), no boiler, no waste, 300 sq m | Factory licence **?** (cannot be licensed here) · Registration **R** · Pollution **I** · Fire **R** | FL-3, OSH-1, PC-1, FN-1 |
| T6 | Any unit in Gujarat | any answers | Everything **?** (ask your CA), never an empty list | OT-1 |
| T7 | Village Handloom, Haryana | 6 workers, no power, CPCB I-77 "Handloom / carpet weaving" (White, exempt), 90 sq m | Factory licence N · Registration N · Pollution **I** · all others N | FL-1 (not met), OSH-1 (not met), PC-1 |
| T8 | Bharat Garments, Haryana (industrial estate) | 60 workers (20 contract), power, CPCB I-178.3 "Garment, dry process, with boiler" (Green), boiler yes, no waste, 2,000 sq m, biggest floor 800 | Factory licence **R** · Registration **R** · CTE/CTO **R** · Fire **R** · Boiler **R** · Waste N | FL-1, OSH-1, PC-2, FN-2, BO-1 |
| T9 | SkyTech Drones, Haryana | 25 workers, power, drone assembly (**not in** either list), no boiler, no waste, 450 sq m | Factory licence **R** · Registration **R** · Pollution **?** (sector not in list) · Fire N | FL-1, OSH-1, PC-4, FN-3 |

Notes: T3 under the CPCB list would be Red if wastewater is 100 KLD or more, which Delhi would not permit. That is why the list choice for Delhi matters. Contractor licences (50 or more contract workers) are the contractor's duty and are not in v1.

## Not covered (ask the CA)
PESO licence (fuel, gas and explosives storage), electrical inspector approval, lift licences, municipal trade licence, legal metrology, shops and establishment registration, building plan approval, contract-labour licence, environment statement (Form V, yearly) and EIA clearance. Found along the way: **Form V (environment statement) and the hazardous-waste Form 4 are yearly filings** an owner can miss. They could become repeating tasks for the CA (F8) later. Not added to idea.md yet; Lakshay decides.

## Sources (all opened 2026-10-18)
- OSH Code 2020 (Labour Ministry copy): https://www.labour.gov.in/static/uploads/2025/07/36fcfa5d8e6b9145e282bf7b950d6c47.pdf
- Employer compliance handbook (Feb 2026): https://www.labour.gov.in/static/uploads/2026/02/83978455025732b99b0165def80ab171.pdf
- PIB, four labour codes in force from 21.11.2025: https://www.pib.gov.in/PressReleseDetailm.aspx?PRID=2192463&reg=48&lang=2 · OSH backgrounder 22.11.2025: https://www.pib.gov.in/PressReleasePage.aspx?PRID=2192802&reg=48&lang=2
- Delhi Labour Dept: factory licence FAQ https://labour.delhi.gov.in/labour/faq-grant-licence-under-factories-act-1948 · renewal FAQ https://labour.delhi.gov.in/faqs · boiler FAQ https://labour.delhi.gov.in/sites/default/files/generic_multiple_files/boiler_renewal_faq.pdf
- Haryana Labour Dept portal: https://hrylabour.gov.in/factory/factory/factory_terms
- Delhi Fire Service FAQ: https://dfs.delhi.gov.in/faqs · Delhi Fire Service (Amendment) Rules, 26.05.2026 (gazette text, third-party copy): https://www.taxheal.com/?p=131819
- Haryana Fire and Emergency Services Act 2022 (Act 14 of 2022, PRS copy): https://prsindia.org/files/bills_acts/acts_states/haryana/2022/Act%20No.%2014%20of%202022%20Haryana.pdf
- Boilers Act 2025 (PRS copy of the gazette text): https://prsindia.org/files/bills_acts/acts_parliament/2025/The_Boilers_Act,_2025.pdf · in force 1.05.2025 (PIB): https://www.pib.gov.in/PressReleasePage.aspx?PRID=2230140&reg=3&lang=2
- Hazardous and Other Wastes Rules 2016 (HSPCB copy): https://hspcb.org.in/uploads/laws/hsm1.pdf
- Pollution sources: see [pollution-categories.md](pollution-categories.md)

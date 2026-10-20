# Pollution Categories (v1 Research, Task v1-PM-9)

Researched 2026-10-18.
- ✅ = Read on an official government site (page or PDF opened and read).
- ⚠️ = Not confirmed (UNVERIFIED), or the sources disagree. Needs Lakshay's call or a CA's check.

## What this is, in plain words
Every factory type is put in a pollution colour by the government. The colour decides whether the factory needs a pollution permission (CTE = permission to *build*, CTO = permission to *run*, both from the State Pollution Control Board, "SPCB") and how often it is inspected. Our factory questions (F4) and the AI matcher (F11) both need this list.

## The national list (CPCB, February 2025) ✅
CPCB = Central Pollution Control Board. Its 2025 report ("Classification of Sectors into Red, Orange, Green, White and Blue Categories") covers **419 sectors**. It has **5 colours**, not 4: **Blue is new** (essential environmental services such as waste and sewage plants).

| Colour | Sectors | PI score (the report's pollution score) | What it means, simply |
|---|---|---|---|
| Red | 125 | 80 or more | Most polluting. Consent needed; longest process (90 days after the Jan 2026 change) |
| Orange | 137 | 55 to under 80 | Consent needed |
| Green | 94 | 25 to under 55 | Consent needed |
| White | 54 | under 25 | Practically non-polluting. Mostly **exempt from consent** (see below) |
| Blue | 9 | n/a | Waste/sewage services. Consent runs 2 years longer. Only CPCB can add Blue sectors |

- Totals and the PI ranges (Table IV) are from the report itself. Inspections: Red every 6 months, Orange yearly, Green every 2 years (report, section 3.2).
- Old CTO validity in the report (Red 5, Orange 10, Green 15 years) has been replaced: see "Consent validity" below.

## Our copy of the list ✅
File: [data/cpcb-categories-2025.csv](data/cpcb-categories-2025.csv), 419 rows. Columns: `colour, annexure, serial, group, sector, pollution_index, pdf_page`.
- `annexure`: I = industrial sectors (359) · II-A = essential services for industrial waste, all Red (9) · II-B = essential services for household waste, all Blue (9) · III = service/infrastructure sectors (37) · IV = special sectors (5, no score).
- `group` is the heading above a sub-list (e.g. "BRICK MANUFACTURING"); blank for stand-alone sectors. `pdf_page` is the page in the report so a person can check a row.
- **How it was made:** one-time copy from the official PDF (not a scraper; 109 pages, read with a small script).
- **Checks run:** the count per colour matches the report's own table for the whole list and for each annexure (125/137/94/54/9). All 405 rows that have a score match the report's PI-to-colour rule, with 0 mismatches. 5 special sectors (Annexure IV) have no score and 9 Blue rows are not scored the same way.
- **Not applied:** later CPCB directions change a few rows (charcoal units 16.12.2025, waste battery collection centres 11.06.2026, hotels and restaurants 20.07.2026, CBG plants 25.03.2025). The CSV is the February 2025 list only. ⚠️
- **Lakshay's spot-check:** open 10 random rows against the PDF page in `pdf_page`.

## Sectors the list missed ✅
CPCB corrigendum of 16.10.2025: a state board can add a sector the list left out (by a committee, no CPCB approval; it tells CPCB within 7 days). Only CPCB adds Blue. So "factory type not in the list" is a normal case, and the app must say **"ask your CA"**, not guess.

## White category = no consent, but tell the board ✅
MoEF&CC notifications (Water Act G.S.R. 703(E) of 12.11.2024; Air Act G.S.R. 702(E)): sectors with PI up to 25 on a published schedule are exempt from CTE/CTO, **if they inform the SPCB in writing**. The schedule was replaced on 28.07.2025, 17.10.2025 and **8.07.2026 (G.S.R. 599(E) water, 598(E) air)**.
- Our copy: [data/white-exempt-schedule-2026-07.csv](data/white-exempt-schedule-2026-07.csv), **87 sectors** (water and air lists are the same). 10 are marked as sub-sectors of a Green sector.
- **Exempt is not the same as colour White.** The 54 White sectors in the CPCB list and the 87 exempt sectors are different lists. The app should test "is it on the exempt schedule?", not "is it White?".
- Units that already hold an environmental clearance need no separate CTE (same notification, paragraph (b)).

## Consent validity ✅ / ⚠️
PIB, 28.01.2026 (Ministry of Environment): amended Uniform Consent Guidelines say a **CTO, once granted, stays valid until cancelled**. Red consent time cut from 120 to 90 days. Micro and small units in notified industrial estates get CTE deemed granted on a self-certified application. One-time CTO fee for 5 to 25 years is allowed.
⚠️ Whether this already applies in Delhi and Haryana: HSPCB's own order (1.08.2025) says the Air Act guidelines apply in Haryana, and the Water Act ones apply only once the state adopts the 2024 Water Act amendments. Not confirmed for either state. So the licence tracker keeps the expiry date **optional**.

## Do Delhi and Haryana change the list?
| | Haryana ✅ | Delhi ⚠️ |
|---|---|---|
| List used | HSPCB office order (on its site as 01.08.2025) **adopts the CPCB 2025 list** (5 colours) and adds its own "left-over" sectors (Annexure-I of the order) | **Its own list**: the DPCC online consent portal shows 725 activities (707 active), 4 colours only, no Blue |
| Counts | CPCB list: 419 | RED 79 · ORANGE 299 · GREEN 138 · WHITE 209 |
| Our copy | the CPCB CSV above (HSPCB's left-over sectors are **not** copied) ⚠️ | [data/dpcc-activities-delhi.csv](data/dpcc-activities-delhi.csv) (serial, activity, category, hazardous yes/no, Delhi class I/II(a)/II(b), pollution-control equipment needed, status) |
| Extra rules | Siting only in conforming (industrial) areas | **Red industries are not permitted in Delhi** (DPCC "H-category" page). A separate prohibited list under the Master Plan. Factories only in conforming industrial areas. A closure list (F-27/33) for non-conforming areas. |

- Delhi's website still links the **2016** CPCB document (no Blue) and does not show an order adopting the 2025 list. Same factory, different answer: Delhi's list has "Aerated Water and Fruit Beverage" as Orange; the CPCB list splits it by wastewater (≥100 KLD Red, under 100 KLD Orange). Under Delhi's Red-not-permitted rule that matters. ⚠️
- The Delhi prohibited-list pages are old in style (Master Plan 2001/2021 wording). Check they still hold before relying on them. ⚠️
- **Decided by Lakshay on 2026-10-18:** the rules, the matcher (F11) and its eval set (v1-AI-2) use **Delhi → the DPCC list, Haryana → the CPCB 2025 list**. If DPCC later adopts the 2025 list, revisit.

## Sources (all opened 2026-10-18)
- CPCB page listing all documents: https://cpcb.gov.in/categorization-of-industrial-sectors/
- CPCB 2025 report (PDF): https://cpcb.gov.in/openpdffile.php?id=TGF0ZXN0RmlsZS9fMTczNzYxMzk2OV9tZWRpYXBob3RvMTEzODMucGRm
- CPCB corrigendum 16.10.2025: https://cpcb.gov.in/uploads/Corrigendum_16_10_25.pdf
- White exemption, Water Act: https://cpcb.gov.in/uploads/White_category_exemption_wateract.pdf · Air Act: https://cpcb.gov.in/uploads/White_category_exemption_airact.pdf
- HSPCB categorisation page: https://hspcb.org.in/page/categorization-of-industrial · order (scanned PDF, read by OCR): https://hspcb.org.in/uploads/pages/categorization_6891ec22c5869.pdf
- DPCC: https://dpcc.delhi.gov.in/dpcc/classification-industries · consent activity list https://dpccocmms.nic.in/standardMaster/consentActivityList.gsp · H-category https://dpcc.delhi.gov.in/dpcc/h-category · prohibited list https://dpcc.delhi.gov.in/dpcc/prohibited-industries-mpd · F-27/33 https://dpcc.delhi.gov.in/dpcc/f-2733-category
- PIB 28.01.2026 (consent guidelines): https://www.pib.gov.in/PressReleasePage.aspx?PRID=2219415&reg=3&lang=1

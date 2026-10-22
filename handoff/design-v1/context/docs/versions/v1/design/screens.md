# v1 Screens (UX-2)

The screen list for v1, and which screen covers each step of the user flows. Part of [design.md](design.md) (stage 1). Steps come from [flows.md](flows.md).

- **Where to see them:** Figma page `02 Wireframes` in [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot). One section per flow (F-01 to F-11), frames left to right in step order, a yellow note under each. The grey parts are in the `wf kit` section. Frame IDs are in [figma-ledger.json](figma-ledger.json).
- **IDs:** CA = CA firm on a desktop (1440 px wide). OW = owner on a phone (390 px wide, a web page opened from the email link). EM = email. A letter (b, c) marks another state of the same screen.
- **Count:** 25 desktop screens, 12 phone screens, 7 emails and 21 extra states: 65 frames, plus CA-14c (loading) added in UX-4: 66 frames in Figma.
- **Demo data** is made up (v1 data rule). "Today" in the wireframes is Monday 19 October 2026.

## App map (agreed 2026-10-20)
Drawn on the FigJam board [ComplyPilot v1 flows](https://www.figma.com/board/bZB8Y1uSb5rAIYV0BOQpRh), card "App map (UX-2)", to the right of F-12.
- **CA, desktop, side menu:** Calendar (home: CA-14, CA-15) · Clients (CA-06; client page CA-11; factory review CA-13) · Licences (CA-16) · Tasks (CA-18) · Settings (CA-22 to CA-25). Any item opens its thread as a side panel (CA-20).
- **Owner, phone, bottom tabs:** Home (OW-08) · Calendar (OW-09) · Licences (OW-10, detail OW-12). Any item opens its thread full screen (OW-11). The first visit goes invite email → welcome → factory questions.

## Screen list
| ID | Screen | Flow | Feature | Other states |
|---|---|---|---|---|
| CA-01 | Sign in (same page for owners, see OW-01) | F-01 | F1, F3 | CA-01b check your email · CA-01c link expired |
| CA-02 | Sign-up: firm details | F-02 | F1 | |
| CA-03 | Sign-up: privacy notice and consent | F-02 | F1 | CA-03b declined |
| CA-04 | First calendar (empty) | F-02 | F1, F6 | |
| CA-05 | Invite colleagues (window) | F-02 | F1 | |
| CA-06 | Clients (100 clients) | F-03 | F2 | CA-06b empty |
| CA-07 | Add client: details | F-03 | F2 | CA-07b fix errors |
| CA-08 | Add client: choose filings | F-03 | F2, F5 | |
| CA-09 | Import CSV: template and upload | F-03 | F2 | |
| CA-10 | Import report (95 saved, 5 to fix) | F-03 | F2 | |
| CA-11 | Client page | F-04 | F2, F3 | CA-11b invite pending |
| CA-12 | Invite owner (window) | F-04 | F3 | |
| CA-13 | Factory review: answers, AI match, licences | F-05 | F4, F11 | CA-13b needs your decision · CA-13c edit answers |
| CA-14 | Calendar: month, 100 clients | F-06 | F6 | CA-14b due this week |
| CA-15 | Calendar: client by filing grid | F-06 | F6, F7 | |
| CA-16 | Licences, all clients | F-07 | F7 | CA-16b empty |
| CA-17 | Add licence (window) | F-07 | F7 | |
| CA-18 | Tasks | F-08 | F8 | CA-18b after ticking a repeating task |
| CA-19 | New task (window) | F-08 | F8 | |
| CA-20 | Item thread (side panel) | F-09 | F9 | CA-20b give the owner a task |
| CA-21 | Mark done (window) | F-09 | F9 | CA-21b file problem · CA-21c done |
| CA-22 | Settings: firm | F-11 | F1 | |
| CA-23 | Settings: team | F-02, F-11 | F1 | |
| CA-24 | Settings: due-date changes | F-11 | F5 | CA-24b preview · CA-24c applied |
| CA-25 | Settings: privacy | F-02, F-11 | F1 | |
| OW-01 | Sign in | F-01 | F3 | OW-01b check your email · OW-01c link expired |
| OW-02 | Welcome | F-04 | F3 | |
| OW-03 | Factory question with choices | F-05 | F4 | |
| OW-04 | Factory question with a number | F-05 | F4 | |
| OW-05 | Factory question in own words | F-05 | F4, F11 | |
| OW-06 | Check and send | F-05 | F4 | |
| OW-07 | Your CA will check | F-05 | F4 | |
| OW-08 | Home: what needs me | F-06 | F6, F9 | OW-08b nothing needs you |
| OW-09 | Calendar | F-06 | F6 | |
| OW-10 | Licences | F-07 | F7 | OW-10b before the CA confirms |
| OW-11 | Item thread | F-09 | F9 | OW-11b after upload |
| OW-12 | Licence detail | F-07 | F4, F7 | |
| EM-01 | Sign-in link | F-01 | F1, F3 | |
| EM-02 | Colleague invite | F-02 | F1 | |
| EM-03 | Owner invite | F-04 | F3 | |
| EM-04 | Licences confirmed | F-05 | F4 | |
| EM-05 | Task for the owner | F-09 | F9 | |
| EM-06 | Reminder to the firm (one list each morning) | F-10 | F10 | |
| EM-07 | Reminder to the owner | F-10 | F10 | |

## Which screen covers each flow step
One line per flow. Step names are the node names in flows.md. `skip` = a decision or something the system does on its own, with no screen. `outside` = it happens outside ComplyPilot.
| Flow | Steps and screens |
|---|---|
| F-01 | start=CA-01,OW-01; email=CA-01,OW-01; sent=EM-01; checkMail=CA-01b,OW-01b; openLink=EM-01; valid=skip; expired=CA-01c,OW-01c; who=skip; signup=CA-02; caHome=CA-14; ownerHome=OW-08 |
| F-02 | start=CA-01; firm=CA-02; notice=CA-03; consent=CA-03; blocked=CA-03b; record=skip; empty=CA-04; addFirst=CA-04,CA-07; invite=CA-05,CA-23; mail=EM-02; joins=CA-01; same=CA-14 |
| F-03 | start=CA-06,CA-06b; how=CA-06; form=CA-07; fieldsOk=skip; fieldErr=CA-07b; filings=CA-08; dates=skip; onCal=CA-14; template=CA-09; upload=CA-09; checkRows=skip; report=CA-10; badRows=CA-10; fixCsv=outside |
| F-04 | client=CA-11; invite=CA-12; ownerEmail=CA-12; pending=CA-11b; mail=EM-03; openLink=EM-03; welcome=OW-02; startQs=OW-03; home=OW-08 |
| F-05 | start=OW-03; questions=OW-03,OW-04,OW-05; words=OW-05; send=OW-06; wait=OW-07,OW-10b; match=CA-13; rules=CA-13; askCa=CA-13b; caStart=CA-11,CA-13c; review=CA-13; fix=CA-13c; list=CA-13; right=CA-13; edit=CA-13,CA-13b; confirm=CA-13; onCal=CA-16,OW-10; told=EM-04 |
| F-06 | caOpen=CA-14; month=CA-14; filter=CA-14b; filtered=CA-14b; gridView=CA-15; dayCell=CA-14; caItem=CA-14b,CA-15; ownerOpen=OW-08; ownerHome=OW-08,OW-08b; ownerCal=OW-09; ownerItem=OW-08,OW-09; thread=CA-20,OW-11 |
| F-07 | start=CA-16,CA-16b; add=CA-17; fields=CA-17; cert=CA-17; hasExpiry=CA-17; untilCancelled=CA-16,OW-10; daysLeft=skip; valid=CA-16,OW-10; soon=CA-16,OW-10,OW-12; expired=CA-16; dueList=CA-16; remind=EM-06,EM-07 |
| F-08 | start=CA-18; newTask=CA-19; repeats=CA-19; setRepeat=CA-19; onCal=CA-14; markDone=CA-18; again=skip; next=CA-18b; nextOnCal=CA-18b; closed=CA-18 |
| F-09 | open=CA-20,CA-20b; ask=CA-20b; giveTask=CA-20b; taskMail=EM-05; ownerThread=OW-11; upload=OW-11; tick=OW-11,OW-11b; fileIt=outside; filed=CA-20,CA-21c; markDone=CA-21; proof=CA-21; fileOk=CA-21; fileErr=CA-21b; done=CA-21c |
| F-10 | start=skip; find=skip; isDone=skip; skip=skip; firmMail=EM-06; ownerMail=EM-07; openItem=CA-14b,OW-11 |
| F-11 | start=CA-22; changes=CA-24; pick=CA-24b; newDate=CA-24b; preview=CA-24b; applyIt=CA-24b; update=skip; done=CA-24c; cancel=CA-24 |
| F-12 | b1=CA-14; b2=CA-14b; b3=CA-15; b4=CA-07,CA-08,CA-11,CA-12; b5=EM-03,OW-02,OW-03,OW-04,OW-05,OW-06; b6=OW-07; b7=CA-13; b8=CA-20b; b9=OW-11,OW-11b; b10=CA-20,CA-21,CA-21c; b11=EM-07 |

## UX-4 detailed screens (demo path)
Batches A to D moved from [design.md](design.md), UX-4, on 2026-10-21. Built on Figma page `06 Screens`, section `demo-path`, frames left to right in beat order.

**Batch A: demo beats 1 to 3 (built 2026-10-21).** Figma: `06 Screens`, section `demo-path` ([open](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot?node-id=99-816)), frames left to right in beat order. IDs in figma-ledger.json.
| Frame | What it shows |
|---|---|
| CA-14 Month | October 2026 for 100 clients: compact chips per day, most urgent first ("TDS deposit · 2" late, "GSTR-3B · 48" due soon, done ones quiet). Summary: 411 items, 8 late, 83 due this week, 259 done (the chips add up to it) |
| CA-14b Due this week | The "Due this week" filter as a removable tag. The week of 19 to 25 Oct is outlined and shows only what is left; the other weeks show dates only. A side list "This week's items" groups by day and filing ("48 left", a few clients each, "Show 44 more") |
| CA-15 Client grid | One row per client, one column per filing, then Licences; each cell is a status chip and its date. Rows by urgency (late first). Sunrise Plastics is highlighted: "Renew soon, hazardous waste, apply by 15 Jan" beside its GST items (beat 3) |
- **Parts changed:** `ViewSwitch` is now Month · Client grid (the approved screen list has no Week or List view; "Due this week" is a filter). New `IconButton` (40 px, styled like the secondary `Button`) for the ‹ › arrows. Quarterly filings say "QRMP" (the CA term) so chips stay on one line.
- **Checks:** read-back on all three frames, 1,162 layers: 0 typed-in colours (783 bound), 0 loose corners, gaps or padding, all 343 texts styled and Anek Latin, no dashes, no cut-off text. **Projector (1024 px, `UNVERIFIED` width):** dates, colours, icons and titles read; chip words shrink to about 8 px. Dropped at PM-12 (2026-10-22): no projector sizing, the app follows normal desktop sizes.

**Batch B: demo beat 4, add a client and invite the owner (built 2026-10-21).** Same section, after CA-15.
| Frame | What it shows |
|---|---|
| CA-07 Add client, details | Step 1 of 2: a two-column form for Metro Beverages Pvt Ltd (legal and trade name, GSTIN and PAN with help text, state, GST scheme, income tax, the owner's name, email and mobile); Cancel, "Next: choose filings" |
| CA-08 Add client, choose filings | Step 2 of 2: filings grouped as GST, TDS, ESIC and income tax, with checkboxes and their rule ("GSTR-3B · 20th of the next month"); a note that PF, TDS Forms 143/144, MSME Form-1 and non-audit ITRs are not on the calendar yet (Form 140 became a filing row on 2026-10-22, unchecked: its dates are confirmed); beside it "What goes on the calendar" with the next 6 dates (from 20 Oct: proposal 2) |
| CA-11 Client page | The client's summary and "Edit details"; Coming up (6 dates, the two due soon with chips); Licences empty ("They come from the factory answers…"); Owner (not invited yet, "Invite owner"); Factory answers (not started); Filings |
| CA-12 Invite owner (window) | CA-11 behind a dimmed overlay; the window "Invite the owner of Metro Beverages" with name and email, a note "First, 8 questions about the factory", Cancel and "Send invite" |
- **Facts settled:** the owner answers **8 questions**: the 8 answers the rules use in [applicability-delhi-haryana.md](../research/applicability-delhi-haryana.md) (README says "about 10"). Batch C shows "Question N of 8".
- **Checks:** read-back on the four frames, 510 layers: 0 typed-in colours (369 bound), 0 loose corners, gaps or padding, all 182 texts styled and Anek Latin, no dashes. A Figma quirk was found and fixed: a part resized to "fill" after it is put inside another part's slot keeps its old drawn width, so parts are sized before they go into a slot.

**Batch C: demo beats 5 and 6, the owner's phone (built 2026-10-21).** Same section, after CA-12. Phone frames are 390 px wide; owner text is 16 to 28 px; every tap target is at least 44 px.
| Frame | What it shows |
|---|---|
| EM-03 Owner invite email | "Kapoor & Associates invited you to ComplyPilot": the logo, "See Metro Beverages' deadlines in one place", what they get, "Open ComplyPilot", and what the one-time link does |
| OW-02 Welcome | "Welcome, Vikram", three things they will see (with icons), "First, tell us about your factory", "Start the factory questions" and "Later" |
| OW-03 Question with choices | "Question 1 of 8", "Where is your factory?", Delhi (chosen), Haryana, Another state, and what happens for other states |
| OW-04 Question with a number | "Question 2 of 8", how many people work there, how to count, 120 |
| OW-05 Question in own words | "Question 5 of 8", "What do you make?": "We make soft drinks and fruit juice, and we have a steam boiler." (the demo line), and that the CA checks the match |
| OW-06 Check and send | All 8 answers, each with "Change"; "Nothing is final until your CA confirms"; "Send to Kapoor & Associates" |
| OW-07 Your CA will check | "Sent to your CA", the "Your CA will check" note, what happens next in 3 steps, "Go to home", the bottom tabs |
- **Parts changed:** `StepIndicator` now has 8 steps (each bar k/8, "Question k of 8"). New `ChoiceCard` (a 56 px tappable answer; chosen = tint, 2 px border and a filled radio, never colour alone) and `Textarea` (styled from `Input` lg, at least 120 px tall). New icon `chat-circle-text` (Phosphor Bold 2.1.1, from the same pinned package). The answers match test factory T3 (120 workers, boiler, no waste, 2,400 sq m).
- **Checks:** read-back on the 7 frames, 216 layers: 0 typed-in colours (167 bound), 0 loose corners, gaps or padding, all 87 texts styled and Anek Latin, no dashes, no phone button under 44 px.

**Batch D: demo beat 7, the CA's factory review (built 2026-10-21).** Same section, after OW-07.
| Frame | What it shows |
|---|---|
| CA-13 Factory review | "Factory answers, Metro Beverages", answered by Vikram Malhotra on Mon 19 Oct; the status "Waiting for your check", "Edit answers" and "Confirm 5 licences". Left: the 8 answers, the same words as OW-06. Right: the AI's pollution category ("Orange", tagged "Suggested by AI") with the line it matched, the owner's own words, "Use this", "Choose another line" and "Source: DPCC list"; then the licence list: 5 Required and 1 Not required, each with a plain reason and its official source |
- **Facts checked against the research:** the matched line is line 2 of Delhi's list, "Aerated Water and Fruit Beverage with Boiler" (Orange; [dpcc-activities-delhi.csv](../research/data/dpcc-activities-delhi.csv), where line 1 is the same activity without a boiler). The six results are test factory T3 in [applicability-delhi-haryana.md](../research/applicability-delhi-haryana.md): factory licence (FL-1), labour-code registration (OSH-1), pollution consent (PC-2), fire certificate (FN-1) and boiler certificate (BO-1) are Required; hazardous waste (HW-1) is Not required.
- **Heuristic fixes made here:** the plain reason comes first and the rule code sits in the source line (the `LicenceResultRow` part already did this); the button carries the count. "5 licences" are the four licences, consents and certificates plus the labour-code registration, which the app lists with the licences (the research calls registration "not a licence"; Lakshay can ask for another word). A footnote says what confirming does.
- **AI rules (AGENTS.md):** it shows the line it matched and its source, the CA confirms, and nothing reaches the owner's calendar before that. No confidence number is shown: it would be made up; stage 3's eval set gives a real one. The status word "Waiting for your check" (from the wireframe) uses the blue `waiting` chip.
- **Height:** 1,414 px, because each licence line has three lines of text. At 900 px the AI card and the first three licences are visible; the clickable demo gets a scrolling frame (UX-4, step 7).
- **Checks:** read-back, 168 layers: 0 typed-in colours (120 bound), 0 loose corners, gaps or padding, all 67 texts styled and Anek Latin, no dashes, no cut-off text; the 5 Required rows equal the "5" on the button.

**Batch E: demo beats 8 to 11, the thread and Mark done (built 2026-10-21).** Same section, after CA-13. The 22 demo frames are complete. One item all the way through: Metro Beverages' GSTR-3B for September, due Tue 20 Oct; "today" is Mon 19 Oct.
| Frame | What it shows |
|---|---|
| CA-20b Thread, task for the owner | CA-14b (due this week) with the thread panel open on the right, like Notion's side peek: the calendar stays visible, no dimming. Header "GSTR-3B · Metro Beverages", "Due soon", stages Open ✓ › **Waiting on owner** › Filed › Done. Thread: "Rakesh tagged this Need document", Rakesh's message (purchase bills by 5 pm), the event "Task for Vikram Malhotra (owner)…". Toast "Task sent. Vikram gets an email now." |
| OW-11 Item thread | Vikram's phone, full screen (back arrow, no tabs): "Upload the purchase bills", a note "Your CA needs them by 5 pm today", Rakesh's message, one button "Upload purchase bills" |
| OW-11b After the upload | "Bills sent", a green "Task done" note (sent and ticked at 3:06 pm), his file in the thread, "Back to home" |
| CA-20 Thread, after the upload | The panel again: Vikram's file and "Vikram ticked the task done · 3:06 pm"; stages now at **Filed**; "Mark done" and "Tag Filed" |
| CA-21 Mark done (window) | CA-20 dimmed, a window "Mark done: GSTR-3B (September 2026)": ARN `AA0710260012345` (format checked, UX-4 notes), the receipt as a file chip, "PDF, JPG or PNG, up to 10 MB.", Cancel and "Mark done" |
| CA-21c Thread, done | The moment of delight: chip "Done", all four stages ticked, a green banner "Done · Mon 19 Oct, 4:20 pm" with **Edit**, the events "tagged Filed" and "marked done with the ARN and receipt", and a toast "Marked done. Vikram can see it now." with **Undo** |
| EM-07 Owner's Monday list | The next Monday (26 Oct): "Your week at Metro Beverages: 1 filing due", TDS return, salary (Jul to Sep) due Sat 31 Oct, "Nothing is waiting on you", "Open ComplyPilot". Done items never appear (criterion 12) |
- **Cast:** the wireframes used other names (Rohit Sharma, Sharma & Associates, Anil Sharma); every frame now uses the demo cast. EM-07 follows the agreed reminder days (one Monday list), not the wireframe's single-item email.
- **Heuristic fix #3 done:** Undo on the done toast, Edit on the done banner.
- **Checks:** read-back on the 7 frames, 1,849 layers: 0 typed-in colours (1,315 bound), 0 loose corners, gaps or padding, all 540 texts styled and Anek Latin, no dashes, no cut-off text, no phone button under 44 px.

## UX-4 the other 43 frames
Built flow by flow on `06 Screens`, one section per batch below `demo-path`. Same cast and "today" as the demo.

**Batch 1: sign-in and sign-up, F-01 and F-02 (13 frames, built 2026-10-21).** Section `batch-1 sign-in and sign-up`.
| Frame | What it shows |
|---|---|
| CA-01, CA-01b, CA-01c | One calm card on the page colour (the Notion feel): logo, "Sign in", work email (focused), "Send sign-in link"; new emails go on to sign-up; owners use the invited email. 01b "Check your email" with "Send again in 30 s" (disabled, so no one floods an inbox) and "Use a different email". 01c "This link has expired" with "Send a new link" |
| OW-01, OW-01b, OW-01c | The same three on the phone, owner text sizes, 48 px field and button; "Owners can't sign up on their own" |
| EM-01 | Sign-in link email: one button, the link works once |
| CA-02 | Step 1 of 2: firm name, your name, work email (locked, from sign-in), mobile, state (sets the default for clients); a note that factory owners don't sign up here |
| CA-03 | Step 2 of 2: the privacy notice as 5 plain points from [privacy.md](../research/privacy.md) (what we keep, why, who sees it, "Kept safe on secure cloud servers. We never ask for your government portal passwords.", your rights), "Read the full notice (version 1.0)", the consent box, Decline and "Accept and continue", and "We save who accepted, when, and this notice version" (criterion 1). **Wording changed 2026-10-21 (Lakshay):** the first build said "stored in India", but v1's data sits in Seoul ([ADR 0003](../../../adr/0003-hosting-and-data-region.md)), so no place is named. The Figma frame was updated in the polish pass (2026-10-22): the "Where" line, a "Your rights" line that matches CA-25, and "version 1.0" without a date |
| CA-03b | "You can't go on without accepting", nothing saved, "Read the notice again" or "Sign out" |
| CA-04 | The empty month calendar with one card: "Your calendar is empty", "Add your first client", then "Import a CSV" and "Invite colleagues" |
| CA-05 | Invite colleagues (window over CA-04): an email box ("separate several with commas"), "Same access for everyone" in v1 |
| EM-02 | Colleague invite: "Join Kapoor & Associates", "Join the firm" |
- **Checks:** read-back on the 13 frames, 714 layers: 0 typed-in colours (564 bound), 0 loose corners, gaps or padding, all 237 texts styled and Anek Latin, no dashes, no cut-off text, no phone button under 44 px.
- **Review later (accepted at PM-12, 2026-10-22):** the full privacy notice text is written in stage 2 from privacy.md; the card shows the summary.

**Batch 2: clients, F-03 (5 frames, built 2026-10-21).** Section `batch-2 clients`.
| Frame | What it shows |
|---|---|
| CA-06 Clients (100 clients) | The heavy-data frame: a search by name, GSTIN or PAN, "100 clients, most urgent first", a table of 20 rows (client and trade name, state, GSTIN, filings, owner status, next due, status chip), late first, then waiting, due soon and upcoming; "1 to 20 of 100" with page arrows; "Import CSV" |
| CA-06b Clients, empty | One card: "No clients yet", "Add client", then "Import a CSV" and "Download the template" |
| CA-07b Add client, fix errors | CA-07 with an error box at the top ("2 things to fix before you go on") and two fields in the error state with plain messages: GSTIN has 14 characters, the owner's mobile has 9 digits. A thicker red border plus words, never colour alone |
| CA-09 Import CSV | Three steps: download the template, fill it in (needed and optional columns from [import-formats.md](../research/import-formats.md)), upload (a dashed drop area); the loading state is shown: "clients_october.csv, Uploading, 60%" |
| CA-10 Import report | "95 clients added" (saved already) and "5 rows need fixing", a table of row, client, column and what to fix in plain words, "Download the 5 rows to fix" and "Go to clients" (criterion 3) |
- **Checks:** read-back on the 5 frames, 922 layers: 0 typed-in colours (627 bound), 0 loose corners, gaps or padding, all 331 texts styled and Anek Latin, no dashes, no cut-off text.

**Batch 3: client and review states, F-04 and F-05 (4 frames, built 2026-10-21).** Section `batch-3 client and review states`.
| Frame | What it shows |
|---|---|
| CA-11b Client page, invite pending | CA-11 after "Send invite": the owner card says "Invite sent Mon 19 Oct, 10:40 am. Waiting for Vikram to sign in." with "Resend invite"; factory answers "Waiting for the owner"; a toast "Invite sent to vikram@metrobeverages.in" |
| CA-13b Factory review, needs your decision | Test factory **T5 Kumar Garments** from [applicability-delhi-haryana.md](../research/applicability-delhi-haryana.md) (25 workers, residential area, garments stitching, White, 300 sq m). Factory licence: **You decide** (rule FL-3) with Needed / Not needed; registration Required (OSH-1); pollution "inform the board" (PC-1); fire Required (FN-1); boiler and waste Not required. Status "Needs your decision"; "Confirm licences" stays off until the CA decides |
| CA-13c Factory review, edit answers | CA-13 with a note "You are changing Vikram's answers" and the 8 answers as fields (selects, number, the owner's words in a text box), Cancel and "Save answers"; "Results update after you save"; Confirm is off while editing |
| EM-04 Licences confirmed | "5 licences are on your calendar": the five listed, "Upload your certificates so your CA can track the renewal dates", "See your licences" |
- **Checks:** read-back on the 4 frames, 514 layers: 0 typed-in colours (393 bound), 0 loose corners, gaps or padding, all 195 texts styled and Anek Latin, no dashes, no cut-off text.
- **For the polish pass:** the `Textarea` label is 16 px (owner size); on CA screens it should match the 14 px field labels.

**Batch 4: licences and owner home, F-05 to F-07 (9 frames, built 2026-10-21).** Section `batch-4 licences and owner home`.
| Frame | What it shows |
|---|---|
| CA-16 Licences, all clients | "236 licences for 100 clients"; "Needs action" cards: Shine Platers fire certificate Expired, Sharma Castings factory licence "Apply by 1 Dec" (the apply-by rule: Delhi factory licence 30 days before expiry), Sunrise Plastics hazardous waste Renew soon, Metro Beverages "Details needed" (5 licences confirmed, certificates still to come); then every licence, most urgent first, with number, office, expiry and status |
| CA-16b Licences, empty | "No licences yet": they arrive when you confirm a client's factory answers; "Add a licence by hand" |
| CA-17 Add licence (window) | Client, licence type, number, office, issued and expiry dates, "No expiry date (valid until cancelled)", the certificate file ("only your firm and this client's owner can open it") |
| OW-08 Home, what needs me | "Good afternoon, Vikram"; Needs you: the purchase-bills task (Upload, Open thread) and "Add your licence certificates" (after EM-04); Coming up with "your CA files this" |
| OW-08b Home, nothing needs you | "Nothing needs you right now", still shows what's coming up |
| OW-09 Calendar | A small month: today filled, a dot on days with items (colour plus the list below, never colour alone); "This week": the task (Waiting on you), GSTR-3B and the tax audit report (Due soon). Every day is a 46 px tap target |
| OW-10 Licences | Shown after Vikram uploads his certificates: boiler Renew soon (expires 30 Nov, in 42 days), pollution consent Details needed with "Upload certificate", factory licence and fire certificate Valid, registration Valid until cancelled; the ruled-out hazardous waste authorisation in one line |
| OW-10b Licences, your CA will check | "Your CA is checking your answers. Nothing here is final until they do." |
| OW-12 Licence detail | Boiler certificate: Renew soon, number, office, issued date, the certificate file, "What it is", "Where to apply", its source, "Upload the new certificate" |
- **Owner pages that are taller than the phone** (OW-08, OW-10, OW-12) grow downwards, as a scrolling page does; the others stay 844 px with the tabs at the bottom.
- **Checks:** read-back on the 9 frames, 1,050 layers: 0 typed-in colours (759 bound), 0 loose corners, gaps or padding, all 362 texts styled and Anek Latin, no dashes, no cut-off text or content, no phone button under 44 px.
- **Review later (accepted at PM-12, 2026-10-22):** licence numbers, offices and the Delhi fire certificate date are made-up demo data; "renew every year on e-District Delhi" comes from the UX-2 wireframe and should be rechecked against [licences.md](../research/licences.md) in stage 2.

**Batch 5: tasks and thread states, F-08 and F-09 (5 frames, built 2026-10-21).** Section `batch-5 tasks and thread states`.
| Frame | What it shows |
|---|---|
| CA-18 Tasks | The firm's own tasks (they show on the calendar as "Task: …"), soonest first: each with a tick box, client (or "No client", "48 clients"), due date and how it repeats. PF is tracked here because its date isn't confirmed in the app yet |
| CA-18b After ticking a repeating task | The TDS-challan task now shows its next date, Wed 25 Nov ("Next one, made when the last was ticked"), and a toast "Done. The next one is due Wed 25 Nov." with Undo |
| CA-19 New task (window) | Task, client (optional), first due date, repeats, with the month-end rule as help text: "A task on the 31st moves to the last day of shorter months, for example 30 June" and "Next dates: 31 Dec, 31 Mar, 30 Jun, 30 Sep" (criterion 10) |
| CA-21b Mark done, file problem | The Mark done window with the receipt "GSTR3B_ack.heic" in the error state ("Wrong file type") and plain words: upload a PDF, JPG or PNG up to 10 MB, iPhone photos can be saved as JPG; "Mark done" stays off |
| EM-05 Task email to the owner | "Task from your CA: Upload purchase bills for September", due today 5 pm, "Open the task" (opens OW-11) |
- **Checks:** read-back on the 5 frames, 1,012 layers: 0 typed-in colours (740 bound), 0 loose corners, gaps or padding, all 321 texts styled and Anek Latin, no dashes. A clipped task column (cells left at a fixed height) was found by screenshot and fixed.

**Batch 6: settings and the firm's morning email, F-11 and F-10 (7 frames, built 2026-10-22).** Section `batch-6 settings and reminder email`. This completes all 65 frames. The four Settings pages share one shell (a copy of CA-18): the side menu with Settings active, the page title, and a settings menu card (Firm · Team · Due-date changes · Privacy) built from `NavItem`.
| Frame | What it shows |
|---|---|
| CA-22 Settings, firm | "Your firm's details": firm name, city, contact email, mobile and the default state ("New clients start with this state"); a "Morning list" card saying one email goes to everyone in the firm every morning around 7:30 am (late items and the next 7 days; done items left out; the same list for everyone in v1); Cancel and "Save changes" |
| CA-23 Settings, team | "Everyone in the firm has the same access in v1": a table of Rakesh Kapoor (you), Priya Malhotra and a pending invite, Neha Gupta: avatar, name and email in one column, status and date in another; "Resend invite" and "Cancel invite" only on the pending row; header button "Invite colleagues" (opens CA-05). CA staff avatars use the brand tone |
| CA-24 Settings, due-date changes | The changes already made, from [due-dates.md](../research/due-dates.md): tax audit report 30 Sep → 21 Oct and ITR for audit cases 31 Oct → 21 Nov, each with its source (CBDT Circular 07/2026), 24 clients, who and when; header button "Add a change"; a note that a change applies to this firm only |
| CA-24b Due-date change, preview | A side panel (Notion-style side peek, 440 px, no dimming): filing, period, new due date (with the old one), source; then the preview "This moves GSTR-3B (September 2026) from Tue 20 Oct to Sun 25 Oct for 70 clients", the first clients named, "22 are already done and stay done", and "Apply to 70 clients" (criterion 7). The numbers match the calendar: 48 left + 22 done |
| CA-24c Due-date change, applied | The new change is the top row (highlighted, "Example only, not a real extension"), 70 clients, and a toast "Updated for 70 clients. Owners see the new date too." with "See on calendar" |
| CA-25 Settings, privacy | An info banner "Made-up demo data only", the notice record (version 1.0, accepted by Rakesh Kapoor on Mon 3 Aug 2026, 10:02 am) with "Read the full notice", and "In short": what we keep, why, who sees it, where ("Kept safe on secure cloud servers. We never ask for your government portal passwords.", no place named: [ADR 0003](../../../adr/0003-hosting-and-data-region.md)) and your rights |
| EM-06 Firm's morning list | Monday 19 Oct, sent to Rakesh and Priya: "Late: 8 items" (TDS deposit 2, GSTR-1 3, ESIC 2, the Shine Platers fire certificate expired) and "Due in the next 7 days: 83 items for 74 clients" (GSTR-3B 48, tax audit report 9, GSTR-3B QRMP 26): the same numbers as CA-14. "Open the calendar". Done items never appear (criterion 12) |
- **Changes from the wireframes:** the demo cast replaces Sharma & Associates; active members have no "Remove" (no roles or removal in v1), only a pending invite can be resent or cancelled; the Joined date moved under the status word so the table fits beside the settings menu; the privacy page says the demo data is made up and drops "stored in India".
- **Parts:** no new components. New frames built from existing parts: `NavItem`, `Input`, `Select`, `Button`, table cells, `Banner`, `Toast`, `IconButton`.
- **Checks:** read-back on the 7 frames, 751 layers: 0 typed-in colours (541 bound), 0 loose corners, gaps or padding, all 260 texts styled and Anek Latin, no dashes, no cut-off text on the final screenshots.
**Loading, saving and empty states (heuristic fix #1, 2026-10-22).** One new frame, **CA-14c Calendar, loading** (section `batch-7 loading state`, a copy of CA-14): the side menu, header and toolbar are real; the summary line and the 35 day boxes are grey shapes in the form of what is coming (a skeleton screen, see the Learn-first table in [design.md](design.md)). That makes **66 frames**. Everything else is a rule for stage 2, written here so the code builds it the same way:
| Situation | What the person sees |
|---|---|
| A page or list is loading (calendar, clients, licences, tasks) | A skeleton like CA-14c: only the parts that wait for data are grey; the rest is real. A soft pulse, which stops when the device asks for reduced motion. Screen readers hear "Loading". If loading fails: an error `Banner` with "Try again" |
| A file is uploading | The `FileChip` in its uploading state with a progress bar (CA-09); a failed file shows the error state and plain words (CA-21b) |
| A form is saving (Save changes, Apply, Send invite, Mark done) | The button says "Saving…" and is off until the answer comes. Success: a toast (as in CA-21c, CA-24c). Failure: an error `Banner` above the form, and the typed values stay |
| A list is empty | The `EmptyState` part with one plain sentence and one action. Built already: calendar (CA-04), clients (CA-06b), licences (CA-16b), owner home (OW-08b), owner licences (OW-10b). Words for the rest: tasks "No tasks yet" + "New task"; due-date changes "No changes yet. When the government extends a date, add it here." + "Add a change"; a thread "No messages yet" + the message box; a search "No clients match" + "Clear search" |
- **Checks:** read-back on CA-14c, 194 layers: 0 typed-in colours (200 bound), 0 loose corners, gaps or padding, all 26 texts styled and Anek Latin, no dashes.
**Width checks (2026-10-22).** A script made a temporary copy of every frame, set it to 1366 px (CA) or 360 px (owner), listed every part that sticks out of the box that clips it, and deleted the copy. First run: 40 of 46 CA frames were fine; the rest had columns about 75 px too wide, side panels that didn't move with the right edge, and one dense grid. Fixes, then a second run with nothing left over except CA-15:
- **One flexible column per table**, the rest fixed: clients (client), import report (what to fix), licences (licence), tasks (task), due-date changes (filing). At 1440 px nothing moved (the flexible column kept its width within 2 px); at 1366 px it gives up the extra 74 px.
- **Team table:** name and email now share one column, so it fits beside the settings menu.
- **Panels and toasts are anchored:** the thread panel and the due-date panel stay on the right edge, toasts stay at the bottom middle (frame constraints), so a narrower window moves them with it.
- **CA-15 client grid** (8 columns, status chips in each) is 52 px too wide at 1366. Rule for stage 2: a table wider than its card scrolls sideways inside the card, with the first column fixed. Nothing else scrolls.
- **Owner screens at 360 px:** 16 of 17 fit. OW-09: the 7 day boxes now share the row width (45 px wide and 46 px tall at 360, 49 px at 390), still over the 44 px target size.
- **Tables in code:** columns are as wide as their content; exactly one column takes the leftover width and may wrap onto a second line (at 1366: a filing name or a client name).
- **Review later (accepted at PM-12, 2026-10-22):** (1) everyone in the firm gets the morning list; there is no per-person setting in v1. (2) The GSTR-3B extension in CA-24b and CA-24c is invented and labelled "Example"; a real extension would carry a real notification. (3) and (4) are done in the polish pass: CA-03's "Your rights" line now matches CA-25 (v1 has no export and delete yet), and its notice date, which was after the demo's "today", is gone. (5) The morning list says "around 7:30 am" because Vercel's free timer runs once a day within an hour ([ADR 0009](../../../adr/0009-timed-jobs-and-backups.md)).

# v1 Screens (UX-2)

The screen list for v1, and which screen covers each step of the user flows. Part of [design.md](design.md) (stage 1). Steps come from [flows.md](flows.md).

- **Where to see them:** Figma page `02 Wireframes` in [complypilot](https://www.figma.com/design/wMTrpY84cAfQiI5a9lcr0f/complypilot). One section per flow (F-01 to F-11), frames left to right in step order, a yellow note under each. The grey parts are in the `wf kit` section. Frame IDs are in [figma-ledger.json](figma-ledger.json).
- **IDs:** CA = CA firm on a desktop (1440 px wide). OW = owner on a phone (390 px wide, a web page opened from the email link). EM = email. A letter (b, c) marks another state of the same screen.
- **Count:** 25 desktop screens, 12 phone screens, 7 emails and 21 extra states: 65 frames.
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

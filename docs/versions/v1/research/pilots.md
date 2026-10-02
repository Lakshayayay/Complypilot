# Pilots (v1 research, tasks v1-PM-6 and v1-PM-7)

Started 2026-10-02. **Use firm initials only.** No names, phone numbers or client details go in this file or in git.

## Tracker
| Firm | Introduced by | Factory clients? | Status | Interview |
|---|---|---|---|---|
| (initials) | (contact initials) | yes / some / no | asked / agreed / done / declined | date |

Goal: 3 firms agree (PM-6), at least 2 interviews written up (PM-7), before the stage 0 gate (11 Oct; it can slip about a week).

## Message 1: to your contacts (WhatsApp)
> Hi [name], I'm building a simple tool for CA firms whose clients are factories. It shows every client's GST, TDS, PF, ESIC and income-tax due dates, plus their factory licences and expiry dates, in one screen instead of Excel. It's free for the first few firms. Do you know 2–3 CA firms with manufacturing clients who'd give me 30 minutes on a call? Even a name and number is a big help. Thanks!

## Message 2: to a CA firm (after the intro)
> Hello [name], [contact] suggested I reach out. I'm building a free tool for CA firms with factory clients. It tracks every client's filing deadlines and licence expiry dates in one grid. Before I build it, I'd like to learn how your office tracks this today. Could we talk for 30 minutes, on a call or in person, at a time that suits you? I know Sep–Oct is your busiest season, so any slot works for me.

## Interview script (30 minutes)
Ask, listen, take notes. Don't pitch until the last 5 minutes.

**1. Their office (5 min)**
- How many people work in the firm? Do they all work on every client, or does each person have their own clients? (v1 gives everyone the same access.)
- How many clients do you have? How many are factories or manufacturers?

**2. Tracking filings today (10 min)**
- How do you keep track of what's due and what's done each month? Excel, a register, software (Jamku, Winman CA-ERP, other), or memory?
- Can you share that sheet with names and numbers removed? (We check our import columns against it.)
- Which filings take most of your chasing: GSTR-1, GSTR-3B, QRMP, composition, TDS, PF, ESIC, income tax? Any we're missing, like ROC filings?
- When a filing is done, where do you keep the ARN and the receipt?
- When the government extends a due date, how does your office find out and update everyone?

**3. Factory licences (7 min)**
- Do you track any licences for factory clients: factory licence, pollution consents (CTE/CTO), fire NOC, boiler certificate, hazardous waste, EPR? Which ones matter most?
- Has a client ever been caught out by an expired licence? What happened?
- Consent to Operate no longer expires (since January 2026). Are clients with older CTOs that show an expiry date still being asked to renew?
- Do yearly factory filings (environmental statement Form V, EPR annual return, factory annual return) come to you, or to someone else?

**4. Would they use it (8 min)**
- Here's what v1 does: the client × filing grid, marking a filing done with its ARN and receipt, licences with 90/60/30-day warnings, and a CSV import. What's missing that would stop you using it?
- Would you track the filings due in **January 2027** in it? (That's our success test.)
- How would you add your clients: fill in our CSV template, or send your existing Excel?
- For an AI feature that reads GST registration certificates: could you share 5–10 certificates, with your clients' consent, for testing? (They stay out of git.)

**Close:** thank them, say what happens next (a 20-minute design test in mid-October, early access in December), and ask if they know another firm.

## Write-up template (one per firm)
### Firm [initials], [date]
- **Size:** people / clients / factory clients
- **Tracks filings with:**
- **Filings that matter most:**
- **Missing filings:**
- **Licences that matter:**
- **CTO renewals still happening?**
- **Would use v1 for January 2027?** yes / maybe / no, and why
- **Blockers they named:**
- **Sheet shared?** yes / no; columns it has:
- **Certificates for the AI eval set?** yes / no / how many
- **What this changes in v1:** (scope, filing list, licence list, CSV columns)

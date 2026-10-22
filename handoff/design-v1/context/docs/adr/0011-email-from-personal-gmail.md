# 0011 Email is sent from Lakshay's personal Gmail

**Status:** Accepted · **Date:** 2026-10-22 · **Decided by:** Lakshay (Claude recommended a separate account) · **Task:** v1-FS-1 · **Replaces** the "new Gmail account made for the app" point in [ADR 0005](0005-email-through-gmail.md); the rest of 0005 (Gmail over SMTP, Nodemailer, app password) stays

## Context
ADR 0005 said the app sends email from a new Gmail account, so a leaked password could never reach Lakshay's own mail. On 2026-10-22 Lakshay chose his personal Gmail instead, to save the setup time.

## Options
| Option | For | Against |
|---|---|---|
| A separate account for the app (Claude's recommendation) | A leaked app password exposes only the app's mailbox; recipients see the app's address | About 5 minutes to make |
| **Lakshay's personal Gmail** | Nothing new to make | A leaked app password can open his personal mail; every CA and test owner sees his address |

## Decision
Use the **personal Gmail** with an **app password** (a 16-letter password Google makes for one app; needs 2-Step Verification). Third-party sources say an app password reaches only mail (SMTP, IMAP), not the rest of the Google account ([Rebex](https://blog.rebex.net/gmail-using-app-passwords), [Cloud Security Alliance](https://cloudsecurityalliance.org/articles/why-application-specific-passwords-are-a-security-risk-in-google-workspace), 2026-10-22); Google's own page was not opened, `UNVERIFIED`.

## Consequences
- The app password lives only in `.env.local`, Vercel's settings and GitHub's settings. Never in chat, git or docs. It is made just before FS-3, the first email task.
- If it ever leaks: delete that one app password in the Google account (the Google password stays). Changing the Google password also deletes all app passwords, and emails stop ([ADR 0005](0005-email-through-gmail.md), error hook).
- Emails show his address as the sender, and the roughly 500-a-day Gmail limit is shared with his own mail.
- Moving to a separate account or to a domain later means changing two settings (`GMAIL_USER`, `GMAIL_APP_PASSWORD`), not code. A domain brings Resend (or similar) with a new ADR.

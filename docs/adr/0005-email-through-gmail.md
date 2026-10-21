# 0005 Email: a new Gmail account, over SMTP

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended) · **Task:** v1-FS-1

## Context
The app sends sign-in links (F1, F3), one reminder list each morning and Monday (F10) and a task email. Rule from D1: fully free, **no domain**. Supabase's own sender is for testing only: it reaches only the project's team members and sends 2 emails an hour ([Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp), 2026-10-21). Resend's free plan, without a verified domain, can only email its owner's own address ([Resend](https://resend.com/docs/knowledge-base/403-error-resend-dev-domain)).

## Options
| Option | For | Against |
|---|---|---|
| **New Gmail account over SMTP** | Free, reaches anyone, no domain | Looks less professional; may land in spam; 500 emails a day |
| Resend free | Better tooling | Needs a domain to reach anyone else |

## Decision
A **new Gmail account made for the app** (not Lakshay's own). Supabase Auth uses it as its custom SMTP server, and our server code sends reminders through it with **Nodemailer** (an email-sending library; [Using Gmail](https://nodemailer.com/usage/using-gmail)). It signs in with an **app password** (a 16-letter password Google makes for one app; needs 2-Step Verification on; Google's own page for this wasn't opened, `UNVERIFIED`). The app password lives only in env files.

## Consequences
- Gmail allows about 500 emails a day for a personal account ([Google](https://support.google.com/mail/answer/22839?hl=en), 2026-10-21). Demo scale is far below that.
- Supabase puts a default limit on custom SMTP (sources differ: 30 messages an hour, or 30 new users an hour); it can be raised in the dashboard.
- Emails may look plain or reach spam folders. Test with real inboxes at FS-12 and tell the demo audience to check spam.
- When a domain is bought, move to Resend (or similar) with a new ADR.
- If the app password is revoked (Google does it when the account password changes), emails stop: the error hook ([ADR 0006](0006-error-alerts-by-email.md)) can't email either. QA-5 adds a check that doesn't depend on Gmail.

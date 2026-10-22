# Decisions (ADRs)

One line per decision. Open the file only if the task needs it. An accepted ADR is never edited: a new one replaces it.

| # | Decision | Date |
|---|---|---|
| [0001](0001-app-framework.md) | One Next.js app in TypeScript | 2026-10-21 |
| [0002](0002-database-login-files.md) | Supabase for database, email-link login and private files, used as the signed-in user (no ORM) | 2026-10-21 |
| [0003](0003-hosting-and-data-region.md) | Vercel free plan; demo data in Seoul, Mumbai before real users; the app names no place | 2026-10-21 |
| [0004](0004-training-and-demo-environments.md) | Two Supabase projects: "comply pilot" (training) and "comply-pilot-new" (demo/live) | 2026-10-21 |
| [0005](0005-email-through-gmail.md) | Email over Gmail SMTP with Nodemailer and an app password (the account choice is replaced by 0011) | 2026-10-21 |
| [0006](0006-error-alerts-by-email.md) | Error alerts: Vercel logs plus an email hook | 2026-10-21 |
| [0007](0007-ui-toolkit.md) | Tailwind CSS and shadcn/ui | 2026-10-21 |
| [0008](0008-testing-tools.md) | Vitest for unit and database tests, Playwright for click-through tests | 2026-10-21 |
| [0009](0009-timed-jobs-and-backups.md) | Vercel Cron for emails, GitHub Actions for encrypted nightly backups | 2026-10-21 |
| [0010](0010-private-repository.md) | The GitHub repository is private | 2026-10-22 |
| [0011](0011-email-from-personal-gmail.md) | Email is sent from Lakshay's personal Gmail | 2026-10-22 |

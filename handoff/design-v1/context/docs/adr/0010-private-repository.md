# 0010 The repository is private

**Status:** Accepted · **Date:** 2026-10-22 · **Decided by:** Lakshay · **Task:** v1-FS-1, v1-QA-1 · **Replaces** the "public repository" points in [ADR 0008](0008-testing-tools.md) and [ADR 0009](0009-timed-jobs-and-backups.md)

## Context
The GitHub repository `Lakshayayay/Complypilot` was public. On 2026-10-22 Lakshay decided to make it private. That changes what GitHub's free plan gives us.

## Options
| Option | For | Against |
|---|---|---|
| Stay public | The "merge only when checks pass" branch rule works on the Free plan; free Actions minutes | Everything in git is open to anyone |
| **Private + GitHub Pro (free for students)** | Private code; the branch rule works; 3,000 Actions minutes a month | Lakshay applies for the student benefit by hand; it needs to be renewed while he is a student |
| Private on the Free plan | No application | No branch rule on private repos; 2,000 Actions minutes |

## Decision
**Private**, and Lakshay applies for **GitHub Pro through the [Student Developer Pack](https://education.github.com/pack)** (free while a student; whether his account qualifies is `UNVERIFIED`). Protected branches in private repositories need Pro or higher ([GitHub plans](https://docs.github.com/get-started/learning-about-github/githubs-products), 2026-10-22).

## Consequences
- **QA-1:** the branch rule on `main` is switched on only once Pro is active. Until then the checks still run on every push, but nothing stops a merge.
- **Actions minutes are limited** (2,000 a month on Free, 3,000 on Pro; [billing](https://docs.github.com/en/billing/concepts/product-billing/github-actions)). Keep the checks lean: cache installs, run the security tests (a throwaway Supabase) on pull requests and `main`, and leave Playwright to stage 4.
- **Vercel Hobby** deploys a private repo only from a personal GitHub account, and only when the commit author is the owner of the Hobby team ([Vercel](https://vercel.com/docs/deployments/troubleshoot-project-collaboration), `UNVERIFIED` as the rules change). So the repo stays under `Lakshayayay` and commits use his GitHub email. Confirm at QA-1.
- **Backups** (ADR 0009): the artifact is now visible only to people with access. The encryption stays, as it costs one line and keeps the habit for when real data arrives. The 60-day pause of scheduled workflows was a public-repo point and is dropped.
- **Secrets still never go in git**: a private repo can be made public again or leak. None ever entered the history (checked 2026-10-21).

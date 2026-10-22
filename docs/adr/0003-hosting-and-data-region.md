# 0003 Hosting on Vercel, and where the demo data lives

**Status:** Accepted · **Date:** 2026-10-21 · **Decided by:** Lakshay (Claude recommended hosting; Lakshay chose the region) · **Task:** v1-FS-1

## Context
v1 must be live online and deploy by itself. The money rule is "fully free" ([tech.md](../versions/v1/build/tech.md#decision-log), D1). Lakshay already has a Vercel account and deploys from GitHub. His two Supabase projects are in Tokyo (ap-northeast-1) and Seoul (ap-northeast-2); neither is in India, and a project's region can't be changed.

## Options
| Question | Options |
|---|---|
| Hosting | **Vercel Hobby (free)** · Netlify or Cloudflare (Next.js needs extra adapters) · Render (free plan sleeps when idle) |
| Region | A new demo project in Mumbai (ap-south-1) · **keep Seoul and change the promise** |

## Decision
- **Vercel Hobby.** Production deploys from `main`; every branch gets a preview link. Functions run in **Seoul (`icn1`)**, next to the demo database. Vercel lists `icn1` as Seoul ([regions](https://vercel.com/docs/regions)); whether Hobby may pick it is `UNVERIFIED`, we confirm at QA-1.
- **Region: keep Seoul** (Lakshay). v1 holds made-up data only. The sign-up and privacy screens say "Kept safe on secure cloud servers" and name no place. The full notice (stage 2) names it exactly.

## Consequences
- **Before the first real client's data:** make a new Supabase project in Mumbai, move the data, and write a new ADR. It comes with "export and delete a client" in the first real-user version.
- [privacy.md](../versions/v1/research/privacy.md) listed "data in India" as a v1 safeguard; it now says Seoul for v1, Mumbai before real users.
- Hobby is for non-commercial use only ([Vercel Hobby](https://vercel.com/docs/plans/hobby)). A college project fits; paying CAs mean the paid plan.
- Both free Supabase slots are used (training and demo), so a Mumbai project means pausing one.

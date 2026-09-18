# v4 — Grounded AI Auditing

**Status:** Outline. Planned in detail after v3 ships.

## Goal (draft)
The system finds tax credit at risk and ledger mistakes, and sends short, relevant regulation updates.

## Scope ideas (from PDP Module 5)
- Match GSTR-2B (the GST statement of what suppliers reported) against the firm's purchase records. Flag suppliers who haven't filed, so input tax credit (ITC, tax the business can claim back) isn't lost.
- Tax leakage alerts: wrong TDS rates, invoices paid twice.
- Regulation feed: simple summaries of new circulars that matter to this business, linked to the original.
- AI: exact matching first, then fuzzy matching (catching near-matches like typos); spotting unusual entries; answers based only on source documents; evals (test sets that measure how accurate the AI is).

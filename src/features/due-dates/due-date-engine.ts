// The due-date engine (v1-FS-5, acceptance criterion 6). Pure: same input, same answer. It never
// reads the clock or the database; "today" and the firm's date changes are passed in.
// Only the confirmed (✅) rows of docs/versions/v1/research/due-dates.md are here. Decisions: tech.md,
// "FS-5 decisions".
import { type IsoDate, parts, ymd } from '../../lib/dates';
import { qrmpDay } from '../../lib/states';

export type GstScheme = 'monthly' | 'qrmp' | 'composition' | 'none';
const SCHEMES: readonly string[] = ['monthly', 'qrmp', 'composition', 'none'];

// In the order the add-client screen shows them (GST, TDS, ESIC, income tax). Must match the CHECK
// list in the migration; a test compares the two.
export const FILING_CODES = [
  'gstr1',
  'gstr3b',
  'pmt06',
  'cmp08',
  'gstr4',
  'gstr9',
  'tds_deposit',
  'tds_return_salary',
  'tds_return_other',
  'esic',
  'advance_tax',
  'tax_audit',
  'itr_audit',
] as const;
export type FilingCode = (typeof FILING_CODES)[number];

export const FILING_NAME: Record<FilingCode, string> = {
  gstr1: 'GSTR-1',
  gstr3b: 'GSTR-3B',
  pmt06: 'PMT-06',
  cmp08: 'CMP-08',
  gstr4: 'GSTR-4',
  gstr9: 'GSTR-9',
  tds_deposit: 'TDS deposit',
  tds_return_salary: 'TDS return, salary (Form 138)',
  tds_return_other: 'TDS return, other (Form 140)',
  esic: 'ESIC',
  advance_tax: 'Advance tax',
  tax_audit: 'Tax audit report',
  itr_audit: 'Income tax return, audit cases',
};

/** A firm's own date change (a due_date_changes row). Nothing here is the engine's to decide. */
export interface DueDateChange {
  id: string;
  filingCode: string;
  periodStart: IsoDate;
  /** Empty = every state. */
  state: string | null;
  newDueDate: IsoDate;
  createdAt: string;
  removedAt: string | null;
}

/** The same fields as a calendar_items row for a filing. */
export interface DueItem {
  filingCode: FilingCode;
  periodStart: IsoDate;
  periodLabel: string;
  officialDueDate: IsoDate;
  dueDate: IsoDate;
  dueDateChangeId: string | null;
}

type Kind = 'month' | 'quarter' | 'year';
/** First day of a period. */
interface Start {
  year: number;
  month: number;
}

interface Variant {
  schemes: readonly GstScheme[];
  kind: Kind;
  /** The line next to the checkbox on the add-client screen. */
  text: string;
  needsState?: boolean;
  /** The official date, or null when we hold no confirmed date for this period. */
  due(start: Start, state: string): IsoDate | null;
  label?(start: Start): string;
}

const ANY = SCHEMES as readonly GstScheme[];
const REGULAR: readonly GstScheme[] = ['monthly', 'qrmp'];

const nextMonth = (day: number) => (s: Start) => ymd(s.year, s.month + 1, day);
const afterQuarter = (day: number) => (s: Start) => ymd(s.year, s.month + 3, day);
// Jul 31, Oct 31, Jan 31 for the first three quarters; the Jan to Mar quarter is due 31 May.
const tdsReturn = (s: Start) => ymd(s.year, s.month + (s.month === 1 ? 4 : 3), 31);

// Keyed by the year a financial year starts. Only years confirmed in due-dates.md; the CBDT
// extensions (30 Sep to 21 Oct, 31 Oct to 21 Nov 2026) are firm date changes, not rules.
const TAX_AUDIT_DUE: Record<number, IsoDate> = { 2025: '2026-09-30', 2026: '2027-09-30' };
const ITR_AUDIT_DUE: Record<number, IsoDate> = { 2025: '2026-10-31' };

const RULES: Record<FilingCode, Variant[]> = {
  gstr1: [
    { schemes: ['monthly'], kind: 'month', text: 'GSTR-1 · 11th of the next month', due: nextMonth(11) },
    { schemes: ['qrmp'], kind: 'quarter', text: 'GSTR-1 · 13th of the month after the quarter', due: afterQuarter(13) },
  ],
  gstr3b: [
    { schemes: ['monthly'], kind: 'month', text: 'GSTR-3B · 20th of the next month', due: nextMonth(20) },
    {
      schemes: ['qrmp'],
      kind: 'quarter',
      text: 'GSTR-3B · 22nd or 24th of the month after the quarter, by state',
      needsState: true,
      due: (s, state) => ymd(s.year, s.month + 3, qrmpDay(state)),
    },
  ],
  pmt06: [
    {
      schemes: ['qrmp'],
      kind: 'month',
      text: 'PMT-06 · 25th of the next month (first two months of each quarter)',
      due: (s) => (s.month % 3 === 0 ? null : ymd(s.year, s.month + 1, 25)),
    },
  ],
  cmp08: [{ schemes: ['composition'], kind: 'quarter', text: 'CMP-08 · 18th of the month after the quarter', due: afterQuarter(18) }],
  gstr4: [{ schemes: ['composition'], kind: 'year', text: 'GSTR-4 · 30 April after the year', due: (s) => ymd(s.year + 1, 4, 30) }],
  gstr9: [{ schemes: REGULAR, kind: 'year', text: 'GSTR-9 · 31 December after the year', due: (s) => ymd(s.year + 1, 12, 31) }],
  tds_deposit: [
    {
      schemes: ANY,
      kind: 'month',
      text: 'TDS deposit · 7th of the next month (March: 30 April)',
      due: (s) => (s.month === 3 ? ymd(s.year, 4, 30) : ymd(s.year, s.month + 1, 7)),
    },
  ],
  tds_return_salary: [
    { schemes: ANY, kind: 'quarter', text: 'TDS return, salary (Form 138) · 31 Jul, 31 Oct, 31 Jan, 31 May', due: tdsReturn },
  ],
  tds_return_other: [
    { schemes: ANY, kind: 'quarter', text: 'TDS return, other (Form 140) · 31 Jul, 31 Oct, 31 Jan, 31 May', due: tdsReturn },
  ],
  esic: [{ schemes: ANY, kind: 'month', text: 'ESIC · 15th of the next month', due: nextMonth(15) }],
  advance_tax: [
    {
      schemes: ANY,
      kind: 'quarter',
      text: 'Advance tax · 15 Jun, 15 Sep, 15 Dec, 15 Mar',
      due: (s) => ymd(s.year, s.month + 2, 15),
      label: (s) => {
        const n = [4, 7, 10, 1].indexOf(s.month);
        return `${['1st', '2nd', '3rd', '4th'][n]} instalment, ${financialYear(s.month === 1 ? s.year - 1 : s.year)} (${[15, 45, 75, 100][n]}%)`;
      },
    },
  ],
  tax_audit: [
    { schemes: ANY, kind: 'year', text: 'Tax audit report · 30 September after the year', due: (s) => TAX_AUDIT_DUE[s.year] ?? null },
  ],
  itr_audit: [
    { schemes: ANY, kind: 'year', text: 'Income tax return, audit cases · 31 October after the year', due: (s) => ITR_AUDIT_DUE[s.year] ?? null },
  ],
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const financialYear = (startYear: number) => `FY ${startYear}-${String((startYear + 1) % 100).padStart(2, '0')}`;

function defaultLabel(kind: Kind, s: Start): string {
  if (kind === 'month') return `${MONTHS[s.month - 1]} ${s.year}`;
  if (kind === 'quarter') return `${MONTHS[s.month - 1].slice(0, 3)} to ${MONTHS[s.month + 1].slice(0, 3)} ${s.year}`;
  return financialYear(s.year);
}

const startsHere = (kind: Kind, month: number) => kind === 'month' || (kind === 'quarter' ? month % 3 === 1 : month === 4);

function assertScheme(scheme: string): asserts scheme is GstScheme {
  if (!SCHEMES.includes(scheme)) throw new Error(`Unknown GST scheme: ${scheme}`);
}

function pick(code: string, scheme: string): { code: FilingCode; variant: Variant } {
  if (!(FILING_CODES as readonly string[]).includes(code)) throw new Error(`Unknown filing: ${code}`);
  assertScheme(scheme);
  const known = code as FilingCode;
  const variant = RULES[known].find((v) => v.schemes.includes(scheme));
  if (!variant) throw new Error(`${FILING_NAME[known]} does not apply when the GST scheme is "${scheme}"`);
  return { code: known, variant };
}

/** The filings a client with this GST scheme may choose, in the order the screen shows them. */
export function filingsFor(scheme: string): FilingCode[] {
  assertScheme(scheme);
  return FILING_CODES.filter((code) => RULES[code].some((v) => v.schemes.includes(scheme)));
}

/** The rule line next to a filing's checkbox. */
export function ruleText(code: string, scheme: string): string {
  return pick(code, scheme).variant.text;
}

// A change for the client's own state beats an all-states change; between equals, the newest wins.
const stronger = (a: DueDateChange, b: DueDateChange) =>
  (a.state !== null) !== (b.state !== null) ? a.state !== null : Date.parse(a.createdAt) > Date.parse(b.createdAt);

function bestChange(changes: readonly DueDateChange[], code: FilingCode, periodStart: IsoDate, state: string) {
  let best: DueDateChange | undefined;
  for (const c of changes) {
    if (c.removedAt !== null || c.filingCode !== code || c.periodStart !== periodStart) continue;
    if (c.state !== null && c.state !== state) continue;
    if (!best || stronger(c, best)) best = c;
  }
  return best;
}

/**
 * Every item of the ticked filings whose final date (after the firm's changes) falls in [from, to],
 * soonest first. Throws a plain sentence on a filing that does not fit the scheme or an unknown
 * state: a skipped item would be a missed deadline nobody sees.
 */
export function workOutItems(input: {
  scheme: string;
  state: string;
  filings: readonly string[];
  changes?: readonly DueDateChange[];
  from: IsoDate;
  to: IsoDate;
}): DueItem[] {
  const { scheme, state, changes = [], from, to } = input;
  const picked = [...new Set(input.filings)].map((code) => pick(code, scheme));
  if (picked.some((p) => p.variant.needsState)) qrmpDay(state);
  const start = parts(from);
  const end = parts(to);

  const items: DueItem[] = [];
  // ponytail: tries periods that start up to 3 years before the window (the latest official date is
  // under 2 years after a period starts); a change moving a date by more than a year is missed.
  const first = start.year * 12 + start.month - 1 - 36;
  const last = end.year * 12 + end.month - 1;
  for (let n = first; n <= last; n++) {
    const s: Start = { year: Math.floor(n / 12), month: (n % 12) + 1 };
    const periodStart = ymd(s.year, s.month, 1);
    for (const { code, variant } of picked) {
      if (!startsHere(variant.kind, s.month)) continue;
      const officialDueDate = variant.due(s, state);
      if (officialDueDate === null) continue;
      const change = bestChange(changes, code, periodStart, state);
      const dueDate = change?.newDueDate ?? officialDueDate;
      if (dueDate < from || dueDate > to) continue;
      items.push({
        filingCode: code,
        periodStart,
        periodLabel: (variant.label ?? ((x: Start) => defaultLabel(variant.kind, x)))(s),
        officialDueDate,
        dueDate,
        dueDateChangeId: change?.id ?? null,
      });
    }
  }
  const order = (c: FilingCode) => FILING_CODES.indexOf(c);
  return items.sort(
    (a, b) =>
      a.dueDate.localeCompare(b.dueDate) ||
      order(a.filingCode) - order(b.filingCode) ||
      a.periodStart.localeCompare(b.periodStart),
  );
}

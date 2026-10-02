// Due-date engine (v1-FS-5). A pure function: same inputs, same answer. It never reads
// the clock or a database. Every rule cites its official source. Rules still marked ⚠️ in
// docs/versions/v1/research/due-dates.md stay out until confirmed.
//
// Dates are plain "YYYY-MM-DD" strings. A due date is a day on the calendar, not a moment
// in time, so time zones can't shift it.

// CGST rule 61(1)(ii) table, as substituted by Notification 82/2020-Central Tax.
// The notification lists "Daman and Diu" and "Dadra and Nagar Haveli" separately. They
// became one Union territory in 2020, and both are on the 22nd.
const QRMP_22ND = [
  'Chhattisgarh', 'Madhya Pradesh', 'Gujarat', 'Maharashtra', 'Karnataka', 'Goa', 'Kerala',
  'Tamil Nadu', 'Telangana', 'Andhra Pradesh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Puducherry', 'Andaman and Nicobar Islands', 'Lakshadweep',
] as const;
const QRMP_24TH = [
  'Himachal Pradesh', 'Punjab', 'Uttarakhand', 'Haryana', 'Rajasthan', 'Uttar Pradesh', 'Bihar',
  'Sikkim', 'Arunachal Pradesh', 'Nagaland', 'Manipur', 'Mizoram', 'Tripura', 'Meghalaya',
  'Assam', 'West Bengal', 'Jharkhand', 'Odisha', 'Jammu and Kashmir', 'Ladakh', 'Chandigarh',
  'Delhi',
] as const;

export const STATES = [...QRMP_22ND, ...QRMP_24TH];
export type State = (typeof STATES)[number];
export type Client = { state: State };
/** A government extension. It replaces the rule's date for one filing and period, for every client. */
export type Override = { filing: Filing; period: string; due: string };

type Period = { year: number; month: number };
type Rule = {
  months: 'all' | 'quarter-end' | 'not-quarter-end';
  due: (p: Period, c: Client) => string;
};

const RULES = {
  // CGST rule 61(1)(i): the 20th of the month after the month.
  'gstr3b-monthly': { months: 'all', due: (p) => dayOfNextMonth(p, 20) },
  // CGST rule 61(1)(ii): the 22nd or 24th of the month after the quarter, by principal place of business.
  'gstr3b-qrmp': { months: 'quarter-end', due: (p, c) => dayOfNextMonth(p, qrmpDay(c.state)) },
  // CGST rule 61(3): QRMP tax for the 1st and 2nd month of a quarter, by the 25th of the next month.
  'pmt-06': { months: 'not-quarter-end', due: (p) => dayOfNextMonth(p, 25) },
} satisfies Record<string, Rule>;

export type Filing = keyof typeof RULES;

/**
 * The due date for one filing, as "YYYY-MM-DD".
 * `period` is the period's last month as "YYYY-MM". For a quarter, that's March, June,
 * September or December.
 */
export function dueDate(
  filing: Filing,
  period: string,
  client: Client,
  overrides: readonly Override[] = [],
): string {
  const p = parsePeriod(period);
  const rule: Rule = RULES[filing];
  const quarterEnd = p.month % 3 === 0;
  if ((rule.months === 'quarter-end' && !quarterEnd) || (rule.months === 'not-quarter-end' && quarterEnd)) {
    throw new Error(`${filing} has no period ending ${period}`);
  }
  const override = overrides.find((o) => o.filing === filing && o.period === period);
  return override ? override.due : rule.due(p, client);
}

function parsePeriod(period: string): Period {
  const m = /^(\d{4})-(0[1-9]|1[0-2])$/.exec(period);
  if (!m) throw new Error(`Period must look like "2026-12", got "${period}"`);
  return { year: Number(m[1]), month: Number(m[2]) };
}

function dayOfNextMonth({ year, month }: Period, day: number): string {
  const next = month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
  return `${next.year}-${String(next.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function qrmpDay(state: State): number {
  // Data from the database or a CSV can still hold a name that isn't on the list.
  if ((QRMP_22ND as readonly string[]).includes(state)) return 22;
  if ((QRMP_24TH as readonly string[]).includes(state)) return 24;
  throw new Error(`Unknown state "${state}"`);
}

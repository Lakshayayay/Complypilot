// Next dates for the firm's own repeating tasks (v1-FS-14, acceptance criterion 10). Pure: same
// input, same answer; it never reads the clock. A series keeps the day of its first due date (the
// anchor day); in a shorter month the date moves back to that month's last day, then returns:
// 31 Dec, 31 Mar, 30 Jun, 30 Sep, 31 Dec. Decisions: tech.md, "FS-14 decisions".
import { type IsoDate, parts, ymd } from '../../lib/dates';

export const REPEATS = ['monthly', 'quarterly', 'yearly'] as const;
export type Repeat = (typeof REPEATS)[number];

const STEP: Record<Repeat, number> = { monthly: 1, quarterly: 3, yearly: 12 };

/** The anchor day in the month `months` after the first date, or that month's last day. */
function onAnchor(first: { year: number; month: number; day: number }, months: number): IsoDate {
  const lastDay = parts(ymd(first.year, first.month + months + 1, 0)).day;
  return ymd(first.year, first.month + months, Math.min(first.day, lastDay));
}

/**
 * The first date of the series after `after`. Pass the ticked item's series date
 * (`official_due_date`), not today and not a date moved by hand: a task ticked late gets the next
 * date in the series, so no month is skipped, and moving one task never moves the rest.
 */
export function nextDueDate(input: { firstDueDate: IsoDate; repeat: string; after: IsoDate }): IsoDate {
  const { firstDueDate, repeat, after } = input;
  if (!(REPEATS as readonly string[]).includes(repeat)) throw new Error(`Unknown repeat: ${repeat}`);
  const step = STEP[repeat as Repeat];
  const first = parts(firstDueDate);
  const a = parts(after);

  let k = Math.max(0, Math.floor(((a.year - first.year) * 12 + a.month - first.month) / step));
  let date = onAnchor(first, k * step);
  while (date <= after) date = onAnchor(first, ++k * step);
  return date;
}

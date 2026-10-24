// Plain calendar dates as "YYYY-MM-DD" text: the shape Postgres `date` gives us, with no time of day,
// so a date can never slip to the day before in India (UTC+5:30). The maths runs in UTC.
export type IsoDate = string;

const DAY_MS = 86_400_000;

/** Builds a date; a month or day past the end rolls over (month 13 = January of the next year). */
export function ymd(year: number, month: number, day: number): IsoDate {
  return new Date(Date.UTC(year, month - 1, day)).toISOString().slice(0, 10);
}

export function parts(date: IsoDate): { year: number; month: number; day: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  if (m) {
    const [year, month, day] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (ymd(year, month, day) === date) return { year, month, day };
  }
  throw new Error(`Not a date: ${date}`);
}

export function addDays(date: IsoDate, days: number): IsoDate {
  const { year, month, day } = parts(date);
  return ymd(year, month, day + days);
}

/** Whole days from `from` to `to`; negative when `to` is earlier. */
export function daysBetween(from: IsoDate, to: IsoDate): number {
  const a = parts(from);
  const b = parts(to);
  return (Date.UTC(b.year, b.month - 1, b.day) - Date.UTC(a.year, a.month - 1, a.day)) / DAY_MS;
}

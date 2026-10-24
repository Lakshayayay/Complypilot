import { describe, expect, it } from 'vitest';
import { parts, ymd } from '../../lib/dates';
import { nextDueDate } from './repeating-tasks';

// The series dates after the first one, as CA-19's "Next dates" preview builds them.
function series(firstDueDate: string, repeat: string, count: number): string[] {
  const dates: string[] = [];
  let after = firstDueDate;
  for (let i = 0; i < count; i++) dates.push((after = nextDueDate({ firstDueDate, repeat, after })));
  return dates;
}

// ---------------------------------------------------------------------------------------------
// Criterion 10: the right next dates for monthly, quarterly and yearly tasks, including month ends.
// ---------------------------------------------------------------------------------------------
describe('next dates (criterion 10)', () => {
  it('monthly on the 31st: 28 Feb, then back to the 31st', () => {
    expect(series('2027-01-31', 'monthly', 3)).toEqual(['2027-02-28', '2027-03-31', '2027-04-30']);
  });

  it('monthly on the 31st in a leap year: 29 Feb', () => {
    expect(series('2028-01-31', 'monthly', 1)).toEqual(['2028-02-29']);
  });

  it('quarterly on the 31st: the CA-19 example', () => {
    expect(series('2026-12-31', 'quarterly', 4)).toEqual(['2027-03-31', '2027-06-30', '2027-09-30', '2027-12-31']);
  });

  it('yearly on 29 Feb: 28 Feb in other years, 29 Feb again in the next leap year', () => {
    expect(series('2028-02-29', 'yearly', 4)).toEqual(['2029-02-28', '2030-02-28', '2031-02-28', '2032-02-29']);
  });

  it('monthly on the 25th: the CA-18b example, and December rolls into January', () => {
    expect(series('2026-10-25', 'monthly', 3)).toEqual(['2026-11-25', '2026-12-25', '2027-01-25']);
  });

  it('never drifts: 24 monthly dates from 31 Jan are each the 31st or the month\'s last day', () => {
    series('2027-01-31', 'monthly', 24).forEach((date, i) => {
      const { year, month } = parts(ymd(2027, 2 + i, 1));
      const lastDay = parts(ymd(year, month + 1, 0)).day;
      expect(date).toBe(ymd(year, month, Math.min(31, lastDay)));
    });
  });
});

// ---------------------------------------------------------------------------------------------
// FS-14 decisions D1 and D2 (tech.md): the next date comes from the series only.
// ---------------------------------------------------------------------------------------------
describe('where the next date counts from', () => {
  it('D1: ticked late, the next one is still the next in the series (no month skipped)', () => {
    // Due 25 Oct, ticked on 30 Dec: the caller passes the ticked item's series date, never today.
    expect(nextDueDate({ firstDueDate: '2026-10-25', repeat: 'monthly', after: '2026-10-25' })).toBe('2026-11-25');
  });

  it('D2: one task moved by hand does not move the series', () => {
    // The 25 Nov task was moved to 27 Nov; even given the moved date, the next is 25 Dec.
    expect(nextDueDate({ firstDueDate: '2026-10-25', repeat: 'monthly', after: '2026-11-27' })).toBe('2026-12-25');
  });

  it('a date before the first due date gives the first due date', () => {
    expect(nextDueDate({ firstDueDate: '2026-12-31', repeat: 'quarterly', after: '2026-10-24' })).toBe('2026-12-31');
  });
});

describe('bad input is a plain error', () => {
  it('an unknown repeat', () => {
    expect(() => nextDueDate({ firstDueDate: '2026-10-25', repeat: 'weekly', after: '2026-10-25' })).toThrow(
      'Unknown repeat: weekly',
    );
  });

  it('a date that does not exist', () => {
    expect(() => nextDueDate({ firstDueDate: '2027-02-30', repeat: 'monthly', after: '2027-02-28' })).toThrow(
      'Not a date: 2027-02-30',
    );
  });
});

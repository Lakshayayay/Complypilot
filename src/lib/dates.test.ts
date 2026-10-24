import { describe, expect, it } from 'vitest';
import { addDays, addMonths, daysBetween, parts, ymd } from './dates';

describe('ymd', () => {
  it('builds a plain date', () => {
    expect(ymd(2026, 10, 20)).toBe('2026-10-20');
  });

  it('rolls a month past December into the next year', () => {
    expect(ymd(2026, 13, 20)).toBe('2027-01-20');
    expect(ymd(2026, 15, 31)).toBe('2027-03-31');
  });
});

describe('addDays', () => {
  it.each([
    ['2026-10-24', 7, '2026-10-31'],
    ['2026-12-28', 7, '2027-01-04'],
    ['2028-02-28', 1, '2028-02-29'],
    ['2026-03-01', -1, '2026-02-28'],
  ])('%s + %i days = %s', (start, days, expected) => {
    expect(addDays(start, days)).toBe(expected);
  });
});

describe('addMonths', () => {
  it.each([
    ['2026-12-31', -6, '2026-06-30'],
    ['2027-08-31', -6, '2027-02-28'],
    ['2027-08-31', 6, '2028-02-29'],
    ['2027-01-31', 1, '2027-02-28'],
    ['2026-10-25', 3, '2027-01-25'],
  ])('%s + %i months = %s (a shorter month gets its last day)', (start, months, expected) => {
    expect(addMonths(start, months)).toBe(expected);
  });
});

describe('daysBetween', () => {
  it('counts whole days, signed', () => {
    expect(daysBetween('2026-10-20', '2026-10-24')).toBe(4);
    expect(daysBetween('2026-10-24', '2026-10-20')).toBe(-4);
    expect(daysBetween('2026-03-01', '2026-04-01')).toBe(31);
  });
});

describe('parts', () => {
  it('splits a date', () => {
    expect(parts('2026-10-20')).toEqual({ year: 2026, month: 10, day: 20 });
  });

  it.each(['2026-13-01', '2026-02-30', '20 Oct 2026', '2026-1-5', ''])('rejects %j', (bad) => {
    expect(() => parts(bad)).toThrow(`Not a date: ${bad}`);
  });
});

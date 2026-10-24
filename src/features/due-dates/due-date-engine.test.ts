import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import {
  FILING_CODES,
  filingsFor,
  ruleText,
  workOutItems,
  type DueDateChange,
} from './due-date-engine';

// Items of one filing whose final date falls in [from, to].
function run(
  code: string,
  scheme: string,
  state: string,
  from: string,
  to: string,
  changes: DueDateChange[] = [],
) {
  return workOutItems({ scheme, state, filings: [code], changes, from, to });
}

// ---------------------------------------------------------------------------------------------
// Criterion 6: the official date for every confirmed (✅) row of docs/versions/v1/research/due-dates.md.
// Each case opens a window of exactly the expected day: the right item must be the only one in it.
// ---------------------------------------------------------------------------------------------
describe('official due dates (criterion 6)', () => {
  // [row, filing, scheme, state, period start, official due date]
  const cases: [string, string, string, string, string, string][] = [
    ['GSTR-1 monthly', 'gstr1', 'monthly', 'Delhi', '2026-09-01', '2026-10-11'],
    ['GSTR-1 monthly, December rolls into January', 'gstr1', 'monthly', 'Delhi', '2026-12-01', '2027-01-11'],
    ['GSTR-1 QRMP, Jul to Sep', 'gstr1', 'qrmp', 'Delhi', '2026-07-01', '2026-10-13'],
    ['GSTR-1 QRMP, Oct to Dec', 'gstr1', 'qrmp', 'Delhi', '2026-10-01', '2027-01-13'],
    ['GSTR-3B monthly', 'gstr3b', 'monthly', 'Delhi', '2026-09-01', '2026-10-20'],
    ['GSTR-3B monthly, December', 'gstr3b', 'monthly', 'Delhi', '2026-12-01', '2027-01-20'],
    ['GSTR-3B QRMP, Delhi (24th)', 'gstr3b', 'qrmp', 'Delhi', '2026-07-01', '2026-10-24'],
    ['GSTR-3B QRMP, Haryana (24th)', 'gstr3b', 'qrmp', 'Haryana', '2026-07-01', '2026-10-24'],
    ['GSTR-3B QRMP, Maharashtra (22nd)', 'gstr3b', 'qrmp', 'Maharashtra', '2026-07-01', '2026-10-22'],
    ['GSTR-3B QRMP, Oct to Dec, Delhi', 'gstr3b', 'qrmp', 'Delhi', '2026-10-01', '2027-01-24'],
    ['PMT-06, month 1 of a quarter', 'pmt06', 'qrmp', 'Delhi', '2026-07-01', '2026-08-25'],
    ['PMT-06, month 2 of a quarter', 'pmt06', 'qrmp', 'Delhi', '2026-08-01', '2026-09-25'],
    ['PMT-06, November', 'pmt06', 'qrmp', 'Delhi', '2026-11-01', '2026-12-25'],
    ['PMT-06, January', 'pmt06', 'qrmp', 'Delhi', '2027-01-01', '2027-02-25'],
    ['CMP-08, Jul to Sep', 'cmp08', 'composition', 'Delhi', '2026-07-01', '2026-10-18'],
    ['CMP-08, Oct to Dec', 'cmp08', 'composition', 'Delhi', '2026-10-01', '2027-01-18'],
    ['GSTR-4, FY 2025-26', 'gstr4', 'composition', 'Delhi', '2025-04-01', '2026-04-30'],
    ['GSTR-4, FY 2026-27', 'gstr4', 'composition', 'Delhi', '2026-04-01', '2027-04-30'],
    ['GSTR-9, FY 2025-26, monthly filer', 'gstr9', 'monthly', 'Delhi', '2025-04-01', '2026-12-31'],
    ['GSTR-9, FY 2025-26, QRMP filer', 'gstr9', 'qrmp', 'Delhi', '2025-04-01', '2026-12-31'],
    ['TDS deposit, September', 'tds_deposit', 'monthly', 'Delhi', '2026-09-01', '2026-10-07'],
    ['TDS deposit, December rolls into January', 'tds_deposit', 'monthly', 'Delhi', '2026-12-01', '2027-01-07'],
    ['TDS deposit, March is due 30 April', 'tds_deposit', 'monthly', 'Delhi', '2027-03-01', '2027-04-30'],
    ['TDS return salary (Form 138), Apr to Jun', 'tds_return_salary', 'none', 'Delhi', '2026-04-01', '2026-07-31'],
    ['TDS return salary, Jul to Sep', 'tds_return_salary', 'none', 'Delhi', '2026-07-01', '2026-10-31'],
    ['TDS return salary, Oct to Dec', 'tds_return_salary', 'none', 'Delhi', '2026-10-01', '2027-01-31'],
    ['TDS return salary, Jan to Mar is due 31 May', 'tds_return_salary', 'none', 'Delhi', '2027-01-01', '2027-05-31'],
    ['TDS return other (Form 140), Jul to Sep', 'tds_return_other', 'none', 'Delhi', '2026-07-01', '2026-10-31'],
    ['TDS return other, Jan to Mar is due 31 May', 'tds_return_other', 'none', 'Delhi', '2027-01-01', '2027-05-31'],
    ['Advance tax, 1st instalment', 'advance_tax', 'none', 'Delhi', '2026-04-01', '2026-06-15'],
    ['Advance tax, 2nd instalment', 'advance_tax', 'none', 'Delhi', '2026-07-01', '2026-09-15'],
    ['Advance tax, 3rd instalment', 'advance_tax', 'none', 'Delhi', '2026-10-01', '2026-12-15'],
    ['Advance tax, 4th instalment', 'advance_tax', 'none', 'Delhi', '2027-01-01', '2027-03-15'],
    ['Tax audit report, FY 2025-26 (old Act)', 'tax_audit', 'none', 'Delhi', '2025-04-01', '2026-09-30'],
    ['Tax audit report, FY 2026-27 (Form 26, new Act)', 'tax_audit', 'none', 'Delhi', '2026-04-01', '2027-09-30'],
    ['ITR audit cases, FY 2025-26', 'itr_audit', 'none', 'Delhi', '2025-04-01', '2026-10-31'],
    ['ESIC, September', 'esic', 'none', 'Delhi', '2026-09-01', '2026-10-15'],
    ['ESIC, December rolls into January', 'esic', 'none', 'Delhi', '2026-12-01', '2027-01-15'],
  ];

  it.each(cases)('%s', (_row, code, scheme, state, periodStart, due) => {
    const items = run(code, scheme, state, due, due);
    expect(items.map((i) => [i.filingCode, i.periodStart, i.officialDueDate, i.dueDate])).toEqual([
      [code, periodStart, due, due],
    ]);
  });

  it('gives PMT-06 only for the first two months of a quarter', () => {
    const starts = run('pmt06', 'qrmp', 'Delhi', '2026-01-01', '2027-12-31').map((i) => i.periodStart);
    expect(starts.length).toBeGreaterThan(6);
    expect(starts.every((s) => Number(s.slice(5, 7)) % 3 !== 0)).toBe(true);
  });

  it('holds tax audit and audit-case ITR dates only for the years we confirmed', () => {
    const audit = run('tax_audit', 'none', 'Delhi', '2020-01-01', '2035-12-31');
    const itr = run('itr_audit', 'none', 'Delhi', '2020-01-01', '2035-12-31');
    expect(audit.map((i) => i.periodStart)).toEqual(['2025-04-01', '2026-04-01']);
    expect(itr.map((i) => i.periodStart)).toEqual(['2025-04-01']);
  });
});

describe('labels', () => {
  const label = (code: string, scheme: string, start: string, due: string) =>
    run(code, scheme, 'Delhi', due, due)
      .find((i) => i.periodStart === start)?.periodLabel;

  it.each([
    ['gstr3b', 'monthly', '2026-09-01', '2026-10-20', 'September 2026'],
    ['gstr3b', 'qrmp', '2026-07-01', '2026-10-24', 'Jul to Sep 2026'],
    ['tds_return_salary', 'none', '2027-01-01', '2027-05-31', 'Jan to Mar 2027'],
    ['gstr9', 'monthly', '2025-04-01', '2026-12-31', 'FY 2025-26'],
    ['tax_audit', 'none', '2026-04-01', '2027-09-30', 'FY 2026-27'],
    ['advance_tax', 'none', '2026-04-01', '2026-06-15', '1st instalment, FY 2026-27 (15%)'],
    ['advance_tax', 'none', '2026-07-01', '2026-09-15', '2nd instalment, FY 2026-27 (45%)'],
    ['advance_tax', 'none', '2026-10-01', '2026-12-15', '3rd instalment, FY 2026-27 (75%)'],
    ['advance_tax', 'none', '2027-01-01', '2027-03-15', '4th instalment, FY 2026-27 (100%)'],
  ])('%s (%s) %s', (code, scheme, start, due, expected) => {
    expect(label(code, scheme, start, due)).toBe(expected);
  });
});

describe('the window', () => {
  it('lists items soonest first, then in the order of the add-client screen', () => {
    const items = workOutItems({
      scheme: 'monthly',
      state: 'Delhi',
      filings: ['esic', 'gstr1', 'tds_deposit'],
      changes: [],
      from: '2026-10-01',
      to: '2026-10-31',
    });
    expect(items.map((i) => i.filingCode)).toEqual(['tds_deposit', 'gstr1', 'esic']);
  });

  it('includes both end days', () => {
    expect(run('esic', 'none', 'Delhi', '2026-10-15', '2026-10-15')).toHaveLength(1);
    expect(run('esic', 'none', 'Delhi', '2026-10-16', '2026-11-14')).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------------------------
// Criterion 7 (override): a firm's date change replaces the official date.
// ---------------------------------------------------------------------------------------------
describe('firm date changes', () => {
  const change = (over: Partial<DueDateChange>): DueDateChange => ({
    id: 'c',
    filingCode: 'gstr3b',
    periodStart: '2026-07-01',
    state: null,
    newDueDate: '2026-10-25',
    createdAt: '2026-10-01T10:00:00Z',
    removedAt: null,
    ...over,
  });
  const q3b = (state: string, changes: DueDateChange[]) =>
    run('gstr3b', 'qrmp', state, '2026-10-01', '2026-10-31', changes);

  it('moves the date and keeps the official one and the change id', () => {
    expect(q3b('Maharashtra', [change({ id: 'all' })])).toMatchObject([
      { officialDueDate: '2026-10-22', dueDate: '2026-10-25', dueDateChangeId: 'all' },
    ]);
  });

  it('leaves an item alone when nothing matches', () => {
    // A change for another period (Oct to Dec) that also lands outside this window.
    const other = change({ periodStart: '2026-10-01', newDueDate: '2027-02-10' });
    expect(q3b('Delhi', [other])).toMatchObject([
      { officialDueDate: '2026-10-24', dueDate: '2026-10-24', dueDateChangeId: null },
    ]);
  });

  it('ignores a removed change: the official date is back', () => {
    const removed = change({ removedAt: '2026-10-05T09:00:00Z' });
    expect(q3b('Delhi', [removed])).toMatchObject([{ dueDate: '2026-10-24', dueDateChangeId: null }]);
  });

  it('applies a one-state change to that state only', () => {
    const delhi = change({ id: 'delhi', state: 'Delhi', newDueDate: '2026-10-27' });
    expect(q3b('Delhi', [delhi])[0]).toMatchObject({ dueDate: '2026-10-27' });
    expect(q3b('Haryana', [delhi])[0]).toMatchObject({ dueDate: '2026-10-24' });
  });

  it('lets a state change beat an all-states change, even a newer one', () => {
    const delhi = change({ id: 'delhi', state: 'Delhi', newDueDate: '2026-10-27', createdAt: '2026-09-01T00:00:00Z' });
    const all = change({ id: 'all', newDueDate: '2026-10-25', createdAt: '2026-10-02T00:00:00Z' });
    expect(q3b('Delhi', [all, delhi])[0]).toMatchObject({ dueDate: '2026-10-27', dueDateChangeId: 'delhi' });
    expect(q3b('Maharashtra', [all, delhi])[0]).toMatchObject({ dueDate: '2026-10-25', dueDateChangeId: 'all' });
  });

  it('lets the newest win between equally specific changes, in any order', () => {
    const old = change({ id: 'old', newDueDate: '2026-10-25', createdAt: '2026-10-01T00:00:00Z' });
    const newer = change({ id: 'new', newDueDate: '2026-10-28', createdAt: '2026-10-03T00:00:00Z' });
    expect(q3b('Delhi', [old, newer])[0].dueDateChangeId).toBe('new');
    expect(q3b('Delhi', [newer, old])[0].dueDateChangeId).toBe('new');
  });

  // The real case: CBDT Circular 07/2026 moved the AY 2026-27 audit report from 30 Sep to 21 Oct.
  describe('the window follows the final date (30 Sep moved to 21 Oct)', () => {
    const cbdt = change({
      id: 'cbdt',
      filingCode: 'tax_audit',
      periodStart: '2025-04-01',
      newDueDate: '2026-10-21',
    });

    it('keeps an extended item on the calendar from 1 October', () => {
      expect(run('tax_audit', 'none', 'Delhi', '2026-10-01', '2026-10-31', [cbdt])).toMatchObject([
        { officialDueDate: '2026-09-30', dueDate: '2026-10-21', dueDateChangeId: 'cbdt' },
      ]);
    });

    it('takes it out of September, where its official date was', () => {
      expect(run('tax_audit', 'none', 'Delhi', '2026-09-01', '2026-09-30', [cbdt])).toEqual([]);
    });
  });
});

// ---------------------------------------------------------------------------------------------
// The add-client screen
// ---------------------------------------------------------------------------------------------
describe('filingsFor', () => {
  const income = ['tds_deposit', 'tds_return_salary', 'tds_return_other', 'esic', 'advance_tax', 'tax_audit', 'itr_audit'];

  it.each([
    ['monthly', ['gstr1', 'gstr3b', 'gstr9', ...income]],
    ['qrmp', ['gstr1', 'gstr3b', 'pmt06', 'gstr9', ...income]],
    ['composition', ['cmp08', 'gstr4', ...income]],
    ['none', income],
  ])('%s', (scheme, expected) => {
    expect(filingsFor(scheme)).toEqual(expected);
  });

  it('rejects a scheme we do not know', () => {
    expect(() => filingsFor('weekly')).toThrow('Unknown GST scheme: weekly');
  });
});

describe('ruleText', () => {
  it('words the rule the way the add-client frame does', () => {
    expect(ruleText('gstr3b', 'monthly')).toBe('GSTR-3B · 20th of the next month');
  });

  it('differs by scheme', () => {
    expect(ruleText('gstr1', 'qrmp')).toBe('GSTR-1 · 13th of the month after the quarter');
    expect(ruleText('gstr1', 'monthly')).toBe('GSTR-1 · 11th of the next month');
  });

  it('mentions the March exception', () => {
    expect(ruleText('tds_deposit', 'none')).toContain('March: 30 April');
  });

  it('has a line for every filing code', () => {
    for (const code of FILING_CODES) {
      const scheme = ['monthly', 'qrmp', 'composition'].find((s) => filingsFor(s).includes(code)) ?? 'none';
      expect(ruleText(code, scheme).length).toBeGreaterThan(5);
    }
  });
});

// ---------------------------------------------------------------------------------------------
// Wrong input stops with a plain sentence; nothing is skipped quietly.
// ---------------------------------------------------------------------------------------------
describe('wrong input', () => {
  it('refuses a filing that does not fit the GST scheme', () => {
    expect(() => run('pmt06', 'monthly', 'Delhi', '2026-10-01', '2026-10-31')).toThrow(
      'PMT-06 does not apply when the GST scheme is "monthly"',
    );
    expect(() => run('gstr3b', 'none', 'Delhi', '2026-10-01', '2026-10-31')).toThrow(
      'GSTR-3B does not apply when the GST scheme is "none"',
    );
    expect(() => ruleText('cmp08', 'qrmp')).toThrow('CMP-08 does not apply');
  });

  it('refuses an unknown filing or scheme', () => {
    expect(() => run('gstr2', 'monthly', 'Delhi', '2026-10-01', '2026-10-31')).toThrow('Unknown filing: gstr2');
    expect(() => run('gstr1', 'weekly', 'Delhi', '2026-10-01', '2026-10-31')).toThrow('Unknown GST scheme: weekly');
  });

  it('refuses an unknown state for a QRMP GSTR-3B, even in a one-day window', () => {
    expect(() => run('gstr3b', 'qrmp', 'Gujrat', '2026-10-24', '2026-10-24')).toThrow('Unknown state: Gujrat');
  });

  it('does not need a known state when no rule uses it', () => {
    expect(run('gstr3b', 'monthly', 'Narnia', '2026-10-20', '2026-10-20')).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------------------------
// Drift guard: the database's CHECK list (migration FS-2) and this file must name the same filings.
// ---------------------------------------------------------------------------------------------
describe('filing codes', () => {
  it('match the list in the database migration', () => {
    const sql = readFileSync(new URL('../../../supabase/migrations/20261022184041_fs2_core.sql', import.meta.url), 'utf8');
    const list = /create domain public\.filing_code as text check \(value in \(([^)]*)\)/.exec(sql)?.[1] ?? '';
    const inSql = [...list.matchAll(/'([a-z0-9_]+)'/g)].map((m) => m[1]).sort();
    expect(inSql).toHaveLength(13);
    expect([...FILING_CODES].sort()).toEqual(inSql);
  });
});

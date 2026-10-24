import { describe, expect, it } from 'vitest';
import { DUE_SOON_DAYS, itemStatus } from './item-status';

const today = '2026-10-24';
const open = { filedAt: null, doneAt: null, hasOpenOwnerTask: false, today };
const stamp = '2026-10-20T09:00:00Z';

describe('timing', () => {
  it.each([
    ['23 Oct, one day ago', '2026-10-23', 'late', 1],
    ['14 Oct, ten days ago', '2026-10-14', 'late', 10],
    ['today', '2026-10-24', 'due_soon', 0],
    ['in 7 days', '2026-10-31', 'due_soon', 0],
    ['in 8 days', '2026-11-01', 'upcoming', 0],
    ['next year', '2027-03-15', 'upcoming', 0],
  ])('%s', (_when, dueDate, timing, daysLate) => {
    expect(itemStatus({ ...open, dueDate })).toMatchObject({ stage: 'open', timing, daysLate });
  });

  it('counts "due soon" as 7 days, the same as the morning list', () => {
    expect(DUE_SOON_DAYS).toBe(7);
  });
});

describe('stage', () => {
  const late = '2026-10-20';

  it('is Waiting on owner while an owner task is open, and can still be late', () => {
    expect(itemStatus({ ...open, dueDate: late, hasOpenOwnerTask: true })).toEqual({
      stage: 'waiting_on_owner',
      timing: 'late',
      daysLate: 4,
    });
  });

  it('is Filed once filed, and still late until Done', () => {
    expect(itemStatus({ ...open, dueDate: late, filedAt: stamp })).toEqual({ stage: 'filed', timing: 'late', daysLate: 4 });
  });

  it('puts Filed ahead of Waiting on owner', () => {
    expect(itemStatus({ ...open, dueDate: late, filedAt: stamp, hasOpenOwnerTask: true }).stage).toBe('filed');
  });

  it('is Done once marked done, with no timing at all', () => {
    expect(itemStatus({ ...open, dueDate: late, filedAt: stamp, doneAt: stamp, hasOpenOwnerTask: true })).toEqual({
      stage: 'done',
      timing: 'none',
      daysLate: 0,
    });
  });
});

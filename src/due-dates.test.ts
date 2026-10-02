import { test } from 'node:test';
import assert from 'node:assert/strict';
import { dueDate, STATES, type State } from './due-dates.ts';

const punjab = { state: 'Punjab' } as const;
const maharashtra = { state: 'Maharashtra' } as const;

test('GSTR-3B monthly: the 20th of the next month, rolling over into the new year', () => {
  assert.equal(dueDate('gstr3b-monthly', '2026-11', punjab), '2026-12-20');
  assert.equal(dueDate('gstr3b-monthly', '2026-12', punjab), '2027-01-20');
});

test('GSTR-3B QRMP: the 22nd or 24th after the quarter, by state', () => {
  assert.equal(dueDate('gstr3b-qrmp', '2026-12', punjab), '2027-01-24');
  assert.equal(dueDate('gstr3b-qrmp', '2026-12', maharashtra), '2027-01-22');
  assert.equal(dueDate('gstr3b-qrmp', '2027-03', maharashtra), '2027-04-22');
  assert.throws(() => dueDate('gstr3b-qrmp', '2026-11', punjab), /no period ending 2026-11/);
});

test('PMT-06: the 25th, only for the 1st and 2nd month of a quarter', () => {
  assert.equal(dueDate('pmt-06', '2026-10', punjab), '2026-11-25');
  assert.equal(dueDate('pmt-06', '2026-11', punjab), '2026-12-25');
  assert.throws(() => dueDate('pmt-06', '2026-12', punjab), /no period ending 2026-12/);
});

test('an override beats the rule, only for its own filing and period', () => {
  const overrides = [{ filing: 'gstr3b-monthly', period: '2026-12', due: '2027-01-31' }] as const;
  assert.equal(dueDate('gstr3b-monthly', '2026-12', punjab, overrides), '2027-01-31');
  assert.equal(dueDate('gstr3b-monthly', '2026-11', punjab, overrides), '2026-12-20');
  assert.equal(dueDate('gstr3b-qrmp', '2026-12', punjab, overrides), '2027-01-24');
});

test('every state and UT is listed exactly once (28 states + 8 UTs)', () => {
  assert.equal(STATES.length, 36);
  assert.equal(new Set(STATES).size, 36);
});

test('bad input is rejected, not guessed', () => {
  assert.throws(() => dueDate('gstr3b-monthly', '2026-13', punjab), /Period must look like/);
  assert.throws(() => dueDate('gstr3b-monthly', '2026-1', punjab), /Period must look like/);
  assert.throws(() => dueDate('gstr3b-qrmp', '2026-12', { state: 'Atlantis' as State }), /Unknown state/);
});

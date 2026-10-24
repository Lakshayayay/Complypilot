import { describe, expect, it } from 'vitest';
import { defaultApplyBy, licenceName, licenceStatus, reminderDates } from './licence-status';

type Input = Parameters<typeof licenceStatus>[0];

// Sharma Castings, Delhi (CA-16): factory licence expires 31 Dec 2026, so apply by 1 Dec.
const delhiFactory: Omit<Input, 'today'> = {
  licenceType: 'factory_licence',
  state: 'Delhi',
  expiresOn: '2026-12-31',
  noExpiry: false,
  applyByDate: '2026-12-01',
};

// Sunrise Plastics, Haryana (CA-16): hazardous waste authorisation expires 15 Jan 2027, no lead time.
const haryanaWaste: Omit<Input, 'today'> = {
  licenceType: 'hazardous_waste',
  state: 'Haryana',
  expiresOn: '2027-01-15',
  noExpiry: false,
  applyByDate: '2027-01-15',
};

const status = (licence: Omit<Input, 'today'>, today: string) => licenceStatus({ ...licence, today }).status;

// ---------------------------------------------------------------------------------------------
// Criterion 9: at 90, 60 and 30 days before the apply-by date and at expiry, with a lead time and
// without one, plus "no expiry date". The chip stays Renew soon at 90, 60 and 30; only emails differ.
// ---------------------------------------------------------------------------------------------
describe('licence status (criterion 9)', () => {
  it.each([
    ['2026-09-01', 'valid'], // 91 days before the apply-by date
    ['2026-09-02', 'renew_soon'], // 90
    ['2026-10-02', 'renew_soon'], // 60
    ['2026-11-01', 'renew_soon'], // 30
    ['2026-12-01', 'renew_soon'], // the apply-by date (the late fee starts after it)
    ['2026-12-31', 'renew_soon'], // the expiry date: still valid that day (D2)
    ['2027-01-01', 'expired'],
  ])('Delhi factory licence (30-day lead) on %s: %s', (today, expected) => {
    expect(status(delhiFactory, today)).toBe(expected);
  });

  it.each([
    ['2026-10-16', 'valid'], // 91 days before
    ['2026-10-17', 'renew_soon'], // 90
    ['2026-11-16', 'renew_soon'], // 60
    ['2026-12-16', 'renew_soon'], // 30
    ['2027-01-15', 'renew_soon'], // the expiry date (D2)
    ['2027-01-16', 'expired'],
  ])('Haryana hazardous waste (no lead) on %s: %s', (today, expected) => {
    expect(status(haryanaWaste, today)).toBe(expected);
  });

  it('no expiry date, ticked "no expiry": valid until cancelled, whatever the day', () => {
    const licence = { ...delhiFactory, expiresOn: null, noExpiry: true, applyByDate: null };
    expect(licenceStatus({ ...licence, today: '2030-01-01' })).toEqual({ status: 'valid_until_cancelled', applyBy: null });
  });

  it('no expiry date and no tick: details needed', () => {
    const licence = { ...delhiFactory, expiresOn: null, applyByDate: null };
    expect(licenceStatus({ ...licence, today: '2026-10-19' })).toEqual({ status: 'details_needed', applyBy: null });
  });

  it('the reminder days are 90, 60 and 30 days before the apply-by date', () => {
    expect(reminderDates('2026-12-01')).toEqual(['2026-09-02', '2026-10-02', '2026-11-01']);
  });
});

describe('the apply-by date', () => {
  it('Delhi factory licence: 30 days before expiry (CA-16 "Apply by 1 Dec")', () => {
    expect(defaultApplyBy({ licenceType: 'factory_licence', state: 'Delhi', expiresOn: '2026-12-31' })).toBe('2026-12-01');
  });

  it('D3: Delhi fire certificate: 6 calendar months before expiry', () => {
    expect(defaultApplyBy({ licenceType: 'fire_certificate', state: 'Delhi', expiresOn: '2026-12-31' })).toBe('2026-06-30');
    expect(defaultApplyBy({ licenceType: 'fire_certificate', state: 'Delhi', expiresOn: '2027-08-31' })).toBe('2027-02-28');
  });

  it.each([
    ['fire_certificate', 'Haryana'],
    ['factory_licence', 'Haryana'],
    ['boiler_certificate', 'Delhi'],
    ['Municipal trade licence', 'Delhi'],
  ])('%s in %s: no lead time, the expiry date', (licenceType, state) => {
    expect(defaultApplyBy({ licenceType, state, expiresOn: '2026-12-31' })).toBe('2026-12-31');
  });

  it("the CA's own apply-by date wins over the default", () => {
    const licence = { ...delhiFactory, applyByDate: '2026-11-15' };
    expect(licenceStatus({ ...licence, today: '2026-08-17' })).toEqual({ status: 'renew_soon', applyBy: '2026-11-15' });
  });

  it('an empty apply-by date falls back to the default, so the 30-day lead is never lost', () => {
    const licence = { ...delhiFactory, applyByDate: null };
    expect(licenceStatus({ ...licence, today: '2026-09-02' })).toEqual({ status: 'renew_soon', applyBy: '2026-12-01' });
  });

  it("OW-10: the boiler certificate expiring 30 Nov is Renew soon on 19 Oct", () => {
    const boiler = { licenceType: 'boiler_certificate', state: 'Delhi', expiresOn: '2026-11-30', noExpiry: false, applyByDate: '2026-11-30' };
    expect(status(boiler, '2026-10-19')).toBe('renew_soon');
  });

  it('an unknown state is a plain error', () => {
    expect(() => defaultApplyBy({ licenceType: 'factory_licence', state: 'Dilli', expiresOn: '2026-12-31' })).toThrow(
      'Unknown state: Dilli',
    );
  });
});

describe('licence names (D4)', () => {
  it('a code gets its name; any other text is a CA\'s own licence, shown as typed', () => {
    expect(licenceName('fire_certificate')).toBe('Fire safety certificate');
    expect(licenceName('Municipal trade licence')).toBe('Municipal trade licence');
  });
});

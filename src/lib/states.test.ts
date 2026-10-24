import { describe, expect, it } from 'vitest';
import { qrmpDay, STATES } from './states';

describe('STATES', () => {
  it('lists 36 states and UTs, none twice', () => {
    expect(STATES).toHaveLength(36);
    expect(new Set(STATES).size).toBe(36);
  });

  it('puts 14 in the 22nd group and 22 in the 24th (CGST Rule 61(1))', () => {
    const days = STATES.map(qrmpDay);
    expect(days.filter((d) => d === 22)).toHaveLength(14);
    expect(days.filter((d) => d === 24)).toHaveLength(22);
  });
});

describe('qrmpDay', () => {
  it.each([
    ['Delhi', 24],
    ['Haryana', 24],
    ['West Bengal', 24],
    ['Maharashtra', 22],
    ['Gujarat', 22],
    ['Dadra and Nagar Haveli and Daman and Diu', 22],
  ])('%s files on the %ith', (state, day) => {
    expect(qrmpDay(state)).toBe(day);
  });

  it('says plainly when the name is not on the list', () => {
    expect(() => qrmpDay('Gujrat')).toThrow('Unknown state: Gujrat');
  });
});

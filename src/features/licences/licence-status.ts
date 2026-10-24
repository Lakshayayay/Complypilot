// What a licence shows, and when to apply for its renewal (v1-FS-10, acceptance criterion 9). Pure:
// "today" is passed in, in Asia/Kolkata. Every reminder counts back from the apply-by date (expiry
// minus how early the law wants you to apply), not from expiry. Facts: docs/versions/v1/research/
// licences.md. Decisions: tech.md, "FS-10 decisions".
import { addDays, addMonths, type IsoDate } from '../../lib/dates';
import { STATES } from '../../lib/states';

// The types the factory rules (FS-13) create. Any other text in `licence_type` is a CA's own
// licence (a trade licence, say), shown as typed, with no lead time (D4).
export const LICENCE_TYPES = [
  'factory_licence',
  'labour_registration',
  'pollution_consent',
  'fire_certificate',
  'boiler_certificate',
  'hazardous_waste',
  'peso',
] as const;
export type LicenceType = (typeof LICENCE_TYPES)[number];

export const LICENCE_NAME: Record<LicenceType, string> = {
  factory_licence: 'Factory licence',
  labour_registration: 'Labour-code registration',
  pollution_consent: 'Pollution consent',
  fire_certificate: 'Fire safety certificate',
  boiler_certificate: 'Boiler certificate',
  hazardous_waste: 'Hazardous waste authorisation',
  peso: 'PESO licence',
};

export function licenceName(type: string): string {
  return LICENCE_NAME[type as LicenceType] ?? type;
}

/** Reminders go out this many days before the apply-by date; "Renew soon" starts at the first. */
export const REMINDER_DAYS = [90, 60, 30] as const;

export type LicenceStatus = 'valid' | 'renew_soon' | 'expired' | 'details_needed' | 'valid_until_cancelled';

/**
 * The apply-by date the form fills in when the CA saves an expiry date; the CA can change it.
 * Delhi factory licence: a 25% late fee under 30 days before expiry ✅. Delhi fire certificate:
 * "at least six months prior to the expiry" (DFS FAQ, D3). Every other case: the expiry date.
 */
export function defaultApplyBy(input: { licenceType: string; state: string; expiresOn: IsoDate }): IsoDate {
  const { licenceType, state, expiresOn } = input;
  if (!STATES.includes(state)) throw new Error(`Unknown state: ${state}`);
  if (state === 'Delhi' && licenceType === 'factory_licence') return addDays(expiresOn, -30);
  if (state === 'Delhi' && licenceType === 'fire_certificate') return addMonths(expiresOn, -6);
  return expiresOn;
}

export function licenceStatus(input: {
  licenceType: string;
  state: string;
  expiresOn: IsoDate | null;
  noExpiry: boolean;
  applyByDate: IsoDate | null;
  today: IsoDate;
}): { status: LicenceStatus; applyBy: IsoDate | null } {
  const { expiresOn, noExpiry, today } = input;
  if (noExpiry) return { status: 'valid_until_cancelled', applyBy: null };
  if (expiresOn === null) return { status: 'details_needed', applyBy: null };

  // An empty apply-by date falls back to the default, so the Delhi 30-day lead is never lost.
  const applyBy = input.applyByDate ?? defaultApplyBy({ ...input, expiresOn });
  // The expiry date is the last valid day (D2).
  if (today > expiresOn) return { status: 'expired', applyBy };
  return { status: today >= reminderDates(applyBy)[0] ? 'renew_soon' : 'valid', applyBy };
}

/** The 90, 60 and 30 day reminders, for the emails (FS-15). */
export function reminderDates(applyBy: IsoDate): IsoDate[] {
  return REMINDER_DAYS.map((days) => addDays(applyBy, -days));
}

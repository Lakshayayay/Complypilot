// What a calendar item shows, worked out from the actions the database saves (filed, done) and
// today's date (FS-2 point 2; builder point 9). Pure: "today" is passed in, in Asia/Kolkata.
// An item has two answers because it can be two things at once: Waiting on owner and 4 days late.
import { daysBetween, type IsoDate } from '../../lib/dates';

/** "Due soon" = due today up to this many days ahead; the morning list uses the same number. */
export const DUE_SOON_DAYS = 7;

export type Stage = 'done' | 'filed' | 'waiting_on_owner' | 'open';
export type Timing = 'late' | 'due_soon' | 'upcoming' | 'none';

export function itemStatus(input: {
  dueDate: IsoDate;
  filedAt: string | null;
  doneAt: string | null;
  hasOpenOwnerTask: boolean;
  today: IsoDate;
}): { stage: Stage; timing: Timing; daysLate: number } {
  const { dueDate, filedAt, doneAt, hasOpenOwnerTask, today } = input;
  if (doneAt) return { stage: 'done', timing: 'none', daysLate: 0 };

  const stage = filedAt ? 'filed' : hasOpenOwnerTask ? 'waiting_on_owner' : 'open';
  // Filed is not Done: until the ARN and receipt are saved, the item keeps its timing (criterion 12).
  const daysLeft = daysBetween(today, dueDate);
  if (daysLeft < 0) return { stage, timing: 'late', daysLate: -daysLeft };
  return { stage, timing: daysLeft <= DUE_SOON_DAYS ? 'due_soon' : 'upcoming', daysLate: 0 };
}

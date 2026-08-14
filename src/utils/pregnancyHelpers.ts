const MS_PER_WEEK = 7 * 24 * 60 * 60 * 1000;
const FULL_TERM_WEEKS = 40;

/** Derive approximate gestational week from due date (assumes 40-week term). */
export function deriveGestationalWeek(
  dueDateIso: string,
  now = new Date(),
): number {
  const due = parseDateOnly(dueDateIso);
  if (!due) {
    return 0;
  }

  const weeksUntilDue = (due.getTime() - now.getTime()) / MS_PER_WEEK;
  const week = Math.round(FULL_TERM_WEEKS - weeksUntilDue);
  return Math.min(42, Math.max(0, week));
}

export function parseDateOnly(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date;
}

export function toDateInputValue(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

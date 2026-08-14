import { describe, expect, it } from 'vitest';
import {
  deriveGestationalWeek,
  parseDateOnly,
} from '@/utils/pregnancyHelpers';
import { validatePregnancyInput } from '@/utils/pregnancyValidation';

describe('pregnancyHelpers', () => {
  it('parses YYYY-MM-DD dates', () => {
    expect(parseDateOnly('2026-08-05')).not.toBeNull();
    expect(parseDateOnly('05/08/2026')).toBeNull();
  });

  it('derives gestational week near term', () => {
    const now = new Date('2026-08-05T12:00:00.000Z');
    const dueSoon = '2026-08-12';
    const week = deriveGestationalWeek(dueSoon, now);
    expect(week).toBeGreaterThanOrEqual(38);
    expect(week).toBeLessThanOrEqual(40);
  });
});

describe('validatePregnancyInput', () => {
  it('accepts a valid profile', () => {
    const due = new Date();
    due.setMonth(due.getMonth() + 1);
    const dueDate = due.toISOString().slice(0, 10);

    expect(
      validatePregnancyInput({
        dueDate,
        pregnancyType: 'single',
        isFirstPregnancy: true,
        country: 'ES',
      }),
    ).toEqual({ ok: true });
  });

  it('rejects invalid country code', () => {
    const due = new Date();
    due.setMonth(due.getMonth() + 1);
    const result = validatePregnancyInput({
      dueDate: due.toISOString().slice(0, 10),
      pregnancyType: 'single',
      isFirstPregnancy: false,
      country: 'ESP',
    });
    expect(result.ok).toBe(false);
  });
});

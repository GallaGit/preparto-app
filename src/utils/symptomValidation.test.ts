import { describe, expect, it } from 'vitest';
import { validateSymptomInput } from '@/utils/symptomValidation';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

function hoursFromNow(hours: number): string {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

describe('validateSymptomInput', () => {
  it('rejects missing recordedAt', () => {
    const result = validateSymptomInput('mucus_plug', {
      recordedAt: '',
      amount: 'scarce',
      color: 'clear',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.recordedAt).toBeTruthy();
    }
  });

  it('rejects invalid datetime', () => {
    const result = validateSymptomInput(
      'bleeding',
      {
        recordedAt: 'not-a-date',
        amount: 'moderate',
        color: 'pink',
      },
      'es',
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.recordedAt).toMatch(/válida/i);
    }
  });

  it('rejects future recordedAt', () => {
    const result = validateSymptomInput(
      'mucus_plug',
      {
        recordedAt: hoursFromNow(5),
        amount: 'scarce',
        color: 'clear',
      },
      'es',
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.recordedAt).toMatch(/futuras/i);
    }
  });

  it('rejects intensity outside 1-10', () => {
    const result = validateSymptomInput(
      'nausea',
      {
        recordedAt: hoursAgo(1),
        intensity: 11,
      },
      'es',
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.intensity).toMatch(/1 y 10/);
    }
  });

  it('rejects non-positive duration', () => {
    const result = validateSymptomInput('chills', {
      recordedAt: hoursAgo(1),
      durationMinutes: 0,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.durationMinutes).toBeTruthy();
    }
  });

  it('rejects absurd duration', () => {
    const result = validateSymptomInput(
      'chills',
      {
        recordedAt: hoursAgo(1),
        durationMinutes: 10_000,
      },
      'es',
    );

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.durationMinutes).toMatch(/mayor/i);
    }
  });

  it('rejects missing required select fields', () => {
    const result = validateSymptomInput('water_break', {
      recordedAt: hoursAgo(1),
      amount: 'scarce',
      color: 'clear',
      odor: 'none',
    });

    const invalid = validateSymptomInput('water_break', {
      recordedAt: hoursAgo(1),
      amount: 'scarce',
      color: 'clear',
      // @ts-expect-error intentional invalid odor for test
      odor: '',
    });

    expect(result.ok).toBe(true);
    expect(invalid.ok).toBe(false);
  });

  it('accepts a valid mucus plug record', () => {
    const result = validateSymptomInput('mucus_plug', {
      recordedAt: hoursAgo(1),
      amount: 'moderate',
      color: 'pink',
      notes: 'Sin más datos',
    });

    expect(result).toEqual({ ok: true });
  });
});

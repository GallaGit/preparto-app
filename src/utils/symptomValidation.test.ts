import { describe, expect, it } from 'vitest';
import { validateSymptomInput } from '@/utils/symptomValidation';

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
    const result = validateSymptomInput('bleeding', {
      recordedAt: 'not-a-date',
      amount: 'moderate',
      color: 'pink',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.recordedAt).toMatch(/válida/i);
    }
  });

  it('rejects intensity outside 1-10', () => {
    const result = validateSymptomInput('nausea', {
      recordedAt: '2026-08-05T10:00',
      intensity: 11,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.intensity).toMatch(/1 y 10/);
    }
  });

  it('rejects non-positive duration', () => {
    const result = validateSymptomInput('chills', {
      recordedAt: '2026-08-05T10:00',
      durationMinutes: 0,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors.durationMinutes).toBeTruthy();
    }
  });

  it('rejects missing required select fields', () => {
    const result = validateSymptomInput('water_break', {
      recordedAt: '2026-08-05T10:00',
      amount: 'scarce',
      color: 'clear',
      odor: 'none',
    });

    // Force invalid by casting incomplete data through validation path
    const invalid = validateSymptomInput('water_break', {
      recordedAt: '2026-08-05T10:00',
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
      recordedAt: '2026-08-05T10:00',
      amount: 'moderate',
      color: 'pink',
      notes: 'Sin más datos',
    });

    expect(result).toEqual({ ok: true });
  });
});

import { describe, expect, it, vi } from 'vitest';
import { createSymptom, SymptomValidationError } from '@/utils/createSymptom';

describe('createSymptom', () => {
  it('creates a typed mucus plug symptom', () => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'test-id-1',
    });

    const symptom = createSymptom('mucus_plug', {
      recordedAt: '2026-08-05T12:30:00.000Z',
      amount: 'abundant',
      color: 'white',
      notes: '  Observación  ',
    });

    expect(symptom).toEqual({
      id: 'test-id-1',
      type: 'mucus_plug',
      recordedAt: new Date('2026-08-05T12:30:00.000Z'),
      notes: 'Observación',
      amount: 'abundant',
      color: 'white',
    });

    vi.unstubAllGlobals();
  });

  it('creates a back pain symptom with intensity and duration', () => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'test-id-2',
    });

    const symptom = createSymptom('back_pain', {
      recordedAt: '2026-08-05T08:00:00.000Z',
      intensity: 7,
      durationMinutes: 20,
    });

    expect(symptom.type).toBe('back_pain');
    if (symptom.type === 'back_pain') {
      expect(symptom.intensity).toBe(7);
      expect(symptom.durationMinutes).toBe(20);
      expect(symptom.notes).toBe('');
    }

    vi.unstubAllGlobals();
  });

  it('throws SymptomValidationError when input is invalid', () => {
    expect(() =>
      createSymptom('diarrhea', {
        recordedAt: '2026-08-05T08:00:00.000Z',
        episodes: -1,
      }),
    ).toThrow(SymptomValidationError);
  });
});

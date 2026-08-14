import { describe, expect, it, vi } from 'vitest';
import { createSymptom, SymptomValidationError } from '@/utils/createSymptom';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
}

describe('createSymptom', () => {
  it('creates a typed mucus plug symptom', () => {
    vi.stubGlobal('crypto', {
      randomUUID: () => 'test-id-1',
    });

    const recordedAt = hoursAgo(2);
    const symptom = createSymptom('mucus_plug', {
      recordedAt,
      amount: 'abundant',
      color: 'white',
      notes: '  Observación  ',
    });

    expect(symptom).toEqual({
      id: 'test-id-1',
      type: 'mucus_plug',
      recordedAt: new Date(recordedAt),
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
      recordedAt: hoursAgo(1),
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
        recordedAt: hoursAgo(1),
        episodes: -1,
      }),
    ).toThrow(SymptomValidationError);
  });

  it('keeps provided id when updating', () => {
    const symptom = createSymptom(
      'nausea',
      { recordedAt: hoursAgo(1), intensity: 3 },
      { id: 'fixed-id' },
    );
    expect(symptom.id).toBe('fixed-id');
  });
});

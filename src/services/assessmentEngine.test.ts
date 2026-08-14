import { describe, expect, it } from 'vitest';
import {
  ASSESSMENT_DISCLAIMER,
  evaluate,
} from '@/services/assessmentEngine';
import type { Contraction } from '@/types/contraction';
import type { SymptomRecord } from '@/types/symptom';

function makeContraction(
  startIso: string,
  durationSeconds: number,
  intervalSeconds?: number,
): Contraction {
  const startedAt = new Date(startIso);
  return {
    id: crypto.randomUUID(),
    startedAt,
    endedAt: new Date(startedAt.getTime() + durationSeconds * 1000),
    durationSeconds,
    intervalSeconds,
    notes: '',
  };
}

describe('assessmentEngine', () => {
  it('returns level 0 with disclaimer when empty', () => {
    const result = evaluate({ contractions: [], symptoms: [] });
    expect(result.level).toBe(0);
    expect(result.disclaimer).toBe(ASSESSMENT_DISCLAIMER);
    expect(result.matchedRules).toHaveLength(0);
  });

  it('flags abundant bleeding as urgent', () => {
    const symptoms: SymptomRecord[] = [
      {
        id: 'b1',
        type: 'bleeding',
        recordedAt: new Date('2026-08-05T10:00:00.000Z'),
        notes: '',
        amount: 'abundant',
        color: 'pink',
      },
    ];

    const result = evaluate({ contractions: [], symptoms });
    expect(result.level).toBe(4);
    expect(result.matchedRules.some((r) => r.id === 'bleeding_urgent')).toBe(
      true,
    );
    expect(result.recommendation.toLowerCase()).toMatch(/hospital|sanitario/);
  });

  it('flags absent fetal movement as urgent', () => {
    const result = evaluate({
      contractions: [],
      symptoms: [
        {
          id: 'f1',
          type: 'fetal_movement',
          recordedAt: new Date('2026-08-05T10:00:00.000Z'),
          notes: '',
          frequency: 'absent',
        },
      ],
    });
    expect(result.level).toBe(4);
  });

  it('flags water break as contact level', () => {
    const result = evaluate({
      contractions: [],
      symptoms: [
        {
          id: 'w1',
          type: 'water_break',
          recordedAt: new Date('2026-08-05T10:00:00.000Z'),
          notes: '',
          amount: 'moderate',
          color: 'clear',
          odor: 'none',
        },
      ],
    });
    expect(result.level).toBe(3);
    expect(result.matchedRules.some((r) => r.id === 'water_break')).toBe(true);
  });

  it('elevates water break + regular contractions', () => {
    const base = Date.parse('2026-08-05T10:00:00.000Z');
    const contractions = [0, 1, 2].map((index) =>
      makeContraction(
        new Date(base + index * 8 * 60 * 1000).toISOString(),
        50,
        8 * 60,
      ),
    );

    const result = evaluate({
      contractions,
      symptoms: [
        {
          id: 'w1',
          type: 'water_break',
          recordedAt: new Date(base),
          notes: '',
          amount: 'moderate',
          color: 'clear',
          odor: 'none',
        },
      ],
    });

    expect(result.level).toBeGreaterThanOrEqual(3);
  });

  it('suggests mild care for isolated mild symptoms', () => {
    const result = evaluate({
      contractions: [],
      symptoms: [
        {
          id: 'n1',
          type: 'nausea',
          recordedAt: new Date('2026-08-05T10:00:00.000Z'),
          notes: '',
          intensity: 2,
        },
      ],
    });

    expect(result.level).toBe(1);
    expect(result.actions).toEqual(
      expect.arrayContaining(['hydrate', 'rest', 'continue_observing']),
    );
  });

  it('always includes explanation when rules match', () => {
    const result = evaluate({
      contractions: [],
      symptoms: [
        {
          id: 'b1',
          type: 'bleeding',
          recordedAt: new Date('2026-08-05T10:00:00.000Z'),
          notes: '',
          amount: 'scarce',
          color: 'bright_red',
        },
      ],
    });
    expect(result.explanation.length).toBeGreaterThan(10);
    expect(result.matchedRules.length).toBeGreaterThan(0);
  });
});

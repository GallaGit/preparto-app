import { describe, expect, it } from 'vitest';
import { buildContractionRecord } from '@/utils/buildContraction';
import type { Contraction } from '@/types/contraction';

describe('buildContractionRecord', () => {
  it('includes notes and duration when finishing a contraction', () => {
    const startedAt = new Date('2026-08-05T10:00:00.000Z');
    const endedAt = new Date('2026-08-05T10:01:00.000Z');

    const contraction = buildContractionRecord({
      id: 'c1',
      startedAt,
      endedAt,
      previousContraction: undefined,
      notes: '  Fuerte  ',
    });

    expect(contraction).toMatchObject({
      id: 'c1',
      durationSeconds: 60,
      notes: 'Fuerte',
      intervalSeconds: undefined,
    });
  });

  it('computes interval from previous contraction', () => {
    const previous: Contraction = {
      id: 'prev',
      startedAt: new Date('2026-08-05T09:55:00.000Z'),
      endedAt: new Date('2026-08-05T09:56:00.000Z'),
      durationSeconds: 60,
      notes: '',
    };

    const contraction = buildContractionRecord({
      id: 'c2',
      startedAt: new Date('2026-08-05T10:00:00.000Z'),
      endedAt: new Date('2026-08-05T10:00:45.000Z'),
      previousContraction: previous,
      notes: '',
    });

    expect(contraction.intervalSeconds).toBe(300);
    expect(contraction.durationSeconds).toBe(45);
  });
});

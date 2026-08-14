import { describe, expect, it } from 'vitest';
import {
  filterHistoryItems,
  toDayKey,
  toHistoryItems,
} from '@/utils/historyTimeline';
import type { Contraction } from '@/types/contraction';
import type { SymptomRecord } from '@/types/symptom';

const symptom = (overrides: Partial<SymptomRecord> = {}): SymptomRecord =>
  ({
    id: 's1',
    type: 'nausea',
    recordedAt: new Date('2026-08-05T12:00:00.000Z'),
    notes: '',
    intensity: 3,
    ...overrides,
  }) as SymptomRecord;

const contraction = (overrides: Partial<Contraction> = {}): Contraction => ({
  id: 'c1',
  startedAt: new Date('2026-08-05T13:00:00.000Z'),
  endedAt: new Date('2026-08-05T13:01:00.000Z'),
  durationSeconds: 60,
  notes: '',
  ...overrides,
});

describe('historyTimeline', () => {
  it('merges and sorts newest first', () => {
    const items = toHistoryItems(
      [symptom({ recordedAt: new Date('2026-08-05T10:00:00.000Z') })],
      [contraction({ startedAt: new Date('2026-08-05T11:00:00.000Z') })],
    );

    expect(items).toHaveLength(2);
    expect(items[0].kind).toBe('contraction');
    expect(items[1].kind).toBe('symptom');
  });

  it('filters by type and day', () => {
    const items = toHistoryItems(
      [
        symptom({
          id: 'n1',
          type: 'nausea',
          recordedAt: new Date('2026-08-05T10:00:00'),
        }),
        symptom({
          id: 'b1',
          type: 'bleeding',
          recordedAt: new Date('2026-08-06T10:00:00'),
          amount: 'scarce',
          color: 'pink',
        } as SymptomRecord),
      ],
      [contraction({ startedAt: new Date('2026-08-05T12:00:00') })],
    );

    const day = toDayKey(new Date('2026-08-05T12:00:00'));
    const filtered = filterHistoryItems(items, { day, type: 'contraction' });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].kind).toBe('contraction');
  });
});

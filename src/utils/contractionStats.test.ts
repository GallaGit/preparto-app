import { describe, expect, it } from 'vitest';
import type { Contraction } from '@/types/contraction';
import {
  calculateStatistics,
  countContractionsOnDay,
  lastIntervalSeconds,
} from '@/utils/contractionStats';

function contraction(
  overrides: Partial<Contraction> & { startedAt: Date },
): Contraction {
  return {
    id: overrides.id ?? 'c',
    startedAt: overrides.startedAt,
    endedAt:
      overrides.endedAt ?? new Date(overrides.startedAt.getTime() + 60_000),
    durationSeconds: overrides.durationSeconds ?? 60,
    intervalSeconds: overrides.intervalSeconds,
    notes: overrides.notes ?? '',
  };
}

describe('contractionStats helpers', () => {
  it('counts contractions on the local day', () => {
    const today = new Date(2026, 7, 27, 10, 0, 0);
    const items = [
      contraction({ id: '1', startedAt: new Date(2026, 7, 27, 8, 0, 0) }),
      contraction({ id: '2', startedAt: new Date(2026, 7, 27, 9, 0, 0) }),
      contraction({ id: '3', startedAt: new Date(2026, 7, 26, 23, 0, 0) }),
    ];
    expect(countContractionsOnDay(items, today)).toBe(2);
  });

  it('reads the latest interval', () => {
    expect(lastIntervalSeconds([])).toBeNull();
    expect(
      lastIntervalSeconds([
        contraction({
          startedAt: new Date('2026-08-27T10:00:00Z'),
          intervalSeconds: 480,
        }),
      ]),
    ).toBe(480);
  });

  it('still computes averages', () => {
    const stats = calculateStatistics([
      contraction({
        id: 'a',
        startedAt: new Date('2026-08-27T10:00:00Z'),
        durationSeconds: 50,
        intervalSeconds: 300,
      }),
      contraction({
        id: 'b',
        startedAt: new Date('2026-08-27T09:55:00Z'),
        durationSeconds: 40,
      }),
    ]);
    expect(stats.averageDurationSeconds).toBe(45);
    expect(stats.averageIntervalSeconds).toBe(300);
  });
});

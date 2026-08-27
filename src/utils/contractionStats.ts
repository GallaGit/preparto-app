import type { Contraction, ContractionStatistics } from '@/types/contraction';

export function countContractionsOnDay(
  contractions: Contraction[],
  day: Date = new Date(),
): number {
  const year = day.getFullYear();
  const month = day.getMonth();
  const date = day.getDate();

  return contractions.filter((contraction) => {
    const started = contraction.startedAt;
    return (
      started.getFullYear() === year &&
      started.getMonth() === month &&
      started.getDate() === date
    );
  }).length;
}

export function lastIntervalSeconds(
  contractions: Contraction[],
): number | null {
  const latest = contractions[0];
  return latest?.intervalSeconds ?? null;
}

export function msSinceLastEnded(
  contractions: Contraction[],
  now: Date | number = Date.now(),
): number | null {
  const latest = contractions[0];
  if (!latest) {
    return null;
  }

  const nowMs = typeof now === 'number' ? now : now.getTime();
  return Math.max(0, nowMs - latest.endedAt.getTime());
}

export function calculateStatistics(
  contractions: Contraction[],
): ContractionStatistics {
  if (contractions.length === 0) {
    return {
      lastDurationSeconds: null,
      averageDurationSeconds: null,
      averageIntervalSeconds: null,
      totalCount: 0,
    };
  }

  const durations = contractions.map((c) => c.durationSeconds);
  const intervals = contractions
    .map((c) => c.intervalSeconds)
    .filter((i): i is number => i !== undefined);

  const sum = (values: number[]): number =>
    values.reduce((acc, value) => acc + value, 0);

  return {
    lastDurationSeconds: contractions[0].durationSeconds,
    averageDurationSeconds: Math.round(sum(durations) / durations.length),
    averageIntervalSeconds:
      intervals.length > 0
        ? Math.round(sum(intervals) / intervals.length)
        : null,
    totalCount: contractions.length,
  };
}

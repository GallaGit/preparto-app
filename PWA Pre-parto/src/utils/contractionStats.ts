import type { Contraction, ContractionStatistics } from '@/types/contraction';

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

import type { Contraction } from '@/types/contraction';

export function calculateIntervalSeconds(
  currentStart: Date,
  previousStart: Date,
): number {
  return Math.round((currentStart.getTime() - previousStart.getTime()) / 1000);
}

export function buildContractionRecord(params: {
  id: string;
  startedAt: Date;
  endedAt: Date;
  previousContraction: Contraction | undefined;
  notes?: string;
}): Contraction {
  const durationSeconds = Math.round(
    (params.endedAt.getTime() - params.startedAt.getTime()) / 1000,
  );

  const intervalSeconds = params.previousContraction
    ? calculateIntervalSeconds(
        params.startedAt,
        params.previousContraction.startedAt,
      )
    : undefined;

  return {
    id: params.id,
    startedAt: params.startedAt,
    endedAt: params.endedAt,
    durationSeconds,
    intervalSeconds,
    notes: (params.notes ?? '').trim(),
  };
}

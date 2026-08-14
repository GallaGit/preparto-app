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
  if (params.endedAt.getTime() < params.startedAt.getTime()) {
    throw new Error('La contracción no puede terminar antes de empezar.');
  }

  const durationSeconds = Math.round(
    (params.endedAt.getTime() - params.startedAt.getTime()) / 1000,
  );

  if (durationSeconds <= 0) {
    throw new Error('La duración de la contracción debe ser positiva.');
  }

  const intervalSeconds = params.previousContraction
    ? calculateIntervalSeconds(
        params.startedAt,
        params.previousContraction.startedAt,
      )
    : undefined;

  if (intervalSeconds !== undefined && intervalSeconds < 0) {
    throw new Error('El intervalo entre contracciones no puede ser negativo.');
  }

  return {
    id: params.id,
    startedAt: params.startedAt,
    endedAt: params.endedAt,
    durationSeconds,
    intervalSeconds,
    notes: (params.notes ?? '').trim(),
  };
}

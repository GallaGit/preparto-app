import type { ContractionLevel } from '@/types/contractionAnalysis';

export type Pattern511State = 'empty' | 'spaced' | 'active';

export function getPattern511State(options: {
  analysisLevel: ContractionLevel;
  averageIntervalSeconds: number | null;
  isRunning: boolean;
}): Pattern511State {
  if (options.analysisLevel >= 3) {
    return 'active';
  }

  if (options.isRunning && options.averageIntervalSeconds !== null) {
    return 'spaced';
  }

  return 'empty';
}

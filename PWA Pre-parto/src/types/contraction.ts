export type Contraction = {
  id: string;
  startedAt: Date;
  endedAt: Date;
  durationSeconds: number;
  intervalSeconds?: number;
};

export interface ContractionStatistics {
  lastDurationSeconds: number | null;
  averageDurationSeconds: number | null;
  averageIntervalSeconds: number | null;
  totalCount: number;
}

export interface ContractionRecommendation {
  message: string;
  type: 'info' | 'alert';
}

export type TimerStatus = 'idle' | 'running' | 'finished';

export interface TimerState {
  status: TimerStatus;
  elapsedMs: number;
  startTime: number | null;
}

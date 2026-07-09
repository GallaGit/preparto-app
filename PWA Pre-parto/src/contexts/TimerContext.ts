import { createContext } from 'react';

export interface TimerContextValue {
  isRunning: boolean;
  startedAt: number | null;
  duration: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export const TimerContext = createContext<TimerContextValue | null>(null);

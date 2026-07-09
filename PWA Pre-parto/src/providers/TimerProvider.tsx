import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { TimerContext, type TimerContextValue } from '@/contexts/TimerContext';

interface TimerProviderProps {
  children: ReactNode;
}

export function TimerProvider({ children }: TimerProviderProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [currentDuration, setCurrentDuration] = useState(0);

  const updateDuration = useCallback(() => {
    if (startedAt !== null) {
      setCurrentDuration(Date.now() - startedAt);
    }
  }, [startedAt]);

  useEffect(() => {
    if (!isRunning || startedAt === null) {
      return;
    }

    updateDuration();
    const intervalId = setInterval(updateDuration, 1000);
    return () => clearInterval(intervalId);
  }, [isRunning, startedAt, updateDuration]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isRunning) {
        return;
      }
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isRunning]);

  const start = useCallback(() => {
    const now = Date.now();
    setStartedAt(now);
    setCurrentDuration(0);
    setIsRunning(true);
  }, []);

  const stop = useCallback(() => {
    if (startedAt !== null) {
      setCurrentDuration(Date.now() - startedAt);
    }
    setIsRunning(false);
  }, [startedAt]);

  const reset = useCallback(() => {
    setIsRunning(false);
    setStartedAt(null);
    setCurrentDuration(0);
  }, []);

  const value = useMemo<TimerContextValue>(
    () => ({
      isRunning,
      startedAt,
      duration: currentDuration,
      start,
      stop,
      reset,
    }),
    [isRunning, startedAt, currentDuration, start, stop, reset],
  );

  return (
    <TimerContext.Provider value={value}>{children}</TimerContext.Provider>
  );
}

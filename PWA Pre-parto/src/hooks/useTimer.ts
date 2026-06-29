import { useCallback, useEffect, useRef, useState } from 'react';
import type { TimerStatus } from '@/types/timer';

interface UseTimerReturn {
  status: TimerStatus;
  elapsedMs: number;
  displayTime: string;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useTimer(): UseTimerReturn {
  const [status, setStatus] = useState<TimerStatus>('idle');
  const [elapsedMs, setElapsedMs] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    startTimeRef.current = Date.now();
    setElapsedMs(0);
    setStatus('running');

    intervalRef.current = setInterval(() => {
      if (startTimeRef.current !== null) {
        setElapsedMs(Date.now() - startTimeRef.current);
      }
    }, 100);
  }, [clearTimer]);

  const stop = useCallback(() => {
    clearTimer();
    if (startTimeRef.current !== null) {
      setElapsedMs(Date.now() - startTimeRef.current);
    }
    setStatus('finished');
  }, [clearTimer]);

  const reset = useCallback(() => {
    clearTimer();
    startTimeRef.current = null;
    setElapsedMs(0);
    setStatus('idle');
  }, [clearTimer]);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  return {
    status,
    elapsedMs,
    displayTime: formatTime(elapsedMs),
    start,
    stop,
    reset,
  };
}

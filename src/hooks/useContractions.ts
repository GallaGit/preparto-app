import { useCallback, useEffect, useState } from 'react';
import { useContractionsContext } from '@/hooks/useContractionsContext';
import { useTimer } from '@/hooks/useTimer';
import {
  countContractionsOnDay,
  msSinceLastEnded,
} from '@/utils/contractionStats';
import { formatCompactSeconds } from '@/utils/formatCompact';
import { formatDuration } from '@/utils/formatDuration';
import { getPattern511State } from '@/utils/pattern511';

function useTickingNow(enabled: boolean): number {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!enabled) {
      return;
    }

    setNow(Date.now());
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [enabled]);

  return now;
}

export function useContractions() {
  const timer = useTimer();
  const {
    contractions,
    isLoading,
    error,
    statistics,
    analysis,
    finishActiveContraction,
    removeContraction,
    clearHistory,
    loadContractions,
  } = useContractionsContext();
  const [notes, setNotes] = useState('');
  const nowMs = useTickingNow(contractions.length > 0);
  const sinceLastMs = msSinceLastEnded(contractions, nowMs);

  const handleTimerAction = useCallback(() => {
    if (!timer.isRunning) {
      timer.start();
      return;
    }
    void finishActiveContraction(notes).then(() => {
      setNotes('');
    });
  }, [timer, finishActiveContraction, notes]);

  const sinceLastDisplay =
    sinceLastMs === null
      ? null
      : timer.isRunning
        ? formatDuration(sinceLastMs)
        : formatCompactSeconds(Math.floor(sinceLastMs / 1000));

  return {
    contractions,
    statistics,
    analysis,
    isLoading,
    error,
    isRunning: timer.isRunning,
    displayTime:
      timer.startedAt === null ? '00:00' : formatDuration(timer.duration),
    sinceLastDisplay,
    todayCount: countContractionsOnDay(contractions),
    patternState: getPattern511State({
      analysisLevel: analysis.level,
      averageIntervalSeconds: statistics.averageIntervalSeconds,
      isRunning: timer.isRunning,
    }),
    buttonLabel: timer.isRunning ? 'Finalizar' : 'Iniciar',
    notes,
    setNotes,
    handleTimerAction,
    removeContraction,
    clearHistory,
    loadContractions,
  };
}

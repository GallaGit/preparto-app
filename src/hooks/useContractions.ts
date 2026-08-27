import { useCallback, useState } from 'react';
import { useContractionsContext } from '@/hooks/useContractionsContext';
import { useTimer } from '@/hooks/useTimer';
import {
  countContractionsOnDay,
  lastIntervalSeconds,
} from '@/utils/contractionStats';
import { formatDuration } from '@/utils/formatDuration';
import { getPattern511State } from '@/utils/pattern511';

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

  const handleTimerAction = useCallback(() => {
    if (!timer.isRunning) {
      timer.start();
      return;
    }
    void finishActiveContraction(notes).then(() => {
      setNotes('');
    });
  }, [timer, finishActiveContraction, notes]);

  const sinceLastMs =
    timer.isRunning && contractions[0]
      ? Date.now() - contractions[0].startedAt.getTime()
      : null;

  return {
    contractions,
    statistics,
    analysis,
    isLoading,
    error,
    isRunning: timer.isRunning,
    displayTime:
      timer.startedAt === null ? '00:00' : formatDuration(timer.duration),
    sinceLastDisplay: sinceLastMs === null ? null : formatDuration(sinceLastMs),
    lastIntervalSeconds: lastIntervalSeconds(contractions),
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

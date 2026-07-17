import { useCallback } from 'react';
import { useContractionsContext } from '@/hooks/useContractionsContext';
import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/formatDuration';
import { formatSeconds } from '@/utils/formatSeconds';

function isFinished(isRunning: boolean, startedAt: number | null): boolean {
  return !isRunning && startedAt !== null;
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
  } = useContractionsContext();

  const handleTimerAction = useCallback(() => {
    if (timer.startedAt === null && !timer.isRunning) {
      timer.start();
    } else if (timer.isRunning) {
      void finishActiveContraction();
    } else {
      timer.reset();
    }
  }, [timer, finishActiveContraction]);

  const getButtonLabel = (): string => {
    if (timer.isRunning) {
      return 'Finalizar';
    }
    if (isFinished(timer.isRunning, timer.startedAt)) {
      return 'Nueva contracción';
    }
    return 'Iniciar';
  };

  const getTimerLabel = (): string | undefined => {
    if (isFinished(timer.isRunning, timer.startedAt)) {
      const seconds = Math.floor(timer.duration / 1000);
      return `Duración: ${formatSeconds(seconds)}`;
    }
    return undefined;
  };

  const displayTime =
    timer.startedAt === null ? '00:00' : formatDuration(timer.duration);

  return {
    contractions,
    statistics,
    analysis,
    isLoading,
    error,
    isRunning: timer.isRunning,
    isFinished: isFinished(timer.isRunning, timer.startedAt),
    displayTime,
    timerLabel: getTimerLabel(),
    buttonLabel: getButtonLabel(),
    handleTimerAction,
    removeContraction,
    clearHistory,
  };
}

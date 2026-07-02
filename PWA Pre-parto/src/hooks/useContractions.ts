import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTimer } from '@/hooks/useTimer';
import * as contractionsStorage from '@/services/contractionsStorage';
import type {
  Contraction,
  ContractionRecommendation,
  ContractionStatistics,
} from '@/types/contraction';
import { calculateStatistics } from '@/utils/contractionStats';
import { getRecommendation } from '@/utils/contractionRecommendation';
import { formatSeconds } from '@/utils/formatSeconds';

function generateId(): string {
  return crypto.randomUUID();
}

function calculateIntervalSeconds(
  currentStart: Date,
  previousStart: Date,
): number {
  return Math.round(
    (currentStart.getTime() - previousStart.getTime()) / 1000,
  );
}

function buildContraction(
  startedAt: Date,
  endedAt: Date,
  previousContraction: Contraction | undefined,
): Contraction {
  const durationSeconds = Math.round(
    (endedAt.getTime() - startedAt.getTime()) / 1000,
  );

  const intervalSeconds = previousContraction
    ? calculateIntervalSeconds(startedAt, previousContraction.startedAt)
    : undefined;

  return {
    id: generateId(),
    startedAt,
    endedAt,
    durationSeconds,
    intervalSeconds,
  };
}

export function useContractions() {
  const timer = useTimer();
  const [contractions, setContractions] = useState<Contraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContractions = useCallback(async () => {
    try {
      const data = await contractionsStorage.getAll();
      setContractions(data);
      setError(null);
    } catch {
      setError('No se pudo cargar el historial de contracciones.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadContractions();
  }, [loadContractions]);

  const statistics: ContractionStatistics = useMemo(
    () => calculateStatistics(contractions),
    [contractions],
  );

  const recommendation: ContractionRecommendation | null = useMemo(
    () => getRecommendation(contractions),
    [contractions],
  );

  const finishContraction = useCallback(async () => {
    if (timer.startedAt === null) {
      return;
    }

    timer.stop();

    const startedAt = new Date(timer.startedAt);
    const endedAt = new Date();
    const previousContraction = contractions[0];
    const contraction = buildContraction(
      startedAt,
      endedAt,
      previousContraction,
    );

    try {
      await contractionsStorage.save(contraction);
      await loadContractions();
      setError(null);
    } catch {
      setError('No se pudo guardar la contracción.');
    }
  }, [timer, contractions, loadContractions]);

  const handleTimerAction = useCallback(() => {
    if (timer.status === 'idle') {
      timer.start();
    } else if (timer.status === 'running') {
      void finishContraction();
    } else {
      timer.reset();
    }
  }, [timer, finishContraction]);

  const removeContraction = useCallback(
    async (id: string) => {
      try {
        await contractionsStorage.deleteContraction(id);
        await loadContractions();
        setError(null);
      } catch {
        setError('No se pudo eliminar la contracción.');
      }
    },
    [loadContractions],
  );

  const clearHistory = useCallback(async () => {
    const confirmed = window.confirm(
      '¿Estás segura de que deseas borrar todo el historial de contracciones? Esta acción no se puede deshacer.',
    );

    if (!confirmed) {
      return;
    }

    try {
      await contractionsStorage.clear();
      await loadContractions();
      setError(null);
    } catch {
      setError('No se pudo borrar el historial.');
    }
  }, [loadContractions]);

  const getButtonLabel = (): string => {
    switch (timer.status) {
      case 'idle':
        return 'Iniciar';
      case 'running':
        return 'Finalizar';
      case 'finished':
        return 'Nueva contracción';
    }
  };

  const getTimerLabel = (): string | undefined => {
    if (timer.status === 'finished') {
      const seconds = Math.floor(timer.elapsedMs / 1000);
      return `Duración: ${formatSeconds(seconds)}`;
    }
    return undefined;
  };

  const displayTime = timer.status === 'idle' ? '00:00' : timer.displayTime;

  return {
    contractions,
    statistics,
    recommendation,
    isLoading,
    error,
    timerStatus: timer.status,
    displayTime,
    timerLabel: getTimerLabel(),
    buttonLabel: getButtonLabel(),
    handleTimerAction,
    removeContraction,
    clearHistory,
  };
}

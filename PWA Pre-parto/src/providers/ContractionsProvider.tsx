import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  ContractionsContext,
  type ContractionsContextValue,
} from '@/contexts/ContractionsContext';
import { useTimer } from '@/hooks/useTimer';
import * as contractionsStorage from '@/services/contractionsStorage';
import type { Contraction } from '@/types/contraction';
import { calculateStatistics } from '@/utils/contractionStats';
import { getRecommendation } from '@/utils/contractionRecommendation';

interface ContractionsProviderProps {
  children: ReactNode;
}

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

export function ContractionsProvider({ children }: ContractionsProviderProps) {
  const { startedAt, stop } = useTimer();
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

  const statistics = useMemo(
    () => calculateStatistics(contractions),
    [contractions],
  );

  const recommendation = useMemo(
    () => getRecommendation(contractions),
    [contractions],
  );

  const finishActiveContraction = useCallback(async () => {
    if (startedAt === null) {
      return;
    }

    const startDate = new Date(startedAt);
    const endDate = new Date();
    stop();

    const contraction = buildContraction(
      startDate,
      endDate,
      contractions[0],
    );

    try {
      await contractionsStorage.save(contraction);
      await loadContractions();
      setError(null);
    } catch {
      setError('No se pudo guardar la contracción.');
    }
  }, [startedAt, stop, contractions, loadContractions]);

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

  const value = useMemo<ContractionsContextValue>(
    () => ({
      contractions,
      isLoading,
      error,
      statistics,
      recommendation,
      finishActiveContraction,
      removeContraction,
      clearHistory,
    }),
    [
      contractions,
      isLoading,
      error,
      statistics,
      recommendation,
      finishActiveContraction,
      removeContraction,
      clearHistory,
    ],
  );

  return (
    <ContractionsContext.Provider value={value}>
      {children}
    </ContractionsContext.Provider>
  );
}

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
import { analyzeContractions } from '@/services/contractionAnalyzer';
import type { Contraction } from '@/types/contraction';
import { buildContractionRecord } from '@/utils/buildContraction';
import { calculateStatistics } from '@/utils/contractionStats';

interface ContractionsProviderProps {
  children: ReactNode;
}

function generateId(): string {
  return crypto.randomUUID();
}

export function ContractionsProvider({ children }: ContractionsProviderProps) {
  const { startedAt, stop, reset } = useTimer();
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

  const analysis = useMemo(
    () => analyzeContractions(contractions),
    [contractions],
  );

  const finishActiveContraction = useCallback(
    async (notes = '') => {
      if (startedAt === null) {
        return;
      }

      const startDate = new Date(startedAt);
      const endDate = new Date();
      stop();

      const contraction = buildContractionRecord({
        id: generateId(),
        startedAt: startDate,
        endedAt: endDate,
        previousContraction: contractions[0],
        notes,
      });

      try {
        await contractionsStorage.save(contraction);
        await loadContractions();
        reset();
        setError(null);
      } catch {
        setError('No se pudo guardar la contracción.');
      }
    },
    [startedAt, stop, reset, contractions, loadContractions],
  );

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
      analysis,
      finishActiveContraction,
      removeContraction,
      clearHistory,
      loadContractions,
    }),
    [
      contractions,
      isLoading,
      error,
      statistics,
      analysis,
      finishActiveContraction,
      removeContraction,
      clearHistory,
      loadContractions,
    ],
  );

  return (
    <ContractionsContext.Provider value={value}>
      {children}
    </ContractionsContext.Provider>
  );
}

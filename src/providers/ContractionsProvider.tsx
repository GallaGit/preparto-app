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
import { useI18n } from '@/i18n/I18nProvider';
import { translate } from '@/i18n/translate';
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
  const { locale } = useI18n();
  const [contractions, setContractions] = useState<Contraction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContractions = useCallback(async () => {
    try {
      const data = await contractionsStorage.getAll();
      setContractions(data);
      setError(null);
    } catch {
      setError(translate(locale, 'errors.contractions.load'));
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    void loadContractions();
  }, [loadContractions]);

  const statistics = useMemo(
    () => calculateStatistics(contractions),
    [contractions],
  );

  const analysis = useMemo(
    () => analyzeContractions(contractions, locale),
    [contractions, locale],
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
        setError(translate(locale, 'errors.contractions.save'));
      }
    },
    [startedAt, stop, reset, contractions, loadContractions, locale],
  );

  const removeContraction = useCallback(
    async (id: string) => {
      try {
        await contractionsStorage.deleteContraction(id);
        await loadContractions();
        setError(null);
      } catch {
        setError(translate(locale, 'errors.contractions.delete'));
      }
    },
    [loadContractions, locale],
  );

  const clearHistory = useCallback(async (): Promise<boolean> => {
    try {
      await contractionsStorage.clear();
      await loadContractions();
      setError(null);
      return true;
    } catch {
      setError(translate(locale, 'errors.contractions.clear'));
      return false;
    }
  }, [loadContractions, locale]);

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

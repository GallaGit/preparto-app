import { createContext } from 'react';
import type {
  Contraction,
  ContractionRecommendation,
  ContractionStatistics,
} from '@/types/contraction';

export interface ContractionsContextValue {
  contractions: Contraction[];
  isLoading: boolean;
  error: string | null;
  statistics: ContractionStatistics;
  recommendation: ContractionRecommendation | null;
  finishActiveContraction: () => Promise<void>;
  removeContraction: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const ContractionsContext =
  createContext<ContractionsContextValue | null>(null);

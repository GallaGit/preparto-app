import { createContext } from 'react';
import type { Contraction, ContractionStatistics } from '@/types/contraction';
import type { ContractionAnalysis } from '@/types/contractionAnalysis';

export interface ContractionsContextValue {
  contractions: Contraction[];
  isLoading: boolean;
  error: string | null;
  statistics: ContractionStatistics;
  analysis: ContractionAnalysis;
  finishActiveContraction: (notes?: string) => Promise<void>;
  removeContraction: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;
  loadContractions: () => Promise<void>;
}

export const ContractionsContext =
  createContext<ContractionsContextValue | null>(null);

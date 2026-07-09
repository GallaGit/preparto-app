import { useContext } from 'react';
import { ContractionsContext } from '@/contexts/ContractionsContext';

export function useContractionsContext() {
  const context = useContext(ContractionsContext);

  if (context === null) {
    throw new Error(
      'useContractionsContext debe usarse dentro de un ContractionsProvider',
    );
  }

  return context;
}

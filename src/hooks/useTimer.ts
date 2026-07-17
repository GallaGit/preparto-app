import { useContext } from 'react';
import { TimerContext } from '@/contexts/TimerContext';

export function useTimer() {
  const context = useContext(TimerContext);

  if (context === null) {
    throw new Error('useTimer debe usarse dentro de un TimerProvider');
  }

  return context;
}

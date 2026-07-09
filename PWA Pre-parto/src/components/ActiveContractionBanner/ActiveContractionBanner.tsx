import { useLocation } from 'react-router-dom';
import { Button } from '@/components/Button';
import { useContractionsContext } from '@/hooks/useContractionsContext';
import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/formatDuration';

const CONTRACTIONS_PATH = '/contractions';

export function ActiveContractionBanner() {
  const { pathname } = useLocation();
  const { isRunning, duration } = useTimer();
  const { finishActiveContraction } = useContractionsContext();

  if (!isRunning || pathname === CONTRACTIONS_PATH) {
    return null;
  }

  return (
    <aside
      className="flex flex-col gap-3 rounded-2xl border-2 border-accent-200 bg-accent-50 px-5 py-4"
      role="status"
      aria-live="polite"
      aria-label="Contracción en curso"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-accent-800">
          🟢 Contracción en curso
        </p>
        <p
          className="text-lg font-bold tabular-nums text-accent-900"
          aria-label={`Tiempo transcurrido: ${formatDuration(duration)}`}
        >
          {formatDuration(duration)}
        </p>
      </div>

      <Button
        variant="danger"
        fullWidth
        onClick={() => void finishActiveContraction()}
        aria-label="Finalizar contracción en curso"
      >
        Finalizar
      </Button>
    </aside>
  );
}

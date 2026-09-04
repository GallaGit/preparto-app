import { useLocation } from 'react-router-dom';
import { Button } from '@/components/Button';
import { IconCircle } from '@/components/Icon/IconCircle';
import { useContractionsContext } from '@/hooks/useContractionsContext';
import { useTimer } from '@/hooks/useTimer';
import { useI18n } from '@/i18n/I18nProvider';
import { formatDuration } from '@/utils/formatDuration';

const CONTRACTIONS_PATH = '/contractions';

export function ActiveContractionBanner() {
  const { pathname } = useLocation();
  const { isRunning, duration } = useTimer();
  const { finishActiveContraction } = useContractionsContext();
  const { t } = useI18n();

  if (!isRunning || pathname === CONTRACTIONS_PATH) {
    return null;
  }

  return (
    <aside
      className="flex flex-col gap-3 rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4"
      role="status"
      aria-live="polite"
      aria-label={t('timer.inProgress')}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <IconCircle name="timer" variant="compact" />
          <p className="text-sm font-semibold text-accent-800">
            {t('timer.inProgress')}
          </p>
        </div>
        <p
          className="text-lg font-bold tabular-nums text-accent-900"
          aria-label={t('timer.elapsedAria', {
            time: formatDuration(duration),
          })}
        >
          {formatDuration(duration)}
        </p>
      </div>

      <Button
        variant="danger"
        fullWidth
        onClick={() => void finishActiveContraction()}
        aria-label={t('timer.finishAria')}
      >
        {t('contractions.finish')}
      </Button>
    </aside>
  );
}

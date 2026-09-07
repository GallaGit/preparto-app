import type { Contraction } from '@/types/contraction';
import { formatSeconds } from '@/utils/formatSeconds';
import { formatTime } from '@/utils/formatTime';
import { useI18n } from '@/i18n/I18nProvider';

interface ContractionCardProps {
  contraction: Contraction;
  onDelete: (id: string) => void;
}

export function ContractionCard({
  contraction,
  onDelete,
}: ContractionCardProps) {
  const { t } = useI18n();
  const startedLabel = formatTime(contraction.startedAt);

  return (
    <article className="flex items-center justify-between gap-4 rounded-2xl border border-outline-variant bg-surface-container-lowest px-5 py-4">
      <div className="flex min-w-0 flex-col gap-1">
        <time
          dateTime={contraction.startedAt.toISOString()}
          className="text-base font-semibold text-on-surface"
        >
          {startedLabel}
        </time>
        <p className="text-sm text-on-surface-variant">
          {t('contractions.duration')}:{' '}
          <span className="font-medium text-on-surface">
            {formatSeconds(contraction.durationSeconds)}
          </span>
        </p>
        {contraction.intervalSeconds !== undefined && (
          <p className="text-sm text-on-surface-variant">
            {t('contractions.interval')}:{' '}
            <span className="font-medium text-on-surface">
              {formatSeconds(contraction.intervalSeconds)}
            </span>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(contraction.id)}
        className="flex min-h-11 min-w-11 flex-shrink-0 items-center justify-center rounded-xl text-on-surface-variant transition-colors hover:bg-error-container hover:text-error focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error/40"
        aria-label={t('contractions.deleteAt', { time: startedLabel })}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </article>
  );
}

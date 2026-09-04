import { useI18n } from '@/i18n/I18nProvider';
import { formatCompactSeconds } from '@/utils/formatCompact';
import type { Pattern511State } from '@/utils/pattern511';

interface Pattern511ChipProps {
  state: Pattern511State;
  averageIntervalSeconds: number | null;
}

export function Pattern511Chip({
  state,
  averageIntervalSeconds,
}: Pattern511ChipProps) {
  const { t } = useI18n();
  const title =
    state === 'active'
      ? t('pattern511.titleActive')
      : state === 'spaced'
        ? t('pattern511.titleSpaced', {
            value: formatCompactSeconds(averageIntervalSeconds),
          })
        : t('pattern511.titleNone');

  const body =
    state === 'active'
      ? t('pattern511.bodyActive')
      : state === 'spaced'
        ? t('pattern511.bodySpaced')
        : t('pattern511.bodyNone');

  return (
    <section
      className="flex gap-3 rounded-3xl bg-surface-container-lowest px-5 py-4 shadow-glass"
      aria-label={t('pattern511.ariaLabel')}
      aria-live="polite"
    >
      <span
        className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${
          state === 'active' ? 'bg-error' : 'bg-primary-400'
        }`}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="font-semibold text-on-surface">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
          {body}
        </p>
      </div>
    </section>
  );
}

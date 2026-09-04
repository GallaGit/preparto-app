import { useI18n } from '@/i18n/I18nProvider';

interface TimerDisplayProps {
  time: string;
  isRunning?: boolean;
}

export function TimerDisplay({ time, isRunning = false }: TimerDisplayProps) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl bg-surface-container-lowest px-5 py-10 shadow-glass">
      <p
        className="text-6xl font-bold tracking-wider text-on-surface tabular-nums"
        role="timer"
        aria-live="polite"
        aria-label={
          isRunning
            ? t('timer.inProgressAria', { time })
            : t('timer.durationAria', { time })
        }
      >
        {time}
      </p>
      {isRunning ? (
        <p className="flex items-center gap-2 text-base font-medium text-primary">
          <span
            className="h-2.5 w-2.5 rounded-full bg-error"
            aria-hidden="true"
          />
          {t('timer.inProgress')}
        </p>
      ) : (
        <p className="text-base font-medium text-primary">
          {t('timer.durationLabel')}
        </p>
      )}
    </div>
  );
}

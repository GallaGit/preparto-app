import { useState } from 'react';
import { Button } from '@/components/Button';
import { TextAreaField } from '@/components/Form';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { Pattern511Chip } from '@/components/Pattern511Chip';
import { StatMiniCard } from '@/components/StatMiniCard';
import { TimerDisplay } from '@/components/Timer';
import { useContractions } from '@/hooks/useContractions';
import { useI18n } from '@/i18n/I18nProvider';
import { formatCompactSeconds } from '@/utils/formatCompact';

export function Contractions() {
  const {
    statistics,
    error,
    isRunning,
    displayTime,
    sinceLastDisplay,
    todayCount,
    patternState,
    buttonLabel,
    notes,
    setNotes,
    handleTimerAction,
  } = useContractions();
  const { t } = useI18n();
  const [notesOpen, setNotesOpen] = useState(false);
  const showNotes = notesOpen || notes.trim().length > 0;

  const leftValue = sinceLastDisplay ?? '—';
  const rightValue = isRunning
    ? formatCompactSeconds(statistics.averageDurationSeconds)
    : String(todayCount);
  const rightLabel = isRunning
    ? t('contractions.avgDuration')
    : t('contractions.todayCount');

  return (
    <Layout>
      <div className="flex min-h-[calc(100dvh-8.5rem-env(safe-area-inset-bottom))] flex-col">
        <PageHeader
          large
          title={t('contractions.title')}
          subtitle={
            isRunning
              ? t('contractions.subtitleRunning')
              : t('contractions.subtitleIdle')
          }
        />

        <section
          className="flex flex-1 flex-col gap-4"
          aria-label={t('contractions.timerAria')}
        >
          <TimerDisplay time={displayTime} isRunning={isRunning} />

          <div className="flex gap-3">
            <StatMiniCard
              value={leftValue}
              label={t('contractions.sinceLast')}
            />
            <StatMiniCard value={rightValue} label={rightLabel} />
          </div>

          <Pattern511Chip
            state={patternState}
            averageIntervalSeconds={statistics.averageIntervalSeconds}
          />

          {error ? (
            <p className="text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="mt-auto flex flex-col gap-4 pt-6">
            {showNotes ? (
              <TextAreaField
                id="contraction-notes"
                label={t('contractions.notesLabel')}
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
              />
            ) : (
              <button
                type="button"
                className="min-h-11 self-start rounded font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                onClick={() => setNotesOpen(true)}
              >
                {t('contractions.addNote')}
              </button>
            )}

            <Button
              fullWidth
              size="xl"
              onClick={handleTimerAction}
              aria-label={buttonLabel}
            >
              {buttonLabel}
            </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
}

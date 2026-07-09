import { Button } from '@/components/Button';
import { HistoryList } from '@/components/HistoryList';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { RecommendationBanner } from '@/components/RecommendationBanner';
import { StatisticsCard } from '@/components/StatisticsCard';
import { TimerDisplay } from '@/components/Timer';
import { useContractions } from '@/hooks/useContractions';

export function Contractions() {
  const {
    contractions,
    statistics,
    recommendation,
    isLoading,
    error,
    isRunning,
    displayTime,
    timerLabel,
    buttonLabel,
    handleTimerAction,
    removeContraction,
    clearHistory,
  } = useContractions();

  return (
    <Layout>
      <PageHeader
        title="Contracciones"
        subtitle="Mide la duración de cada contracción"
        backTo="/"
      />

      <section
        className="flex flex-col items-center gap-8 mb-10"
        aria-label="Cronómetro de contracciones"
      >
        <TimerDisplay time={displayTime} label={timerLabel} />

        <Button
          fullWidth
          variant={isRunning ? 'danger' : 'primary'}
          onClick={handleTimerAction}
          aria-label={buttonLabel}
        >
          {buttonLabel}
        </Button>
      </section>

      {error && (
        <p className="mb-6 text-center text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      {recommendation && (
        <div className="mb-8">
          <RecommendationBanner recommendation={recommendation} />
        </div>
      )}

      <div className="mb-8">
        <StatisticsCard statistics={statistics} />
      </div>

      <section aria-label="Historial">
        <h2 className="text-lg font-semibold text-primary-800 mb-4">
          Historial
        </h2>
        <HistoryList
          contractions={contractions}
          isLoading={isLoading}
          onDelete={(id) => void removeContraction(id)}
          onClearAll={() => void clearHistory()}
        />
      </section>
    </Layout>
  );
}

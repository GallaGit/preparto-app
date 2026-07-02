import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { HistoryList } from '@/components/HistoryList';
import { Layout } from '@/components/Layout';
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
    timerStatus,
    displayTime,
    timerLabel,
    buttonLabel,
    handleTimerAction,
    removeContraction,
    clearHistory,
  } = useContractions();

  return (
    <Layout>
      <header className="mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
          aria-label="Volver al inicio"
        >
          ← Inicio
        </Link>
        <h1 className="text-2xl font-bold text-primary-800">Contracciones</h1>
        <p className="mt-2 text-primary-600">
          Mide la duración de cada contracción
        </p>
      </header>

      <section
        className="flex flex-col items-center gap-8 mb-10"
        aria-label="Cronómetro de contracciones"
      >
        <TimerDisplay time={displayTime} label={timerLabel} />

        <Button
          fullWidth
          variant={timerStatus === 'running' ? 'danger' : 'primary'}
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

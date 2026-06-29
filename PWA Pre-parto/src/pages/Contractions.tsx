import { Link } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { TimerDisplay } from '@/components/Timer';
import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/formatDuration';

export function Contractions() {
  const { status, elapsedMs, displayTime, start, stop, reset } = useTimer();

  const handleAction = () => {
    if (status === 'idle') {
      start();
    } else if (status === 'running') {
      stop();
    } else {
      reset();
    }
  };

  const getButtonLabel = (): string => {
    switch (status) {
      case 'idle':
        return 'Iniciar';
      case 'running':
        return 'Finalizar';
      case 'finished':
        return 'Nueva contracción';
    }
  };

  const getTimerLabel = (): string | undefined => {
    if (status === 'finished') {
      return `Duración: ${formatDuration(elapsedMs)}`;
    }
    return undefined;
  };

  const displayValue =
    status === 'idle' ? '00:00' : displayTime;

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
        className="flex flex-col items-center gap-8"
        aria-label="Cronómetro de contracciones"
      >
        <TimerDisplay time={displayValue} label={getTimerLabel()} />

        <Button
          fullWidth
          variant={status === 'running' ? 'danger' : 'primary'}
          onClick={handleAction}
          aria-label={getButtonLabel()}
        >
          {getButtonLabel()}
        </Button>
      </section>
    </Layout>
  );
}

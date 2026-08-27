interface TimerDisplayProps {
  time: string;
  isRunning?: boolean;
}

export function TimerDisplay({ time, isRunning = false }: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl bg-surface-container-lowest px-5 py-10 shadow-glass">
      <p
        className="text-6xl font-bold tracking-wider text-on-surface tabular-nums"
        role="timer"
        aria-live="polite"
        aria-label={
          isRunning
            ? `Contracción en curso: ${time}`
            : `Duración de esta contracción: ${time}`
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
          Contracción en curso
        </p>
      ) : (
        <p className="text-base font-medium text-primary">
          Duración de esta contracción
        </p>
      )}
    </div>
  );
}

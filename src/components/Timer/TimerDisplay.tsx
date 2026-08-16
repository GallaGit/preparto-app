interface TimerDisplayProps {
  time: string;
  label?: string;
}

export function TimerDisplay({ time, label }: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-2xl border border-outline-variant bg-surface-container-lowest py-8">
      <p
        className="text-6xl font-bold tracking-wider text-on-surface tabular-nums"
        role="timer"
        aria-live="polite"
        aria-label={label ?? `Tiempo: ${time}`}
      >
        {time}
      </p>
      {label && (
        <p className="text-base font-medium text-on-surface-variant">{label}</p>
      )}
    </div>
  );
}

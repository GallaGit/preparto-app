interface TimerDisplayProps {
  time: string;
  label?: string;
}

export function TimerDisplay({ time, label }: TimerDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-2 py-8">
      <p
        className="text-6xl font-bold tabular-nums text-primary-800 tracking-wider"
        role="timer"
        aria-live="polite"
        aria-label={label ?? `Tiempo: ${time}`}
      >
        {time}
      </p>
      {label && (
        <p className="text-base text-primary-600 font-medium">{label}</p>
      )}
    </div>
  );
}

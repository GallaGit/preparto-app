interface StatMiniCardProps {
  value: string;
  label: string;
}

export function StatMiniCard({ value, label }: StatMiniCardProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-3xl bg-surface-container-lowest px-4 py-5 shadow-glass">
      <p className="text-2xl font-bold tabular-nums text-on-surface">{value}</p>
      <p className="mt-1 text-center text-sm text-on-surface-variant">
        {label}
      </p>
    </div>
  );
}

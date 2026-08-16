import type { ContractionStatistics } from '@/types/contraction';
import { formatSeconds } from '@/utils/formatSeconds';

interface StatisticsCardProps {
  statistics: ContractionStatistics;
}

interface StatItemProps {
  label: string;
  value: string;
}

function StatItem({ label, value }: StatItemProps) {
  return (
    <div className="flex flex-col items-center gap-1 p-3">
      <span className="text-2xl font-bold tabular-nums text-on-surface">
        {value}
      </span>
      <span className="text-center text-xs leading-tight text-on-surface-variant">
        {label}
      </span>
    </div>
  );
}

function formatStatValue(seconds: number | null): string {
  if (seconds === null) {
    return '—';
  }
  return formatSeconds(seconds);
}

export function StatisticsCard({ statistics }: StatisticsCardProps) {
  return (
    <section
      className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-4"
      aria-label="Estadísticas de contracciones"
      aria-live="polite"
    >
      <h2 className="mb-3 text-center text-sm font-semibold text-on-surface-variant">
        Estadísticas
      </h2>
      <div className="grid grid-cols-2 gap-2">
        <StatItem
          label="Última duración"
          value={formatStatValue(statistics.lastDurationSeconds)}
        />
        <StatItem
          label="Promedio duración"
          value={formatStatValue(statistics.averageDurationSeconds)}
        />
        <StatItem
          label="Promedio intervalo"
          value={formatStatValue(statistics.averageIntervalSeconds)}
        />
        <StatItem
          label="Total contracciones"
          value={String(statistics.totalCount)}
        />
      </div>
    </section>
  );
}

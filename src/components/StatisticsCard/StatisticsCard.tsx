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
      <span className="text-2xl font-bold text-primary-800 tabular-nums">
        {value}
      </span>
      <span className="text-xs text-primary-600 text-center leading-tight">
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
      className="bg-white rounded-2xl border-2 border-primary-100 p-4"
      aria-label="Estadísticas de contracciones"
      aria-live="polite"
    >
      <h2 className="text-sm font-semibold text-primary-700 mb-3 text-center">
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

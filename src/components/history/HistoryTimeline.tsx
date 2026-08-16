import { Link } from 'react-router-dom';
import { IconCircle } from '@/components/Icon/IconCircle';
import { getSymptomCatalogItem } from '@/data/symptomOptions';
import type { IconKey } from '@/icons/iconMap';
import type { HistoryItem } from '@/types/history';
import { formatDuration } from '@/utils/formatDuration';
import { formatTime } from '@/utils/formatTime';

interface HistoryTimelineProps {
  items: HistoryItem[];
}

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString('es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function itemTitle(item: HistoryItem): string {
  if (item.kind === 'contraction') {
    return 'Contracción';
  }
  return getSymptomCatalogItem(item.symptom.type)?.label ?? item.symptom.type;
}

function itemIcon(item: HistoryItem): IconKey {
  if (item.kind === 'contraction') {
    return 'timer';
  }
  return getSymptomCatalogItem(item.symptom.type)?.icon ?? 'clipboard';
}

function itemSummary(item: HistoryItem): string {
  if (item.kind === 'contraction') {
    const durationMs = item.contraction.durationSeconds * 1000;
    return `Duración ${formatDuration(durationMs)}`;
  }
  if (item.symptom.notes) {
    return item.symptom.notes;
  }
  return 'Sin observaciones';
}

export function HistoryTimeline({ items }: HistoryTimelineProps) {
  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-outline-variant px-4 py-8 text-center text-on-surface-variant">
        No hay registros con estos filtros.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-3" aria-label="Línea temporal">
      {items.map((item) => (
        <li key={`${item.kind}-${item.id}`}>
          <Link
            to={`/history/${item.kind}/${item.id}`}
            className="glass-panel block min-h-14 rounded-2xl px-4 py-3 text-left transition-colors hover:bg-white/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <IconCircle name={itemIcon(item)} variant="compact" />
                <div>
                  <p className="font-semibold text-on-surface">
                    {itemTitle(item)}
                  </p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {itemSummary(item)}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right text-sm text-on-surface-variant">
                <p>{formatDateLabel(item.occurredAt)}</p>
                <p>{formatTime(item.occurredAt)}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}

import { Link } from 'react-router-dom';
import { IconCircle } from '@/components/Icon/IconCircle';
import { getSymptomCatalogItem } from '@/data/symptomOptions';
import { useI18n } from '@/i18n/I18nProvider';
import type { Locale, MessageKey } from '@/i18n/types';
import type { IconKey } from '@/icons/iconMap';
import type { HistoryItem } from '@/types/history';
import { formatDuration } from '@/utils/formatDuration';
import { formatTime } from '@/utils/formatTime';

interface HistoryTimelineProps {
  items: HistoryItem[];
}

type Translate = (key: MessageKey, vars?: Record<string, string | number>) => string;

function formatDateLabel(date: Date, locale: Locale): string {
  return date.toLocaleDateString(locale === 'en' ? 'en-GB' : 'es-ES', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function itemTitle(item: HistoryItem, t: Translate): string {
  if (item.kind === 'contraction') {
    return t('history.timeline.contraction');
  }
  const catalog = getSymptomCatalogItem(item.symptom.type);
  return catalog ? t(catalog.labelKey) : item.symptom.type;
}

function itemIcon(item: HistoryItem): IconKey {
  if (item.kind === 'contraction') {
    return 'timer';
  }
  return getSymptomCatalogItem(item.symptom.type)?.icon ?? 'clipboard';
}

function itemSummary(item: HistoryItem, t: Translate): string {
  if (item.kind === 'contraction') {
    const durationMs = item.contraction.durationSeconds * 1000;
    return t('history.timeline.duration', { time: formatDuration(durationMs) });
  }
  if (item.symptom.notes) {
    return item.symptom.notes;
  }
  return t('history.timeline.noNotes');
}

export function HistoryTimeline({ items }: HistoryTimelineProps) {
  const { t, locale } = useI18n();

  if (items.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-outline-variant px-4 py-8 text-center text-on-surface-variant">
        {t('history.timeline.empty')}
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-3" aria-label={t('history.timeline.aria')}>
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
                    {itemTitle(item, t)}
                  </p>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {itemSummary(item, t)}
                  </p>
                </div>
              </div>
              <div className="shrink-0 text-right text-sm text-on-surface-variant">
                <p>{formatDateLabel(item.occurredAt, locale)}</p>
                <p>{formatTime(item.occurredAt)}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ol>
  );
}

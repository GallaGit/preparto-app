import type { Contraction } from '@/types/contraction';
import { Button } from '@/components/Button';
import { ContractionCard } from '@/components/ContractionCard';
import { useI18n } from '@/i18n/I18nProvider';

interface HistoryListProps {
  contractions: Contraction[];
  isLoading: boolean;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function HistoryList({
  contractions,
  isLoading,
  onDelete,
  onClearAll,
}: HistoryListProps) {
  const { t } = useI18n();

  if (isLoading) {
    return (
      <p className="py-6 text-center text-on-surface-variant" role="status">
        {t('history.loading')}
      </p>
    );
  }

  if (contractions.length === 0) {
    return (
      <p className="py-6 text-center text-on-surface-variant" role="status">
        {t('contractions.emptyList')}
      </p>
    );
  }

  return (
    <section aria-label={t('nav.history')}>
      <ul className="flex flex-col gap-3" role="list">
        {contractions.map((contraction) => (
          <li key={contraction.id}>
            <ContractionCard contraction={contraction} onDelete={onDelete} />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          variant="ghost"
          fullWidth
          onClick={onClearAll}
          aria-label={t('contractions.clearAllAria')}
        >
          {t('contractions.clearAll')}
        </Button>
      </div>
    </section>
  );
}

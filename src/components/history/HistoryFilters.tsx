import { useCallback, useId, useState } from 'react';
import { Modal } from '@/components/Modal';
import { SYMPTOM_CATALOG } from '@/data/symptomOptions';
import { useI18n } from '@/i18n/I18nProvider';
import type { MessageKey } from '@/i18n/types';
import type { HistoryFilterType } from '@/types/history';
import { formFieldClassName } from '@/utils/formHelpers';

interface HistoryFiltersProps {
  day: string;
  type: HistoryFilterType;
  onDayChange: (day: string) => void;
  onTypeChange: (type: HistoryFilterType) => void;
}

const PRIMARY_OPTIONS: { value: HistoryFilterType; labelKey: MessageKey }[] = [
  { value: 'all', labelKey: 'history.filter.all' },
  { value: 'contraction', labelKey: 'history.filter.contractions' },
  { value: 'water_break', labelKey: 'symptom.type.water_break' },
];

const MORE_OPTIONS: { value: HistoryFilterType; labelKey: MessageKey }[] =
  SYMPTOM_CATALOG.filter((item) => item.type !== 'water_break').map(
    (item) => ({
      value: item.type as HistoryFilterType,
      labelKey: item.labelKey,
    }),
  );

function chipClassName(selected: boolean): string {
  return [
    'min-h-11 rounded-xl border px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30',
    selected
      ? 'border-primary bg-primary text-on-primary'
      : 'border-outline-variant bg-surface-container-lowest text-on-surface',
  ].join(' ');
}

export function HistoryFilters({
  day,
  type,
  onDayChange,
  onTypeChange,
}: HistoryFiltersProps) {
  const { t } = useI18n();
  const [moreOpen, setMoreOpen] = useState(false);
  const moreListId = useId();
  const closeMore = useCallback(() => setMoreOpen(false), []);

  const isSecondarySelected =
    type !== 'all' && type !== 'contraction' && type !== 'water_break';

  function handleMoreSelect(value: HistoryFilterType) {
    onTypeChange(value);
    setMoreOpen(false);
  }

  return (
    <div
      className="flex flex-col gap-4"
      role="group"
      aria-label={t('history.filter.aria')}
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="history-day"
          className="text-sm font-semibold text-on-surface"
        >
          {t('history.filter.byDay')}
        </label>
        <input
          id="history-day"
          type="date"
          className={formFieldClassName}
          value={day}
          onChange={(event) => onDayChange(event.target.value)}
        />
        {day ? (
          <button
            type="button"
            className="min-h-11 self-start px-1 text-sm font-medium text-primary underline"
            onClick={() => onDayChange('')}
          >
            {t('history.filter.clearDay')}
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <p
          id="history-type-label"
          className="text-sm font-semibold text-on-surface"
        >
          {t('history.filter.byType')}
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-labelledby="history-type-label"
        >
          {PRIMARY_OPTIONS.map((option) => {
            const selected = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={chipClassName(selected)}
                onClick={() => onTypeChange(option.value)}
              >
                {t(option.labelKey)}
              </button>
            );
          })}
          <button
            type="button"
            className={[
              chipClassName(isSecondarySelected || moreOpen),
              'min-w-11 px-0 text-xl leading-none',
            ].join(' ')}
            aria-label={
              moreOpen
                ? t('history.filter.closeMore')
                : t('history.filter.more')
            }
            aria-expanded={moreOpen}
            aria-controls={moreListId}
            onClick={() => setMoreOpen((open) => !open)}
          >
            {moreOpen ? '×' : '+'}
          </button>
        </div>
      </div>

      <Modal
        open={moreOpen}
        onClose={closeMore}
        title={t('history.filter.more')}
        closeLabel={t('common.close')}
      >
        <div
          id={moreListId}
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-label={t('history.filter.moreAria')}
        >
          {MORE_OPTIONS.map((option) => {
            const selected = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={chipClassName(selected)}
                onClick={() => handleMoreSelect(option.value)}
              >
                {t(option.labelKey)}
              </button>
            );
          })}
        </div>
      </Modal>
    </div>
  );
}

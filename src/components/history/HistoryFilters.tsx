import { SYMPTOM_CATALOG } from '@/data/symptomOptions';
import type { HistoryFilterType } from '@/types/history';
import { formFieldClassName } from '@/utils/formHelpers';

interface HistoryFiltersProps {
  day: string;
  type: HistoryFilterType;
  onDayChange: (day: string) => void;
  onTypeChange: (type: HistoryFilterType) => void;
}

const TYPE_OPTIONS: { value: HistoryFilterType; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'contraction', label: 'Contracciones' },
  ...SYMPTOM_CATALOG.map((item) => ({
    value: item.type as HistoryFilterType,
    label: item.label,
  })),
];

export function HistoryFilters({
  day,
  type,
  onDayChange,
  onTypeChange,
}: HistoryFiltersProps) {
  return (
    <div className="flex flex-col gap-4" role="group" aria-label="Filtros del historial">
      <div className="flex flex-col gap-2">
        <label htmlFor="history-day" className="text-sm font-semibold text-primary-800">
          Filtrar por día
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
            className="self-start text-sm font-medium text-primary-700 underline min-h-11 px-1"
            onClick={() => onDayChange('')}
          >
            Quitar filtro de día
          </button>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <p id="history-type-label" className="text-sm font-semibold text-primary-800">
          Filtrar por tipo
        </p>
        <div
          className="flex flex-wrap gap-2"
          role="listbox"
          aria-labelledby="history-type-label"
        >
          {TYPE_OPTIONS.map((option) => {
            const selected = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={selected}
                className={[
                  'min-h-11 rounded-xl border-2 px-3 py-2 text-sm font-medium focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300',
                  selected
                    ? 'border-primary-500 bg-primary-500 text-white'
                    : 'border-primary-200 bg-white text-primary-800',
                ].join(' ')}
                onClick={() => onTypeChange(option.value)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

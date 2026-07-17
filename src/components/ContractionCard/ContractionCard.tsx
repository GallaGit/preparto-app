import type { Contraction } from '@/types/contraction';
import { formatSeconds } from '@/utils/formatSeconds';
import { formatTime } from '@/utils/formatTime';

interface ContractionCardProps {
  contraction: Contraction;
  onDelete: (id: string) => void;
}

export function ContractionCard({
  contraction,
  onDelete,
}: ContractionCardProps) {
  return (
    <article className="flex items-center justify-between gap-4 bg-white rounded-2xl border-2 border-primary-100 px-5 py-4">
      <div className="flex flex-col gap-1 min-w-0">
        <time
          dateTime={contraction.startedAt.toISOString()}
          className="text-base font-semibold text-primary-800"
        >
          {formatTime(contraction.startedAt)}
        </time>
        <p className="text-sm text-primary-600">
          Duración:{' '}
          <span className="font-medium">
            {formatSeconds(contraction.durationSeconds)}
          </span>
        </p>
        {contraction.intervalSeconds !== undefined && (
          <p className="text-sm text-primary-500">
            Intervalo:{' '}
            <span className="font-medium">
              {formatSeconds(contraction.intervalSeconds)}
            </span>
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onDelete(contraction.id)}
        className="flex-shrink-0 min-h-11 min-w-11 flex items-center justify-center rounded-xl text-primary-500 hover:text-red-600 hover:bg-red-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
        aria-label={`Eliminar contracción de las ${formatTime(contraction.startedAt)}`}
      >
        <span aria-hidden="true">✕</span>
      </button>
    </article>
  );
}

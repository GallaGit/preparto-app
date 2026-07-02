import type { Contraction } from '@/types/contraction';
import { Button } from '@/components/Button';
import { ContractionCard } from '@/components/ContractionCard';

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
  if (isLoading) {
    return (
      <p className="text-center text-primary-500 py-6" role="status">
        Cargando historial…
      </p>
    );
  }

  if (contractions.length === 0) {
    return (
      <p className="text-center text-primary-500 py-6" role="status">
        Aún no hay contracciones registradas.
      </p>
    );
  }

  return (
    <section aria-label="Historial de contracciones">
      <ul className="flex flex-col gap-3" role="list">
        {contractions.map((contraction) => (
          <li key={contraction.id}>
            <ContractionCard
              contraction={contraction}
              onDelete={onDelete}
            />
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <Button
          variant="ghost"
          fullWidth
          onClick={onClearAll}
          aria-label="Borrar todo el historial de contracciones"
        >
          Borrar todo el historial
        </Button>
      </div>
    </section>
  );
}

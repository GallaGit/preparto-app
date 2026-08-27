import { formatCompactSeconds } from '@/utils/formatCompact';
import type { Pattern511State } from '@/utils/pattern511';

interface Pattern511ChipProps {
  state: Pattern511State;
  averageIntervalSeconds: number | null;
}

export function Pattern511Chip({
  state,
  averageIntervalSeconds,
}: Pattern511ChipProps) {
  const title =
    state === 'active'
      ? 'Patrón 5-1-1 activo'
      : state === 'spaced'
        ? `Intervalo medio: ${formatCompactSeconds(averageIntervalSeconds)}`
        : 'Aún no hay patrón 5-1-1';

  const body =
    state === 'active'
      ? 'Contracciones de ~1 min, cada ~5 min, durante ~1 hora. No es un diagnóstico. Si el dolor es intenso o hay sangrado, usa SOS.'
      : state === 'spaced'
        ? 'Todavía más espaciadas que el patrón 5-1-1. Si el dolor es intenso o hay sangrado, usa SOS.'
        : 'Se activa cuando hay contracciones de ~1 min, cada 5 min, durante 1 hora. No es un diagnóstico.';

  return (
    <section
      className="flex gap-3 rounded-3xl bg-surface-container-lowest px-5 py-4 shadow-glass"
      aria-label="Patrón 5-1-1"
      aria-live="polite"
    >
      <span
        className={`mt-1 h-3 w-3 flex-shrink-0 rounded-full ${
          state === 'active' ? 'bg-error' : 'bg-primary-400'
        }`}
        aria-hidden="true"
      />
      <div className="min-w-0">
        <p className="font-semibold text-on-surface">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
          {body}
        </p>
      </div>
    </section>
  );
}

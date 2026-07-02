import type { ContractionRecommendation } from '@/types/contraction';

interface RecommendationBannerProps {
  recommendation: ContractionRecommendation;
}

export function RecommendationBanner({
  recommendation,
}: RecommendationBannerProps) {
  const isAlert = recommendation.type === 'alert';

  return (
    <aside
      role="note"
      className={[
        'rounded-2xl border-2 px-5 py-4',
        isAlert
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-accent-50 border-accent-200 text-accent-900',
      ].join(' ')}
      aria-label="Recomendación orientativa"
    >
      <p className="text-sm font-semibold mb-2">
        {isAlert ? '⚠️ Orientación' : 'ℹ️ Información'}
      </p>
      <p className="text-sm leading-relaxed">{recommendation.message}</p>
    </aside>
  );
}

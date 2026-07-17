import type {
  ContractionAnalysis,
  ContractionAnalysisColor,
} from '@/types/contractionAnalysis';

interface RecommendationBannerProps {
  analysis: ContractionAnalysis;
}

const colorStyles: Record<ContractionAnalysisColor, string> = {
  neutral: 'bg-primary-50 border-primary-200 text-primary-800',
  info: 'bg-accent-50 border-accent-200 text-accent-900',
  caution: 'bg-blue-50 border-blue-200 text-blue-900',
  warning: 'bg-amber-50 border-amber-200 text-amber-900',
  urgent: 'bg-red-50 border-red-200 text-red-900',
};

export function RecommendationBanner({ analysis }: RecommendationBannerProps) {
  return (
    <aside
      role="note"
      className={[
        'rounded-2xl border-2 px-5 py-4',
        colorStyles[analysis.color],
      ].join(' ')}
      aria-label="Recomendación orientativa"
    >
      <p className="text-sm font-semibold mb-2">
        {analysis.icon} {analysis.title}
      </p>
      <p className="text-sm leading-relaxed">{analysis.message}</p>
    </aside>
  );
}

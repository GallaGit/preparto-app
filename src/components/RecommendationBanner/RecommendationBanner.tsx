import type { AssessmentColor, AssessmentResult } from '@/types/assessment';
import type {
  ContractionAnalysis,
  ContractionAnalysisColor,
} from '@/types/contractionAnalysis';

type BannerModel = {
  title: string;
  message: string;
  color: AssessmentColor | ContractionAnalysisColor;
  icon: string;
};

interface RecommendationBannerProps {
  analysis?: ContractionAnalysis | null;
  assessment?: AssessmentResult | null;
}

const colorStyles: Record<AssessmentColor, string> = {
  neutral: 'bg-primary-50 border-primary-200 text-primary-900',
  info: 'bg-sky-50 border-sky-300 text-sky-950',
  caution: 'bg-blue-50 border-blue-300 text-blue-950',
  warning: 'bg-amber-50 border-amber-400 text-amber-950',
  urgent: 'bg-red-100 border-red-500 text-red-950',
};

function toBannerModel(
  assessment?: AssessmentResult | null,
  analysis?: ContractionAnalysis | null,
): BannerModel | null {
  if (assessment) {
    return {
      title: assessment.classification,
      message: `${assessment.recommendation} ${assessment.explanation} ${assessment.disclaimer}`,
      color: assessment.color,
      icon: assessment.icon,
    };
  }

  if (analysis) {
    return {
      title: analysis.title,
      message: analysis.message,
      color: analysis.color,
      icon: analysis.icon,
    };
  }

  return null;
}

export function RecommendationBanner({
  analysis,
  assessment,
}: RecommendationBannerProps) {
  const model = toBannerModel(assessment, analysis);
  if (!model) {
    return null;
  }

  return (
    <aside
      role="note"
      className={[
        'rounded-2xl border-2 px-5 py-4',
        colorStyles[model.color],
      ].join(' ')}
      aria-label="Recomendación orientativa"
      aria-live="polite"
    >
      <p className="text-sm font-semibold mb-2">
        {model.icon} {model.title}
      </p>
      <p className="text-sm leading-relaxed">{model.message}</p>
    </aside>
  );
}

import { IconCircle } from '@/components/Icon/IconCircle';
import { useI18n } from '@/i18n/I18nProvider';
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
  neutral: 'glass-banner text-on-surface',
  info: 'glass-banner text-on-surface',
  caution: 'border border-primary-400/50 bg-primary-100/80 text-on-surface',
  warning:
    'border border-amber-500/60 bg-amber-50 text-amber-950',
  urgent:
    'border border-error bg-error-container text-error-on-container',
};

const iconVariant: Record<
  AssessmentColor,
  'default' | 'banner' | 'urgent'
> = {
  neutral: 'banner',
  info: 'banner',
  caution: 'banner',
  warning: 'default',
  urgent: 'urgent',
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
  const { t } = useI18n();
  const model = toBannerModel(assessment, analysis);
  if (!model) {
    return null;
  }

  return (
    <aside
      role="note"
      className={[
        'flex gap-3 rounded-2xl px-5 py-4',
        colorStyles[model.color],
      ].join(' ')}
      aria-label={t('recommendation.ariaLabel')}
      aria-live="polite"
    >
      <IconCircle name={model.icon} variant={iconVariant[model.color]} />
      <div className="min-w-0 flex-1">
        <p className="mb-1 text-sm font-semibold">{model.title}</p>
        <p className="text-sm leading-relaxed text-on-surface-variant">
          {model.message}
        </p>
      </div>
    </aside>
  );
}

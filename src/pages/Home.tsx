import { Card } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { RecommendationBanner } from '@/components/RecommendationBanner';
import { NAV_ITEMS } from '@/data/navigation';
import { useAssessment } from '@/hooks/useAssessment';
import { useI18n } from '@/i18n/I18nProvider';
import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/formatDuration';

export function Home() {
  const { isRunning, duration } = useTimer();
  const { assessment } = useAssessment();
  const { t } = useI18n();

  return (
    <Layout>
      <PageHeader
        title="🤰 PreParto"
        subtitle={t('home.subtitle')}
        centered
      />

      <div className="mb-8">
        <RecommendationBanner assessment={assessment} />
      </div>

      <nav aria-label="Navegación principal">
        <ul className="flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <Card
                to={item.path}
                icon={item.icon}
                label={t(item.labelKey)}
                badge={
                  item.path === '/contractions' && isRunning ? (
                    <span className="text-sm font-medium text-accent-700">
                      En curso · {formatDuration(duration)}
                    </span>
                  ) : undefined
                }
              />
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mt-12 text-center">
        <p className="text-sm text-primary-500 leading-relaxed">
          {t('home.disclaimer')}
        </p>
      </footer>
    </Layout>
  );
}

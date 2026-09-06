import { Link } from 'react-router-dom';
import { Card } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { RecommendationBanner } from '@/components/RecommendationBanner';
import { PRIVACY_PATH } from '@/data/legal';
import { NAV_ITEMS } from '@/data/navigation';
import { useAssessment } from '@/hooks/useAssessment';
import { useI18n } from '@/i18n/I18nProvider';
import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/formatDuration';

const GRID_PATHS = new Set(['/emergency', '/settings']);

export function Home() {
  const { isRunning, duration } = useTimer();
  const { assessment } = useAssessment();
  const { t } = useI18n();

  const listItems = NAV_ITEMS.filter((item) => !GRID_PATHS.has(item.path));
  const gridItems = NAV_ITEMS.filter((item) => GRID_PATHS.has(item.path));

  return (
    <Layout>
      <PageHeader title="PreParto" subtitle={t('home.subtitle')} centered />

      <div className="mb-8">
        <RecommendationBanner assessment={assessment} />
      </div>

      <nav aria-label={t('home.navAria')} className="flex flex-col gap-4">
        <ul className="flex flex-col gap-4">
          {listItems.map((item) => (
            <li key={item.path}>
              <Card
                to={item.path}
                icon={item.icon}
                label={t(item.labelKey)}
                badge={
                  item.path === '/contractions' && isRunning ? (
                    <span className="inline-flex w-fit rounded-full bg-primary-container/60 px-2.5 py-0.5 text-xs font-medium text-primary-on-container">
                      {t('home.timerInProgress', {
                        time: formatDuration(duration),
                      })}
                    </span>
                  ) : undefined
                }
              />
            </li>
          ))}
        </ul>

        <ul className="grid grid-cols-2 gap-3">
          {gridItems.map((item) => (
            <li key={item.path}>
              <Card
                to={item.path}
                icon={item.icon}
                label={t(item.labelKey)}
                compact
              />
            </li>
          ))}
        </ul>
      </nav>

      <footer className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-sm leading-relaxed text-on-surface-variant">
          {t('home.disclaimer')}
        </p>
        <Link
          to={PRIVACY_PATH}
          className="text-sm font-medium text-primary underline underline-offset-2 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          {t('settings.privacy')}
        </Link>
      </footer>
    </Layout>
  );
}

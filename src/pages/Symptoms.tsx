import { Card } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { SYMPTOM_CATALOG } from '@/data/symptomOptions';
import { useI18n } from '@/i18n/I18nProvider';

export function Symptoms() {
  const { t } = useI18n();
  return (
    <Layout>
      <PageHeader
        title={t('symptoms.title')}
        subtitle={t('symptoms.subtitle')}
        backTo="/"
      />

      <nav className="flex flex-col gap-3" aria-label={t('symptoms.navAria')}>
        {SYMPTOM_CATALOG.filter((item) => item.hubVisible).map((item) => (
          <Card
            key={item.type}
            to={item.path}
            icon={item.icon}
            label={t(item.labelKey)}
          />
        ))}
      </nav>

      <p className="mt-8 text-center text-sm text-on-surface-variant">
        {t('symptoms.contractionsHint')}
      </p>
    </Layout>
  );
}

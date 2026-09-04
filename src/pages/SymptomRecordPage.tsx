import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { SymptomForm } from '@/components/symptoms';
import { getSymptomCatalogItem } from '@/data/symptomOptions';
import { useSymptoms } from '@/hooks/useSymptoms';
import { useI18n } from '@/i18n/I18nProvider';
import type { SymptomType } from '@/types/symptom';

interface SymptomRecordPageProps {
  type: SymptomType;
  backTo?: string;
}

export function SymptomRecordPage({
  type,
  backTo = '/symptoms',
}: SymptomRecordPageProps) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const catalog = getSymptomCatalogItem(type);
  const { isSaving, error, fieldErrors, saveSymptom } = useSymptoms();

  return (
    <Layout>
      <PageHeader
        title={
          catalog ? t(catalog.labelKey) : t('symptoms.recordFallbackTitle')
        }
        subtitle={t('symptoms.recordSubtitle')}
        backTo={backTo}
      />

      <SymptomForm
        type={type}
        isSaving={isSaving}
        error={error}
        fieldErrors={fieldErrors}
        onSubmit={async (raw) => {
          const ok = await saveSymptom(type, raw);
          if (ok) {
            window.setTimeout(() => {
              void navigate(backTo);
            }, 700);
          }
          return ok;
        }}
      />
    </Layout>
  );
}

import { useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { RecommendationBanner } from '@/components/RecommendationBanner';
import { HistoryFilters, HistoryTimeline } from '@/components/history';
import { useAssessment } from '@/hooks/useAssessment';
import { useContractions } from '@/hooks/useContractions';
import { useI18n } from '@/i18n/I18nProvider';
import { usePregnancySettings } from '@/hooks/usePregnancySettings';
import { useSymptoms } from '@/hooks/useSymptoms';
import type { HistoryFilterType } from '@/types/history';
import { downloadTextFile } from '@/utils/downloadFile';
import {
  buildHistoryExportPayload,
  canUseWebShare,
  historyExportToJson,
  historyExportToPlainText,
  shareHistoryText,
} from '@/utils/historyExport';
import { buildTimeline } from '@/utils/historyTimeline';

export function History() {
  const { contractions, isLoading: contractionsLoading } = useContractions();
  const { symptoms, isLoading: symptomsLoading } = useSymptoms();
  const { profile } = usePregnancySettings();
  const { assessment } = useAssessment();
  const { t } = useI18n();
  const [day, setDay] = useState('');
  const [type, setType] = useState<HistoryFilterType>('all');
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const items = useMemo(
    () =>
      buildTimeline(symptoms, contractions, {
        day: day || null,
        type,
      }),
    [symptoms, contractions, day, type],
  );

  const isLoading = contractionsLoading || symptomsLoading;

  const exportPayload = useMemo(
    () =>
      buildHistoryExportPayload({
        symptoms,
        contractions,
        pregnancy: profile,
      }),
    [symptoms, contractions, profile],
  );

  function stamp(): string {
    return new Date().toISOString().slice(0, 10);
  }

  function handleDownloadJson() {
    downloadTextFile(
      `preparto-historial-${stamp()}.json`,
      historyExportToJson(exportPayload),
      'application/json;charset=utf-8',
    );
    setExportMessage('JSON descargado.');
  }

  function handleDownloadText() {
    downloadTextFile(
      `preparto-historial-${stamp()}.txt`,
      historyExportToPlainText(exportPayload),
    );
    setExportMessage('Texto descargado.');
  }

  async function handleShare() {
    const text = historyExportToPlainText(exportPayload);
    const shared = await shareHistoryText(text);
    setExportMessage(
      shared
        ? 'Historial compartido.'
        : 'No se pudo compartir. Usa la descarga de texto o JSON.',
    );
  }

  return (
    <Layout>
      <PageHeader
        title={t('history.title')}
        subtitle={t('history.subtitle')}
        backTo="/"
      />

      <div className="mt-6 flex flex-col gap-6">
        <RecommendationBanner assessment={assessment} />

        <section
          className="flex flex-col gap-3"
          aria-label={t('history.export')}
        >
          <h2 className="text-lg font-semibold text-primary-800">
            {t('history.export')}
          </h2>
          <p className="text-sm text-primary-600">{t('history.exportHint')}</p>
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleDownloadJson}
            >
              {t('history.downloadJson')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleDownloadText}
            >
              {t('history.downloadText')}
            </Button>
            {canUseWebShare() ? (
              <Button type="button" fullWidth onClick={() => void handleShare()}>
                {t('history.share')}
              </Button>
            ) : null}
          </div>
          {exportMessage ? (
            <p className="text-sm text-accent-700" role="status">
              {exportMessage}
            </p>
          ) : null}
        </section>

        <HistoryFilters
          day={day}
          type={type}
          onDayChange={setDay}
          onTypeChange={setType}
        />

        {isLoading ? (
          <p role="status" className="text-primary-700">
            {t('history.loading')}
          </p>
        ) : (
          <HistoryTimeline items={items} />
        )}
      </div>
    </Layout>
  );
}

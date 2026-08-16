import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Modal';
import { PageHeader } from '@/components/PageHeader';
import { RecommendationBanner } from '@/components/RecommendationBanner';
import { HistoryFilters, HistoryTimeline } from '@/components/history';
import { useAssessment } from '@/hooks/useAssessment';
import { useContractions } from '@/hooks/useContractions';
import { useI18n } from '@/i18n/I18nProvider';
import { usePregnancySettings } from '@/hooks/usePregnancySettings';
import { useSymptoms } from '@/hooks/useSymptoms';
import type { HistoryFilterType } from '@/types/history';
import {
  buildHistoryExportPayload,
  downloadHistoryPdf,
  historyExportToPlainText,
  shareViaGmail,
  shareViaWhatsApp,
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
  const [shareOpen, setShareOpen] = useState(false);

  const closeShare = useCallback(() => setShareOpen(false), []);

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

  function handleShareWhatsApp() {
    try {
      shareViaWhatsApp(historyExportToPlainText(exportPayload));
      setExportMessage(t('history.msgWhatsAppOpened'));
      setShareOpen(false);
    } catch {
      setExportMessage(t('history.msgShareFailed'));
    }
  }

  function handleShareGmail() {
    try {
      shareViaGmail(
        'Historial PreParto',
        historyExportToPlainText(exportPayload),
      );
      setExportMessage(t('history.msgGmailOpened'));
      setShareOpen(false);
    } catch {
      setExportMessage(t('history.msgShareFailed'));
    }
  }

  function handleDownloadPdf() {
    downloadHistoryPdf(`preparto-historial-${stamp()}.pdf`, exportPayload);
    setExportMessage(t('history.msgPdfDownloaded'));
    setShareOpen(false);
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
          <Button type="button" fullWidth onClick={() => setShareOpen(true)}>
            {t('history.share')}
          </Button>
          {exportMessage ? (
            <p className="text-sm text-accent-700" role="status">
              {exportMessage}
            </p>
          ) : null}
        </section>

        <Modal
          open={shareOpen}
          onClose={closeShare}
          title={t('history.shareModalTitle')}
          closeLabel={t('history.modalClose')}
        >
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleShareWhatsApp}
            >
              {t('history.shareWhatsApp')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={handleShareGmail}
            >
              {t('history.shareGmail')}
            </Button>
            <Button type="button" fullWidth onClick={handleDownloadPdf}>
              {t('history.downloadPdf')}
            </Button>
          </div>
        </Modal>

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

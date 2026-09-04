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
  const {
    contractions,
    isLoading: contractionsLoading,
    clearHistory,
  } = useContractions();
  const {
    symptoms,
    isLoading: symptomsLoading,
    clearAll: clearSymptoms,
  } = useSymptoms();
  const { profile } = usePregnancySettings();
  const { assessment } = useAssessment();
  const { t, locale } = useI18n();
  const [day, setDay] = useState('');
  const [type, setType] = useState<HistoryFilterType>('all');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [shareOpen, setShareOpen] = useState(false);
  const [clearOpen, setClearOpen] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const closeShare = useCallback(() => setShareOpen(false), []);
  const closeClear = useCallback(() => setClearOpen(false), []);

  const items = useMemo(
    () =>
      buildTimeline(symptoms, contractions, {
        day: day || null,
        type,
      }),
    [symptoms, contractions, day, type],
  );

  const isLoading = contractionsLoading || symptomsLoading;
  const hasRecords = contractions.length > 0 || symptoms.length > 0;

  const exportPayload = useMemo(
    () =>
      buildHistoryExportPayload({
        symptoms,
        contractions,
        pregnancy: profile,
        locale,
      }),
    [symptoms, contractions, profile, locale],
  );

  function stamp(): string {
    return new Date().toISOString().slice(0, 10);
  }

  function handleShareWhatsApp() {
    try {
      shareViaWhatsApp(historyExportToPlainText(exportPayload));
      setStatusMessage(t('history.msgWhatsAppOpened'));
      setShareOpen(false);
    } catch {
      setStatusMessage(t('history.msgShareFailed'));
    }
  }

  function handleShareGmail() {
    try {
      shareViaGmail(
        t('history.exportEmailSubject'),
        historyExportToPlainText(exportPayload),
      );
      setStatusMessage(t('history.msgGmailOpened'));
      setShareOpen(false);
    } catch {
      setStatusMessage(t('history.msgShareFailed'));
    }
  }

  function handleDownloadPdf() {
    downloadHistoryPdf(`preparto-historial-${stamp()}.pdf`, exportPayload);
    setStatusMessage(t('history.msgPdfDownloaded'));
    setShareOpen(false);
  }

  async function handleConfirmClear() {
    setIsClearing(true);
    try {
      const [contractionsOk, symptomsOk] = await Promise.all([
        clearHistory(),
        clearSymptoms(),
      ]);
      setStatusMessage(
        contractionsOk && symptomsOk
          ? t('history.msgCleared')
          : t('history.msgClearFailed'),
      );
      setClearOpen(false);
    } catch {
      setStatusMessage(t('history.msgClearFailed'));
    } finally {
      setIsClearing(false);
    }
  }

  return (
    <Layout>
      <PageHeader
        title={t('history.title')}
        subtitle={t('history.subtitle')}
        large
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
          <Button
            type="button"
            variant="danger"
            fullWidth
            disabled={!hasRecords || isClearing}
            onClick={() => setClearOpen(true)}
          >
            {t('history.clear')}
          </Button>
          {statusMessage ? (
            <p className="text-sm text-accent-700" role="status">
              {statusMessage}
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

        <Modal
          open={clearOpen}
          onClose={closeClear}
          title={t('history.clearConfirmTitle')}
          closeLabel={t('history.modalClose')}
        >
          <div className="flex flex-col gap-4">
            <p className="text-sm leading-relaxed text-on-surface-variant">
              {t('history.clearConfirmMessage')}
            </p>
            <div className="flex flex-col gap-3">
              <Button
                type="button"
                variant="danger"
                fullWidth
                disabled={isClearing}
                onClick={() => void handleConfirmClear()}
              >
                {t('history.clearConfirm')}
              </Button>
              <Button
                type="button"
                variant="secondary"
                fullWidth
                disabled={isClearing}
                onClick={closeClear}
              >
                {t('history.clearCancel')}
              </Button>
            </div>
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

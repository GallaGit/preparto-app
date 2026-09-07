import { useCallback, useState } from 'react';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { hapticNotification } from '@/native/haptics';
import { useI18n } from '@/i18n/I18nProvider';
import { deleteAllUserData } from '@/services/userData';

export function DeleteAllDataSection() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const close = useCallback(() => {
    if (!busy) {
      setOpen(false);
    }
  }, [busy]);

  async function handleConfirm() {
    setBusy(true);
    setStatus(null);
    try {
      await deleteAllUserData();
      await hapticNotification('warning');
      setStatus(t('privacy.deleteDone'));
      setOpen(false);
      window.location.reload();
    } catch {
      setStatus(t('privacy.deleteFailed'));
      setBusy(false);
    }
  }

  return (
    <section
      className="flex flex-col gap-4"
      aria-labelledby="delete-data-heading"
    >
      <h2
        id="delete-data-heading"
        className="text-lg font-semibold text-primary-800"
      >
        {t('privacy.deleteSection')}
      </h2>
      <p className="text-sm leading-relaxed text-primary-600">
        {t('privacy.deleteBody')}
      </p>
      <Button
        type="button"
        variant="danger"
        fullWidth
        onClick={() => setOpen(true)}
      >
        {t('privacy.deleteButton')}
      </Button>
      {status ? (
        <p className="text-sm text-accent-700" role="status">
          {status}
        </p>
      ) : null}

      <Modal
        open={open}
        onClose={close}
        title={t('privacy.deleteTitle')}
        closeLabel={t('common.close')}
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-on-surface-variant">
            {t('privacy.deleteBody')}
          </p>
          <div className="flex flex-col gap-3">
            <Button
              type="button"
              variant="danger"
              fullWidth
              disabled={busy}
              onClick={() => void handleConfirm()}
            >
              {t('privacy.deleteConfirm')}
            </Button>
            <Button
              type="button"
              variant="secondary"
              fullWidth
              disabled={busy}
              onClick={close}
            >
              {t('privacy.deleteCancel')}
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}

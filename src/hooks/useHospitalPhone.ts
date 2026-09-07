import { useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import * as settingsStorage from '@/services/settingsStorage';

export function useHospitalPhone() {
  const { t } = useI18n();
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await settingsStorage.getHospitalPhone();
      setPhone(stored);
      setError(null);
    } catch {
      setError(t('errors.hospitalPhone.load'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const savePhone = useCallback(
    async (next: string) => {
      setIsSaving(true);
      setError(null);
      try {
        await settingsStorage.saveHospitalPhone(next);
        setPhone(next.trim());
        return true;
      } catch {
        setError(t('errors.hospitalPhone.save'));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [t],
  );

  return {
    phone,
    isLoading,
    isSaving,
    error,
    savePhone,
    reload: load,
  };
}

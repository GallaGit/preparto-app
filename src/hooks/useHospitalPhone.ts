import { useCallback, useEffect, useState } from 'react';
import * as settingsStorage from '@/services/settingsStorage';

export function useHospitalPhone() {
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
      setError('No se pudo cargar el teléfono del hospital.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const savePhone = useCallback(async (next: string) => {
    setIsSaving(true);
    setError(null);
    try {
      await settingsStorage.saveHospitalPhone(next);
      setPhone(next.trim());
      return true;
    } catch {
      setError('No se pudo guardar el teléfono del hospital.');
      return false;
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    phone,
    isLoading,
    isSaving,
    error,
    savePhone,
    reload: load,
  };
}

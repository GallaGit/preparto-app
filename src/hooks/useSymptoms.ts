import { useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import { translate } from '@/i18n/translate';
import * as symptomsStorage from '@/services/symptomsStorage';
import type {
  SymptomFieldErrors,
  SymptomInputByType,
  SymptomRecord,
  SymptomType,
} from '@/types/symptom';
import { validateNoDuplicateWaterBreak } from '@/utils/clinicalValidation';
import {
  createSymptom,
  SymptomValidationError,
} from '@/utils/createSymptom';

export function useSymptoms() {
  const { locale } = useI18n();
  const [symptoms, setSymptoms] = useState<SymptomRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<SymptomFieldErrors>({});

  const loadSymptoms = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await symptomsStorage.getAll();
      setSymptoms(data);
      setError(null);
    } catch {
      setError(translate(locale, 'errors.symptoms.load'));
    } finally {
      setIsLoading(false);
    }
  }, [locale]);

  useEffect(() => {
    void loadSymptoms();
  }, [loadSymptoms]);

  const saveSymptom = useCallback(
    async <T extends SymptomType>(
      type: T,
      raw: SymptomInputByType[T],
      options?: { id?: string },
    ): Promise<boolean> => {
      setIsSaving(true);
      setError(null);
      setFieldErrors({});

      try {
        const existing = await symptomsStorage.getAll();
        const clinical = validateNoDuplicateWaterBreak(
          type,
          existing,
          { editingId: options?.id },
          locale,
        );
        if (!clinical.ok) {
          setError(clinical.message);
          return false;
        }

        const symptom = createSymptom(type, raw, { id: options?.id, locale });
        await symptomsStorage.save(symptom);
        await loadSymptoms();
        return true;
      } catch (err) {
        if (err instanceof SymptomValidationError) {
          setFieldErrors(err.errors);
          setError(translate(locale, 'errors.formReview'));
          return false;
        }

        setError(translate(locale, 'errors.symptoms.save'));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [loadSymptoms, locale],
  );

  const deleteSymptom = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await symptomsStorage.deleteById(id);
        await loadSymptoms();
        setError(null);
        return true;
      } catch {
        setError(translate(locale, 'errors.symptoms.delete'));
        return false;
      }
    },
    [loadSymptoms, locale],
  );

  const getSymptomById = useCallback(async (id: string) => {
    return symptomsStorage.getById(id);
  }, []);

  const clearFeedback = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  const clearAll = useCallback(async (): Promise<boolean> => {
    try {
      await symptomsStorage.clear();
      await loadSymptoms();
      setError(null);
      return true;
    } catch {
      setError(translate(locale, 'errors.symptoms.clear'));
      return false;
    }
  }, [loadSymptoms, locale]);

  return {
    symptoms,
    isLoading,
    isSaving,
    error,
    fieldErrors,
    saveSymptom,
    deleteSymptom,
    getSymptomById,
    loadSymptoms,
    clearFeedback,
    clearAll,
  };
}

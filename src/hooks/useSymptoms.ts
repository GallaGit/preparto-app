import { useCallback, useState } from 'react';
import * as symptomsStorage from '@/services/symptomsStorage';
import type {
  SymptomFieldErrors,
  SymptomInputByType,
  SymptomType,
} from '@/types/symptom';
import {
  createSymptom,
  SymptomValidationError,
} from '@/utils/createSymptom';

export function useSymptoms() {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<SymptomFieldErrors>({});

  const saveSymptom = useCallback(
    async <T extends SymptomType>(
      type: T,
      raw: SymptomInputByType[T],
    ): Promise<boolean> => {
      setIsSaving(true);
      setError(null);
      setFieldErrors({});

      try {
        const symptom = createSymptom(type, raw);
        await symptomsStorage.save(symptom);
        return true;
      } catch (err) {
        if (err instanceof SymptomValidationError) {
          setFieldErrors(err.errors);
          setError('Revisa los campos del formulario.');
          return false;
        }

        setError('No se pudo guardar el registro.');
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [],
  );

  const clearFeedback = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

  return {
    isSaving,
    error,
    fieldErrors,
    saveSymptom,
    clearFeedback,
  };
}

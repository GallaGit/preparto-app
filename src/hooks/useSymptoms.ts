import { useCallback, useEffect, useState } from 'react';
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
      setError('No se pudo cargar el historial de síntomas.');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
        const clinical = validateNoDuplicateWaterBreak(type, existing, {
          editingId: options?.id,
        });
        if (!clinical.ok) {
          setError(clinical.message);
          return false;
        }

        const symptom = createSymptom(type, raw, { id: options?.id });
        await symptomsStorage.save(symptom);
        await loadSymptoms();
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
    [loadSymptoms],
  );

  const deleteSymptom = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        await symptomsStorage.deleteById(id);
        await loadSymptoms();
        setError(null);
        return true;
      } catch {
        setError('No se pudo eliminar el registro.');
        return false;
      }
    },
    [loadSymptoms],
  );

  const getSymptomById = useCallback(async (id: string) => {
    return symptomsStorage.getById(id);
  }, []);

  const clearFeedback = useCallback(() => {
    setError(null);
    setFieldErrors({});
  }, []);

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
  };
}

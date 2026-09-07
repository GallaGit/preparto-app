import { useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import * as settingsStorage from '@/services/settingsStorage';
import type {
  PregnancyFieldErrors,
  PregnancyProfile,
  PregnancyProfileInput,
} from '@/types/pregnancy';
import { DEFAULT_COUNTRY } from '@/types/pregnancy';
import { deriveGestationalWeek } from '@/utils/pregnancyHelpers';
import { validatePregnancyInput } from '@/utils/pregnancyValidation';

export class PregnancyValidationError extends Error {
  readonly errors: PregnancyFieldErrors;

  constructor(errors: PregnancyFieldErrors) {
    super('Pregnancy validation failed');
    this.name = 'PregnancyValidationError';
    this.errors = errors;
  }
}

export function usePregnancySettings() {
  const { t } = useI18n();
  const [profile, setProfile] = useState<PregnancyProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<PregnancyFieldErrors>({});

  const load = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await settingsStorage.getPregnancyProfile();
      setProfile(data);
      setError(null);
    } catch {
      setError(t('errors.settings.load'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  const saveProfile = useCallback(
    async (input: PregnancyProfileInput) => {
      setIsSaving(true);
      setError(null);
      setFieldErrors({});

      try {
        const validation = validatePregnancyInput(input);
        if (!validation.ok) {
          throw new PregnancyValidationError(validation.errors);
        }

        const gestationalWeek =
          input.gestationalWeek ?? deriveGestationalWeek(input.dueDate);

        const next: PregnancyProfile = {
          dueDate: input.dueDate,
          gestationalWeek,
          pregnancyType: input.pregnancyType,
          isFirstPregnancy: input.isFirstPregnancy,
          country: input.country.trim().toUpperCase() || DEFAULT_COUNTRY,
          updatedAt: new Date().toISOString(),
        };

        await settingsStorage.savePregnancyProfile(next);
        setProfile(next);
        return true;
      } catch (err) {
        if (err instanceof PregnancyValidationError) {
          setFieldErrors(err.errors);
          setError(t('errors.formReview'));
          return false;
        }
        setError(t('errors.settings.save'));
        return false;
      } finally {
        setIsSaving(false);
      }
    },
    [t],
  );

  return {
    profile,
    isLoading,
    isSaving,
    error,
    fieldErrors,
    saveProfile,
    reload: load,
  };
}

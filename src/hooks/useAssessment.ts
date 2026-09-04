import { useEffect, useMemo, useState } from 'react';
import { evaluate } from '@/services/assessmentEngine';
import * as settingsStorage from '@/services/settingsStorage';
import type { AssessmentResult } from '@/types/assessment';
import type { PregnancyProfile } from '@/types/pregnancy';
import { useContractions } from '@/hooks/useContractions';
import { useI18n } from '@/i18n/I18nProvider';
import { useSymptoms } from '@/hooks/useSymptoms';

export function useAssessment() {
  const { contractions, isLoading: contractionsLoading } = useContractions();
  const { symptoms, isLoading: symptomsLoading } = useSymptoms();
  const { locale } = useI18n();
  const [pregnancy, setPregnancy] = useState<PregnancyProfile | null>(null);

  useEffect(() => {
    let cancelled = false;
    void settingsStorage.getPregnancyProfile().then((profile) => {
      if (!cancelled) {
        setPregnancy(profile);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const assessment: AssessmentResult = useMemo(
    () =>
      evaluate({
        contractions,
        symptoms,
        pregnancy,
        locale,
      }),
    [contractions, symptoms, pregnancy, locale],
  );

  return {
    assessment,
    isLoading: contractionsLoading || symptomsLoading,
  };
}

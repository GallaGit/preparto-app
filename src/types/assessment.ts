import type { Locale } from '@/i18n/types';
import type { Contraction } from '@/types/contraction';
import type { PregnancyProfile } from '@/types/pregnancy';
import type { SymptomRecord } from '@/types/symptom';

export type AssessmentLevel = 0 | 1 | 2 | 3 | 4;

export type AssessmentColor =
  | 'neutral'
  | 'info'
  | 'caution'
  | 'warning'
  | 'urgent';

export type AssessmentAction =
  | 'continue_observing'
  | 'rest'
  | 'hydrate'
  | 'keep_recording'
  | 'contact_midwife'
  | 'go_to_hospital';

export type MatchedRule = {
  id: string;
  sourceRef: string;
  explanation: string;
};

export type AssessmentInput = {
  contractions: Contraction[];
  symptoms: SymptomRecord[];
  pregnancy?: PregnancyProfile | null;
  now?: Date;
  locale?: Locale;
};

export type AssessmentResult = {
  level: AssessmentLevel;
  classification: string;
  recommendation: string;
  explanation: string;
  actions: AssessmentAction[];
  matchedRules: MatchedRule[];
  color: AssessmentColor;
  icon: string;
  disclaimer: string;
};

export type PregnancyType = 'single' | 'multiple';

export type PregnancyProfile = {
  dueDate: string; // YYYY-MM-DD
  gestationalWeek: number;
  pregnancyType: PregnancyType;
  isFirstPregnancy: boolean;
  country: string;
  updatedAt: string; // ISO
};

export type PregnancyProfileInput = {
  dueDate: string;
  gestationalWeek?: number;
  pregnancyType: PregnancyType;
  isFirstPregnancy: boolean;
  country: string;
};

export type PregnancyFieldErrors = Partial<
  Record<'dueDate' | 'gestationalWeek' | 'pregnancyType' | 'country', string>
>;

export type PregnancyValidationResult =
  | { ok: true }
  | { ok: false; errors: PregnancyFieldErrors };

export const DEFAULT_COUNTRY = 'ES';

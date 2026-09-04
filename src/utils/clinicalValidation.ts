import { translate } from '@/i18n/translate';
import type { Locale } from '@/i18n/types';
import type { SymptomRecord, SymptomType } from '@/types/symptom';

export type ClinicalValidationResult =
  | { ok: true }
  | { ok: false; message: string };

/** Block a second water_break unless editing the same record. */
export function validateNoDuplicateWaterBreak(
  type: SymptomType,
  existing: SymptomRecord[],
  options?: { editingId?: string },
  locale: Locale = 'en',
): ClinicalValidationResult {
  if (type !== 'water_break') {
    return { ok: true };
  }

  const duplicate = existing.find(
    (symptom) =>
      symptom.type === 'water_break' && symptom.id !== options?.editingId,
  );

  if (duplicate) {
    return {
      ok: false,
      message: translate(locale, 'validation.waterBreakDuplicate'),
    };
  }

  return { ok: true };
}

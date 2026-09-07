import type {
  PregnancyFieldErrors,
  PregnancyProfileInput,
  PregnancyType,
  PregnancyValidationResult,
} from '@/types/pregnancy';
import { parseDateOnly } from '@/utils/pregnancyHelpers';

const PREGNANCY_TYPES: readonly PregnancyType[] = ['single', 'multiple'];

export function validatePregnancyInput(
  input: PregnancyProfileInput,
): PregnancyValidationResult {
  const errors: PregnancyFieldErrors = {};

  const due = parseDateOnly(input.dueDate);
  if (!due) {
    errors.dueDate = 'validation.dueDate.required';
  } else {
    const max = new Date();
    max.setMonth(max.getMonth() + 10);
    const min = new Date();
    min.setMonth(min.getMonth() - 1);
    if (due.getTime() > max.getTime()) {
      errors.dueDate = 'validation.dueDate.tooFar';
    }
    if (due.getTime() < min.getTime()) {
      errors.dueDate = 'validation.dueDate.tooOld';
    }
  }

  if (
    typeof input.pregnancyType !== 'string' ||
    !PREGNANCY_TYPES.includes(input.pregnancyType)
  ) {
    errors.pregnancyType = 'validation.pregnancyType.required';
  }

  if (typeof input.country !== 'string' || input.country.trim() === '') {
    errors.country = 'validation.country.required';
  } else if (input.country.trim().length !== 2) {
    errors.country = 'validation.country.format';
  }

  if (input.gestationalWeek !== undefined) {
    if (
      typeof input.gestationalWeek !== 'number' ||
      Number.isNaN(input.gestationalWeek) ||
      input.gestationalWeek < 0 ||
      input.gestationalWeek > 42
    ) {
      errors.gestationalWeek = 'validation.gestationalWeek.range';
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true };
}

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
    errors.dueDate = 'La fecha probable de parto es obligatoria.';
  } else {
    const max = new Date();
    max.setMonth(max.getMonth() + 10);
    const min = new Date();
    min.setMonth(min.getMonth() - 1);
    if (due.getTime() > max.getTime()) {
      errors.dueDate = 'La fecha probable de parto parece demasiado lejana.';
    }
    if (due.getTime() < min.getTime()) {
      errors.dueDate = 'La fecha probable de parto parece demasiado antigua.';
    }
  }

  if (
    typeof input.pregnancyType !== 'string' ||
    !PREGNANCY_TYPES.includes(input.pregnancyType)
  ) {
    errors.pregnancyType = 'Selecciona si el embarazo es único o múltiple.';
  }

  if (typeof input.country !== 'string' || input.country.trim() === '') {
    errors.country = 'El país es obligatorio.';
  } else if (input.country.trim().length !== 2) {
    errors.country = 'Usa el código de país de 2 letras (ej. ES).';
  }

  if (input.gestationalWeek !== undefined) {
    if (
      typeof input.gestationalWeek !== 'number' ||
      Number.isNaN(input.gestationalWeek) ||
      input.gestationalWeek < 0 ||
      input.gestationalWeek > 42
    ) {
      errors.gestationalWeek = 'La semana gestacional debe estar entre 0 y 42.';
    }
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true };
}

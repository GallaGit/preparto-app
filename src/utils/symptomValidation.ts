import type {
  AmountLevel,
  BleedingColor,
  FetalMovementFrequency,
  FluidColor,
  IntensityLevel,
  MucusColor,
  OdorLevel,
  SymptomFieldErrors,
  SymptomInputByType,
  SymptomType,
  SymptomValidationResult,
} from '@/types/symptom';

const AMOUNTS: readonly AmountLevel[] = ['scarce', 'moderate', 'abundant'];
const MUCUS_COLORS: readonly MucusColor[] = [
  'clear',
  'white',
  'pink',
  'brown',
  'bloody',
  'other',
];
const FLUID_COLORS: readonly FluidColor[] = [
  'clear',
  'yellowish',
  'greenish',
  'brown',
  'bloody',
  'other',
];
const ODORS: readonly OdorLevel[] = ['none', 'mild', 'strong', 'unpleasant'];
const BLEEDING_COLORS: readonly BleedingColor[] = [
  'pink',
  'bright_red',
  'brown',
  'other',
];
const FREQUENCIES: readonly FetalMovementFrequency[] = [
  'less',
  'same',
  'more',
  'absent',
];

const FUTURE_SKEW_MS = 2 * 60 * 1000;
const MAX_DURATION_MINUTES = 24 * 60;
const MAX_EPISODES = 50;

function isInList<T extends string>(
  value: unknown,
  list: readonly T[],
): value is T {
  return typeof value === 'string' && (list as readonly string[]).includes(value);
}

function parseRecordedAt(value: unknown, errors: SymptomFieldErrors): void {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.recordedAt = 'La fecha y hora son obligatorias.';
    return;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    errors.recordedAt = 'La fecha u hora no es válida.';
    return;
  }

  if (date.getTime() > Date.now() + FUTURE_SKEW_MS) {
    errors.recordedAt = 'La fecha y hora no pueden ser futuras.';
  }
}

function parseIntensity(value: unknown, errors: SymptomFieldErrors): void {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    errors.intensity = 'La intensidad es obligatoria.';
    return;
  }

  if (value < 1 || value > 10) {
    errors.intensity = 'La intensidad debe estar entre 1 y 10.';
  }
}

function parsePositiveNumber(
  value: unknown,
  field: string,
  label: string,
  errors: SymptomFieldErrors,
  minimum = 1,
  maximum?: number,
): void {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    errors[field] = `${label} es obligatorio.`;
    return;
  }

  if (value < minimum) {
    errors[field] = `${label} debe ser mayor o igual que ${minimum}.`;
    return;
  }

  if (maximum !== undefined && value > maximum) {
    errors[field] = `${label} no puede ser mayor que ${maximum}.`;
  }
}

function requireSelect<T extends string>(
  value: unknown,
  field: string,
  label: string,
  options: readonly T[],
  errors: SymptomFieldErrors,
): void {
  if (!isInList(value, options)) {
    errors[field] = `${label} es obligatorio.`;
  }
}

export function validateSymptomInput<T extends SymptomType>(
  type: T,
  raw: SymptomInputByType[T],
): SymptomValidationResult {
  const errors: SymptomFieldErrors = {};
  const input = raw as Record<string, unknown>;

  parseRecordedAt(input.recordedAt, errors);

  switch (type) {
    case 'mucus_plug':
      requireSelect(input.amount, 'amount', 'La cantidad', AMOUNTS, errors);
      requireSelect(input.color, 'color', 'El color', MUCUS_COLORS, errors);
      break;
    case 'water_break':
      requireSelect(input.amount, 'amount', 'La cantidad', AMOUNTS, errors);
      requireSelect(input.color, 'color', 'El color', FLUID_COLORS, errors);
      requireSelect(input.odor, 'odor', 'El olor', ODORS, errors);
      break;
    case 'bleeding':
      requireSelect(input.amount, 'amount', 'La cantidad', AMOUNTS, errors);
      requireSelect(input.color, 'color', 'El color', BLEEDING_COLORS, errors);
      break;
    case 'fetal_movement':
      requireSelect(
        input.frequency,
        'frequency',
        'La frecuencia',
        FREQUENCIES,
        errors,
      );
      break;
    case 'back_pain':
      parseIntensity(input.intensity, errors);
      parsePositiveNumber(
        input.durationMinutes,
        'durationMinutes',
        'La duración',
        errors,
        1,
        MAX_DURATION_MINUTES,
      );
      break;
    case 'pelvic_pressure':
    case 'nausea':
      parseIntensity(input.intensity, errors);
      break;
    case 'diarrhea':
      parsePositiveNumber(
        input.episodes,
        'episodes',
        'El número de episodios',
        errors,
        1,
        MAX_EPISODES,
      );
      break;
    case 'chills':
      parsePositiveNumber(
        input.durationMinutes,
        'durationMinutes',
        'La duración',
        errors,
        1,
        MAX_DURATION_MINUTES,
      );
      break;
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return { ok: true };
}

export function isIntensityLevel(value: number): value is IntensityLevel {
  return Number.isInteger(value) && value >= 1 && value <= 10;
}

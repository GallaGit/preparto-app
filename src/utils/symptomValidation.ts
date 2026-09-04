import { translate } from '@/i18n/translate';
import type { Locale, MessageKey } from '@/i18n/types';
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

type TranslateFn = (
  key: MessageKey,
  vars?: Record<string, string | number>,
) => string;

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

function parseRecordedAt(
  value: unknown,
  errors: SymptomFieldErrors,
  t: TranslateFn,
): void {
  if (typeof value !== 'string' || value.trim() === '') {
    errors.recordedAt = t('validation.recordedAt.required');
    return;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    errors.recordedAt = t('validation.recordedAt.invalid');
    return;
  }

  if (date.getTime() > Date.now() + FUTURE_SKEW_MS) {
    errors.recordedAt = t('validation.recordedAt.future');
  }
}

function parseIntensity(
  value: unknown,
  errors: SymptomFieldErrors,
  t: TranslateFn,
): void {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    errors.intensity = t('validation.intensity.required');
    return;
  }

  if (value < 1 || value > 10) {
    errors.intensity = t('validation.intensity.range');
  }
}

function parsePositiveNumber(
  value: unknown,
  field: string,
  label: string,
  errors: SymptomFieldErrors,
  t: TranslateFn,
  minimum = 1,
  maximum?: number,
): void {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    errors[field] = t('validation.required', { field: label });
    return;
  }

  if (value < minimum) {
    errors[field] = t('validation.min', { field: label, min: minimum });
    return;
  }

  if (maximum !== undefined && value > maximum) {
    errors[field] = t('validation.max', { field: label, max: maximum });
  }
}

function requireSelect<T extends string>(
  value: unknown,
  field: string,
  label: string,
  options: readonly T[],
  errors: SymptomFieldErrors,
  t: TranslateFn,
): void {
  if (!isInList(value, options)) {
    errors[field] = t('validation.required', { field: label });
  }
}

export function validateSymptomInput<T extends SymptomType>(
  type: T,
  raw: SymptomInputByType[T],
  locale: Locale = 'en',
): SymptomValidationResult {
  const errors: SymptomFieldErrors = {};
  const input = raw as Record<string, unknown>;
  const t: TranslateFn = (key, vars) => translate(locale, key, vars);
  const amountLabel = t('symptoms.field.amount');
  const colorLabel = t('symptoms.field.color');
  const odorLabel = t('symptoms.field.odor');
  const frequencyLabel = t('symptoms.field.frequency');
  const durationLabel = t('symptoms.field.durationMinutes');
  const episodesLabel = t('symptoms.field.episodes');

  parseRecordedAt(input.recordedAt, errors, t);

  switch (type) {
    case 'mucus_plug':
      requireSelect(input.amount, 'amount', amountLabel, AMOUNTS, errors, t);
      requireSelect(input.color, 'color', colorLabel, MUCUS_COLORS, errors, t);
      break;
    case 'water_break':
      requireSelect(input.amount, 'amount', amountLabel, AMOUNTS, errors, t);
      requireSelect(input.color, 'color', colorLabel, FLUID_COLORS, errors, t);
      requireSelect(input.odor, 'odor', odorLabel, ODORS, errors, t);
      break;
    case 'bleeding':
      requireSelect(input.amount, 'amount', amountLabel, AMOUNTS, errors, t);
      requireSelect(
        input.color,
        'color',
        colorLabel,
        BLEEDING_COLORS,
        errors,
        t,
      );
      break;
    case 'fetal_movement':
      requireSelect(
        input.frequency,
        'frequency',
        frequencyLabel,
        FREQUENCIES,
        errors,
        t,
      );
      break;
    case 'back_pain':
      parseIntensity(input.intensity, errors, t);
      parsePositiveNumber(
        input.durationMinutes,
        'durationMinutes',
        durationLabel,
        errors,
        t,
        1,
        MAX_DURATION_MINUTES,
      );
      break;
    case 'pelvic_pressure':
    case 'nausea':
      parseIntensity(input.intensity, errors, t);
      break;
    case 'diarrhea':
      parsePositiveNumber(
        input.episodes,
        'episodes',
        episodesLabel,
        errors,
        t,
        1,
        MAX_EPISODES,
      );
      break;
    case 'chills':
      parsePositiveNumber(
        input.durationMinutes,
        'durationMinutes',
        durationLabel,
        errors,
        t,
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

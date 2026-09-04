import { translate } from '@/i18n/translate';
import type { Locale } from '@/i18n/types';
import type {
  IntensityLevel,
  SymptomInputByType,
  SymptomRecord,
  SymptomType,
} from '@/types/symptom';
import {
  isIntensityLevel,
  validateSymptomInput,
} from '@/utils/symptomValidation';

function generateId(): string {
  return crypto.randomUUID();
}

function normalizeNotes(notes: string | undefined): string {
  return notes?.trim() ?? '';
}

export class SymptomValidationError extends Error {
  readonly errors: Record<string, string>;

  constructor(errors: Record<string, string>) {
    super('Symptom validation failed');
    this.name = 'SymptomValidationError';
    this.errors = errors;
  }
}

export function createSymptom<T extends SymptomType>(
  type: T,
  raw: SymptomInputByType[T],
  options?: { id?: string; locale?: Locale },
): SymptomRecord {
  const locale = options?.locale ?? 'en';
  const validation = validateSymptomInput(type, raw, locale);
  if (!validation.ok) {
    throw new SymptomValidationError(validation.errors);
  }

  const intensityRangeError = translate(locale, 'validation.intensity.range');

  const base = {
    id: options?.id ?? generateId(),
    recordedAt: new Date(raw.recordedAt),
    notes: normalizeNotes(raw.notes),
  };

  switch (type) {
    case 'mucus_plug': {
      const input = raw as SymptomInputByType['mucus_plug'];
      return {
        ...base,
        type: 'mucus_plug',
        amount: input.amount,
        color: input.color,
      };
    }
    case 'water_break': {
      const input = raw as SymptomInputByType['water_break'];
      return {
        ...base,
        type: 'water_break',
        amount: input.amount,
        color: input.color,
        odor: input.odor,
      };
    }
    case 'bleeding': {
      const input = raw as SymptomInputByType['bleeding'];
      return {
        ...base,
        type: 'bleeding',
        amount: input.amount,
        color: input.color,
      };
    }
    case 'fetal_movement': {
      const input = raw as SymptomInputByType['fetal_movement'];
      return {
        ...base,
        type: 'fetal_movement',
        frequency: input.frequency,
      };
    }
    case 'back_pain': {
      const input = raw as SymptomInputByType['back_pain'];
      if (!isIntensityLevel(input.intensity)) {
        throw new SymptomValidationError({
          intensity: intensityRangeError,
        });
      }
      return {
        ...base,
        type: 'back_pain',
        intensity: input.intensity,
        durationMinutes: input.durationMinutes,
      };
    }
    case 'pelvic_pressure': {
      const input = raw as SymptomInputByType['pelvic_pressure'];
      if (!isIntensityLevel(input.intensity)) {
        throw new SymptomValidationError({
          intensity: intensityRangeError,
        });
      }
      return {
        ...base,
        type: 'pelvic_pressure',
        intensity: input.intensity as IntensityLevel,
      };
    }
    case 'nausea': {
      const input = raw as SymptomInputByType['nausea'];
      if (!isIntensityLevel(input.intensity)) {
        throw new SymptomValidationError({
          intensity: intensityRangeError,
        });
      }
      return {
        ...base,
        type: 'nausea',
        intensity: input.intensity as IntensityLevel,
      };
    }
    case 'diarrhea': {
      const input = raw as SymptomInputByType['diarrhea'];
      return {
        ...base,
        type: 'diarrhea',
        episodes: input.episodes,
      };
    }
    case 'chills': {
      const input = raw as SymptomInputByType['chills'];
      return {
        ...base,
        type: 'chills',
        durationMinutes: input.durationMinutes,
      };
    }
    default: {
      const _exhaustive: never = type;
      return _exhaustive;
    }
  }
}

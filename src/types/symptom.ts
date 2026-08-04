export type SymptomType =
  | 'mucus_plug'
  | 'water_break'
  | 'bleeding'
  | 'fetal_movement'
  | 'back_pain'
  | 'pelvic_pressure'
  | 'nausea'
  | 'diarrhea'
  | 'chills';

export type AmountLevel = 'scarce' | 'moderate' | 'abundant';

export type MucusColor =
  | 'clear'
  | 'white'
  | 'pink'
  | 'brown'
  | 'bloody'
  | 'other';

export type FluidColor =
  | 'clear'
  | 'yellowish'
  | 'greenish'
  | 'brown'
  | 'bloody'
  | 'other';

export type OdorLevel = 'none' | 'mild' | 'strong' | 'unpleasant';

export type BleedingColor = 'pink' | 'bright_red' | 'brown' | 'other';

export type FetalMovementFrequency = 'less' | 'same' | 'more' | 'absent';

export type IntensityLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SymptomBase = {
  id: string;
  type: SymptomType;
  recordedAt: Date;
  notes: string;
};

export type MucusPlugSymptom = SymptomBase & {
  type: 'mucus_plug';
  amount: AmountLevel;
  color: MucusColor;
};

export type WaterBreakSymptom = SymptomBase & {
  type: 'water_break';
  amount: AmountLevel;
  color: FluidColor;
  odor: OdorLevel;
};

export type BleedingSymptom = SymptomBase & {
  type: 'bleeding';
  amount: AmountLevel;
  color: BleedingColor;
};

export type FetalMovementSymptom = SymptomBase & {
  type: 'fetal_movement';
  frequency: FetalMovementFrequency;
};

export type BackPainSymptom = SymptomBase & {
  type: 'back_pain';
  intensity: IntensityLevel;
  durationMinutes: number;
};

export type PelvicPressureSymptom = SymptomBase & {
  type: 'pelvic_pressure';
  intensity: IntensityLevel;
};

export type NauseaSymptom = SymptomBase & {
  type: 'nausea';
  intensity: IntensityLevel;
};

export type DiarrheaSymptom = SymptomBase & {
  type: 'diarrhea';
  episodes: number;
};

export type ChillsSymptom = SymptomBase & {
  type: 'chills';
  durationMinutes: number;
};

export type SymptomRecord =
  | MucusPlugSymptom
  | WaterBreakSymptom
  | BleedingSymptom
  | FetalMovementSymptom
  | BackPainSymptom
  | PelvicPressureSymptom
  | NauseaSymptom
  | DiarrheaSymptom
  | ChillsSymptom;

export type SymptomInputByType = {
  mucus_plug: {
    recordedAt: string;
    notes?: string;
    amount: AmountLevel;
    color: MucusColor;
  };
  water_break: {
    recordedAt: string;
    notes?: string;
    amount: AmountLevel;
    color: FluidColor;
    odor: OdorLevel;
  };
  bleeding: {
    recordedAt: string;
    notes?: string;
    amount: AmountLevel;
    color: BleedingColor;
  };
  fetal_movement: {
    recordedAt: string;
    notes?: string;
    frequency: FetalMovementFrequency;
  };
  back_pain: {
    recordedAt: string;
    notes?: string;
    intensity: number;
    durationMinutes: number;
  };
  pelvic_pressure: {
    recordedAt: string;
    notes?: string;
    intensity: number;
  };
  nausea: {
    recordedAt: string;
    notes?: string;
    intensity: number;
  };
  diarrhea: {
    recordedAt: string;
    notes?: string;
    episodes: number;
  };
  chills: {
    recordedAt: string;
    notes?: string;
    durationMinutes: number;
  };
};

export type SymptomFieldErrors = Record<string, string>;

export type SymptomValidationResult =
  | { ok: true }
  | { ok: false; errors: SymptomFieldErrors };

export const SYMPTOM_TYPES: readonly SymptomType[] = [
  'mucus_plug',
  'water_break',
  'bleeding',
  'fetal_movement',
  'back_pain',
  'pelvic_pressure',
  'nausea',
  'diarrhea',
  'chills',
] as const;

export function isSymptomType(value: string): value is SymptomType {
  return (SYMPTOM_TYPES as readonly string[]).includes(value);
}

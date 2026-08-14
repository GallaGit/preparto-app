import { toDateTimeLocalValue } from '@/utils/formHelpers';
import type { SymptomRecord } from '@/types/symptom';

export function symptomRecordToFormState(record: SymptomRecord) {
  const base = {
    recordedAt: toDateTimeLocalValue(record.recordedAt),
    notes: record.notes,
    amount: '',
    color: '',
    odor: '',
    frequency: '',
    intensity: '',
    durationMinutes: '',
    episodes: '',
  };

  switch (record.type) {
    case 'mucus_plug':
      return { ...base, amount: record.amount, color: record.color };
    case 'water_break':
      return {
        ...base,
        amount: record.amount,
        color: record.color,
        odor: record.odor,
      };
    case 'bleeding':
      return { ...base, amount: record.amount, color: record.color };
    case 'fetal_movement':
      return { ...base, frequency: record.frequency };
    case 'back_pain':
      return {
        ...base,
        intensity: String(record.intensity),
        durationMinutes: String(record.durationMinutes),
      };
    case 'pelvic_pressure':
    case 'nausea':
      return { ...base, intensity: String(record.intensity) };
    case 'diarrhea':
      return { ...base, episodes: String(record.episodes) };
    case 'chills':
      return { ...base, durationMinutes: String(record.durationMinutes) };
    default: {
      const _exhaustive: never = record;
      return _exhaustive;
    }
  }
}

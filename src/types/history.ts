import type { Contraction } from '@/types/contraction';
import type { SymptomRecord, SymptomType } from '@/types/symptom';

export type HistoryKind = 'symptom' | 'contraction';

export type HistoryFilterType = SymptomType | 'contraction' | 'all';

export type SymptomHistoryItem = {
  kind: 'symptom';
  id: string;
  occurredAt: Date;
  symptom: SymptomRecord;
};

export type ContractionHistoryItem = {
  kind: 'contraction';
  id: string;
  occurredAt: Date;
  contraction: Contraction;
};

export type HistoryItem = SymptomHistoryItem | ContractionHistoryItem;

export function toHistoryItems(
  symptoms: SymptomRecord[],
  contractions: Contraction[],
): HistoryItem[] {
  const symptomItems: HistoryItem[] = symptoms.map((symptom) => ({
    kind: 'symptom',
    id: symptom.id,
    occurredAt: symptom.recordedAt,
    symptom,
  }));

  const contractionItems: HistoryItem[] = contractions.map((contraction) => ({
    kind: 'contraction',
    id: contraction.id,
    occurredAt: contraction.startedAt,
    contraction,
  }));

  return [...symptomItems, ...contractionItems].sort(
    (a, b) => b.occurredAt.getTime() - a.occurredAt.getTime(),
  );
}

export function filterHistoryItems(
  items: HistoryItem[],
  options: {
    day?: string | null; // YYYY-MM-DD local
    type?: HistoryFilterType;
  },
): HistoryItem[] {
  const type = options.type ?? 'all';
  const day = options.day ?? null;

  return items.filter((item) => {
    if (type !== 'all') {
      if (type === 'contraction' && item.kind !== 'contraction') {
        return false;
      }
      if (
        type !== 'contraction' &&
        (item.kind !== 'symptom' || item.symptom.type !== type)
      ) {
        return false;
      }
    }

    if (day) {
      if (toDayKey(item.occurredAt) !== day) {
        return false;
      }
    }

    return true;
  });
}

export function toDayKey(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isHistoryKind(value: string): value is HistoryKind {
  return value === 'symptom' || value === 'contraction';
}

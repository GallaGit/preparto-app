import type { HistoryFilterType, HistoryItem } from '@/types/history';
import { filterHistoryItems, toHistoryItems } from '@/types/history';
import type { Contraction } from '@/types/contraction';
import type { SymptomRecord } from '@/types/symptom';

export function buildTimeline(
  symptoms: SymptomRecord[],
  contractions: Contraction[],
  filters: { day?: string | null; type?: HistoryFilterType } = {},
): HistoryItem[] {
  return filterHistoryItems(toHistoryItems(symptoms, contractions), filters);
}

export { filterHistoryItems, toHistoryItems, toDayKey } from '@/types/history';

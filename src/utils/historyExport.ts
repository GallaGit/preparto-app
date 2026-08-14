import { getSymptomCatalogItem } from '@/data/symptomOptions';
import { ASSESSMENT_DISCLAIMER } from '@/services/assessmentEngine';
import type { Contraction } from '@/types/contraction';
import type { PregnancyProfile } from '@/types/pregnancy';
import type { SymptomRecord } from '@/types/symptom';
import { toHistoryItems } from '@/utils/historyTimeline';

export type HistoryExportPayload = {
  exportedAt: string;
  disclaimer: string;
  pregnancy: PregnancyProfile | null;
  symptoms: Array<Omit<SymptomRecord, 'recordedAt'> & { recordedAt: string }>;
  contractions: Array<
    Omit<Contraction, 'startedAt' | 'endedAt'> & {
      startedAt: string;
      endedAt: string;
    }
  >;
};

export function buildHistoryExportPayload(input: {
  symptoms: SymptomRecord[];
  contractions: Contraction[];
  pregnancy?: PregnancyProfile | null;
}): HistoryExportPayload {
  return {
    exportedAt: new Date().toISOString(),
    disclaimer: ASSESSMENT_DISCLAIMER,
    pregnancy: input.pregnancy ?? null,
    symptoms: input.symptoms.map((symptom) => ({
      ...symptom,
      recordedAt: symptom.recordedAt.toISOString(),
    })),
    contractions: input.contractions.map((contraction) => ({
      ...contraction,
      startedAt: contraction.startedAt.toISOString(),
      endedAt: contraction.endedAt.toISOString(),
    })),
  };
}

export function historyExportToJson(payload: HistoryExportPayload): string {
  return `${JSON.stringify(payload, null, 2)}\n`;
}

export function historyExportToPlainText(payload: HistoryExportPayload): string {
  const lines: string[] = [
    'PreParto — Historial exportado',
    `Fecha de exportación: ${payload.exportedAt}`,
    '',
    payload.disclaimer,
    '',
    '--- Embarazo ---',
  ];

  if (payload.pregnancy) {
    lines.push(
      `Fecha probable de parto: ${payload.pregnancy.dueDate}`,
      `Semana gestacional: ${payload.pregnancy.gestationalWeek}`,
      `Tipo: ${payload.pregnancy.pregnancyType}`,
      `Primer embarazo: ${payload.pregnancy.isFirstPregnancy ? 'sí' : 'no'}`,
      `País: ${payload.pregnancy.country}`,
    );
  } else {
    lines.push('Sin configuración de embarazo guardada.');
  }

  const timeline = toHistoryItems(
    payload.symptoms.map((symptom) => ({
      ...symptom,
      recordedAt: new Date(symptom.recordedAt),
    })) as SymptomRecord[],
    payload.contractions.map((contraction) => ({
      ...contraction,
      startedAt: new Date(contraction.startedAt),
      endedAt: new Date(contraction.endedAt),
    })),
  );

  lines.push('', '--- Registros ---');

  if (timeline.length === 0) {
    lines.push('No hay registros.');
  } else {
    for (const item of timeline) {
      if (item.kind === 'contraction') {
        lines.push(
          `[Contracción] ${item.contraction.startedAt.toISOString()} · ${item.contraction.durationSeconds}s` +
            (item.contraction.notes ? ` · ${item.contraction.notes}` : ''),
        );
      } else {
        const label =
          getSymptomCatalogItem(item.symptom.type)?.label ?? item.symptom.type;
        lines.push(
          `[${label}] ${item.symptom.recordedAt.toISOString()}` +
            (item.symptom.notes ? ` · ${item.symptom.notes}` : ''),
        );
      }
    }
  }

  lines.push('', '---', 'Este archivo no es un informe médico.', '');
  return lines.join('\n');
}

export function canUseWebShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

export async function shareHistoryText(text: string): Promise<boolean> {
  if (!canUseWebShare()) {
    return false;
  }

  try {
    await navigator.share({
      title: 'Historial PreParto',
      text,
    });
    return true;
  } catch {
    return false;
  }
}

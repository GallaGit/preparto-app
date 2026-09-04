import { describe, expect, it } from 'vitest';
import {
  buildHistoryExportPayload,
  historyExportToJson,
  historyExportToPdfBlob,
  historyExportToPlainText,
} from '@/utils/historyExport';
import { getAssessmentCopy } from '@/i18n/assessmentCopy';
import type { Contraction } from '@/types/contraction';
import type { SymptomRecord } from '@/types/symptom';

const symptom: SymptomRecord = {
  id: 's1',
  type: 'nausea',
  recordedAt: new Date('2026-08-05T10:00:00.000Z'),
  notes: 'Leve',
  intensity: 2,
};

const contraction: Contraction = {
  id: 'c1',
  startedAt: new Date('2026-08-05T11:00:00.000Z'),
  endedAt: new Date('2026-08-05T11:01:00.000Z'),
  durationSeconds: 60,
  notes: '',
};

describe('historyExport', () => {
  it('builds JSON payload with disclaimer and ISO dates', () => {
    const payload = buildHistoryExportPayload({
      symptoms: [symptom],
      contractions: [contraction],
      pregnancy: null,
      locale: 'es',
    });

    expect(payload.disclaimer).toBe(getAssessmentCopy('es').disclaimer);
    expect(payload.symptoms[0].recordedAt).toBe('2026-08-05T10:00:00.000Z');
    expect(historyExportToJson(payload)).toContain('"type": "nausea"');
  });

  it('builds plain text with symptom and contraction lines', () => {
    const payload = buildHistoryExportPayload({
      symptoms: [symptom],
      contractions: [contraction],
      locale: 'es',
    });
    const text = historyExportToPlainText(payload);

    expect(text).toContain(getAssessmentCopy('es').disclaimer);
    expect(text).toMatch(/Náuseas/i);
    expect(text).toMatch(/Contracción/i);
    expect(text).toContain('no es un informe médico');
  });

  it('builds a PDF blob with PDF header', async () => {
    const payload = buildHistoryExportPayload({
      symptoms: [symptom],
      contractions: [contraction],
    });
    const blob = historyExportToPdfBlob(payload);
    expect(blob.type).toBe('application/pdf');
    const header = await blob.slice(0, 5).text();
    expect(header).toBe('%PDF-');
  });
});

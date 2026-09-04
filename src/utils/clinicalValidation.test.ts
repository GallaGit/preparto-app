import { describe, expect, it } from 'vitest';
import { validateNoDuplicateWaterBreak } from '@/utils/clinicalValidation';
import type { SymptomRecord } from '@/types/symptom';

const waterBreak = (id: string): SymptomRecord => ({
  id,
  type: 'water_break',
  recordedAt: new Date('2026-08-05T10:00:00.000Z'),
  notes: '',
  amount: 'moderate',
  color: 'clear',
  odor: 'none',
});

describe('validateNoDuplicateWaterBreak', () => {
  it('allows first water break', () => {
    expect(validateNoDuplicateWaterBreak('water_break', [])).toEqual({
      ok: true,
    });
  });

  it('blocks second water break with the default English message', () => {
    const result = validateNoDuplicateWaterBreak('water_break', [
      waterBreak('wb-1'),
    ]);
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/waters-broken entry already exists/i);
    }
  });

  it('translates the duplicate message when locale is es', () => {
    const result = validateNoDuplicateWaterBreak(
      'water_break',
      [waterBreak('wb-1')],
      undefined,
      'es',
    );
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.message).toMatch(/rotura de bolsa/i);
    }
  });

  it('allows editing the existing water break', () => {
    const result = validateNoDuplicateWaterBreak(
      'water_break',
      [waterBreak('wb-1')],
      { editingId: 'wb-1' },
    );
    expect(result).toEqual({ ok: true });
  });

  it('ignores other symptom types', () => {
    expect(
      validateNoDuplicateWaterBreak('bleeding', [waterBreak('wb-1')]),
    ).toEqual({ ok: true });
  });
});

import { describe, expect, it } from 'vitest';
import { formatCompactSeconds } from '@/utils/formatCompact';

describe('formatCompactSeconds', () => {
  it('returns a dash when empty', () => {
    expect(formatCompactSeconds(null)).toBe('—');
  });

  it('keeps short values in seconds', () => {
    expect(formatCompactSeconds(48)).toBe('48s');
  });

  it('rounds longer values to minutes', () => {
    expect(formatCompactSeconds(480)).toBe('8 min');
    expect(formatCompactSeconds(90)).toBe('2 min');
  });
});

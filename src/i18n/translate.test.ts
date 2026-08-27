import { describe, expect, it } from 'vitest';
import { translate } from '@/i18n/translate';

describe('i18n translate', () => {
  it('returns Spanish by default catalog', () => {
    expect(translate('es', 'history.title')).toBe('Historial');
  });

  it('returns English strings', () => {
    expect(translate('en', 'history.title')).toBe('History');
    expect(translate('en', 'nav.settings')).toBe('Settings');
    expect(translate('en', 'nav.sos')).toBe('SOS');
    expect(translate('en', 'nav.timer')).toBe('Timer');
  });
});

import { describe, expect, it } from 'vitest';
import { translate } from '@/i18n/translate';

describe('i18n translate', () => {
  it('returns Spanish catalog strings', () => {
    expect(translate('es', 'history.title')).toBe('Historial');
  });

  it('returns English strings', () => {
    expect(translate('en', 'history.title')).toBe('History');
    expect(translate('en', 'nav.settings')).toBe('Settings');
    expect(translate('en', 'nav.sos')).toBe('SOS');
    expect(translate('en', 'nav.timer')).toBe('Timer');
  });

  it('interpolates variables into placeholders', () => {
    expect(translate('en', 'emergency.callNumber', { number: '112' })).toBe(
      'Call 112',
    );
    expect(translate('es', 'common.goTo', { label: 'Historial' })).toBe(
      'Ir a Historial',
    );
    expect(
      translate('en', 'home.timerInProgress', { time: '00:30' }),
    ).toBe('In progress · 00:30');
  });
});

import { describe, expect, it } from 'vitest';
import { de } from '@/i18n/messages/de';
import { en } from '@/i18n/messages/en';
import { es } from '@/i18n/messages/es';
import { getMedicalDisclaimerUrl } from '@/data/legal';
import { isLocale, translate } from '@/i18n/translate';
import { toIntlLocale } from '@/i18n/intlLocale';
import type { MessageKey } from '@/i18n/types';

describe('i18n translate', () => {
  it('returns Spanish catalog strings', () => {
    expect(translate('es', 'history.title')).toBe('Historial');
  });

  it('returns English strings', () => {
    expect(translate('en', 'history.title')).toBe('History');
    expect(translate('en', 'nav.settings')).toBe('Settings');
    expect(translate('en', 'nav.sos')).toBe('SOS');
    expect(translate('en', 'nav.timer')).toBe('Timer');
    expect(translate('en', 'privacy.title')).toBe('Privacy policy');
  });

  it('returns German catalog strings', () => {
    expect(translate('de', 'history.title')).toBe('Verlauf');
    expect(translate('de', 'nav.settings')).toBe('Einstellungen');
    expect(translate('de', 'nav.sos')).toBe('SOS');
    expect(translate('de', 'nav.timer')).toBe('Timer');
    expect(translate('de', 'privacy.title')).toBe('Datenschutzerklärung');
    expect(translate('de', 'settings.privacy')).toBe('Datenschutzerklärung');
    expect(translate('de', 'home.disclaimer')).toContain(
      'ersetzt keine ärztliche Beratung',
    );
  });

  it('returns Spanish privacy catalog strings', () => {
    expect(translate('es', 'privacy.title')).toBe('Política de privacidad');
    expect(translate('es', 'settings.privacy')).toBe('Política de privacidad');
  });

  it('keeps es, en and de catalogs aligned', () => {
    const keys = Object.keys(en) as MessageKey[];
    expect(Object.keys(es).sort()).toEqual(keys.toSorted());
    expect(Object.keys(de).sort()).toEqual(keys.toSorted());
    for (const key of keys) {
      expect(es[key]).toBeTruthy();
      expect(en[key]).toBeTruthy();
      expect(de[key]).toBeTruthy();
    }
  });

  it('recognizes de as a supported locale', () => {
    expect(isLocale('de')).toBe(true);
    expect(isLocale('en')).toBe(true);
    expect(isLocale('es')).toBe(true);
    expect(isLocale('fr')).toBe(false);
  });

  it('maps locales to BCP 47 tags for dates', () => {
    expect(toIntlLocale('de')).toBe('de-DE');
    expect(toIntlLocale('en')).toBe('en-GB');
    expect(toIntlLocale('es')).toBe('es-ES');
  });

  it('points the medical disclaimer link at the locale file', () => {
    expect(getMedicalDisclaimerUrl('en')).toMatch(/DISCLAIMER\.en\.md$/);
    expect(getMedicalDisclaimerUrl('de')).toMatch(/DISCLAIMER\.de\.md$/);
    expect(getMedicalDisclaimerUrl('es')).toMatch(/DISCLAIMER\.md$/);
  });

  it('interpolates variables into placeholders', () => {
    expect(translate('en', 'emergency.callNumber', { number: '112' })).toBe(
      'Call 112',
    );
    expect(translate('es', 'common.goTo', { label: 'Historial' })).toBe(
      'Ir a Historial',
    );
    expect(translate('en', 'home.timerInProgress', { time: '00:30' })).toBe(
      'In progress · 00:30',
    );
    expect(translate('de', 'emergency.callNumber', { number: '112' })).toBe(
      '112 anrufen',
    );
    expect(translate('de', 'home.timerInProgress', { time: '00:30' })).toBe(
      'Läuft · 00:30',
    );
  });
});

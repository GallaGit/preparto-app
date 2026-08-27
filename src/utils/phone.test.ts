import { describe, expect, it } from 'vitest';
import {
  countPhoneDigits,
  getEmergencyNumber,
  hasDialablePhone,
  toTelHref,
} from '@/utils/phone';

describe('phone helpers', () => {
  it('builds tel href from formatted numbers', () => {
    expect(toTelHref('91 000 00 00')).toBe('tel:910000000');
    expect(toTelHref('+34 600 000 000')).toBe('tel:+34600000000');
    expect(toTelHref('112')).toBe('tel:112');
  });

  it('requires at least three digits to dial', () => {
    expect(hasDialablePhone('')).toBe(false);
    expect(hasDialablePhone('ab')).toBe(false);
    expect(hasDialablePhone('112')).toBe(true);
    expect(countPhoneDigits('91 000 00 00')).toBe(9);
  });

  it('uses 112 for Spain and as EU default', () => {
    expect(getEmergencyNumber('ES')).toEqual({
      number: '112',
      caption: 'Urgencias · España',
    });
    expect(getEmergencyNumber('FR').number).toBe('112');
    expect(getEmergencyNumber(undefined).number).toBe('112');
  });
});

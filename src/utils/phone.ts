const DIALABLE_PHONE = /[+\d]/g;
const DIGIT = /\d/g;

export function toTelHref(phone: string): string {
  const trimmed = phone.trim();
  const chars = trimmed.match(DIALABLE_PHONE)?.join('') ?? '';
  return `tel:${chars}`;
}

export function countPhoneDigits(phone: string): number {
  return phone.match(DIGIT)?.length ?? 0;
}

export function hasDialablePhone(phone: string | null | undefined): boolean {
  if (!phone) {
    return false;
  }
  return countPhoneDigits(phone) >= 3;
}

export function getEmergencyNumber(country: string | null | undefined): {
  number: string;
  caption: string;
} {
  const code = (country ?? 'ES').trim().toUpperCase() || 'ES';
  if (code === 'ES') {
    return { number: '112', caption: 'Urgencias · España' };
  }
  return { number: '112', caption: `Urgencias · ${code}` };
}

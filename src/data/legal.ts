import type { Locale } from '@/i18n/types';

/** In-app route for the privacy policy (also the public Pages path). */
export const PRIVACY_PATH = '/privacy';

const DISCLAIMER_FILES: Record<Locale, string> = {
  es: 'DISCLAIMER.md',
  en: 'DISCLAIMER.en.md',
  de: 'DISCLAIMER.de.md',
};

/** Existing medical disclaimer in the repository (not a store listing URL). */
export const MEDICAL_DISCLAIMER_URL =
  'https://github.com/GallaGit/preparto-app/blob/master/docs/medical/DISCLAIMER.md';

export function getMedicalDisclaimerUrl(locale: Locale): string {
  const file = DISCLAIMER_FILES[locale] ?? DISCLAIMER_FILES.en;
  return `https://github.com/GallaGit/preparto-app/blob/master/docs/medical/${file}`;
}

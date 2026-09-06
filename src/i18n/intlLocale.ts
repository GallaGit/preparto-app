import type { Locale } from '@/i18n/types';

/** BCP 47 tags used for date/time formatting. */
const INTL_BY_LOCALE: Record<Locale, string> = {
  es: 'es-ES',
  en: 'en-GB',
  de: 'de-DE',
};

export function toIntlLocale(locale: Locale): string {
  return INTL_BY_LOCALE[locale] ?? INTL_BY_LOCALE.en;
}

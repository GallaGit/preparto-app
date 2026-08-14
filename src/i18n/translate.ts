import { en } from '@/i18n/messages/en';
import { es } from '@/i18n/messages/es';
import type { Locale, MessageKey, Messages } from '@/i18n/types';

const catalogs: Record<Locale, Messages> = { es, en };

export function isLocale(value: string): value is Locale {
  return value === 'es' || value === 'en';
}

export function translate(locale: Locale, key: MessageKey): string {
  return catalogs[locale][key] ?? catalogs.es[key] ?? key;
}

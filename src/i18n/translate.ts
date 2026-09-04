import { en } from '@/i18n/messages/en';
import { es } from '@/i18n/messages/es';
import type { Locale, MessageKey, Messages } from '@/i18n/types';

const catalogs: Record<Locale, Messages> = { es, en };

export function isLocale(value: string): value is Locale {
  return value === 'es' || value === 'en';
}

export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let text = catalogs[locale][key] ?? catalogs.en[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.split(`{${name}}`).join(String(value));
    }
  }
  return text;
}

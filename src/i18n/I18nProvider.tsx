import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import { useNotificationSettings } from '@/providers/NotificationsProvider';
import { isLocale, translate } from '@/i18n/translate';
import type { Locale, MessageKey } from '@/i18n/types';

type I18nContextValue = {
  locale: Locale;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  setLocale: (locale: Locale) => Promise<void>;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { preferences, updatePreferences } = useNotificationSettings();
  const locale: Locale = isLocale(preferences.locale)
    ? preferences.locale
    : 'en';

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = useCallback(
    (key: MessageKey, vars?: Record<string, string | number>) =>
      translate(locale, key, vars),
    [locale],
  );

  const setLocale = useCallback(
    async (next: Locale) => {
      await updatePreferences({ locale: next });
    },
    [updatePreferences],
  );

  const value = useMemo(
    () => ({ locale, t, setLocale }),
    [locale, t, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

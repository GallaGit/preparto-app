import { isNativePlatform } from '@/native/platform';

const LOCALE_KEY = 'preparto.locale';

export async function syncNativeLocale(locale: string): Promise<void> {
  if (!isNativePlatform()) {
    return;
  }

  try {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.set({ key: LOCALE_KEY, value: locale });
  } catch {
    // ignore
  }
}

export async function clearNativePreferences(): Promise<void> {
  if (!isNativePlatform()) {
    return;
  }

  try {
    const { Preferences } = await import('@capacitor/preferences');
    await Preferences.clear();
  } catch {
    // ignore
  }
}

import {
  CONTRACTIONS_STORE,
  HOSPITAL_BAG_STORE,
  PREFERENCES_STORE,
  SETTINGS_STORE,
  SYMPTOMS_STORE,
  openPrepartoDb,
} from '@/services/prepartoDb';
import { cancelPendingNativeNotifications } from '@/services/localNotifications';
import { clearNativePreferences } from '@/native/preferencesSync';
import { setKeepAwake } from '@/native/keepAwake';
import { LOCALE_STORAGE_KEY } from '@/i18n/localeStorage';

const USER_STORES = [
  CONTRACTIONS_STORE,
  SYMPTOMS_STORE,
  SETTINGS_STORE,
  PREFERENCES_STORE,
  HOSPITAL_BAG_STORE,
] as const;

/** Clears every on-device user store. Data never leaves the device. */
export async function deleteAllUserData(): Promise<void> {
  await setKeepAwake(false);
  await cancelPendingNativeNotifications();
  await clearNativePreferences();

  const db = await openPrepartoDb();

  await new Promise<void>((resolve, reject) => {
    const transaction = db.transaction([...USER_STORES], 'readwrite');
    for (const name of USER_STORES) {
      transaction.objectStore(name).clear();
    }
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });

  try {
    localStorage.removeItem(LOCALE_STORAGE_KEY);
  } catch {
    // Private mode / disabled storage.
  }
}

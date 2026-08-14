import type { PregnancyProfile } from '@/types/pregnancy';
import { openPrepartoDb, SETTINGS_STORE } from '@/services/prepartoDb';

const PREGNANCY_KEY = 'pregnancy';

type StoredPregnancy = PregnancyProfile & { id: typeof PREGNANCY_KEY };

export async function getPregnancyProfile(): Promise<PregnancyProfile | null> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readonly');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.get(PREGNANCY_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result as StoredPregnancy | undefined;
      db.close();
      if (!result) {
        resolve(null);
        return;
      }
      resolve({
        dueDate: result.dueDate,
        gestationalWeek: result.gestationalWeek,
        pregnancyType: result.pregnancyType,
        isFirstPregnancy: result.isFirstPregnancy,
        country: result.country,
        updatedAt: result.updatedAt,
      });
    };
  });
}

export async function savePregnancyProfile(
  profile: PregnancyProfile,
): Promise<void> {
  const db = await openPrepartoDb();
  const stored: StoredPregnancy = { id: PREGNANCY_KEY, ...profile };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readwrite');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.put(stored);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function clearPregnancyProfile(): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SETTINGS_STORE, 'readwrite');
    const store = transaction.objectStore(SETTINGS_STORE);
    const request = store.delete(PREGNANCY_KEY);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

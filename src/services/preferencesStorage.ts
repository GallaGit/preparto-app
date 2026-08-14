import type { AppPreferences, TimerPersistedState } from '@/types/preferences';
import { openPrepartoDb, PREFERENCES_STORE } from '@/services/prepartoDb';

const APP_KEY = 'app';
const TIMER_KEY = 'timer';

export async function getPreferences(): Promise<AppPreferences | null> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, 'readonly');
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = store.get(APP_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve((request.result as AppPreferences | undefined) ?? null);
    };
  });
}

export async function savePreferences(
  preferences: Omit<AppPreferences, 'id'> & { id?: 'app' },
): Promise<void> {
  const db = await openPrepartoDb();
  const stored: AppPreferences = {
    id: APP_KEY,
    locale: preferences.locale,
    updatedAt: preferences.updatedAt,
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, 'readwrite');
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = store.put(stored);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getTimerState(): Promise<TimerPersistedState | null> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, 'readonly');
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = store.get(TIMER_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve((request.result as TimerPersistedState | undefined) ?? null);
    };
  });
}

export async function saveTimerState(
  state: Omit<TimerPersistedState, 'id' | 'updatedAt'> & {
    updatedAt?: string;
  },
): Promise<void> {
  const db = await openPrepartoDb();
  const stored: TimerPersistedState = {
    id: TIMER_KEY,
    isRunning: state.isRunning,
    startedAt: state.startedAt,
    updatedAt: state.updatedAt ?? new Date().toISOString(),
  };

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, 'readwrite');
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = store.put(stored);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function clearTimerState(): Promise<void> {
  await saveTimerState({ isRunning: false, startedAt: null });
}

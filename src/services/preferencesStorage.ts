import type { AppPreferences, TimerPersistedState } from '@/types/preferences';
import { DEFAULT_APP_PREFERENCES } from '@/types/preferences';
import { openPrepartoDb, PREFERENCES_STORE } from '@/services/prepartoDb';

const APP_KEY = 'app';
const TIMER_KEY = 'timer';

function normalizePreferences(
  raw: Partial<AppPreferences> | undefined | null,
): AppPreferences {
  return {
    id: APP_KEY,
    locale: raw?.locale ?? DEFAULT_APP_PREFERENCES.locale,
    notificationsEnabled:
      raw?.notificationsEnabled ?? DEFAULT_APP_PREFERENCES.notificationsEnabled,
    recordingReminderHours:
      raw?.recordingReminderHours ??
      DEFAULT_APP_PREFERENCES.recordingReminderHours,
    notifyTimerActive:
      raw?.notifyTimerActive ?? DEFAULT_APP_PREFERENCES.notifyTimerActive,
    updatedAt: raw?.updatedAt ?? new Date().toISOString(),
  };
}

export async function getPreferences(): Promise<AppPreferences> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, 'readonly');
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = store.get(APP_KEY);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db.close();
      resolve(normalizePreferences(request.result as AppPreferences | undefined));
    };
  });
}

export async function savePreferences(
  preferences: Partial<Omit<AppPreferences, 'id'>> &
    Pick<AppPreferences, 'locale'>,
): Promise<AppPreferences> {
  const current = await getPreferences();
  const stored = normalizePreferences({
    ...current,
    ...preferences,
    updatedAt: new Date().toISOString(),
  });

  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(PREFERENCES_STORE, 'readwrite');
    const store = transaction.objectStore(PREFERENCES_STORE);
    const request = store.put(stored);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve(stored);
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

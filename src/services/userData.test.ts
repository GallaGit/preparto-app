import { beforeEach, describe, expect, it, vi } from 'vitest';

const stores = new Map<string, Map<string, unknown>>();

function storeFor(name: string): Map<string, unknown> {
  if (!stores.has(name)) {
    stores.set(name, new Map());
  }
  return stores.get(name)!;
}

function createRequest<T>(result: T): IDBRequest<T> {
  const request = {
    result,
    error: null,
    onsuccess: null as ((event: Event) => void) | null,
    onerror: null as ((event: Event) => void) | null,
  };
  queueMicrotask(() => {
    request.onsuccess?.(new Event('success'));
  });
  return request as unknown as IDBRequest<T>;
}

function createDbMock(): IDBDatabase {
  return {
    close: vi.fn(),
    transaction: () => {
      const transaction = {
        objectStore: (name: string) => ({
          clear: () => {
            storeFor(name).clear();
            return createRequest(undefined);
          },
          put: (value: { id: string }) => {
            storeFor(name).set(value.id, value);
            return createRequest(undefined);
          },
        }),
        oncomplete: null as ((event: Event) => void) | null,
        onerror: null as ((event: Event) => void) | null,
        error: null,
      };
      queueMicrotask(() => {
        transaction.oncomplete?.(new Event('complete'));
      });
      return transaction;
    },
  } as unknown as IDBDatabase;
}

vi.mock('@/services/prepartoDb', () => ({
  CONTRACTIONS_STORE: 'contractions',
  SYMPTOMS_STORE: 'symptoms',
  SETTINGS_STORE: 'settings',
  PREFERENCES_STORE: 'preferences',
  HOSPITAL_BAG_STORE: 'hospitalBag',
  openPrepartoDb: async () => createDbMock(),
}));

vi.mock('@/services/localNotifications', () => ({
  cancelPendingNativeNotifications: vi.fn(async () => undefined),
}));

vi.mock('@/native/preferencesSync', () => ({
  clearNativePreferences: vi.fn(async () => undefined),
}));

vi.mock('@/native/keepAwake', () => ({
  setKeepAwake: vi.fn(async () => undefined),
}));

describe('deleteAllUserData', () => {
  beforeEach(() => {
    stores.clear();
    storeFor('contractions').set('c1', { id: 'c1' });
    storeFor('symptoms').set('s1', { id: 's1' });
    storeFor('settings').set('pregnancy', { id: 'pregnancy' });
    storeFor('preferences').set('app', { id: 'app' });
    storeFor('hospitalBag').set('b1', { id: 'b1' });
  });

  it('clears profile, preferences, bag and history stores', async () => {
    const { deleteAllUserData } = await import('@/services/userData');
    await deleteAllUserData();
    expect(storeFor('contractions').size).toBe(0);
    expect(storeFor('symptoms').size).toBe(0);
    expect(storeFor('settings').size).toBe(0);
    expect(storeFor('preferences').size).toBe(0);
    expect(storeFor('hospitalBag').size).toBe(0);
  });
});

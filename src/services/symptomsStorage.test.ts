import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SymptomRecord } from '@/types/symptom';

const store = new Map<string, unknown>();

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
      const objectStore = {
        put: (value: { id: string }) => {
          store.set(value.id, value);
          return createRequest(undefined);
        },
        getAll: () => createRequest([...store.values()]),
        delete: (id: string) => {
          store.delete(id);
          return createRequest(undefined);
        },
        clear: () => {
          store.clear();
          return createRequest(undefined);
        },
      };

      const transaction = {
        objectStore: () => objectStore,
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
  SYMPTOMS_STORE: 'symptoms',
  openPrepartoDb: async () => createDbMock(),
}));

describe('symptomsStorage', () => {
  beforeEach(() => {
    store.clear();
  });

  it('saves and retrieves symptoms newest first', async () => {
    const { save, getAll } = await import('@/services/symptomsStorage');

    const older: SymptomRecord = {
      id: 'a',
      type: 'chills',
      recordedAt: new Date('2026-08-05T08:00:00.000Z'),
      notes: '',
      durationMinutes: 5,
    };
    const newer: SymptomRecord = {
      id: 'b',
      type: 'nausea',
      recordedAt: new Date('2026-08-05T10:00:00.000Z'),
      notes: 'leve',
      intensity: 3,
    };

    await save(older);
    await save(newer);

    const all = await getAll();
    expect(all.map((item) => item.id)).toEqual(['b', 'a']);
    expect(all[0]?.recordedAt).toBeInstanceOf(Date);
    expect(all[0]?.notes).toBe('leve');
  });
});

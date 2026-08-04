import type { Contraction } from '@/types/contraction';
import {
  CONTRACTIONS_STORE,
  openPrepartoDb,
} from '@/services/prepartoDb';

interface StoredContraction {
  id: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  intervalSeconds?: number;
  notes?: string;
}

function toStored(contraction: Contraction): StoredContraction {
  return {
    id: contraction.id,
    startedAt: contraction.startedAt.toISOString(),
    endedAt: contraction.endedAt.toISOString(),
    durationSeconds: contraction.durationSeconds,
    intervalSeconds: contraction.intervalSeconds,
    notes: contraction.notes,
  };
}

function fromStored(stored: StoredContraction): Contraction {
  return {
    id: stored.id,
    startedAt: new Date(stored.startedAt),
    endedAt: new Date(stored.endedAt),
    durationSeconds: stored.durationSeconds,
    intervalSeconds: stored.intervalSeconds,
    notes: stored.notes ?? '',
  };
}

function sortByNewest(contractions: Contraction[]): Contraction[] {
  return [...contractions].sort(
    (a, b) => b.startedAt.getTime() - a.startedAt.getTime(),
  );
}

export async function save(contraction: Contraction): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONTRACTIONS_STORE, 'readwrite');
    const store = transaction.objectStore(CONTRACTIONS_STORE);
    const request = store.put(toStored(contraction));

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getAll(): Promise<Contraction[]> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONTRACTIONS_STORE, 'readonly');
    const store = transaction.objectStore(CONTRACTIONS_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const contractions = (request.result as StoredContraction[]).map(
        fromStored,
      );
      db.close();
      resolve(sortByNewest(contractions));
    };
  });
}

export async function deleteContraction(id: string): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONTRACTIONS_STORE, 'readwrite');
    const store = transaction.objectStore(CONTRACTIONS_STORE);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function clear(): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(CONTRACTIONS_STORE, 'readwrite');
    const store = transaction.objectStore(CONTRACTIONS_STORE);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

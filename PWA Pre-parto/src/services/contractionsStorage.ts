import type { Contraction } from '@/types/contraction';

const DB_NAME = 'preparto';
const DB_VERSION = 1;
const STORE_NAME = 'contractions';

interface StoredContraction {
  id: string;
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  intervalSeconds?: number;
}

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('startedAt', 'startedAt', { unique: false });
      }
    };
  });
}

function toStored(contraction: Contraction): StoredContraction {
  return {
    id: contraction.id,
    startedAt: contraction.startedAt.toISOString(),
    endedAt: contraction.endedAt.toISOString(),
    durationSeconds: contraction.durationSeconds,
    intervalSeconds: contraction.intervalSeconds,
  };
}

function fromStored(stored: StoredContraction): Contraction {
  return {
    id: stored.id,
    startedAt: new Date(stored.startedAt),
    endedAt: new Date(stored.endedAt),
    durationSeconds: stored.durationSeconds,
    intervalSeconds: stored.intervalSeconds,
  };
}

function sortByNewest(contractions: Contraction[]): Contraction[] {
  return [...contractions].sort(
    (a, b) => b.startedAt.getTime() - a.startedAt.getTime(),
  );
}

export async function save(contraction: Contraction): Promise<void> {
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
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
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
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
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
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
  const db = await openDatabase();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

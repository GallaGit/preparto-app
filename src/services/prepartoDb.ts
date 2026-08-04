const DB_NAME = 'preparto';
const DB_VERSION = 2;

export const CONTRACTIONS_STORE = 'contractions';
export const SYMPTOMS_STORE = 'symptoms';

export function openPrepartoDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(CONTRACTIONS_STORE)) {
        const contractionsStore = db.createObjectStore(CONTRACTIONS_STORE, {
          keyPath: 'id',
        });
        contractionsStore.createIndex('startedAt', 'startedAt', {
          unique: false,
        });
      }

      if (!db.objectStoreNames.contains(SYMPTOMS_STORE)) {
        const symptomsStore = db.createObjectStore(SYMPTOMS_STORE, {
          keyPath: 'id',
        });
        symptomsStore.createIndex('type', 'type', { unique: false });
        symptomsStore.createIndex('recordedAt', 'recordedAt', {
          unique: false,
        });
      }
    };
  });
}

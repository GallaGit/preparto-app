import type { SymptomRecord, SymptomType } from '@/types/symptom';
import { openPrepartoDb, SYMPTOMS_STORE } from '@/services/prepartoDb';

type StoredSymptom = Omit<SymptomRecord, 'recordedAt'> & {
  recordedAt: string;
};

function toStored(symptom: SymptomRecord): StoredSymptom {
  return {
    ...symptom,
    recordedAt: symptom.recordedAt.toISOString(),
  };
}

function fromStored(stored: StoredSymptom): SymptomRecord {
  return {
    ...stored,
    recordedAt: new Date(stored.recordedAt),
  } as SymptomRecord;
}

function sortByNewest(symptoms: SymptomRecord[]): SymptomRecord[] {
  return [...symptoms].sort(
    (a, b) => b.recordedAt.getTime() - a.recordedAt.getTime(),
  );
}

export async function save(symptom: SymptomRecord): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SYMPTOMS_STORE, 'readwrite');
    const store = transaction.objectStore(SYMPTOMS_STORE);
    const request = store.put(toStored(symptom));

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getAll(): Promise<SymptomRecord[]> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SYMPTOMS_STORE, 'readonly');
    const store = transaction.objectStore(SYMPTOMS_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const symptoms = (request.result as StoredSymptom[]).map(fromStored);
      db.close();
      resolve(sortByNewest(symptoms));
    };
  });
}

export async function getByType(type: SymptomType): Promise<SymptomRecord[]> {
  const all = await getAll();
  return all.filter((symptom) => symptom.type === type);
}

export async function getById(id: string): Promise<SymptomRecord | null> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SYMPTOMS_STORE, 'readonly');
    const store = transaction.objectStore(SYMPTOMS_STORE);
    const request = store.get(id);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result as StoredSymptom | undefined;
      db.close();
      resolve(result ? fromStored(result) : null);
    };
  });
}

export async function getByDay(dayKey: string): Promise<SymptomRecord[]> {
  const all = await getAll();
  return all.filter((symptom) => {
    const pad = (value: number) => String(value).padStart(2, '0');
    const d = symptom.recordedAt;
    const key = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    return key === dayKey;
  });
}

export async function update(symptom: SymptomRecord): Promise<void> {
  await save(symptom);
}

export async function deleteById(id: string): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(SYMPTOMS_STORE, 'readwrite');
    const store = transaction.objectStore(SYMPTOMS_STORE);
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
    const transaction = db.transaction(SYMPTOMS_STORE, 'readwrite');
    const store = transaction.objectStore(SYMPTOMS_STORE);
    const request = store.clear();

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

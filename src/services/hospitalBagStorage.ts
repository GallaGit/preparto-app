import { openPrepartoDb, HOSPITAL_BAG_STORE } from '@/services/prepartoDb';
import type { HospitalBagItem } from '@/types/hospitalBag';

function createId(): string {
  return crypto.randomUUID();
}

function normalizeItem(
  raw: Partial<HospitalBagItem> | undefined | null,
): HospitalBagItem | null {
  if (!raw?.id || typeof raw.label !== 'string') {
    return null;
  }

  const label = raw.label.trim();
  if (!label) {
    return null;
  }

  const now = new Date().toISOString();
  const done = Boolean(raw.done);

  return {
    id: raw.id,
    label,
    done,
    priority: Boolean(raw.priority),
    createdAt: raw.createdAt ?? now,
    updatedAt: raw.updatedAt ?? now,
    completedAt: done ? (raw.completedAt ?? raw.updatedAt ?? now) : null,
  };
}

export function createHospitalBagItem(
  label: string,
  options?: Partial<
    Pick<HospitalBagItem, 'done' | 'priority' | 'id' | 'createdAt'>
  >,
): HospitalBagItem {
  const now = new Date().toISOString();
  const done = options?.done ?? false;

  return {
    id: options?.id ?? createId(),
    label: label.trim(),
    done,
    priority: options?.priority ?? false,
    createdAt: options?.createdAt ?? now,
    updatedAt: now,
    completedAt: done ? now : null,
  };
}

export async function getAll(): Promise<HospitalBagItem[]> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HOSPITAL_BAG_STORE, 'readonly');
    const store = transaction.objectStore(HOSPITAL_BAG_STORE);
    const request = store.getAll();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const items = (request.result as HospitalBagItem[])
        .map((raw) => normalizeItem(raw))
        .filter((item): item is HospitalBagItem => item !== null);
      db.close();
      resolve(items);
    };
  });
}

export async function save(item: HospitalBagItem): Promise<void> {
  const normalized = normalizeItem(item);
  if (!normalized) {
    throw new Error('Invalid hospital bag item');
  }

  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HOSPITAL_BAG_STORE, 'readwrite');
    const store = transaction.objectStore(HOSPITAL_BAG_STORE);
    const request = store.put(normalized);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function remove(id: string): Promise<void> {
  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HOSPITAL_BAG_STORE, 'readwrite');
    const store = transaction.objectStore(HOSPITAL_BAG_STORE);
    const request = store.delete(id);

    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function removeMany(ids: string[]): Promise<void> {
  if (ids.length === 0) {
    return;
  }

  const db = await openPrepartoDb();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(HOSPITAL_BAG_STORE, 'readwrite');
    const store = transaction.objectStore(HOSPITAL_BAG_STORE);

    for (const id of ids) {
      store.delete(id);
    }

    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => reject(transaction.error);
  });
}

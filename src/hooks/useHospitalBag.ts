import { useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/i18n/I18nProvider';
import * as hospitalBagStorage from '@/services/hospitalBagStorage';
import { createHospitalBagItem } from '@/services/hospitalBagStorage';
import type { HospitalBagItem } from '@/types/hospitalBag';
import { splitHospitalBagItems } from '@/utils/hospitalBagSort';

export function useHospitalBag() {
  const { t } = useI18n();
  const [items, setItems] = useState<HospitalBagItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await hospitalBagStorage.getAll();
      setItems(data);
      setError(null);
    } catch {
      setError(t('errors.hospitalBag.load'));
    } finally {
      setIsLoading(false);
    }
  }, [t]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const { active, done } = splitHospitalBagItems(items);

  const addItem = useCallback(
    async (label: string): Promise<boolean> => {
      const trimmed = label.trim();
      if (!trimmed) {
        return false;
      }

      try {
        const item = createHospitalBagItem(trimmed);
        await hospitalBagStorage.save(item);
        await loadItems();
        return true;
      } catch {
        setError(t('errors.hospitalBag.add'));
        return false;
      }
    },
    [loadItems, t],
  );

  const updateItem = useCallback(
    async (
      id: string,
      patch: Partial<Pick<HospitalBagItem, 'label' | 'done' | 'priority'>>,
    ): Promise<boolean> => {
      const current = items.find((item) => item.id === id);
      if (!current) {
        return false;
      }

      const now = new Date().toISOString();
      const nextDone = patch.done ?? current.done;
      const nextLabel =
        patch.label !== undefined ? patch.label.trim() : current.label;

      if (!nextLabel) {
        return false;
      }

      const updated: HospitalBagItem = {
        ...current,
        label: nextLabel,
        done: nextDone,
        priority: patch.priority ?? current.priority,
        updatedAt: now,
        completedAt: nextDone
          ? current.done
            ? current.completedAt
            : now
          : null,
      };

      try {
        await hospitalBagStorage.save(updated);
        await loadItems();
        return true;
      } catch {
        setError(t('errors.hospitalBag.update'));
        return false;
      }
    },
    [items, loadItems, t],
  );

  const removeItems = useCallback(
    async (ids: string[]): Promise<boolean> => {
      if (ids.length === 0) {
        return false;
      }

      try {
        await hospitalBagStorage.removeMany(ids);
        await loadItems();
        return true;
      } catch {
        setError(t('errors.hospitalBag.delete'));
        return false;
      }
    },
    [loadItems, t],
  );

  return {
    items,
    active,
    done,
    isLoading,
    error,
    addItem,
    updateItem,
    removeItems,
    reload: loadItems,
  };
}

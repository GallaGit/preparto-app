import type { HospitalBagItem } from '@/types/hospitalBag';

function byCreatedAsc(a: HospitalBagItem, b: HospitalBagItem): number {
  return a.createdAt.localeCompare(b.createdAt);
}

/** Active items: priority first, then creation order. */
export function sortActiveItems(
  items: HospitalBagItem[],
): HospitalBagItem[] {
  return items
    .filter((item) => !item.done)
    .slice()
    .sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority ? -1 : 1;
      }
      return byCreatedAsc(a, b);
    });
}

/** Done items: most recently completed first, then updatedAt. */
export function sortDoneItems(items: HospitalBagItem[]): HospitalBagItem[] {
  return items
    .filter((item) => item.done)
    .slice()
    .sort((a, b) => {
      const aCompleted = a.completedAt ?? a.updatedAt;
      const bCompleted = b.completedAt ?? b.updatedAt;
      return bCompleted.localeCompare(aCompleted);
    });
}

export function splitHospitalBagItems(items: HospitalBagItem[]): {
  active: HospitalBagItem[];
  done: HospitalBagItem[];
} {
  return {
    active: sortActiveItems(items),
    done: sortDoneItems(items),
  };
}

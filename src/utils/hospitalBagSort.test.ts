import { describe, expect, it } from 'vitest';
import type { HospitalBagItem } from '@/types/hospitalBag';
import {
  sortActiveItems,
  sortDoneItems,
  splitHospitalBagItems,
} from '@/utils/hospitalBagSort';
import { createHospitalBagItem } from '@/services/hospitalBagStorage';

function item(
  overrides: Partial<HospitalBagItem> & Pick<HospitalBagItem, 'label'>,
): HospitalBagItem {
  const base = createHospitalBagItem(overrides.label, {
    id: overrides.id,
    done: overrides.done,
    priority: overrides.priority,
    createdAt: overrides.createdAt,
  });
  return {
    ...base,
    ...overrides,
    label: overrides.label,
  };
}

describe('hospitalBagSort', () => {
  it('puts priority items first among active items', () => {
    const items = [
      item({
        id: 'a',
        label: 'Normal',
        priority: false,
        createdAt: '2026-01-01T10:00:00.000Z',
      }),
      item({
        id: 'b',
        label: 'Priority',
        priority: true,
        createdAt: '2026-01-01T11:00:00.000Z',
      }),
      item({
        id: 'c',
        label: 'Also normal',
        priority: false,
        createdAt: '2026-01-01T09:00:00.000Z',
      }),
    ];

    expect(sortActiveItems(items).map((i) => i.id)).toEqual(['b', 'c', 'a']);
  });

  it('excludes done items from the active list', () => {
    const items = [
      item({ id: 'open', label: 'Open', done: false }),
      item({
        id: 'closed',
        label: 'Closed',
        done: true,
        completedAt: '2026-01-02T12:00:00.000Z',
      }),
    ];

    expect(sortActiveItems(items).map((i) => i.id)).toEqual(['open']);
    expect(sortDoneItems(items).map((i) => i.id)).toEqual(['closed']);
  });

  it('orders done items by completedAt descending', () => {
    const items = [
      item({
        id: 'older',
        label: 'Older',
        done: true,
        completedAt: '2026-01-01T10:00:00.000Z',
        updatedAt: '2026-01-01T10:00:00.000Z',
      }),
      item({
        id: 'newer',
        label: 'Newer',
        done: true,
        completedAt: '2026-01-03T10:00:00.000Z',
        updatedAt: '2026-01-03T10:00:00.000Z',
      }),
    ];

    expect(sortDoneItems(items).map((i) => i.id)).toEqual(['newer', 'older']);
  });

  it('splits active and done lists', () => {
    const items = [
      item({ id: '1', label: 'A', done: false, priority: true }),
      item({
        id: '2',
        label: 'B',
        done: true,
        completedAt: '2026-01-02T00:00:00.000Z',
      }),
      item({ id: '3', label: 'C', done: false, priority: false }),
    ];

    const { active, done } = splitHospitalBagItems(items);
    expect(active.map((i) => i.id)).toEqual(['1', '3']);
    expect(done.map((i) => i.id)).toEqual(['2']);
  });
});

describe('createHospitalBagItem', () => {
  it('trims label and defaults done/priority', () => {
    const created = createHospitalBagItem('  Documentación  ');
    expect(created.label).toBe('Documentación');
    expect(created.done).toBe(false);
    expect(created.priority).toBe(false);
    expect(created.completedAt).toBeNull();
    expect(created.id).toBeTruthy();
  });

  it('sets completedAt when created as done', () => {
    const created = createHospitalBagItem('Listo', { done: true });
    expect(created.done).toBe(true);
    expect(created.completedAt).toBeTruthy();
  });
});

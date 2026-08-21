import { describe, expect, it } from 'vitest';
import {
  assertFaqCatalogIntegrity,
  filterFaqItems,
  getFaqItems,
  groupFaqByCategory,
  FAQ_ITEM_IDS,
} from '@/data/faq';

describe('faq catalog', () => {
  it('includes every canonical id in Spanish and English', () => {
    expect(assertFaqCatalogIntegrity('es')).toEqual([]);
    expect(assertFaqCatalogIntegrity('en')).toEqual([]);
    expect(getFaqItems('es')).toHaveLength(FAQ_ITEM_IDS.length);
    expect(getFaqItems('en')).toHaveLength(FAQ_ITEM_IDS.length);
  });

  it('keeps the same ids across locales', () => {
    const esIds = getFaqItems('es').map((item) => item.id);
    const enIds = getFaqItems('en').map((item) => item.id);
    expect(enIds).toEqual(esIds);
  });

  it('filters by question, answer, or keywords', () => {
    const items = getFaqItems('es');
    expect(filterFaqItems(items, 'cronómetro').map((i) => i.id)).toContain(
      'contractions',
    );
    expect(filterFaqItems(items, 'PDF').map((i) => i.id)).toContain('export');
    expect(filterFaqItems(items, 'xyz-no-match')).toEqual([]);
  });

  it('groups non-empty categories in stable order', () => {
    const groups = groupFaqByCategory(getFaqItems('es'));
    expect(groups.map((g) => g.category)).toEqual([
      'about',
      'features',
      'urgency',
      'privacy',
      'offline',
    ]);
    expect(groups.every((g) => g.items.length > 0)).toBe(true);
  });
});

import { faqEn } from '@/data/faq/en';
import { faqEs } from '@/data/faq/es';
import {
  FAQ_CATEGORY_ORDER,
  FAQ_ITEM_IDS,
  type FaqCategoryId,
  type FaqItem,
  type FaqItemId,
} from '@/data/faq/types';
import type { Locale } from '@/i18n/types';

const catalogs: Record<Locale, FaqItem[]> = {
  es: faqEs,
  en: faqEn,
};

export function getFaqItems(locale: Locale): FaqItem[] {
  const items = catalogs[locale] ?? catalogs.es;
  const byId = new Map(items.map((item) => [item.id, item]));
  return FAQ_ITEM_IDS.map((id) => byId.get(id)).filter(
    (item): item is FaqItem => item !== undefined,
  );
}

export function groupFaqByCategory(
  items: FaqItem[],
): { category: FaqCategoryId; items: FaqItem[] }[] {
  const byCategory = new Map<FaqCategoryId, FaqItem[]>();
  for (const category of FAQ_CATEGORY_ORDER) {
    byCategory.set(category, []);
  }
  for (const item of items) {
    byCategory.get(item.category)?.push(item);
  }
  return FAQ_CATEGORY_ORDER.map((category) => ({
    category,
    items: byCategory.get(category) ?? [],
  })).filter((group) => group.items.length > 0);
}

export function filterFaqItems(items: FaqItem[], query: string): FaqItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return items;
  }

  return items.filter((item) => {
    const haystack = [
      item.question,
      item.answer,
      ...item.keywords,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalized);
  });
}

export function assertFaqCatalogIntegrity(locale: Locale): FaqItemId[] {
  const ids = getFaqItems(locale).map((item) => item.id);
  const missing = FAQ_ITEM_IDS.filter((id) => !ids.includes(id));
  return missing;
}

export type { FaqCategoryId, FaqItem, FaqItemId };
export { FAQ_CATEGORY_ORDER, FAQ_ITEM_IDS };

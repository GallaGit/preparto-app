export type FaqCategoryId =
  | 'about'
  | 'features'
  | 'urgency'
  | 'privacy'
  | 'offline';

export type FaqItemId =
  | 'what-is'
  | 'not-medical'
  | 'assessment'
  | 'contractions'
  | 'symptoms'
  | 'water-break'
  | 'when-to-call'
  | 'data-local'
  | 'export'
  | 'offline'
  | 'hospital-bag'
  | 'notifications';

export type FaqItem = {
  id: FaqItemId;
  category: FaqCategoryId;
  question: string;
  answer: string;
  keywords: string[];
};

export const FAQ_CATEGORY_ORDER: FaqCategoryId[] = [
  'about',
  'features',
  'urgency',
  'privacy',
  'offline',
];

export const FAQ_ITEM_IDS: FaqItemId[] = [
  'what-is',
  'not-medical',
  'assessment',
  'contractions',
  'symptoms',
  'water-break',
  'when-to-call',
  'data-local',
  'export',
  'offline',
  'hospital-bag',
  'notifications',
];

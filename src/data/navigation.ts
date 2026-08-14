import type { NavItem } from '@/types/navigation';
import type { MessageKey } from '@/i18n/types';

export type NavItemConfig = Omit<NavItem, 'label'> & {
  labelKey: MessageKey;
};

export const NAV_ITEMS: NavItemConfig[] = [
  {
    labelKey: 'nav.contractions',
    path: '/contractions',
    icon: '⏱️',
  },
  {
    labelKey: 'nav.waterBreak',
    path: '/water-break',
    icon: '💧',
  },
  { labelKey: 'nav.symptoms', path: '/symptoms', icon: '📋' },
  { labelKey: 'nav.history', path: '/history', icon: '🕘' },
  { labelKey: 'nav.emergency', path: '/emergency', icon: '🚨' },
  { labelKey: 'nav.settings', path: '/settings', icon: '⚙️' },
];

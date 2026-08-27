import type { MessageKey } from '@/i18n/types';
import type { IconKey } from '@/icons/iconMap';

export type BottomNavItemConfig = {
  labelKey: MessageKey;
  path: string;
  icon: IconKey;
  match: 'exact' | 'prefix';
  sos?: boolean;
};

export const BOTTOM_NAV_ITEMS: BottomNavItemConfig[] = [
  {
    labelKey: 'nav.home',
    path: '/',
    icon: 'home',
    match: 'exact',
  },
  {
    labelKey: 'nav.timer',
    path: '/contractions',
    icon: 'timer',
    match: 'exact',
  },
  {
    labelKey: 'nav.history',
    path: '/history',
    icon: 'history',
    match: 'prefix',
  },
  {
    labelKey: 'nav.sos',
    path: '/emergency',
    icon: 'alert',
    match: 'exact',
    sos: true,
  },
];

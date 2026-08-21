import type { NavItem } from '@/types/navigation';
import type { MessageKey } from '@/i18n/types';
import type { IconKey } from '@/icons/iconMap';

export type NavItemConfig = Omit<NavItem, 'label' | 'icon'> & {
  labelKey: MessageKey;
  icon: IconKey;
};

export const NAV_ITEMS: NavItemConfig[] = [
  {
    labelKey: 'nav.contractions',
    path: '/contractions',
    icon: 'timer',
  },
  {
    labelKey: 'nav.waterBreak',
    path: '/water-break',
    icon: 'droplet',
  },
  { labelKey: 'nav.symptoms', path: '/symptoms', icon: 'clipboard' },
  { labelKey: 'nav.history', path: '/history', icon: 'history' },
  {
    labelKey: 'nav.hospitalBag',
    path: '/hospital-bag',
    icon: 'suitcase',
  },
  { labelKey: 'nav.faq', path: '/faq', icon: 'help' },
  { labelKey: 'nav.emergency', path: '/emergency', icon: 'alert' },
  { labelKey: 'nav.settings', path: '/settings', icon: 'settings' },
];

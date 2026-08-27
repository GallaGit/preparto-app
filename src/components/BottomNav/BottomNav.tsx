import { NavLink } from 'react-router-dom';
import { AppIcon } from '@/components/Icon/AppIcon';
import { BOTTOM_NAV_ITEMS } from '@/data/bottomNav';
import { useI18n } from '@/i18n/I18nProvider';

export function BottomNav() {
  const { t } = useI18n();

  return (
    <nav
      aria-label={t('nav.bottom')}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-outline-variant/80 bg-surface-container-lowest/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4 px-2 pt-1">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.match === 'exact'}
              className={({ isActive }) => {
                const color = item.sos
                  ? 'text-error'
                  : isActive
                    ? 'text-on-surface'
                    : 'text-on-surface-variant';
                return [
                  'flex min-h-14 flex-col items-center justify-center gap-0.5 rounded-xl px-1 py-2',
                  'text-[11px] font-semibold tracking-wide',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
                  color,
                ].join(' ');
              }}
              aria-label={t(item.labelKey)}
            >
              {({ isActive }) => (
                <>
                  <AppIcon
                    name={item.icon}
                    size={22}
                    strokeWidth={item.sos || isActive ? 2 : 1.5}
                  />
                  <span>{t(item.labelKey)}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import { AppIcon } from '@/components/Icon/AppIcon';
import { IconCircle } from '@/components/Icon/IconCircle';
import type { IconKey } from '@/icons/iconMap';

interface CardProps {
  to: string;
  icon?: IconKey | string;
  label: string;
  badge?: ReactNode;
  compact?: boolean;
}

export function Card({ to, icon, label, badge, compact = false }: CardProps) {
  return (
    <Link
      to={to}
      className={[
        'glass-panel group flex w-full items-center gap-4 rounded-2xl',
        'transition-all duration-200',
        'hover:bg-white/55 active:bg-white/65',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        compact
          ? 'min-h-16 flex-col gap-3 px-4 py-5 text-center'
          : 'min-h-16 px-5 py-5',
      ].join(' ')}
      aria-label={`Ir a ${label}`}
    >
      {icon ? (
        <IconCircle name={icon} variant={compact ? 'compact' : 'default'} />
      ) : null}

      <div
        className={[
          'flex min-w-0 flex-col gap-1',
          compact ? 'items-center' : 'flex-1',
        ].join(' ')}
      >
        <span className="text-base font-semibold text-on-surface sm:text-lg">
          {label}
        </span>
        {badge}
      </div>

      {!compact ? (
        <AppIcon
          name="chevronRight"
          size={20}
          className="ml-auto flex-shrink-0 text-primary/50 transition-colors group-hover:text-primary"
        />
      ) : null}
    </Link>
  );
}

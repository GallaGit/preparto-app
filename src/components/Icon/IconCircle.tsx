import { AppIcon } from '@/components/Icon/AppIcon';
import type { IconKey } from '@/icons/iconMap';

type IconCircleVariant = 'default' | 'banner' | 'urgent' | 'compact';

interface IconCircleProps {
  name: IconKey | string;
  variant?: IconCircleVariant;
  className?: string;
}

const variantStyles: Record<
  IconCircleVariant,
  { wrap: string; size: number; glyph: string }
> = {
  default: {
    wrap: 'h-12 w-12 bg-surface-container-highest text-primary',
    size: 24,
    glyph: '',
  },
  compact: {
    wrap: 'h-10 w-10 bg-surface-container-highest text-primary',
    size: 20,
    glyph: '',
  },
  banner: {
    wrap: 'h-10 w-10 bg-primary-container/40 text-primary',
    size: 22,
    glyph: '',
  },
  urgent: {
    wrap: 'h-12 w-12 bg-error-container text-error',
    size: 24,
    glyph: '',
  },
};

export function IconCircle({
  name,
  variant = 'default',
  className = '',
}: IconCircleProps) {
  const styles = variantStyles[variant];

  return (
    <span
      className={[
        'inline-flex flex-shrink-0 items-center justify-center rounded-full',
        styles.wrap,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      <AppIcon name={name} size={styles.size} />
    </span>
  );
}

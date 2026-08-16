import { HugeiconsIcon } from '@hugeicons/react';
import { resolveIcon, type IconKey } from '@/icons/iconMap';

interface AppIconProps {
  name: IconKey | string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  'aria-hidden'?: boolean | 'true' | 'false';
  'aria-label'?: string;
}

export function AppIcon({
  name,
  size = 24,
  className,
  strokeWidth = 1.5,
  'aria-hidden': ariaHidden = true,
  'aria-label': ariaLabel,
}: AppIconProps) {
  return (
    <HugeiconsIcon
      icon={resolveIcon(name)}
      size={size}
      strokeWidth={strokeWidth}
      color="currentColor"
      className={className}
      aria-hidden={ariaHidden}
      aria-label={ariaLabel}
    />
  );
}

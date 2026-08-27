import type { ButtonSize, ButtonVariant } from '@/types/button';

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-600 active:bg-primary-600/90 focus-visible:ring-primary/40',
  secondary:
    'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low active:bg-surface-container focus-visible:ring-primary/30',
  danger:
    'bg-error text-on-error hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/40',
  ghost:
    'bg-transparent text-primary hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary/30',
};

const sizeStyles: Record<ButtonSize, string> = {
  default: 'min-h-14 px-6 py-3 text-lg font-semibold rounded-2xl',
  xl: 'min-h-16 px-8 py-4 text-xl font-bold rounded-full',
};

export function buttonClassName({
  variant = 'primary',
  fullWidth = false,
  size = 'default',
  className = '',
}: {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  size?: ButtonSize;
  className?: string;
}): string {
  return [
    'inline-flex items-center justify-center text-center',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    sizeStyles[size],
    buttonVariantStyles[variant],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

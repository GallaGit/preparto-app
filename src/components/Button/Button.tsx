import type { ButtonProps, ButtonVariant } from '@/types/button';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-on-primary hover:bg-primary-600 active:bg-primary-600/90 focus-visible:ring-primary/40',
  secondary:
    'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low active:bg-surface-container focus-visible:ring-primary/30',
  danger:
    'bg-error text-on-error hover:bg-error/90 active:bg-error/80 focus-visible:ring-error/40',
  ghost:
    'bg-transparent text-primary hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary/30',
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center',
        'min-h-14 px-6 py-3',
        'text-lg font-semibold rounded-2xl',
        'transition-colors duration-200',
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
}

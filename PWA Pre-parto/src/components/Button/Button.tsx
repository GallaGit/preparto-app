import type { ButtonProps, ButtonVariant } from '@/types/button';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus-visible:ring-primary-400',
  secondary:
    'bg-white text-primary-800 border-2 border-primary-200 hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary-300',
  danger:
    'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-400',
  ghost:
    'bg-transparent text-primary-700 hover:bg-primary-100 active:bg-primary-200 focus-visible:ring-primary-300',
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
        'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-offset-2',
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

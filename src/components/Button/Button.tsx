import type { ButtonProps } from '@/types/button';
import { buttonClassName } from '@/components/Button/buttonStyles';

export function Button({
  variant = 'primary',
  fullWidth = false,
  size = 'default',
  className = '',
  children,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, fullWidth, size, className })}
      {...props}
    >
      {children}
    </button>
  );
}

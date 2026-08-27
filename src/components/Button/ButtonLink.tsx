import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { buttonClassName } from '@/components/Button/buttonStyles';
import type { ButtonSize, ButtonVariant } from '@/types/button';

type ButtonLinkBase = {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  'aria-label'?: string;
};

type ButtonLinkProps =
  | (ButtonLinkBase & { href: string; to?: never })
  | (ButtonLinkBase & { to: string; href?: never });

export function ButtonLink(props: ButtonLinkProps) {
  const {
    variant = 'primary',
    fullWidth = false,
    size = 'default',
    className = '',
    children,
  } = props;
  const classes = buttonClassName({ variant, fullWidth, size, className });
  const ariaLabel = props['aria-label'];

  if ('href' in props) {
    return (
      <a href={props.href} className={classes} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link to={props.to} className={classes} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

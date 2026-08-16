import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ActiveContractionBanner } from '@/components/ActiveContractionBanner';

const CONTRACTIONS_PATH = '/contractions';

interface PageHeaderProps {
  title: ReactNode;
  subtitle?: string;
  backTo?: string;
  centered?: boolean;
}

export function PageHeader({
  title,
  subtitle,
  backTo,
  centered = false,
}: PageHeaderProps) {
  const { pathname } = useLocation();
  const showActiveBanner = pathname !== CONTRACTIONS_PATH;

  return (
    <header className={centered ? 'mb-10 text-center' : 'mb-8'}>
      {backTo && (
        <Link
          to={backTo}
          className="mb-6 inline-flex min-h-11 items-center gap-1 rounded font-medium text-primary hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          aria-label="Volver"
        >
          ← Volver
        </Link>
      )}

      <h1
        className={
          centered
            ? 'mb-3 font-display text-4xl font-semibold tracking-tight text-on-surface'
            : 'font-display text-2xl font-semibold text-on-surface'
        }
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className={
            centered
              ? 'text-lg text-on-surface-variant'
              : 'mt-2 text-on-surface-variant'
          }
        >
          {subtitle}
        </p>
      )}

      {showActiveBanner && (
        <div className={centered ? 'mt-6' : 'mt-4'}>
          <ActiveContractionBanner />
        </div>
      )}
    </header>
  );
}

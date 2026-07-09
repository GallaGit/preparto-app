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
          className="inline-flex items-center gap-1 text-primary-600 hover:text-primary-800 font-medium mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded"
          aria-label="Volver al inicio"
        >
          ← Inicio
        </Link>
      )}

      <h1
        className={
          centered
            ? 'text-3xl font-bold text-primary-800 mb-3'
            : 'text-2xl font-bold text-primary-800'
        }
      >
        {title}
      </h1>

      {subtitle && (
        <p
          className={
            centered
              ? 'text-xl text-primary-600'
              : 'mt-2 text-primary-600'
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

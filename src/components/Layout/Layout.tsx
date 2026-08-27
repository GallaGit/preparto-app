import type { ReactNode } from 'react';
import { OfflineBanner } from '@/components/OfflineBanner';
import { UpdateBanner } from '@/components/UpdateBanner';
import { BottomNav } from '@/components/BottomNav';
import { useI18n } from '@/i18n/I18nProvider';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -left-16 top-24 h-64 w-64 rounded-full bg-primary-container/25 blur-3xl" />
        <div className="absolute -right-20 top-8 h-72 w-72 rounded-full bg-secondary-container/40 blur-3xl" />
        <div className="absolute bottom-32 left-1/3 h-56 w-56 rounded-full bg-primary-400/20 blur-3xl" />
      </div>

      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-surface-container-lowest focus:px-4 focus:py-3 focus:text-on-surface focus:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
      >
        {t('skipToContent')}
      </a>
      <main
        id="contenido-principal"
        className="relative z-10 mx-auto w-full max-w-md px-5 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-8"
        tabIndex={-1}
      >
        <UpdateBanner
          title={t('updateTitle')}
          actionLabel={t('updateAction')}
        />
        <OfflineBanner message={t('offlineMessage')} />
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

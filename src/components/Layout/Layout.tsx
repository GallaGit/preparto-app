import type { ReactNode } from 'react';
import { OfflineBanner } from '@/components/OfflineBanner';
import { UpdateBanner } from '@/components/UpdateBanner';
import { useI18n } from '@/i18n/I18nProvider';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-primary-50">
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-white focus:px-4 focus:py-3 focus:text-primary-900 focus:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300"
      >
        {t('skipToContent')}
      </a>
      <main
        id="contenido-principal"
        className="mx-auto w-full max-w-md px-5 py-8"
        tabIndex={-1}
      >
        <UpdateBanner title={t('updateTitle')} actionLabel={t('updateAction')} />
        <OfflineBanner message={t('offlineMessage')} />
        {children}
      </main>
    </div>
  );
}

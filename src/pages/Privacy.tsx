import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { getMedicalDisclaimerUrl } from '@/data/legal';
import { useI18n } from '@/i18n/I18nProvider';
import type { MessageKey } from '@/i18n/types';

const SECTIONS: ReadonlyArray<{
  titleKey: MessageKey;
  bodyKey: MessageKey;
}> = [
  { titleKey: 'privacy.storageTitle', bodyKey: 'privacy.storageBody' },
  { titleKey: 'privacy.accountTitle', bodyKey: 'privacy.accountBody' },
  { titleKey: 'privacy.syncTitle', bodyKey: 'privacy.syncBody' },
  {
    titleKey: 'privacy.notificationsTitle',
    bodyKey: 'privacy.notificationsBody',
  },
  { titleKey: 'privacy.saleTitle', bodyKey: 'privacy.saleBody' },
  { titleKey: 'privacy.exportTitle', bodyKey: 'privacy.exportBody' },
];

export function Privacy() {
  const { t, locale } = useI18n();

  return (
    <Layout>
      <PageHeader
        title={t('privacy.title')}
        subtitle={t('privacy.subtitle')}
        backTo="/settings"
      />

      <article className="mt-2 flex flex-col gap-8 text-on-surface">
        <p className="text-sm text-on-surface-variant">
          {t('privacy.updated')}
        </p>

        {SECTIONS.map((section) => (
          <section key={section.titleKey} className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-primary-800">
              {t(section.titleKey)}
            </h2>
            <p className="text-sm leading-relaxed text-primary-700">
              {t(section.bodyKey)}
            </p>
          </section>
        ))}

        <section
          className="flex flex-col gap-2"
          aria-labelledby="privacy-disclaimer-title"
        >
          <h2
            id="privacy-disclaimer-title"
            className="text-lg font-semibold text-primary-800"
          >
            {t('privacy.disclaimerTitle')}
          </h2>
          <p className="text-sm leading-relaxed text-primary-700">
            {t('privacy.disclaimerBody')}
          </p>
          <a
            href={getMedicalDisclaimerUrl(locale)}
            className="text-sm font-medium text-primary underline underline-offset-2 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            rel="noopener noreferrer"
            target="_blank"
          >
            {t('privacy.disclaimerLink')}
          </a>
        </section>
      </article>
    </Layout>
  );
}

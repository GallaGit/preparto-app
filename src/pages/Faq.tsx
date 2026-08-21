import { useDeferredValue, useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { IconCircle } from '@/components/Icon/IconCircle';
import {
  filterFaqItems,
  getFaqItems,
  groupFaqByCategory,
  type FaqCategoryId,
} from '@/data/faq';
import { useI18n } from '@/i18n/I18nProvider';
import type { MessageKey } from '@/i18n/types';
import { formFieldClassName } from '@/utils/formHelpers';

const categoryMessageKey: Record<FaqCategoryId, MessageKey> = {
  about: 'faq.category.about',
  features: 'faq.category.features',
  urgency: 'faq.category.urgency',
  privacy: 'faq.category.privacy',
  offline: 'faq.category.offline',
};

export function Faq() {
  const { t, locale } = useI18n();
  const searchId = useId();
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const filtered = filterFaqItems(getFaqItems(locale), deferredQuery);
  const groups = groupFaqByCategory(filtered);

  return (
    <Layout>
      <PageHeader
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        backTo="/"
      />

      <div className="mb-6">
        <Link
          to="/emergency"
          className="glass-panel flex min-h-14 items-center gap-3 rounded-2xl px-4 py-3 text-on-surface transition-colors hover:bg-white/55 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
        >
          <IconCircle name="alert" variant="urgent" />
          <span className="text-sm font-semibold">{t('faq.emergencyCta')}</span>
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-2">
        <label htmlFor={searchId} className="text-sm font-semibold text-on-surface">
          {t('faq.searchLabel')}
        </label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('faq.searchPlaceholder')}
          className={formFieldClassName}
          autoComplete="off"
        />
      </div>

      {groups.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-outline-variant px-4 py-8 text-center text-on-surface-variant">
          {t('faq.empty')}
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {groups.map((group) => (
            <section
              key={group.category}
              aria-labelledby={`faq-cat-${group.category}`}
            >
              <h2
                id={`faq-cat-${group.category}`}
                className="mb-3 font-display text-lg font-semibold text-on-surface"
              >
                {t(categoryMessageKey[group.category])}
              </h2>
              <ul className="flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <details className="glass-panel group rounded-2xl open:bg-white/55">
                      <summary className="cursor-pointer list-none px-4 py-4 font-semibold text-on-surface marker:content-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-primary/30 [&::-webkit-details-marker]:hidden">
                        <span className="flex items-start justify-between gap-3">
                          <span>{item.question}</span>
                          <span
                            className="mt-0.5 text-primary transition-transform group-open:rotate-180"
                            aria-hidden="true"
                          >
                            ▾
                          </span>
                        </span>
                      </summary>
                      <p className="border-t border-white/40 px-4 pb-4 pt-3 text-sm leading-relaxed text-on-surface-variant">
                        {item.answer}
                      </p>
                    </details>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}

      <p
        className="mt-10 text-center text-sm leading-relaxed text-on-surface-variant"
        role="note"
      >
        {t('faq.disclaimer')}
      </p>
    </Layout>
  );
}

import { ButtonLink } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { IconCircle } from '@/components/Icon/IconCircle';
import { useHospitalPhone } from '@/hooks/useHospitalPhone';
import { usePregnancySettings } from '@/hooks/usePregnancySettings';
import { useI18n } from '@/i18n/I18nProvider';
import { getAssessmentCopy } from '@/i18n/assessmentCopy';
import { getEmergencyNumber, hasDialablePhone, toTelHref } from '@/utils/phone';

const SETTINGS_HOSPITAL_HASH = '/settings#hospitalPhone';

export function Emergency() {
  const { t, locale } = useI18n();
  const { profile } = usePregnancySettings();
  const { phone, isLoading } = useHospitalPhone();
  const emergency = getEmergencyNumber(profile?.country);
  const canDialHospital = hasDialablePhone(phone);
  const disclaimer = getAssessmentCopy(locale).disclaimer;
  const emergencyCaption =
    emergency.countryCode === 'ES'
      ? t('emergency.captionEs')
      : t('emergency.captionCountry', { code: emergency.countryCode });

  return (
    <Layout>
      <PageHeader
        large
        title={t('emergency.title')}
        subtitle={t('emergency.subtitle')}
      />

      <div className="mt-2 flex flex-col gap-5 text-on-surface">
        <section
          className="rounded-3xl border border-error/40 bg-error-container px-5 py-4"
          aria-labelledby="emergency-when-title"
        >
          <div className="mb-3 flex items-center gap-3">
            <IconCircle name="alert" variant="urgent" />
            <h2 id="emergency-when-title" className="text-lg font-semibold">
              {t('emergency.whenTitle')}
            </h2>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-error-on-container">
            <li>{t('emergency.when.bleeding')}</li>
            <li>{t('emergency.when.fetal')}</li>
            <li>{t('emergency.when.water')}</li>
            <li>{t('emergency.when.pain')}</li>
            <li>{t('emergency.when.faint')}</li>
          </ul>
        </section>

        <section
          className="flex flex-col gap-4 rounded-3xl bg-surface-container-lowest px-5 py-5 shadow-glass"
          aria-labelledby="emergency-call-title"
        >
          <h2 id="emergency-call-title" className="text-lg font-semibold">
            {t('emergency.callTitle')}
          </h2>

          <div className="flex flex-col gap-2">
            <ButtonLink href={toTelHref(emergency.number)} fullWidth>
              {t('emergency.callNumber', { number: emergency.number })}
            </ButtonLink>
            <p className="text-center text-sm text-on-surface-variant">
              {emergencyCaption}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {isLoading ? (
              <p className="text-sm text-on-surface-variant" role="status">
                {t('emergency.loadingHospital')}
              </p>
            ) : canDialHospital ? (
              <ButtonLink href={toTelHref(phone)} variant="secondary" fullWidth>
                {t('emergency.callHospital')}
              </ButtonLink>
            ) : (
              <ButtonLink
                to={SETTINGS_HOSPITAL_HASH}
                variant="secondary"
                fullWidth
              >
                {t('emergency.callHospital')}
              </ButtonLink>
            )}
            <p className="text-center text-sm leading-relaxed text-on-surface-variant">
              {canDialHospital
                ? t('emergency.hospitalRefPhone', { phone })
                : t('emergency.hospitalRef')}
            </p>
            {canDialHospital ? null : (
              <p className="text-center text-sm leading-relaxed text-on-surface-variant">
                {t('emergency.addInSettings')}
              </p>
            )}
          </div>
        </section>

        <p
          className="text-center text-sm leading-relaxed text-on-surface-variant"
          role="note"
        >
          {disclaimer}
        </p>
      </div>
    </Layout>
  );
}

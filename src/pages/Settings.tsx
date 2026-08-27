import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { SelectField, TextField } from '@/components/Form';
import { formFieldClassName } from '@/utils/formHelpers';
import { usePregnancySettings } from '@/hooks/usePregnancySettings';
import { useHospitalPhone } from '@/hooks/useHospitalPhone';
import { useI18n } from '@/i18n/I18nProvider';
import { useNotificationSettings } from '@/providers/NotificationsProvider';
import type { Locale } from '@/i18n/types';
import type { PregnancyType } from '@/types/pregnancy';
import { DEFAULT_COUNTRY } from '@/types/pregnancy';
import {
  deriveGestationalWeek,
  toDateInputValue,
} from '@/utils/pregnancyHelpers';

const PREGNANCY_TYPE_OPTIONS = [
  { value: 'single', label: 'Único / Single' },
  { value: 'multiple', label: 'Múltiple / Multiple' },
];

const FIRST_PREGNANCY_OPTIONS = [
  { value: 'yes', label: 'Sí / Yes' },
  { value: 'no', label: 'No' },
];

const REMINDER_OPTIONS = [
  { value: '6', label: '6h' },
  { value: '12', label: '12h' },
  { value: '24', label: '24h' },
];

const LOCALE_OPTIONS = [
  { value: 'es', label: 'Español' },
  { value: 'en', label: 'English' },
];

export function Settings() {
  const { profile, isLoading, isSaving, error, fieldErrors, saveProfile } =
    usePregnancySettings();
  const {
    phone: storedHospitalPhone,
    isLoading: hospitalLoading,
    isSaving: hospitalSaving,
    savePhone,
  } = useHospitalPhone();
  const {
    preferences,
    permission,
    isLoading: prefsLoading,
    enableNotifications,
    updatePreferences,
  } = useNotificationSettings();
  const { t, locale, setLocale } = useI18n();

  const [dueDate, setDueDate] = useState('');
  const [gestationalWeek, setGestationalWeek] = useState('');
  const [pregnancyType, setPregnancyType] = useState<PregnancyType | ''>('');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState('');
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [hospitalPhone, setHospitalPhone] = useState('');
  const [savedMessage, setSavedMessage] = useState<string | null>(null);
  const [notifMessage, setNotifMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) {
      return;
    }
    setDueDate(profile.dueDate);
    setGestationalWeek(String(profile.gestationalWeek));
    setPregnancyType(profile.pregnancyType);
    setIsFirstPregnancy(profile.isFirstPregnancy ? 'yes' : 'no');
    setCountry(profile.country);
  }, [profile]);

  useEffect(() => {
    setHospitalPhone(storedHospitalPhone);
  }, [storedHospitalPhone]);

  useEffect(() => {
    if (isLoading || hospitalLoading) {
      return;
    }
    if (window.location.hash !== '#hospitalPhone') {
      return;
    }
    const field = document.getElementById('hospitalPhone');
    field?.focus();
    field?.scrollIntoView({ block: 'center' });
  }, [isLoading, hospitalLoading]);

  function handleDueDateChange(value: string) {
    setDueDate(value);
    if (value) {
      setGestationalWeek(String(deriveGestationalWeek(value)));
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSavedMessage(null);

    await savePhone(hospitalPhone);

    const weekNumber = Number(gestationalWeek);
    const wantsPregnancySave = Boolean(
      dueDate || pregnancyType || gestationalWeek,
    );

    if (!wantsPregnancySave) {
      if (hospitalPhone.trim()) {
        setSavedMessage(t('settings.saved'));
      }
      return;
    }

    const ok = await saveProfile({
      dueDate,
      gestationalWeek: Number.isFinite(weekNumber) ? weekNumber : undefined,
      pregnancyType: pregnancyType as PregnancyType,
      isFirstPregnancy: isFirstPregnancy === 'yes',
      country,
    });

    if (ok) {
      setSavedMessage(t('settings.saved'));
    }
  }

  async function handleEnableNotifications() {
    setNotifMessage(null);
    const ok = await enableNotifications();
    setNotifMessage(
      ok
        ? locale === 'en'
          ? 'Notifications enabled on this device.'
          : 'Notificaciones activadas en este dispositivo.'
        : locale === 'en'
          ? 'Could not enable notification permission.'
          : 'No se pudo activar el permiso de notificaciones.',
    );
  }

  return (
    <Layout>
      <PageHeader title={t('settings.title')} backTo="/" />

      {isLoading || prefsLoading || hospitalLoading ? (
        <p className="text-primary-700" role="status">
          {t('settings.loading')}
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-10">
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <p className="text-sm text-primary-600 leading-relaxed">
              {t('settings.intro')}
            </p>

            <SelectField
              id="locale"
              label={t('settings.locale')}
              options={LOCALE_OPTIONS}
              value={locale}
              onChange={(event) => void setLocale(event.target.value as Locale)}
            />

            <div className="flex flex-col gap-2">
              <label
                htmlFor="dueDate"
                className="text-sm font-semibold text-primary-800"
              >
                {t('settings.dueDate')}
              </label>
              <input
                id="dueDate"
                type="date"
                className={formFieldClassName}
                value={dueDate}
                onChange={(event) => handleDueDateChange(event.target.value)}
                aria-invalid={fieldErrors.dueDate ? true : undefined}
                aria-describedby={
                  fieldErrors.dueDate ? 'dueDate-error' : undefined
                }
              />
              {fieldErrors.dueDate ? (
                <p
                  id="dueDate-error"
                  className="text-sm text-red-600"
                  role="alert"
                >
                  {fieldErrors.dueDate}
                </p>
              ) : null}
            </div>

            <TextField
              id="gestationalWeek"
              label={t('settings.gestationalWeek')}
              type="number"
              min={0}
              max={42}
              value={gestationalWeek}
              onChange={(event) => setGestationalWeek(event.target.value)}
              error={fieldErrors.gestationalWeek}
            />

            <SelectField
              id="pregnancyType"
              label={t('settings.pregnancyType')}
              options={PREGNANCY_TYPE_OPTIONS}
              value={pregnancyType}
              onChange={(event) =>
                setPregnancyType(event.target.value as PregnancyType | '')
              }
              error={fieldErrors.pregnancyType}
            />

            <SelectField
              id="isFirstPregnancy"
              label={t('settings.firstPregnancy')}
              options={FIRST_PREGNANCY_OPTIONS}
              value={isFirstPregnancy}
              onChange={(event) => setIsFirstPregnancy(event.target.value)}
            />

            <TextField
              id="country"
              label={t('settings.country')}
              value={country}
              maxLength={2}
              onChange={(event) => setCountry(event.target.value.toUpperCase())}
              error={fieldErrors.country}
            />

            <section
              className="flex flex-col gap-3 rounded-2xl border border-outline-variant bg-surface-container-lowest p-4"
              aria-labelledby="hospital-heading"
            >
              <h2
                id="hospital-heading"
                className="text-lg font-semibold text-primary-800"
              >
                {t('settings.hospital')}
              </h2>
              <p className="text-sm leading-relaxed text-primary-600">
                {t('settings.hospitalPhoneHint')}
              </p>
              <TextField
                id="hospitalPhone"
                label={t('settings.hospitalPhone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={hospitalPhone}
                onChange={(event) => setHospitalPhone(event.target.value)}
                placeholder="91 000 00 00"
              />
            </section>

            {error ? (
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            ) : null}
            {savedMessage ? (
              <p className="text-sm text-accent-700" role="status">
                {savedMessage}
              </p>
            ) : null}

            <Button
              type="submit"
              fullWidth
              disabled={isSaving || hospitalSaving}
            >
              {isSaving || hospitalSaving
                ? t('settings.saving')
                : t('settings.save')}
            </Button>

            {!profile && !dueDate ? (
              <p className="text-xs text-primary-500">
                {toDateInputValue(
                  new Date(Date.now() + 40 * 7 * 24 * 60 * 60 * 1000),
                )}
              </p>
            ) : null}
          </form>

          <section
            className="flex flex-col gap-4"
            aria-labelledby="notifications-heading"
          >
            <h2
              id="notifications-heading"
              className="text-lg font-semibold text-primary-800"
            >
              {t('settings.notifications')}
            </h2>
            <p className="text-sm text-primary-600 leading-relaxed">
              {t('settings.notificationsIntro')}
            </p>
            <p className="text-sm text-primary-700">{permission}</p>

            <Button
              type="button"
              variant="secondary"
              fullWidth
              onClick={() => void handleEnableNotifications()}
            >
              {t('settings.enablePermission')}
            </Button>

            <label className="flex min-h-11 items-center gap-3 text-sm text-primary-800">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={preferences.notificationsEnabled}
                onChange={(event) =>
                  void updatePreferences({
                    notificationsEnabled: event.target.checked,
                  })
                }
                disabled={permission !== 'granted'}
              />
              {t('settings.enableReminders')}
            </label>

            <SelectField
              id="recordingReminderHours"
              label={t('settings.reminderFrequency')}
              options={REMINDER_OPTIONS}
              value={String(preferences.recordingReminderHours)}
              onChange={(event) =>
                void updatePreferences({
                  recordingReminderHours: Number(event.target.value),
                })
              }
              disabled={!preferences.notificationsEnabled}
            />

            <label className="flex min-h-11 items-center gap-3 text-sm text-primary-800">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={preferences.notifyTimerActive}
                onChange={(event) =>
                  void updatePreferences({
                    notifyTimerActive: event.target.checked,
                  })
                }
                disabled={!preferences.notificationsEnabled}
              />
              {t('settings.notifyTimer')}
            </label>

            {notifMessage ? (
              <p className="text-sm text-accent-700" role="status">
                {notifMessage}
              </p>
            ) : null}
          </section>
        </div>
      )}
    </Layout>
  );
}

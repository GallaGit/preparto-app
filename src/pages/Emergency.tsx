import { ButtonLink } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { IconCircle } from '@/components/Icon/IconCircle';
import { useHospitalPhone } from '@/hooks/useHospitalPhone';
import { usePregnancySettings } from '@/hooks/usePregnancySettings';
import { ASSESSMENT_DISCLAIMER } from '@/services/assessmentEngine';
import { getEmergencyNumber, hasDialablePhone, toTelHref } from '@/utils/phone';

const SETTINGS_HOSPITAL_HASH = '/settings#hospitalPhone';

export function Emergency() {
  const { profile } = usePregnancySettings();
  const { phone, isLoading } = useHospitalPhone();
  const emergency = getEmergencyNumber(profile?.country);
  const canDialHospital = hasDialablePhone(phone);

  return (
    <Layout>
      <PageHeader
        large
        title="Emergencia"
        subtitle="Orientación general. No es un diagnóstico."
      />

      <div className="mt-2 flex flex-col gap-5 text-on-surface">
        <section
          className="rounded-3xl border border-error/40 bg-error-container px-5 py-4"
          aria-labelledby="emergency-when-title"
        >
          <div className="mb-3 flex items-center gap-3">
            <IconCircle name="alert" variant="urgent" />
            <h2 id="emergency-when-title" className="text-lg font-semibold">
              Contacta o ve al hospital si...
            </h2>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-error-on-container">
            <li>Sangrado abundante o rojo vivo</li>
            <li>El bebé no se mueve</li>
            <li>Rotura de bolsa con fiebre o contracciones</li>
            <li>Dolor intenso que no cede</li>
            <li>Mareo fuerte, desmayo o malestar grave</li>
          </ul>
        </section>

        <section
          className="flex flex-col gap-4 rounded-3xl bg-surface-container-lowest px-5 py-5 shadow-glass"
          aria-labelledby="emergency-call-title"
        >
          <h2 id="emergency-call-title" className="text-lg font-semibold">
            Llama ahora
          </h2>

          <div className="flex flex-col gap-2">
            <ButtonLink href={toTelHref(emergency.number)} fullWidth>
              Llamar al {emergency.number}
            </ButtonLink>
            <p className="text-center text-sm text-on-surface-variant">
              {emergency.caption}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {isLoading ? (
              <p className="text-sm text-on-surface-variant" role="status">
                Cargando teléfono del hospital…
              </p>
            ) : canDialHospital ? (
              <ButtonLink href={toTelHref(phone)} variant="secondary" fullWidth>
                Llamar a mi hospital
              </ButtonLink>
            ) : (
              <ButtonLink
                to={SETTINGS_HOSPITAL_HASH}
                variant="secondary"
                fullWidth
              >
                Llamar a mi hospital
              </ButtonLink>
            )}
            <p className="text-center text-sm leading-relaxed text-on-surface-variant">
              {canDialHospital
                ? `Hospital de referencia · ${phone}`
                : 'Hospital de referencia · Añádelo en Configuración si aún no está'}
            </p>
          </div>
        </section>

        <p
          className="text-center text-sm leading-relaxed text-on-surface-variant"
          role="note"
        >
          {ASSESSMENT_DISCLAIMER}
        </p>
      </div>
    </Layout>
  );
}

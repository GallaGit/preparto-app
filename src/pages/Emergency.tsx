import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { IconCircle } from '@/components/Icon/IconCircle';
import { ASSESSMENT_DISCLAIMER } from '@/services/assessmentEngine';

export function Emergency() {
  return (
    <Layout>
      <PageHeader
        title="Emergencia"
        subtitle="Orientación general. No es un diagnóstico."
        backTo="/"
      />

      <div className="mt-6 flex flex-col gap-5 text-on-surface">
        <section
          className="rounded-2xl border border-error/40 bg-error-container px-5 py-4"
          aria-labelledby="emergency-when-title"
        >
          <div className="mb-3 flex items-center gap-3">
            <IconCircle name="alert" variant="urgent" />
            <h2 id="emergency-when-title" className="text-lg font-semibold">
              Contacta o ve al hospital si…
            </h2>
          </div>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-error-on-container">
            <li>Sangrado abundante o rojo vivo.</li>
            <li>Ausencia de movimientos del bebé.</li>
            <li>Rotura de bolsa, especialmente con contracciones o fiebre.</li>
            <li>Contracciones muy frecuentes o dolor intenso que no cede.</li>
            <li>Mareo intenso, desmayo, fiebre alta o malestar grave.</li>
          </ul>
        </section>

        <section
          className="rounded-2xl border border-outline-variant bg-surface-container-lowest px-5 py-4"
          aria-labelledby="emergency-how-title"
        >
          <h2 id="emergency-how-title" className="mb-3 text-lg font-semibold">
            Qué puedes hacer ahora
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-on-surface-variant">
            <li>Llama a tu matrona, hospital de referencia o servicios de urgencia.</li>
            <li>Sigue el protocolo que te hayan indicado en tu seguimiento prenatal.</li>
            <li>Si puedes, registra el síntoma en la app para tener constancia.</li>
          </ul>
        </section>

        <p className="text-sm leading-relaxed text-on-surface-variant" role="note">
          {ASSESSMENT_DISCLAIMER}
        </p>
      </div>
    </Layout>
  );
}

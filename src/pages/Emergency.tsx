import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { ASSESSMENT_DISCLAIMER } from '@/services/assessmentEngine';

export function Emergency() {
  return (
    <Layout>
      <PageHeader
        title="Emergencia"
        subtitle="Orientación general. No es un diagnóstico."
        backTo="/"
      />

      <div className="mt-6 flex flex-col gap-5 text-primary-900">
        <section
          className="rounded-2xl border-2 border-red-400 bg-red-50 px-5 py-4"
          aria-labelledby="emergency-when-title"
        >
          <h2 id="emergency-when-title" className="text-lg font-semibold mb-3">
            Contacta o ve al hospital si…
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
            <li>Sangrado abundante o rojo vivo.</li>
            <li>Ausencia de movimientos del bebé.</li>
            <li>Rotura de bolsa, especialmente con contracciones o fiebre.</li>
            <li>Contracciones muy frecuentes o dolor intenso que no cede.</li>
            <li>Mareo intenso, desmayo, fiebre alta o malestar grave.</li>
          </ul>
        </section>

        <section
          className="rounded-2xl border-2 border-primary-200 bg-white px-5 py-4"
          aria-labelledby="emergency-how-title"
        >
          <h2 id="emergency-how-title" className="text-lg font-semibold mb-3">
            Qué puedes hacer ahora
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm leading-relaxed">
            <li>Llama a tu matrona, hospital de referencia o servicios de urgencia.</li>
            <li>Sigue el protocolo que te hayan indicado en tu seguimiento prenatal.</li>
            <li>Si puedes, registra el síntoma en la app para tener constancia.</li>
          </ul>
        </section>

        <p className="text-sm text-primary-600 leading-relaxed" role="note">
          {ASSESSMENT_DISCLAIMER}
        </p>
      </div>
    </Layout>
  );
}

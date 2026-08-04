import { Card } from '@/components/Card';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { SYMPTOM_CATALOG } from '@/data/symptomOptions';

export function Symptoms() {
  return (
    <Layout>
      <PageHeader
        title="Síntomas"
        subtitle="Elige qué quieres registrar"
        backTo="/"
      />

      <nav className="flex flex-col gap-3" aria-label="Tipos de síntomas">
        {SYMPTOM_CATALOG.filter((item) => item.hubVisible).map((item) => (
          <Card
            key={item.type}
            to={item.path}
            icon={item.icon}
            label={item.label}
          />
        ))}
      </nav>

      <p className="mt-8 text-center text-sm text-primary-600">
        Las contracciones se registran desde el cronómetro.
      </p>
    </Layout>
  );
}

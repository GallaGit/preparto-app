import { useMemo, useState } from 'react';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { RecommendationBanner } from '@/components/RecommendationBanner';
import { HistoryFilters, HistoryTimeline } from '@/components/history';
import { useAssessment } from '@/hooks/useAssessment';
import { useContractions } from '@/hooks/useContractions';
import { useSymptoms } from '@/hooks/useSymptoms';
import type { HistoryFilterType } from '@/types/history';
import { buildTimeline } from '@/utils/historyTimeline';

export function History() {
  const { contractions, isLoading: contractionsLoading } = useContractions();
  const { symptoms, isLoading: symptomsLoading } = useSymptoms();
  const { assessment } = useAssessment();
  const [day, setDay] = useState('');
  const [type, setType] = useState<HistoryFilterType>('all');

  const items = useMemo(
    () =>
      buildTimeline(symptoms, contractions, {
        day: day || null,
        type,
      }),
    [symptoms, contractions, day, type],
  );

  const isLoading = contractionsLoading || symptomsLoading;

  return (
    <Layout>
      <PageHeader
        title="Historial"
        subtitle="Consulta todo lo registrado: síntomas y contracciones."
        backTo="/"
      />

      <div className="mt-6 flex flex-col gap-6">
        <RecommendationBanner assessment={assessment} />

        <HistoryFilters
          day={day}
          type={type}
          onDayChange={setDay}
          onTypeChange={setType}
        />

        {isLoading ? (
          <p role="status" className="text-primary-700">
            Cargando historial…
          </p>
        ) : (
          <HistoryTimeline items={items} />
        )}
      </div>
    </Layout>
  );
}

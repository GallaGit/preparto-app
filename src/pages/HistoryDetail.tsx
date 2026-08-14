import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { TextAreaField } from '@/components/Form';
import { SymptomForm } from '@/components/symptoms';
import { getSymptomCatalogItem } from '@/data/symptomOptions';
import { useContractions } from '@/hooks/useContractions';
import { useSymptoms } from '@/hooks/useSymptoms';
import * as contractionsStorage from '@/services/contractionsStorage';
import type { Contraction } from '@/types/contraction';
import type { SymptomRecord } from '@/types/symptom';
import { isHistoryKind } from '@/types/history';
import { formatDuration } from '@/utils/formatDuration';
import { formatTime } from '@/utils/formatTime';
import { symptomRecordToFormState } from '@/utils/symptomFormState';

export function HistoryDetail() {
  const { kind, id } = useParams<{ kind: string; id: string }>();
  const navigate = useNavigate();
  const { removeContraction, loadContractions } = useContractions();
  const {
    isSaving,
    error,
    fieldErrors,
    saveSymptom,
    deleteSymptom,
    getSymptomById,
  } = useSymptoms();

  const [symptom, setSymptom] = useState<SymptomRecord | null>(null);
  const [contraction, setContraction] = useState<Contraction | null>(null);
  const [notes, setNotes] = useState('');
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setLoadError(null);

      if (!kind || !id || !isHistoryKind(kind)) {
        setLoadError('Registro no válido.');
        setIsLoading(false);
        return;
      }

      try {
        if (kind === 'symptom') {
          const record = await getSymptomById(id);
          if (cancelled) return;
          if (!record) {
            setLoadError('No se encontró el registro.');
          } else {
            setSymptom(record);
          }
        } else {
          const record = await contractionsStorage.getById(id);
          if (cancelled) return;
          if (!record) {
            setLoadError('No se encontró la contracción.');
          } else {
            setContraction(record);
            setNotes(record.notes ?? '');
          }
        }
      } catch {
        if (!cancelled) {
          setLoadError('No se pudo cargar el detalle.');
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [kind, id, getSymptomById]);

  async function handleDelete() {
    if (!kind || !id) return;

    const confirmed = window.confirm(
      '¿Eliminar este registro? Esta acción no se puede deshacer.',
    );
    if (!confirmed) return;

    if (kind === 'symptom') {
      const ok = await deleteSymptom(id);
      if (ok) {
        void navigate('/history');
      }
      return;
    }

    await removeContraction(id);
    void navigate('/history');
  }

  async function handleContractionSave(event: FormEvent) {
    event.preventDefault();
    if (!contraction) return;

    const updated: Contraction = {
      ...contraction,
      notes: notes.trim(),
    };

    try {
      await contractionsStorage.update(updated);
      setContraction(updated);
      setSavedMessage('Observaciones actualizadas.');
      await loadContractions();
    } catch {
      setLoadError('No se pudo guardar la contracción.');
    }
  }

  const title =
    kind === 'contraction'
      ? 'Detalle de contracción'
      : getSymptomCatalogItem(symptom?.type ?? 'mucus_plug')?.label ??
        'Detalle';

  return (
    <Layout>
      <PageHeader title={title} backTo="/history" />

      {isLoading ? (
        <p role="status" className="mt-6 text-primary-700">
          Cargando…
        </p>
      ) : null}

      {loadError ? (
        <p className="mt-6 text-sm text-red-600" role="alert">
          {loadError}
        </p>
      ) : null}

      {symptom ? (
        <div className="mt-6 flex flex-col gap-6">
          <SymptomForm
            type={symptom.type}
            isSaving={isSaving}
            error={error}
            fieldErrors={fieldErrors}
            initialState={symptomRecordToFormState(symptom)}
            resetOnSuccess={false}
            submitLabel="Guardar cambios"
            onSubmit={async (raw) => {
              const ok = await saveSymptom(symptom.type, raw, {
                id: symptom.id,
              });
              if (ok) {
                setSavedMessage('Registro actualizado.');
                const refreshed = await getSymptomById(symptom.id);
                if (refreshed) setSymptom(refreshed);
              }
              return ok;
            }}
          />
          {savedMessage ? (
            <p className="text-sm text-green-700" role="status">
              {savedMessage}
            </p>
          ) : null}
          <Button variant="danger" fullWidth onClick={() => void handleDelete()}>
            Eliminar registro
          </Button>
        </div>
      ) : null}

      {contraction ? (
        <div className="mt-6 flex flex-col gap-5">
          <dl className="rounded-2xl border-2 border-primary-200 bg-white px-4 py-4 text-sm text-primary-800">
            <div className="flex justify-between gap-3 py-1">
              <dt className="font-semibold">Inicio</dt>
              <dd>
                {contraction.startedAt.toLocaleDateString('es-ES')}{' '}
                {formatTime(contraction.startedAt)}
              </dd>
            </div>
            <div className="flex justify-between gap-3 py-1">
              <dt className="font-semibold">Duración</dt>
              <dd>{formatDuration(contraction.durationSeconds * 1000)}</dd>
            </div>
            {contraction.intervalSeconds !== undefined ? (
              <div className="flex justify-between gap-3 py-1">
                <dt className="font-semibold">Intervalo</dt>
                <dd>{formatDuration(contraction.intervalSeconds * 1000)}</dd>
              </div>
            ) : null}
          </dl>

          <form className="flex flex-col gap-4" onSubmit={(e) => void handleContractionSave(e)}>
            <TextAreaField
              id="contraction-notes"
              label="Observaciones"
              value={notes}
              onChange={(event) => {
                setSavedMessage(null);
                setNotes(event.target.value);
              }}
            />
            {savedMessage ? (
              <p className="text-sm text-green-700" role="status">
                {savedMessage}
              </p>
            ) : null}
            <Button type="submit" fullWidth>
              Guardar cambios
            </Button>
          </form>

          <Button variant="danger" fullWidth onClick={() => void handleDelete()}>
            Eliminar contracción
          </Button>
        </div>
      ) : null}
    </Layout>
  );
}

import { useEffect, useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import { Layout } from '@/components/Layout';
import { PageHeader } from '@/components/PageHeader';
import { SelectField, TextField } from '@/components/Form';
import { formFieldClassName } from '@/utils/formHelpers';
import { usePregnancySettings } from '@/hooks/usePregnancySettings';
import type { PregnancyType } from '@/types/pregnancy';
import { DEFAULT_COUNTRY } from '@/types/pregnancy';
import {
  deriveGestationalWeek,
  toDateInputValue,
} from '@/utils/pregnancyHelpers';

const PREGNANCY_TYPE_OPTIONS = [
  { value: 'single', label: 'Único' },
  { value: 'multiple', label: 'Múltiple' },
];

const FIRST_PREGNANCY_OPTIONS = [
  { value: 'yes', label: 'Sí' },
  { value: 'no', label: 'No' },
];

export function Settings() {
  const { profile, isLoading, isSaving, error, fieldErrors, saveProfile } =
    usePregnancySettings();

  const [dueDate, setDueDate] = useState('');
  const [gestationalWeek, setGestationalWeek] = useState('');
  const [pregnancyType, setPregnancyType] = useState<PregnancyType | ''>('');
  const [isFirstPregnancy, setIsFirstPregnancy] = useState('');
  const [country, setCountry] = useState(DEFAULT_COUNTRY);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

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

  function handleDueDateChange(value: string) {
    setDueDate(value);
    if (value) {
      setGestationalWeek(String(deriveGestationalWeek(value)));
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSavedMessage(null);

    const weekNumber = Number(gestationalWeek);
    const ok = await saveProfile({
      dueDate,
      gestationalWeek: Number.isFinite(weekNumber) ? weekNumber : undefined,
      pregnancyType: pregnancyType as PregnancyType,
      isFirstPregnancy: isFirstPregnancy === 'yes',
      country,
    });

    if (ok) {
      setSavedMessage('Configuración guardada.');
    }
  }

  return (
    <Layout>
      <PageHeader title="Configuración" backTo="/" />

      {isLoading ? (
        <p className="text-primary-700" role="status">
          Cargando configuración…
        </p>
      ) : (
        <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          <p className="text-sm text-primary-600 leading-relaxed">
            Estos datos ayudan a contextualizar las recomendaciones. No se
            envían a ningún servidor.
          </p>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="dueDate"
              className="text-sm font-semibold text-primary-800"
            >
              Fecha probable de parto
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
              <p id="dueDate-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.dueDate}
              </p>
            ) : null}
          </div>

          <TextField
            id="gestationalWeek"
            label="Semana gestacional"
            type="number"
            min={0}
            max={42}
            value={gestationalWeek}
            onChange={(event) => setGestationalWeek(event.target.value)}
            error={fieldErrors.gestationalWeek}
          />

          <SelectField
            id="pregnancyType"
            label="Tipo de embarazo"
            options={PREGNANCY_TYPE_OPTIONS}
            value={pregnancyType}
            onChange={(event) =>
              setPregnancyType(event.target.value as PregnancyType | '')
            }
            error={fieldErrors.pregnancyType}
          />

          <SelectField
            id="isFirstPregnancy"
            label="¿Es tu primer embarazo?"
            options={FIRST_PREGNANCY_OPTIONS}
            value={isFirstPregnancy}
            onChange={(event) => setIsFirstPregnancy(event.target.value)}
          />

          <TextField
            id="country"
            label="País (código ISO)"
            value={country}
            maxLength={2}
            onChange={(event) => setCountry(event.target.value.toUpperCase())}
            error={fieldErrors.country}
          />

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

          <Button type="submit" fullWidth disabled={isSaving}>
            {isSaving ? 'Guardando…' : 'Guardar'}
          </Button>

          {!profile && !dueDate ? (
            <p className="text-xs text-primary-500">
              Sugerencia: fecha de hoy + 40 semanas ≈{' '}
              {toDateInputValue(
                new Date(Date.now() + 40 * 7 * 24 * 60 * 60 * 1000),
              )}
            </p>
          ) : null}
        </form>
      )}
    </Layout>
  );
}

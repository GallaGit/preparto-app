import { useState, type FormEvent } from 'react';
import { Button } from '@/components/Button';
import {
  DateTimeField,
  SelectField,
  TextAreaField,
  TextField,
  toDateTimeLocalValue,
} from '@/components/Form';
import {
  AMOUNT_OPTIONS,
  BLEEDING_COLOR_OPTIONS,
  FETAL_FREQUENCY_OPTIONS,
  FLUID_COLOR_OPTIONS,
  INTENSITY_OPTIONS,
  MUCUS_COLOR_OPTIONS,
  ODOR_OPTIONS,
  type SelectOption,
} from '@/data/symptomOptions';
import { useI18n } from '@/i18n/I18nProvider';
import type {
  AmountLevel,
  BleedingColor,
  FetalMovementFrequency,
  FluidColor,
  MucusColor,
  OdorLevel,
  SymptomFieldErrors,
  SymptomInputByType,
  SymptomType,
} from '@/types/symptom';

type FormState = {
  recordedAt: string;
  notes: string;
  amount: string;
  color: string;
  odor: string;
  frequency: string;
  intensity: string;
  durationMinutes: string;
  episodes: string;
};

interface SymptomFormProps<T extends SymptomType> {
  type: T;
  isSaving: boolean;
  error: string | null;
  fieldErrors: SymptomFieldErrors;
  onSubmit: (raw: SymptomInputByType[T]) => Promise<boolean>;
  submitLabel?: string;
  initialState?: Partial<FormState>;
  resetOnSuccess?: boolean;
}

function createInitialState(overrides?: Partial<FormState>): FormState {
  return {
    recordedAt: toDateTimeLocalValue(new Date()),
    notes: '',
    amount: '',
    color: '',
    odor: '',
    frequency: '',
    intensity: '',
    durationMinutes: '',
    episodes: '',
    ...overrides,
  };
}

function buildRaw<T extends SymptomType>(
  type: T,
  state: FormState,
): SymptomInputByType[T] {
  const notes = state.notes;
  const recordedAt = state.recordedAt;

  switch (type) {
    case 'mucus_plug':
      return {
        recordedAt,
        notes,
        amount: state.amount as AmountLevel,
        color: state.color as MucusColor,
      } as SymptomInputByType[T];
    case 'water_break':
      return {
        recordedAt,
        notes,
        amount: state.amount as AmountLevel,
        color: state.color as FluidColor,
        odor: state.odor as OdorLevel,
      } as SymptomInputByType[T];
    case 'bleeding':
      return {
        recordedAt,
        notes,
        amount: state.amount as AmountLevel,
        color: state.color as BleedingColor,
      } as SymptomInputByType[T];
    case 'fetal_movement':
      return {
        recordedAt,
        notes,
        frequency: state.frequency as FetalMovementFrequency,
      } as SymptomInputByType[T];
    case 'back_pain':
      return {
        recordedAt,
        notes,
        intensity: Number(state.intensity),
        durationMinutes: Number(state.durationMinutes),
      } as SymptomInputByType[T];
    case 'pelvic_pressure':
    case 'nausea':
      return {
        recordedAt,
        notes,
        intensity: Number(state.intensity),
      } as SymptomInputByType[T];
    case 'diarrhea':
      return {
        recordedAt,
        notes,
        episodes: Number(state.episodes),
      } as SymptomInputByType[T];
    case 'chills':
      return {
        recordedAt,
        notes,
        durationMinutes: Number(state.durationMinutes),
      } as SymptomInputByType[T];
    default: {
      const _exhaustive: never = type;
      throw new Error(`Unsupported symptom type: ${String(_exhaustive)}`);
    }
  }
}

export function SymptomForm<T extends SymptomType>({
  type,
  isSaving,
  error,
  fieldErrors,
  onSubmit,
  submitLabel,
  initialState,
  resetOnSuccess = true,
}: SymptomFormProps<T>) {
  const { t } = useI18n();
  const [state, setState] = useState<FormState>(() =>
    createInitialState(initialState),
  );
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const submitText = submitLabel ?? t('symptoms.save');
  const localizeOptions = <V extends string>(options: SelectOption<V>[]) =>
    options.map((option) => ({
      value: option.value,
      label: t(option.labelKey),
    }));

  const updateField = (field: keyof FormState, value: string) => {
    setSavedMessage(null);
    setState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedMessage(null);

    const ok = await onSubmit(buildRaw(type, state));
    if (ok) {
      setSavedMessage(t('symptoms.saved'));
      if (resetOnSuccess) {
        setState(createInitialState());
      }
    }
  };

  const showAmount =
    type === 'mucus_plug' || type === 'water_break' || type === 'bleeding';
  const showMucusColor = type === 'mucus_plug';
  const showFluidColor = type === 'water_break';
  const showBleedingColor = type === 'bleeding';
  const showOdor = type === 'water_break';
  const showFrequency = type === 'fetal_movement';
  const showIntensity =
    type === 'back_pain' || type === 'pelvic_pressure' || type === 'nausea';
  const showDuration = type === 'back_pain' || type === 'chills';
  const showEpisodes = type === 'diarrhea';

  return (
    <form className="flex flex-col gap-5" onSubmit={(e) => void handleSubmit(e)} noValidate>
      <DateTimeField
        id="recordedAt"
        label={t('symptoms.field.recordedAt')}
        value={state.recordedAt}
        onChange={(event) => updateField('recordedAt', event.target.value)}
        error={fieldErrors.recordedAt}
        required
      />

      {showAmount ? (
        <SelectField
          id="amount"
          label={t('symptoms.field.amount')}
          options={localizeOptions(AMOUNT_OPTIONS)}
          value={state.amount}
          onChange={(event) => updateField('amount', event.target.value)}
          error={fieldErrors.amount}
          required
        />
      ) : null}

      {showMucusColor ? (
        <SelectField
          id="color"
          label={t('symptoms.field.color')}
          options={localizeOptions(MUCUS_COLOR_OPTIONS)}
          value={state.color}
          onChange={(event) => updateField('color', event.target.value)}
          error={fieldErrors.color}
          required
        />
      ) : null}

      {showFluidColor ? (
        <SelectField
          id="color"
          label={t('symptoms.field.fluidColor')}
          options={localizeOptions(FLUID_COLOR_OPTIONS)}
          value={state.color}
          onChange={(event) => updateField('color', event.target.value)}
          error={fieldErrors.color}
          required
        />
      ) : null}

      {showBleedingColor ? (
        <SelectField
          id="color"
          label={t('symptoms.field.color')}
          options={localizeOptions(BLEEDING_COLOR_OPTIONS)}
          value={state.color}
          onChange={(event) => updateField('color', event.target.value)}
          error={fieldErrors.color}
          required
        />
      ) : null}

      {showOdor ? (
        <SelectField
          id="odor"
          label={t('symptoms.field.odor')}
          options={localizeOptions(ODOR_OPTIONS)}
          value={state.odor}
          onChange={(event) => updateField('odor', event.target.value)}
          error={fieldErrors.odor}
          required
        />
      ) : null}

      {showFrequency ? (
        <SelectField
          id="frequency"
          label={t('symptoms.field.frequency')}
          options={localizeOptions(FETAL_FREQUENCY_OPTIONS)}
          value={state.frequency}
          onChange={(event) => updateField('frequency', event.target.value)}
          error={fieldErrors.frequency}
          required
        />
      ) : null}

      {showIntensity ? (
        <SelectField
          id="intensity"
          label={t('symptoms.field.intensity')}
          options={localizeOptions(INTENSITY_OPTIONS)}
          value={state.intensity}
          onChange={(event) => updateField('intensity', event.target.value)}
          error={fieldErrors.intensity}
          required
        />
      ) : null}

      {showDuration ? (
        <TextField
          id="durationMinutes"
          label={t('symptoms.field.durationMinutes')}
          type="number"
          min={1}
          step={1}
          inputMode="numeric"
          value={state.durationMinutes}
          onChange={(event) =>
            updateField('durationMinutes', event.target.value)
          }
          error={fieldErrors.durationMinutes}
          required
        />
      ) : null}

      {showEpisodes ? (
        <TextField
          id="episodes"
          label={t('symptoms.field.episodes')}
          type="number"
          min={1}
          step={1}
          inputMode="numeric"
          value={state.episodes}
          onChange={(event) => updateField('episodes', event.target.value)}
          error={fieldErrors.episodes}
          required
        />
      ) : null}

      <TextAreaField
        id="notes"
        label={t('symptoms.field.notes')}
        value={state.notes}
        onChange={(event) => updateField('notes', event.target.value)}
        error={fieldErrors.notes}
      />

      {error ? (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      ) : null}

      {savedMessage ? (
        <p className="text-sm text-green-700" role="status">
          {savedMessage}
        </p>
      ) : null}

      <Button type="submit" fullWidth disabled={isSaving}>
        {isSaving ? t('symptoms.saving') : submitText}
      </Button>
    </form>
  );
}

import type { IconKey } from '@/icons/iconMap';
import type {
  AmountLevel,
  BleedingColor,
  FetalMovementFrequency,
  FluidColor,
  MucusColor,
  OdorLevel,
  SymptomType,
} from '@/types/symptom';

export type SelectOption<T extends string> = {
  value: T;
  label: string;
};

export const AMOUNT_OPTIONS: SelectOption<AmountLevel>[] = [
  { value: 'scarce', label: 'Escasa' },
  { value: 'moderate', label: 'Moderada' },
  { value: 'abundant', label: 'Abundante' },
];

export const MUCUS_COLOR_OPTIONS: SelectOption<MucusColor>[] = [
  { value: 'clear', label: 'Claro' },
  { value: 'white', label: 'Blanco' },
  { value: 'pink', label: 'Rosado' },
  { value: 'brown', label: 'Marrón' },
  { value: 'bloody', label: 'Sanguinolento' },
  { value: 'other', label: 'Otro' },
];

export const FLUID_COLOR_OPTIONS: SelectOption<FluidColor>[] = [
  { value: 'clear', label: 'Claro' },
  { value: 'yellowish', label: 'Amarillento' },
  { value: 'greenish', label: 'Verdoso' },
  { value: 'brown', label: 'Marrón' },
  { value: 'bloody', label: 'Sanguinolento' },
  { value: 'other', label: 'Otro' },
];

export const ODOR_OPTIONS: SelectOption<OdorLevel>[] = [
  { value: 'none', label: 'Sin olor' },
  { value: 'mild', label: 'Suave' },
  { value: 'strong', label: 'Fuerte' },
  { value: 'unpleasant', label: 'Desagradable' },
];

export const BLEEDING_COLOR_OPTIONS: SelectOption<BleedingColor>[] = [
  { value: 'pink', label: 'Rosado' },
  { value: 'bright_red', label: 'Rojo vivo' },
  { value: 'brown', label: 'Marrón' },
  { value: 'other', label: 'Otro' },
];

export const FETAL_FREQUENCY_OPTIONS: SelectOption<FetalMovementFrequency>[] = [
  { value: 'less', label: 'Menos de lo habitual' },
  { value: 'same', label: 'Igual que lo habitual' },
  { value: 'more', label: 'Más de lo habitual' },
  { value: 'absent', label: 'Ausente' },
];

export const INTENSITY_OPTIONS: SelectOption<string>[] = Array.from(
  { length: 10 },
  (_, index) => {
    const value = String(index + 1);
    return { value, label: value };
  },
);

export type SymptomCatalogItem = {
  type: SymptomType;
  label: string;
  icon: IconKey;
  path: string;
  hubVisible: boolean;
};

export const SYMPTOM_CATALOG: SymptomCatalogItem[] = [
  {
    type: 'mucus_plug',
    label: 'Tapón mucoso',
    icon: 'bubble',
    path: '/symptoms/mucus_plug',
    hubVisible: true,
  },
  {
    type: 'water_break',
    label: 'Rotura de bolsa',
    icon: 'droplet',
    path: '/water-break',
    hubVisible: true,
  },
  {
    type: 'bleeding',
    label: 'Sangrado',
    icon: 'droplet',
    path: '/symptoms/bleeding',
    hubVisible: true,
  },
  {
    type: 'fetal_movement',
    label: 'Movimiento fetal',
    icon: 'baby',
    path: '/symptoms/fetal_movement',
    hubVisible: true,
  },
  {
    type: 'back_pain',
    label: 'Dolor lumbar',
    icon: 'backPain',
    path: '/symptoms/back_pain',
    hubVisible: true,
  },
  {
    type: 'pelvic_pressure',
    label: 'Presión pélvica',
    icon: 'arrowDown',
    path: '/symptoms/pelvic_pressure',
    hubVisible: true,
  },
  {
    type: 'nausea',
    label: 'Náuseas',
    icon: 'nausea',
    path: '/symptoms/nausea',
    hubVisible: true,
  },
  {
    type: 'diarrhea',
    label: 'Diarrea',
    icon: 'toilet',
    path: '/symptoms/diarrhea',
    hubVisible: true,
  },
  {
    type: 'chills',
    label: 'Escalofríos',
    icon: 'thermometer',
    path: '/symptoms/chills',
    hubVisible: true,
  },
];

export function getSymptomCatalogItem(
  type: SymptomType,
): SymptomCatalogItem | undefined {
  return SYMPTOM_CATALOG.find((item) => item.type === type);
}

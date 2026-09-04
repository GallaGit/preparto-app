import type { MessageKey } from '@/i18n/types';
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
  labelKey: MessageKey;
};

export const AMOUNT_OPTIONS: SelectOption<AmountLevel>[] = [
  { value: 'scarce', labelKey: 'symptom.amount.scarce' },
  { value: 'moderate', labelKey: 'symptom.amount.moderate' },
  { value: 'abundant', labelKey: 'symptom.amount.abundant' },
];

export const MUCUS_COLOR_OPTIONS: SelectOption<MucusColor>[] = [
  { value: 'clear', labelKey: 'symptom.mucusColor.clear' },
  { value: 'white', labelKey: 'symptom.mucusColor.white' },
  { value: 'pink', labelKey: 'symptom.mucusColor.pink' },
  { value: 'brown', labelKey: 'symptom.mucusColor.brown' },
  { value: 'bloody', labelKey: 'symptom.mucusColor.bloody' },
  { value: 'other', labelKey: 'symptom.mucusColor.other' },
];

export const FLUID_COLOR_OPTIONS: SelectOption<FluidColor>[] = [
  { value: 'clear', labelKey: 'symptom.fluidColor.clear' },
  { value: 'yellowish', labelKey: 'symptom.fluidColor.yellowish' },
  { value: 'greenish', labelKey: 'symptom.fluidColor.greenish' },
  { value: 'brown', labelKey: 'symptom.fluidColor.brown' },
  { value: 'bloody', labelKey: 'symptom.fluidColor.bloody' },
  { value: 'other', labelKey: 'symptom.fluidColor.other' },
];

export const ODOR_OPTIONS: SelectOption<OdorLevel>[] = [
  { value: 'none', labelKey: 'symptom.odor.none' },
  { value: 'mild', labelKey: 'symptom.odor.mild' },
  { value: 'strong', labelKey: 'symptom.odor.strong' },
  { value: 'unpleasant', labelKey: 'symptom.odor.unpleasant' },
];

export const BLEEDING_COLOR_OPTIONS: SelectOption<BleedingColor>[] = [
  { value: 'pink', labelKey: 'symptom.bleedingColor.pink' },
  { value: 'bright_red', labelKey: 'symptom.bleedingColor.bright_red' },
  { value: 'brown', labelKey: 'symptom.bleedingColor.brown' },
  { value: 'other', labelKey: 'symptom.bleedingColor.other' },
];

export const FETAL_FREQUENCY_OPTIONS: SelectOption<FetalMovementFrequency>[] = [
  { value: 'less', labelKey: 'symptom.fetalFrequency.less' },
  { value: 'same', labelKey: 'symptom.fetalFrequency.same' },
  { value: 'more', labelKey: 'symptom.fetalFrequency.more' },
  { value: 'absent', labelKey: 'symptom.fetalFrequency.absent' },
];

export const INTENSITY_OPTIONS: SelectOption<string>[] = Array.from(
  { length: 10 },
  (_, index) => {
    const value = String(index + 1);
    return { value, labelKey: value as MessageKey };
  },
);

export type SymptomCatalogItem = {
  type: SymptomType;
  labelKey: MessageKey;
  icon: IconKey;
  path: string;
  hubVisible: boolean;
};

export const SYMPTOM_CATALOG: SymptomCatalogItem[] = [
  {
    type: 'mucus_plug',
    labelKey: 'symptom.type.mucus_plug',
    icon: 'bubble',
    path: '/symptoms/mucus_plug',
    hubVisible: true,
  },
  {
    type: 'water_break',
    labelKey: 'symptom.type.water_break',
    icon: 'droplet',
    path: '/water-break',
    hubVisible: true,
  },
  {
    type: 'bleeding',
    labelKey: 'symptom.type.bleeding',
    icon: 'droplet',
    path: '/symptoms/bleeding',
    hubVisible: true,
  },
  {
    type: 'fetal_movement',
    labelKey: 'symptom.type.fetal_movement',
    icon: 'baby',
    path: '/symptoms/fetal_movement',
    hubVisible: true,
  },
  {
    type: 'back_pain',
    labelKey: 'symptom.type.back_pain',
    icon: 'backPain',
    path: '/symptoms/back_pain',
    hubVisible: true,
  },
  {
    type: 'pelvic_pressure',
    labelKey: 'symptom.type.pelvic_pressure',
    icon: 'arrowDown',
    path: '/symptoms/pelvic_pressure',
    hubVisible: true,
  },
  {
    type: 'nausea',
    labelKey: 'symptom.type.nausea',
    icon: 'nausea',
    path: '/symptoms/nausea',
    hubVisible: true,
  },
  {
    type: 'diarrhea',
    labelKey: 'symptom.type.diarrhea',
    icon: 'toilet',
    path: '/symptoms/diarrhea',
    hubVisible: true,
  },
  {
    type: 'chills',
    labelKey: 'symptom.type.chills',
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

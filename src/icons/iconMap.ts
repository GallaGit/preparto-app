import {
  Alert01Icon,
  Alert02Icon,
  AnalyticsUpIcon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Baby01Icon,
  BodyPartLegIcon,
  BubbleChatIcon,
  ClipboardIcon,
  Download01Icon,
  DropletIcon,
  HistoryIcon,
  Home01Icon,
  InformationCircleIcon,
  LuggageIcon,
  Settings01Icon,
  ThermometerColdIcon,
  Timer02Icon,
  Toilet01Icon,
  ViewIcon,
  VomitingIcon,
  WifiOff01Icon,
} from '@hugeicons/core-free-icons';
import type { IconSvgElement } from '@hugeicons/react';

/** Semantic icon keys used across nav, symptoms, assessment, and chrome. */
export type IconKey =
  | 'home'
  | 'timer'
  | 'droplet'
  | 'clipboard'
  | 'history'
  | 'suitcase'
  | 'alert'
  | 'alertSoft'
  | 'settings'
  | 'info'
  | 'view'
  | 'analytics'
  | 'bubble'
  | 'baby'
  | 'backPain'
  | 'arrowDown'
  | 'nausea'
  | 'toilet'
  | 'thermometer'
  | 'chevronRight'
  | 'wifiOff'
  | 'download';

/**
 * Hugeicons Stroke Rounded exports.
 * Fallbacks (free pack): suitcase→LuggageIcon; nausea→VomitingIcon (no SickIcon).
 */
export const iconMap: Record<IconKey, IconSvgElement> = {
  home: Home01Icon,
  timer: Timer02Icon,
  droplet: DropletIcon,
  clipboard: ClipboardIcon,
  history: HistoryIcon,
  suitcase: LuggageIcon,
  alert: Alert01Icon,
  alertSoft: Alert02Icon,
  settings: Settings01Icon,
  info: InformationCircleIcon,
  view: ViewIcon,
  analytics: AnalyticsUpIcon,
  bubble: BubbleChatIcon,
  baby: Baby01Icon,
  backPain: BodyPartLegIcon,
  arrowDown: ArrowDown01Icon,
  nausea: VomitingIcon,
  toilet: Toilet01Icon,
  thermometer: ThermometerColdIcon,
  chevronRight: ArrowRight01Icon,
  wifiOff: WifiOff01Icon,
  download: Download01Icon,
};

export function resolveIcon(key: string): IconSvgElement {
  if (key in iconMap) {
    return iconMap[key as IconKey];
  }
  return InformationCircleIcon;
}

export function isIconKey(value: string): value is IconKey {
  return value in iconMap;
}

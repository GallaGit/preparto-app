import {
  getAnalyzerCopy,
  ANALYZER_DISCLAIMER_ES,
} from '@/i18n/assessmentCopy';
import type { Locale } from '@/i18n/types';
import type { Contraction } from '@/types/contraction';
import type {
  ContractionAnalysis,
  ContractionAnalysisColor,
  ContractionLevel,
} from '@/types/contractionAnalysis';

const MIN_CONTRACTIONS_FOR_ANALYSIS = 3;

const IRREGULAR_CV_THRESHOLD = 0.25;

const FAR_INTERVAL_MIN_SECONDS = 7 * 60;

const LABOR_INTERVAL_MIN_SECONDS = 4 * 60;
const LABOR_INTERVAL_MAX_SECONDS = 6 * 60;
const LABOR_DURATION_MIN_SECONDS = 45;
const LABOR_DURATION_MAX_SECONDS = 60;
const LABOR_MIN_COUNT = 6;
const LABOR_MIN_TIMESPAN_MS = 60 * 60 * 1000;

const VERY_FREQUENT_INTERVAL_MAX_SECONDS = 3 * 60;
const VERY_FREQUENT_MIN_INTERVALS = 2;

const VERY_SHORT_DURATION_SECONDS = 30;
const VERY_LONG_DURATION_SECONDS = 90;

const LEVEL_META: Record<
  ContractionLevel,
  { color: ContractionAnalysisColor; icon: string }
> = {
  0: { color: 'neutral', icon: 'info' },
  1: { color: 'info', icon: 'clipboard' },
  2: { color: 'caution', icon: 'analytics' },
  3: { color: 'warning', icon: 'alertSoft' },
  4: { color: 'urgent', icon: 'alert' },
};

function sortByNewest(contractions: Contraction[]): Contraction[] {
  return [...contractions].sort(
    (a, b) => b.startedAt.getTime() - a.startedAt.getTime(),
  );
}

function getIntervals(contractions: Contraction[]): number[] {
  return contractions
    .map((contraction) => contraction.intervalSeconds)
    .filter((interval): interval is number => interval !== undefined);
}

function mean(values: number[]): number {
  if (values.length === 0) {
    return 0;
  }
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function coefficientOfVariation(values: number[]): number {
  if (values.length < 2) {
    return 0;
  }

  const average = mean(values);
  if (average === 0) {
    return 0;
  }

  const variance =
    values.reduce((sum, value) => sum + (value - average) ** 2, 0) /
    values.length;

  return Math.sqrt(variance) / average;
}

function isRegular(values: number[]): boolean {
  return (
    values.length >= 2 &&
    coefficientOfVariation(values) <= IRREGULAR_CV_THRESHOLD
  );
}

function hasAtypicalDurations(contractions: Contraction[]): boolean {
  return contractions.some(
    (contraction) =>
      contraction.durationSeconds < VERY_SHORT_DURATION_SECONDS ||
      contraction.durationSeconds > VERY_LONG_DURATION_SECONDS,
  );
}

function isVeryFrequent(contractions: Contraction[]): boolean {
  const intervals = getIntervals(contractions);

  if (intervals.length < VERY_FREQUENT_MIN_INTERVALS) {
    return false;
  }

  const recentIntervals = intervals.slice(0, Math.min(3, intervals.length));
  const averageInterval = mean(recentIntervals);

  return averageInterval <= VERY_FREQUENT_INTERVAL_MAX_SECONDS;
}

function isLaborPattern(contractions: Contraction[]): boolean {
  if (contractions.length < LABOR_MIN_COUNT) {
    return false;
  }

  const recent = contractions.slice(0, LABOR_MIN_COUNT);
  const intervals = getIntervals(recent);

  if (intervals.length < LABOR_MIN_COUNT - 1) {
    return false;
  }

  const durationsMatch = recent.every(
    (contraction) =>
      contraction.durationSeconds >= LABOR_DURATION_MIN_SECONDS &&
      contraction.durationSeconds <= LABOR_DURATION_MAX_SECONDS,
  );

  const intervalsMatch = intervals.every(
    (interval) =>
      interval >= LABOR_INTERVAL_MIN_SECONDS &&
      interval <= LABOR_INTERVAL_MAX_SECONDS,
  );

  if (!durationsMatch || !intervalsMatch) {
    return false;
  }

  const oldestInHistory =
    contractions[contractions.length - 1].startedAt.getTime();
  const newestInHistory = contractions[0].startedAt.getTime();
  const totalTimespan = newestInHistory - oldestInHistory;

  return totalTimespan >= LABOR_MIN_TIMESPAN_MS;
}

function isRegularButFarApart(contractions: Contraction[]): boolean {
  const intervals = getIntervals(contractions);

  if (intervals.length < 2) {
    return false;
  }

  const averageInterval = mean(intervals);

  return (
    isRegular(intervals) &&
    averageInterval >= FAR_INTERVAL_MIN_SECONDS &&
    !hasAtypicalDurations(contractions)
  );
}

function isIrregular(contractions: Contraction[]): boolean {
  const intervals = getIntervals(contractions);

  if (intervals.length < 2) {
    return true;
  }

  return !isRegular(intervals) || hasAtypicalDurations(contractions);
}

function buildAnalysis(
  level: ContractionLevel,
  locale: Locale,
): ContractionAnalysis {
  const copy = getAnalyzerCopy(locale);
  const meta = LEVEL_META[level];
  const summary = copy.message[level];

  return {
    level,
    title: copy.title[level],
    summary,
    message: `${summary} ${copy.disclaimer}`,
    color: meta.color,
    icon: meta.icon,
  };
}

function determineLevel(contractions: Contraction[]): ContractionLevel {
  if (contractions.length < MIN_CONTRACTIONS_FOR_ANALYSIS) {
    return 0;
  }

  if (isVeryFrequent(contractions)) {
    return 4;
  }

  if (isLaborPattern(contractions)) {
    return 3;
  }

  if (isRegularButFarApart(contractions)) {
    return 2;
  }

  if (isIrregular(contractions)) {
    return 1;
  }

  return 1;
}

export function analyzeContractions(
  contractions: Contraction[],
  locale: Locale = 'en',
): ContractionAnalysis {
  const sorted = sortByNewest(contractions);
  const level = determineLevel(sorted);
  return buildAnalysis(level, locale);
}

/** @deprecated Use getAnalyzerCopy(locale).disclaimer */
export const ANALYZER_DISCLAIMER = ANALYZER_DISCLAIMER_ES;

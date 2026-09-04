import {
  ASSESSMENT_DISCLAIMER_ES,
  getAssessmentCopy,
  type AssessmentRuleId,
} from '@/i18n/assessmentCopy';
import type { Locale } from '@/i18n/types';
import { analyzeContractions } from '@/services/contractionAnalyzer';
import type {
  AssessmentAction,
  AssessmentColor,
  AssessmentInput,
  AssessmentLevel,
  AssessmentResult,
  MatchedRule,
} from '@/types/assessment';
import type { BleedingSymptom, SymptomRecord } from '@/types/symptom';

export const ASSESSMENT_DISCLAIMER = ASSESSMENT_DISCLAIMER_ES;

const ACTIVE_SYMPTOM_WINDOW_MS = 24 * 60 * 60 * 1000;

const LEVEL_VISUAL: Record<
  AssessmentLevel,
  { color: AssessmentColor; icon: string }
> = {
  0: { color: 'neutral', icon: 'info' },
  1: { color: 'info', icon: 'clipboard' },
  2: { color: 'caution', icon: 'view' },
  3: { color: 'warning', icon: 'alertSoft' },
  4: { color: 'urgent', icon: 'alert' },
};

const RULE_SOURCE_REF: Record<
  Exclude<
    AssessmentRuleId,
    | 'contractions_fallback'
    | 'empty_keep_recording'
    | 'empty_explanation'
    | 'generic_explanation'
    | 'water_break_and_regular_contractions'
  >,
  string
> = {
  bleeding_urgent: 'OMS / NICE / ACOG (señales de alarma en preparto)',
  fetal_movement_absent:
    'OMS / NICE (reducción o ausencia de movimientos fetales)',
  water_break: 'NICE / ACOG (rotura de membranas)',
  water_break_and_bleeding: 'Guías de preparto (combinación de señales)',
  symptoms_over_24h: 'Principio de seguimiento continuo en preparto',
  mild_symptoms: 'Seguimiento sintomático orientativo',
};

function maxLevel(a: AssessmentLevel, b: AssessmentLevel): AssessmentLevel {
  return (a > b ? a : b) as AssessmentLevel;
}

function isBleeding(symptom: SymptomRecord): symptom is BleedingSymptom {
  return symptom.type === 'bleeding';
}

function evaluateSymptomRules(
  symptoms: SymptomRecord[],
  now: Date,
  locale: Locale,
): { level: AssessmentLevel; rules: MatchedRule[]; actions: AssessmentAction[] } {
  const copy = getAssessmentCopy(locale);
  let level: AssessmentLevel = 0;
  const rules: MatchedRule[] = [];
  const actions = new Set<AssessmentAction>();

  const hasAbundantOrBrightBleeding = symptoms.some(
    (symptom) =>
      isBleeding(symptom) &&
      (symptom.amount === 'abundant' || symptom.color === 'bright_red'),
  );

  if (hasAbundantOrBrightBleeding) {
    level = maxLevel(level, 4);
    rules.push({
      id: 'bleeding_urgent',
      sourceRef: RULE_SOURCE_REF.bleeding_urgent,
      explanation: copy.rules.bleeding_urgent,
    });
    actions.add('go_to_hospital');
    actions.add('contact_midwife');
  }

  const hasAbsentFetalMovement = symptoms.some(
    (symptom) =>
      symptom.type === 'fetal_movement' && symptom.frequency === 'absent',
  );

  if (hasAbsentFetalMovement) {
    level = maxLevel(level, 4);
    rules.push({
      id: 'fetal_movement_absent',
      sourceRef: RULE_SOURCE_REF.fetal_movement_absent,
      explanation: copy.rules.fetal_movement_absent,
    });
    actions.add('go_to_hospital');
    actions.add('contact_midwife');
  }

  const hasWaterBreak = symptoms.some(
    (symptom) => symptom.type === 'water_break',
  );

  if (hasWaterBreak) {
    level = maxLevel(level, 3);
    rules.push({
      id: 'water_break',
      sourceRef: RULE_SOURCE_REF.water_break,
      explanation: copy.rules.water_break,
    });
    actions.add('contact_midwife');
  }

  const hasAnyBleeding = symptoms.some((symptom) => symptom.type === 'bleeding');
  if (hasWaterBreak && hasAnyBleeding) {
    level = maxLevel(level, 4);
    rules.push({
      id: 'water_break_and_bleeding',
      sourceRef: RULE_SOURCE_REF.water_break_and_bleeding,
      explanation: copy.rules.water_break_and_bleeding,
    });
    actions.add('go_to_hospital');
  }

  const timestamps = symptoms.map((s) => s.recordedAt.getTime());
  if (timestamps.length > 0) {
    const first = Math.min(...timestamps);
    const span = now.getTime() - first;
    if (span >= ACTIVE_SYMPTOM_WINDOW_MS && symptoms.length >= 2 && level < 3) {
      level = maxLevel(level, 2);
      rules.push({
        id: 'symptoms_over_24h',
        sourceRef: RULE_SOURCE_REF.symptoms_over_24h,
        explanation: copy.rules.symptoms_over_24h,
      });
      actions.add('continue_observing');
      actions.add('contact_midwife');
    }
  }

  const mildTypes = new Set([
    'mucus_plug',
    'back_pain',
    'pelvic_pressure',
    'nausea',
    'diarrhea',
    'chills',
  ]);
  const onlyMild =
    symptoms.length > 0 &&
    symptoms.every((symptom) => mildTypes.has(symptom.type)) &&
    level === 0;

  if (onlyMild) {
    level = maxLevel(level, 1);
    rules.push({
      id: 'mild_symptoms',
      sourceRef: RULE_SOURCE_REF.mild_symptoms,
      explanation: copy.rules.mild_symptoms,
    });
    actions.add('continue_observing');
    actions.add('rest');
    actions.add('hydrate');
    actions.add('keep_recording');
  }

  return { level, rules, actions: [...actions] };
}

function contractionActions(level: AssessmentLevel): AssessmentAction[] {
  if (level >= 4) {
    return ['go_to_hospital', 'contact_midwife', 'keep_recording'];
  }
  if (level >= 3) {
    return ['contact_midwife', 'keep_recording'];
  }
  if (level >= 2) {
    return ['continue_observing', 'keep_recording', 'hydrate'];
  }
  if (level >= 1) {
    return ['continue_observing', 'keep_recording', 'rest', 'hydrate'];
  }
  return ['keep_recording'];
}

function buildRecommendation(
  level: AssessmentLevel,
  actions: AssessmentAction[],
  locale: Locale,
): string {
  const labels = getAssessmentCopy(locale).actions;

  if (actions.length === 0) {
    return labels.keep_recording;
  }

  const unique = [...new Set(actions)];
  const prioritized =
    level >= 4
      ? unique.filter((a) => a === 'go_to_hospital' || a === 'contact_midwife')
      : unique;

  return prioritized.map((action) => labels[action]).join('. ') + '.';
}

/**
 * Pure Assessment Engine: structured input → rules → classification + recommendation.
 */
export function evaluate(input: AssessmentInput): AssessmentResult {
  const now = input.now ?? new Date();
  const locale = input.locale ?? 'en';
  const copy = getAssessmentCopy(locale);
  const contractions = input.contractions ?? [];
  const symptoms = input.symptoms ?? [];

  const contractionAnalysis = analyzeContractions(contractions, locale);
  const contractionLevel = contractionAnalysis.level as AssessmentLevel;

  const symptomEval = evaluateSymptomRules(symptoms, now, locale);

  let level = maxLevel(contractionLevel, symptomEval.level);

  const matchedRules: MatchedRule[] = [...symptomEval.rules];

  if (contractionLevel > 0) {
    matchedRules.push({
      id: `contractions_level_${contractionLevel}`,
      sourceRef: copy.sourceRefs.contractions,
      explanation: contractionAnalysis.summary,
    });
  }

  if (
    symptoms.some((s) => s.type === 'water_break') &&
    contractionLevel >= 2
  ) {
    level = maxLevel(level, 4);
    matchedRules.push({
      id: 'water_break_and_regular_contractions',
      sourceRef: copy.sourceRefs.waterBreakAndContractions,
      explanation: copy.rules.water_break_and_regular_contractions,
    });
  }

  const actions = [
    ...new Set([
      ...symptomEval.actions,
      ...contractionActions(contractionLevel),
      ...(level >= 4 ? (['go_to_hospital'] as AssessmentAction[]) : []),
    ]),
  ];

  if (level === 0 && contractions.length === 0 && symptoms.length === 0) {
    const visual = LEVEL_VISUAL[0];
    return {
      level: 0,
      classification: copy.classification[0],
      recommendation: copy.rules.empty_keep_recording,
      explanation: copy.rules.empty_explanation,
      actions: ['keep_recording'],
      matchedRules: [],
      color: visual.color,
      icon: visual.icon,
      disclaimer: copy.disclaimer,
    };
  }

  const visual = LEVEL_VISUAL[level];
  const explanation =
    matchedRules.length > 0
      ? matchedRules.map((rule) => rule.explanation).join(' ')
      : copy.rules.generic_explanation;

  return {
    level,
    classification: copy.classification[level],
    recommendation: buildRecommendation(level, actions, locale),
    explanation,
    actions,
    matchedRules,
    color: visual.color,
    icon: visual.icon,
    disclaimer: copy.disclaimer,
  };
}

export function assessmentToBannerModel(result: AssessmentResult) {
  return {
    level: result.level,
    title: result.classification,
    message: `${result.recommendation} ${result.explanation} ${result.disclaimer}`,
    color: result.color,
    icon: result.icon,
  };
}

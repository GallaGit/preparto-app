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

export const ASSESSMENT_DISCLAIMER =
  'Esta aplicación no sustituye una valoración médica. Si tienes dudas o te encuentras mal, contacta con tu equipo sanitario.';

const ACTIVE_SYMPTOM_WINDOW_MS = 24 * 60 * 60 * 1000;

const LEVEL_META: Record<
  AssessmentLevel,
  { classification: string; color: AssessmentColor; icon: string }
> = {
  0: {
    classification: 'Datos insuficientes',
    color: 'neutral',
    icon: 'ℹ️',
  },
  1: {
    classification: 'Seguimiento',
    color: 'info',
    icon: '📋',
  },
  2: {
    classification: 'Observación reforzada',
    color: 'caution',
    icon: '👀',
  },
  3: {
    classification: 'Contactar con el equipo sanitario',
    color: 'warning',
    icon: '⚠️',
  },
  4: {
    classification: 'Atención urgente orientativa',
    color: 'urgent',
    icon: '🚨',
  },
};

const ACTION_LABELS: Record<AssessmentAction, string> = {
  continue_observing: 'Continúa observando',
  rest: 'Descansa',
  hydrate: 'Hidrátate',
  keep_recording: 'Sigue registrando',
  contact_midwife: 'Contacta con tu matrona o equipo sanitario',
  go_to_hospital: 'Ve al hospital o sigue el protocolo de urgencias que te hayan indicado',
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
): { level: AssessmentLevel; rules: MatchedRule[]; actions: AssessmentAction[] } {
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
      sourceRef: 'OMS / NICE / ACOG (señales de alarma en preparto)',
      explanation:
        'Hay un registro de sangrado abundante o de color rojo vivo, considerado señal de alarma orientativa.',
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
      sourceRef: 'OMS / NICE (reducción o ausencia de movimientos fetales)',
      explanation:
        'Se ha registrado ausencia de movimiento fetal, una señal que requiere valoración sanitaria.',
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
      sourceRef: 'NICE / ACOG (rotura de membranas)',
      explanation:
        'Existe un registro de rotura de bolsa. Se recomienda contactar con matrona u hospital.',
    });
    actions.add('contact_midwife');
  }

  const hasAnyBleeding = symptoms.some((symptom) => symptom.type === 'bleeding');
  if (hasWaterBreak && hasAnyBleeding) {
    level = maxLevel(level, 4);
    rules.push({
      id: 'water_break_and_bleeding',
      sourceRef: 'Guías de preparto (combinación de señales)',
      explanation:
        'La combinación de rotura de bolsa y sangrado eleva la prioridad orientativa.',
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
        sourceRef: 'Principio de seguimiento continuo en preparto',
        explanation:
          'Hay síntomas registrados durante más de 24 horas. Conviene seguir observando y contactar si empeoran.',
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
      sourceRef: 'Seguimiento sintomático orientativo',
      explanation:
        'Los síntomas registrados son leves o aislados. Continúa observando, descansa e hidrátate.',
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
): string {
  if (actions.length === 0) {
    return ACTION_LABELS.keep_recording;
  }

  const unique = [...new Set(actions)];
  const prioritized =
    level >= 4
      ? unique.filter((a) => a === 'go_to_hospital' || a === 'contact_midwife')
      : unique;

  return prioritized.map((action) => ACTION_LABELS[action]).join('. ') + '.';
}

/**
 * Pure Assessment Engine: structured input → rules → classification + recommendation.
 */
export function evaluate(input: AssessmentInput): AssessmentResult {
  const now = input.now ?? new Date();
  const contractions = input.contractions ?? [];
  const symptoms = input.symptoms ?? [];

  const contractionAnalysis = analyzeContractions(contractions);
  const contractionLevel = contractionAnalysis.level as AssessmentLevel;

  const symptomEval = evaluateSymptomRules(symptoms, now);

  let level = maxLevel(contractionLevel, symptomEval.level);

  const matchedRules: MatchedRule[] = [...symptomEval.rules];

  if (contractionLevel > 0) {
    matchedRules.push({
      id: `contractions_level_${contractionLevel}`,
      sourceRef: 'Motor de contracciones (patrón temporal)',
      explanation: contractionAnalysis.message.split(
        'Esta herramienta es orientativa',
      )[0].trim(),
    });
  }

  if (
    symptoms.some((s) => s.type === 'water_break') &&
    contractionLevel >= 2
  ) {
    level = maxLevel(level, 4);
    matchedRules.push({
      id: 'water_break_and_regular_contractions',
      sourceRef: 'Combinación rotura de bolsa + patrón de contracciones',
      explanation:
        'Rotura de bolsa junto con un patrón de contracciones regular eleva la prioridad orientativa.',
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
    return {
      level: 0,
      classification: LEVEL_META[0].classification,
      recommendation: 'Sigue registrando síntomas o contracciones cuando los notes.',
      explanation:
        'Todavía no hay suficientes datos para generar una orientación específica.',
      actions: ['keep_recording'],
      matchedRules: [],
      color: LEVEL_META[0].color,
      icon: LEVEL_META[0].icon,
      disclaimer: ASSESSMENT_DISCLAIMER,
    };
  }

  const meta = LEVEL_META[level];
  const explanation =
    matchedRules.length > 0
      ? matchedRules.map((rule) => rule.explanation).join(' ')
      : 'Se ha generado una orientación a partir de los registros disponibles.';

  return {
    level,
    classification: meta.classification,
    recommendation: buildRecommendation(level, actions),
    explanation,
    actions,
    matchedRules,
    color: meta.color,
    icon: meta.icon,
    disclaimer: ASSESSMENT_DISCLAIMER,
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

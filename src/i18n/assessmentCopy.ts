import type { AssessmentAction, AssessmentLevel } from '@/types/assessment';
import type { ContractionLevel } from '@/types/contractionAnalysis';
import type { Locale } from '@/i18n/types';

export type AssessmentRuleId =
  | 'bleeding_urgent'
  | 'fetal_movement_absent'
  | 'water_break'
  | 'water_break_and_bleeding'
  | 'symptoms_over_24h'
  | 'mild_symptoms'
  | 'water_break_and_regular_contractions'
  | 'contractions_fallback'
  | 'empty_keep_recording'
  | 'empty_explanation'
  | 'generic_explanation';

type AssessmentCopy = {
  disclaimer: string;
  classification: Record<AssessmentLevel, string>;
  actions: Record<AssessmentAction, string>;
  rules: Record<AssessmentRuleId, string>;
  sourceRefs: {
    contractions: string;
    waterBreakAndContractions: string;
  };
};

type AnalyzerCopy = {
  disclaimer: string;
  title: Record<ContractionLevel, string>;
  message: Record<ContractionLevel, string>;
};

const assessmentEs: AssessmentCopy = {
  disclaimer:
    'Esta aplicación no sustituye una valoración médica. Si tienes dudas o te encuentras mal, contacta con tu equipo sanitario.',
  classification: {
    0: 'Datos insuficientes',
    1: 'Seguimiento',
    2: 'Observación reforzada',
    3: 'Contactar con el equipo sanitario',
    4: 'Atención urgente orientativa',
  },
  actions: {
    continue_observing: 'Continúa observando',
    rest: 'Descansa',
    hydrate: 'Hidrátate',
    keep_recording: 'Sigue registrando',
    contact_midwife: 'Contacta con tu matrona o equipo sanitario',
    go_to_hospital:
      'Ve al hospital o sigue el protocolo de urgencias que te hayan indicado',
  },
  rules: {
    bleeding_urgent:
      'Hay un registro de sangrado abundante o de color rojo vivo, considerado señal de alarma orientativa.',
    fetal_movement_absent:
      'Se ha registrado ausencia de movimiento fetal, una señal que requiere valoración sanitaria.',
    water_break:
      'Existe un registro de rotura de bolsa. Se recomienda contactar con matrona u hospital.',
    water_break_and_bleeding:
      'La combinación de rotura de bolsa y sangrado eleva la prioridad orientativa.',
    symptoms_over_24h:
      'Hay síntomas registrados durante más de 24 horas. Conviene seguir observando y contactar si empeoran.',
    mild_symptoms:
      'Los síntomas registrados son leves o aislados. Continúa observando, descansa e hidrátate.',
    water_break_and_regular_contractions:
      'Rotura de bolsa junto con un patrón de contracciones regular eleva la prioridad orientativa.',
    contractions_fallback: '',
    empty_keep_recording:
      'Sigue registrando síntomas o contracciones cuando los notes.',
    empty_explanation:
      'Todavía no hay suficientes datos para generar una orientación específica.',
    generic_explanation:
      'Se ha generado una orientación a partir de los registros disponibles.',
  },
  sourceRefs: {
    contractions: 'Motor de contracciones (patrón temporal)',
    waterBreakAndContractions:
      'Combinación rotura de bolsa + patrón de contracciones',
  },
};

const assessmentEn: AssessmentCopy = {
  disclaimer:
    'This app does not replace medical advice. If you are unsure or feel unwell, contact your care team.',
  classification: {
    0: 'Insufficient data',
    1: 'Keep monitoring',
    2: 'Closer observation',
    3: 'Contact your care team',
    4: 'Urgent guidance',
  },
  actions: {
    continue_observing: 'Keep observing',
    rest: 'Rest',
    hydrate: 'Stay hydrated',
    keep_recording: 'Keep logging',
    contact_midwife: 'Contact your midwife or care team',
    go_to_hospital:
      'Go to the hospital or follow the emergency protocol you were given',
  },
  rules: {
    bleeding_urgent:
      'There is a record of heavy or bright red bleeding, treated as an advisory warning sign.',
    fetal_movement_absent:
      'Absent fetal movement has been logged, a sign that needs clinical assessment.',
    water_break:
      'Waters breaking has been logged. Contact your midwife or hospital is recommended.',
    water_break_and_bleeding:
      'Waters breaking combined with bleeding raises the advisory priority.',
    symptoms_over_24h:
      'Symptoms have been logged for more than 24 hours. Keep observing and contact your team if they worsen.',
    mild_symptoms:
      'Logged symptoms are mild or isolated. Keep observing, rest, and stay hydrated.',
    water_break_and_regular_contractions:
      'Waters breaking together with a regular contraction pattern raises the advisory priority.',
    contractions_fallback: '',
    empty_keep_recording:
      'Keep logging symptoms or contractions when you notice them.',
    empty_explanation:
      'There is not enough data yet to give specific guidance.',
    generic_explanation:
      'Guidance was generated from the records available so far.',
  },
  sourceRefs: {
    contractions: 'Contraction engine (timing pattern)',
    waterBreakAndContractions:
      'Waters breaking + contraction pattern combination',
  },
};

const analyzerEs: AnalyzerCopy = {
  disclaimer:
    'Esta herramienta es orientativa y no sustituye la valoración de un profesional sanitario.',
  title: {
    0: 'Datos insuficientes',
    1: 'Seguimiento',
    2: 'Patrón regular',
    3: 'Patrón compatible',
    4: 'Alta frecuencia',
  },
  message: {
    0: 'No hay suficientes datos.',
    1: 'Continúa registrando las contracciones.',
    2: 'Se observa un patrón regular. Continúa registrándolas.',
    3: 'Los registros muestran un patrón compatible con contracciones regulares. Considera contactar con tu hospital o seguir las indicaciones recibidas por tu equipo sanitario.',
    4: 'Las contracciones registradas son muy frecuentes. Si todavía no has contactado con tu equipo sanitario, hazlo cuanto antes o sigue las indicaciones recibidas.',
  },
};

const analyzerEn: AnalyzerCopy = {
  disclaimer:
    'This tool is for guidance only and does not replace assessment by a healthcare professional.',
  title: {
    0: 'Insufficient data',
    1: 'Keep monitoring',
    2: 'Regular pattern',
    3: 'Compatible pattern',
    4: 'High frequency',
  },
  message: {
    0: 'There is not enough data yet.',
    1: 'Keep logging your contractions.',
    2: 'A regular pattern is visible. Keep logging them.',
    3: 'The records show a pattern compatible with regular contractions. Consider contacting your hospital or following the guidance from your care team.',
    4: 'Logged contractions are very frequent. If you have not contacted your care team yet, do so soon or follow the guidance you were given.',
  },
};

const assessmentDe: AssessmentCopy = {
  disclaimer:
    'Diese App ersetzt keine ärztliche Beratung. Bei Unsicherheit oder Unwohlsein wenden Sie sich an Ihr Betreuungsteam.',
  classification: {
    0: 'Unzureichende Daten',
    1: 'Weiter beobachten',
    2: 'Verstärkte Beobachtung',
    3: 'Betreuungsteam kontaktieren',
    4: 'Dringende Orientierung',
  },
  actions: {
    continue_observing: 'Weiter beobachten',
    rest: 'Ruhen Sie sich aus',
    hydrate: 'Trinken Sie ausreichend',
    keep_recording: 'Weiter erfassen',
    contact_midwife: 'Kontaktieren Sie Ihre Hebamme oder Ihr Betreuungsteam',
    go_to_hospital:
      'Gehen Sie ins Krankenhaus oder folgen Sie dem Notfallprotokoll, das Sie erhalten haben',
  },
  rules: {
    bleeding_urgent:
      'Es gibt einen Eintrag einer starken oder hellroten Blutung, der als orientierendes Warnzeichen gilt.',
    fetal_movement_absent:
      'Fehlende Kindsbewegungen wurden erfasst — ein Zeichen, das eine klinische Einschätzung braucht.',
    water_break:
      'Ein Blasensprung wurde erfasst. Es wird empfohlen, Hebamme oder Krankenhaus zu kontaktieren.',
    water_break_and_bleeding:
      'Blasensprung zusammen mit Blutung erhöht die orientierende Priorität.',
    symptoms_over_24h:
      'Symptome sind seit mehr als 24 Stunden erfasst. Weiter beobachten und das Team kontaktieren, wenn sie sich verschlechtern.',
    mild_symptoms:
      'Die erfassten Symptome sind leicht oder vereinzelt. Weiter beobachten, ruhen und ausreichend trinken.',
    water_break_and_regular_contractions:
      'Blasensprung zusammen mit einem regelmäßigen Wehenmuster erhöht die orientierende Priorität.',
    contractions_fallback: '',
    empty_keep_recording:
      'Erfassen Sie weiter Symptome oder Wehen, wenn Sie sie bemerken.',
    empty_explanation:
      'Es gibt noch nicht genug Daten für eine konkrete Orientierung.',
    generic_explanation:
      'Die Orientierung wurde aus den bisher verfügbaren Einträgen erzeugt.',
  },
  sourceRefs: {
    contractions: 'Wehen-Engine (zeitliches Muster)',
    waterBreakAndContractions: 'Kombination Blasensprung + Wehenmuster',
  },
};

const analyzerDe: AnalyzerCopy = {
  disclaimer:
    'Dieses Werkzeug dient nur der Orientierung und ersetzt nicht die Einschätzung durch medizinisches Fachpersonal.',
  title: {
    0: 'Unzureichende Daten',
    1: 'Weiter beobachten',
    2: 'Regelmäßiges Muster',
    3: 'Passendes Muster',
    4: 'Hohe Frequenz',
  },
  message: {
    0: 'Es gibt noch nicht genug Daten.',
    1: 'Erfassen Sie Ihre Wehen weiter.',
    2: 'Ein regelmäßiges Muster ist erkennbar. Erfassen Sie sie weiter.',
    3: 'Die Einträge zeigen ein Muster, das zu regelmäßigen Wehen passt. Erwägen Sie, Ihr Krankenhaus zu kontaktieren oder den Hinweisen Ihres Betreuungsteams zu folgen.',
    4: 'Die erfassten Wehen sind sehr häufig. Wenn Sie Ihr Betreuungsteam noch nicht kontaktiert haben, tun Sie das bald oder folgen Sie den Hinweisen, die Sie erhalten haben.',
  },
};

const assessmentByLocale: Record<Locale, AssessmentCopy> = {
  es: assessmentEs,
  en: assessmentEn,
  de: assessmentDe,
};

const analyzerByLocale: Record<Locale, AnalyzerCopy> = {
  es: analyzerEs,
  en: analyzerEn,
  de: analyzerDe,
};

export function getAssessmentCopy(locale: Locale): AssessmentCopy {
  return assessmentByLocale[locale] ?? assessmentEn;
}

export function getAnalyzerCopy(locale: Locale): AnalyzerCopy {
  return analyzerByLocale[locale] ?? analyzerEn;
}

/** @deprecated Prefer getAssessmentCopy(locale).disclaimer — Spanish for legacy tests/export. */
export const ASSESSMENT_DISCLAIMER_ES = assessmentEs.disclaimer;

/** @deprecated Prefer getAnalyzerCopy(locale).disclaimer */
export const ANALYZER_DISCLAIMER_ES = analyzerEs.disclaimer;

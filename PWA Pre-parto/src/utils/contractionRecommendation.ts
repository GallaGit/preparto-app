import type {
  Contraction,
  ContractionRecommendation,
} from '@/types/contraction';

const MIN_CONTRACTIONS = 3;
const INTERVAL_MIN_SECONDS = 4 * 60;
const INTERVAL_MAX_SECONDS = 6 * 60;
const DURATION_MIN_SECONDS = 45;
const DURATION_MAX_SECONDS = 60;

const LEGAL_DISCLAIMER =
  'Esta aplicación no sustituye la valoración médica. Sigue siempre las indicaciones de tu equipo sanitario.';

function matchesPattern(contractions: Contraction[]): boolean {
  if (contractions.length < MIN_CONTRACTIONS) {
    return false;
  }

  const recent = contractions.slice(0, MIN_CONTRACTIONS);

  return recent.every((contraction) => {
    const durationOk =
      contraction.durationSeconds >= DURATION_MIN_SECONDS &&
      contraction.durationSeconds <= DURATION_MAX_SECONDS;

    const intervalOk =
      contraction.intervalSeconds !== undefined &&
      contraction.intervalSeconds >= INTERVAL_MIN_SECONDS &&
      contraction.intervalSeconds <= INTERVAL_MAX_SECONDS;

    return durationOk && intervalOk;
  });
}

export function getRecommendation(
  contractions: Contraction[],
): ContractionRecommendation | null {
  if (!matchesPattern(contractions)) {
    return null;
  }

  return {
    type: 'alert',
    message: `Las últimas contracciones muestran intervalos cercanos a 5 minutos y duraciones de aproximadamente 45-60 segundos. Puede ser un buen momento para contactar con el hospital o seguir las indicaciones de tu equipo sanitario. ${LEGAL_DISCLAIMER}`,
  };
}

export const RECOMMENDATION_DISCLAIMER = LEGAL_DISCLAIMER;

import { Navigate, useParams } from 'react-router-dom';
import { SymptomRecordPage } from '@/pages/SymptomRecordPage';
import { isSymptomType } from '@/types/symptom';

/** Routes under `/symptoms/:symptomType` (excludes water_break, which has `/water-break`). */
const HUB_FORM_TYPES = new Set([
  'mucus_plug',
  'bleeding',
  'fetal_movement',
  'back_pain',
  'pelvic_pressure',
  'nausea',
  'diarrhea',
  'chills',
]);

export function SymptomTypePage() {
  const { symptomType } = useParams<{ symptomType: string }>();

  if (!symptomType || !isSymptomType(symptomType)) {
    return <Navigate to="/symptoms" replace />;
  }

  if (symptomType === 'water_break' || !HUB_FORM_TYPES.has(symptomType)) {
    return <Navigate to="/symptoms" replace />;
  }

  return <SymptomRecordPage type={symptomType} backTo="/symptoms" />;
}

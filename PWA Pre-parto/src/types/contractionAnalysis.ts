export type ContractionLevel = 0 | 1 | 2 | 3 | 4;

export type ContractionAnalysisColor =
  | 'neutral'
  | 'info'
  | 'caution'
  | 'warning'
  | 'urgent';

export interface ContractionAnalysis {
  level: ContractionLevel;
  title: string;
  message: string;
  color: ContractionAnalysisColor;
  icon: string;
}

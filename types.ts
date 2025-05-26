
export enum RiskLevel {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  VeryHigh = "Very High",
}

export enum GeneticMarkerPresence {
  Present = "present",
  Absent = "absent",
  Unknown = "unknown",
}

export interface GeneticMarkerInput {
  markerA: boolean;
  markerB: GeneticMarkerPresence;
  overallScore: number; // 0-10
}

export enum YesNoUnknown {
  Yes = "yes",
  No = "no",
  Unknown = "unknown",
}

export enum MaternalHealthStatus {
  None = "none",
  Mild = "mild",
  Significant = "significant",
  Unknown = "unknown",
}

export interface ClinicalData {
  motherAgeAtBirth: number | ""; // Store as string for empty input, parse to number
  gestationalAgeWeeks: number | ""; // e.g., 24-42
  birthWeightGrams: number | ""; // e.g., 500-6000
  apgarScore1Min: number | ""; // 0-10
  apgarScore5Min: number | ""; // 0-10
  deliveryComplications: boolean;
  neonatalSeizuresObserved: YesNoUnknown;
  maternalHealthIssues: MaternalHealthStatus;
}

export interface ParentalInputs {
  fatherGenetics: GeneticMarkerInput;
  motherGenetics: GeneticMarkerInput;
  familyHistory: YesNoUnknown;
  clinicalData: ClinicalData;
}

export interface ContributingFactor {
  name: string;
  impactScore: number; // A score representing the factor's influence (e.g., 0-10 or 0-100)
  description: string;
}

export interface PredictionResult {
  overallRiskScore: number; // Percentage (0-100)
  riskLevel: RiskLevel;
  confidence: number; // Probability (0-1)
  factors: ContributingFactor[];
  summary: string;
  recommendations?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string; // Optional fill color for chart segments/bars
}

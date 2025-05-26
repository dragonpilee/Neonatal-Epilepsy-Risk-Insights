
export const APP_TITLE = "Neonatal Epilepsy Risk Insights";
export const GEMINI_MODEL_NAME = 'gemini-2.5-flash-preview-04-17'; // For actual API calls

// Risk level colors for UI elements
export const RISK_LEVEL_COLORS: { [key: string]: { text: string; bg: string; border: string } } = {
  Low: { text: 'text-green-700', bg: 'bg-green-100', border: 'border-green-400' },
  Moderate: { text: 'text-yellow-700', bg: 'bg-yellow-100', border: 'border-yellow-400' },
  High: { text: 'text-orange-700', bg: 'bg-orange-100', border: 'border-orange-400' },
  VeryHigh: { text: 'text-red-700', bg: 'bg-red-100', border: 'border-red-400' },
};

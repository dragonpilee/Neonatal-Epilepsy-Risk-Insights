
import React from 'react';
import type { PredictionResult } from '../types';
import { RiskLevel } from '../types';
import { RiskChart } from './RiskChart';
import { InfoCard } from './InfoCard';
import { RISK_LEVEL_COLORS } from '../constants';
import { ChartBarIcon, LightBulbIcon, DocumentTextIcon } from './Icons';

interface ResultsDisplayProps {
  result: PredictionResult;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
  const { overallRiskScore, riskLevel, confidence, factors, summary, recommendations } = result;
  const riskColors = RISK_LEVEL_COLORS[riskLevel] || RISK_LEVEL_COLORS[RiskLevel.Moderate];

  return (
    <div className="space-y-8 mt-8 animate-fadeIn">
      <InfoCard 
        title="Overall Risk Assessment"
        titleClassName="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300"
      >
        <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
          <div>
            <p className="text-sm text-slate-400 mb-1">Overall Risk Score</p>
            <p className="text-4xl font-bold text-sky-300">{overallRiskScore}<span className="text-xl">%</span></p>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Risk Level</p>
            <span 
              className={`px-4 py-1.5 text-lg font-semibold rounded-full ${riskColors.bg} ${riskColors.text} border ${riskColors.border}`}
            >
              {riskLevel}
            </span>
          </div>
          <div>
            <p className="text-sm text-slate-400 mb-1">Prediction Confidence</p>
            <p className="text-2xl font-semibold text-slate-200">{(confidence * 100).toFixed(0)}%</p>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Risk Factors Analysis" icon={<ChartBarIcon className="w-6 h-6 mr-2 text-sky-400" />}>
        {factors && factors.length > 0 ? (
          <RiskChart factors={factors} />
        ) : (
          <p className="text-slate-400">No specific contributing factors identified for visualization.</p>
        )}
      </InfoCard>

      <InfoCard title="Summary" icon={<DocumentTextIcon className="w-6 h-6 mr-2 text-sky-400" />}>
        <p className="text-slate-300 leading-relaxed">{summary}</p>
      </InfoCard>

      {recommendations && (
        <InfoCard title="General Recommendations" icon={<LightBulbIcon className="w-6 h-6 mr-2 text-sky-400" />}>
          <p className="text-slate-300 leading-relaxed">{recommendations}</p>
        </InfoCard>
      )}
    </div>
  );
};

// Add a simple fade-in animation to tailwind.config.js or in a <style> tag in index.html if needed
// For simplicity, we can define it here or assume it's globally available via index.html
// Example: @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
// .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
// This is often better handled in a global CSS or via Tailwind config. For now, using a class name.
// The actual animation keyframes should be in index.html's style tag or Tailwind config.
// Let's add a simple one in index.html for this demo.
// Adding it to index.html style tag for this exercise:
/*
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.7s ease-out forwards;
  }
*/
// This will be applied by adding `animate-fadeIn` to the main div.
// This has been moved to index.html style for global availability.

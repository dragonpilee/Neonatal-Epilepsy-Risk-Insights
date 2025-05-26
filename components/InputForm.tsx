
import React, { useState } from 'react';
import type { ParentalInputs, GeneticMarkerInput, ClinicalData } from '../types';
import { GeneticMarkerPresence, YesNoUnknown, MaternalHealthStatus } from '../types';
import { InfoCard } from './InfoCard';
import { DnaIcon, UserGroupIcon, ClipboardDocCheckIcon, HeartPulseIcon } from './Icons';

interface InputFormProps {
  onSubmit: (data: ParentalInputs) => void;
  isLoading: boolean;
}

const initialGeneticInput: GeneticMarkerInput = {
  markerA: false,
  markerB: GeneticMarkerPresence.Unknown,
  overallScore: 0,
};

const initialClinicalData: ClinicalData = {
  motherAgeAtBirth: "",
  gestationalAgeWeeks: "",
  birthWeightGrams: "",
  apgarScore1Min: "",
  apgarScore5Min: "",
  deliveryComplications: false,
  neonatalSeizuresObserved: YesNoUnknown.Unknown,
  maternalHealthIssues: MaternalHealthStatus.Unknown,
};

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [fatherGenetics, setFatherGenetics] = useState<GeneticMarkerInput>({...initialGeneticInput});
  const [motherGenetics, setMotherGenetics] = useState<GeneticMarkerInput>({...initialGeneticInput});
  const [familyHistory, setFamilyHistory] = useState<YesNoUnknown>(YesNoUnknown.Unknown);
  const [clinicalData, setClinicalData] = useState<ClinicalData>({...initialClinicalData});

  const handleGeneticInputChange = <K extends keyof GeneticMarkerInput>(
    setter: React.Dispatch<React.SetStateAction<GeneticMarkerInput>>,
    field: K,
    value: GeneticMarkerInput[K]
  ) => {
    setter(prev => ({ ...prev, [field]: value }));
  };

  const handleClinicalDataChange = <K extends keyof ClinicalData>(
    field: K,
    value: ClinicalData[K]
  ) => {
    setClinicalData(prev => ({ ...prev, [field]: value }));
  };

  const parseNumericInput = (value: string | number): number | "" => {
    if (value === "") return "";
    const num = Number(value);
    return isNaN(num) ? "" : num;
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedClinicalData: ClinicalData = {
      ...clinicalData,
      motherAgeAtBirth: parseNumericInput(clinicalData.motherAgeAtBirth),
      gestationalAgeWeeks: parseNumericInput(clinicalData.gestationalAgeWeeks),
      birthWeightGrams: parseNumericInput(clinicalData.birthWeightGrams),
      apgarScore1Min: parseNumericInput(clinicalData.apgarScore1Min),
      apgarScore5Min: parseNumericInput(clinicalData.apgarScore5Min),
    };
    onSubmit({ fatherGenetics, motherGenetics, familyHistory, clinicalData: processedClinicalData });
  };

  const renderGeneticInputGroup = (
    title: string,
    genetics: GeneticMarkerInput,
    setter: React.Dispatch<React.SetStateAction<GeneticMarkerInput>>
  ) => (
    <InfoCard title={title} icon={<DnaIcon className="w-6 h-6 mr-2 text-sky-400" />}>
      <div className="space-y-4">
        <div>
          <label htmlFor={`${title}-markerA`} className="block text-sm font-medium text-slate-300 mb-1">Marker A Presence</label>
          <input
            type="checkbox"
            id={`${title}-markerA`}
            checked={genetics.markerA}
            onChange={(e) => handleGeneticInputChange(setter, 'markerA', e.target.checked)}
            className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-sky-600 focus:ring-offset-slate-800"
            aria-labelledby={`${title}-markerA-label`}
          />
          <span id={`${title}-markerA-label`} className="ml-2 text-sm text-slate-400">Is Marker A present?</span>
        </div>
        <div>
          <label htmlFor={`${title}-markerB`} className="block text-sm font-medium text-slate-300 mb-1">Marker B Status</label>
          <select
            id={`${title}-markerB`}
            value={genetics.markerB}
            onChange={(e) => handleGeneticInputChange(setter, 'markerB', e.target.value as GeneticMarkerPresence)}
            className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
          >
            {Object.values(GeneticMarkerPresence).map(val => (
              <option key={val} value={val} className="capitalize">{val}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${title}-overallScore`} className="block text-sm font-medium text-slate-300 mb-1">Overall Genetic Score (0-10)</label>
          <input
            type="number"
            id={`${title}-overallScore`}
            value={genetics.overallScore}
            min="0" max="10" step="1"
            onChange={(e) => handleGeneticInputChange(setter, 'overallScore', parseInt(e.target.value, 10))}
            className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
          />
        </div>
      </div>
    </InfoCard>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid md:grid-cols-2 gap-6">
        {renderGeneticInputGroup("Father's Genetic Profile", fatherGenetics, setFatherGenetics)}
        {renderGeneticInputGroup("Mother's Genetic Profile", motherGenetics, setMotherGenetics)}
      </div>
      
      <InfoCard title="Family & Clinical Background" icon={<UserGroupIcon className="w-6 h-6 mr-2 text-sky-400" />}>
        <div className="space-y-4">
          <div>
            <label htmlFor="familyHistory" className="block text-sm font-medium text-slate-300 mb-1">Family History of Epilepsy</label>
            <select
              id="familyHistory"
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value as YesNoUnknown)}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            >
              {Object.values(YesNoUnknown).map(val => (
                <option key={val} value={val} className="capitalize">{val}</option>
              ))}
            </select>
          </div>
           <div>
            <label htmlFor="maternalHealthIssues" className="block text-sm font-medium text-slate-300 mb-1">Maternal Health Issues During Pregnancy</label>
            <select
              id="maternalHealthIssues"
              value={clinicalData.maternalHealthIssues}
              onChange={(e) => handleClinicalDataChange('maternalHealthIssues', e.target.value as MaternalHealthStatus)}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            >
              {Object.values(MaternalHealthStatus).map(val => (
                <option key={val} value={val} className="capitalize">{val}</option>
              ))}
            </select>
          </div>
        </div>
      </InfoCard>

      <InfoCard title="Perinatal & Neonatal Factors" icon={<HeartPulseIcon className="w-6 h-6 mr-2 text-sky-400" />}>
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <label htmlFor="motherAgeAtBirth" className="block text-sm font-medium text-slate-300 mb-1">Mother's Age at Birth</label>
            <input
              type="number" id="motherAgeAtBirth"
              value={clinicalData.motherAgeAtBirth} min="15" max="55" step="1"
              onChange={(e) => handleClinicalDataChange('motherAgeAtBirth', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              placeholder="e.g., 30"
            />
          </div>
          <div>
            <label htmlFor="gestationalAgeWeeks" className="block text-sm font-medium text-slate-300 mb-1">Gestational Age (Weeks)</label>
            <input
              type="number" id="gestationalAgeWeeks"
              value={clinicalData.gestationalAgeWeeks} min="20" max="45" step="1"
              onChange={(e) => handleClinicalDataChange('gestationalAgeWeeks', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              placeholder="e.g., 40"
            />
          </div>
          <div>
            <label htmlFor="birthWeightGrams" className="block text-sm font-medium text-slate-300 mb-1">Birth Weight (grams)</label>
            <input
              type="number" id="birthWeightGrams"
              value={clinicalData.birthWeightGrams} min="500" max="6000" step="50"
              onChange={(e) => handleClinicalDataChange('birthWeightGrams', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              placeholder="e.g., 3500"
            />
          </div>
           <div>
            <label htmlFor="apgarScore1Min" className="block text-sm font-medium text-slate-300 mb-1">Apgar Score (1 min)</label>
            <input
              type="number" id="apgarScore1Min"
              value={clinicalData.apgarScore1Min} min="0" max="10" step="1"
              onChange={(e) => handleClinicalDataChange('apgarScore1Min', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              placeholder="0-10"
            />
          </div>
          <div>
            <label htmlFor="apgarScore5Min" className="block text-sm font-medium text-slate-300 mb-1">Apgar Score (5 min)</label>
            <input
              type="number" id="apgarScore5Min"
              value={clinicalData.apgarScore5Min} min="0" max="10" step="1"
              onChange={(e) => handleClinicalDataChange('apgarScore5Min', e.target.value === '' ? '' : parseInt(e.target.value, 10))}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
              placeholder="0-10"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="deliveryComplications" className="block text-sm font-medium text-slate-300 mb-1">Significant Delivery Complications (e.g., Hypoxia)</label>
            <input
              type="checkbox"
              id="deliveryComplications"
              checked={clinicalData.deliveryComplications}
              onChange={(e) => handleClinicalDataChange('deliveryComplications', e.target.checked)}
              className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-sky-600 focus:ring-offset-slate-800"
              aria-labelledby="deliveryComplications-label"
            />
            <span id="deliveryComplications-label" className="ml-2 text-sm text-slate-400">Were there significant complications?</span>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="neonatalSeizuresObserved" className="block text-sm font-medium text-slate-300 mb-1">Neonatal Seizures Observed</label>
            <select
              id="neonatalSeizuresObserved"
              value={clinicalData.neonatalSeizuresObserved}
              onChange={(e) => handleClinicalDataChange('neonatalSeizuresObserved', e.target.value as YesNoUnknown)}
              className="w-full p-2.5 rounded-md border-slate-600 bg-slate-700 text-slate-200 focus:ring-sky-500 focus:border-sky-500 shadow-sm"
            >
              {Object.values(YesNoUnknown).map(val => (
                <option key={val} value={val} className="capitalize">{val}</option>
              ))}
            </select>
          </div>
        </div>
      </InfoCard>

      <div className="mt-8 text-center">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out group"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <ClipboardDocCheckIcon className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
              Get Risk Assessment
            </>
          )}
        </button>
      </div>
    </form>
  );
};

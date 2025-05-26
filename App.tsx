
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InputForm } from './components/InputForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { Spinner } from './components/Spinner';
import { ErrorMessage } from './components/ErrorMessage';
import type { ParentalInputs, PredictionResult } from './types';
import { predictEpilepsyRisk } from './services/geminiService';
import { APP_TITLE } from './constants';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);

  const handlePrediction = useCallback(async (inputs: ParentalInputs) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    try {
      // Simulate API call delay if not already handled in service
      // await new Promise(resolve => setTimeout(resolve, 1500)); 
      const result = await predictEpilepsyRisk(inputs);
      setPrediction(result);
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during prediction.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100 font-sans">
      <Header title={APP_TITLE} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800 shadow-2xl rounded-xl p-6 md:p-10 mb-8 border border-slate-700">
            <p className="text-center text-slate-300 mb-6 text-sm md:text-base">
              Enter parental genetic information below to receive a simulated epilepsy risk assessment for a newborn.
            </p>
            <InputForm onSubmit={handlePrediction} isLoading={isLoading} />
          </div>

          {isLoading && <Spinner />}
          {error && <ErrorMessage message={error} />}
          
          {prediction && !isLoading && (
            <ResultsDisplay result={prediction} />
          )}

          <div className="mt-12 p-6 bg-amber-100 text-amber-800 rounded-lg shadow-lg border border-amber-300">
            <h3 className="font-bold text-lg mb-2 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
              Important Disclaimer
            </h3>
            <p className="text-sm">
              This application is a conceptual tool for illustrative and educational purposes only. 
              The predictions generated are based on simulated data and a simplified model. 
              <strong>It is NOT a substitute for professional medical advice, diagnosis, or treatment.</strong> 
              Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. 
              Never disregard professional medical advice or delay in seeking it because of something you have read or seen on this application.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;

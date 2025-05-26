
import { GoogleGenAI, GenerateContentResponse } from "@google/genai"; 
import type { ParentalInputs, PredictionResult, ContributingFactor, ClinicalData } from '../types';
import { RiskLevel, YesNoUnknown, MaternalHealthStatus } from '../types';
import { GEMINI_MODEL_NAME } from '../constants';

const API_KEY = process.env.API_KEY; 
let ai: GoogleGenAI | null = null;

if (API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: API_KEY });
    console.info("GoogleGenAI initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize GoogleGenAI:", error);
    ai = null; // Ensure ai is null if initialization fails
  }
} else {
  console.warn("API_KEY environment variable is not set. AI recommendations will be disabled, using fallback.");
}

const generateAiRecommendations = async (predictionData: PredictionResult): Promise<string> => {
  if (!ai) {
    console.warn("GoogleGenAI client not available. Skipping AI recommendations.");
    return "Consult with healthcare professionals for personalized advice. Regular check-ups and monitoring are important for newborn health. Discuss any concerns with your pediatrician or a neonatal specialist.";
  }

  const { overallRiskScore, riskLevel, factors, summary } = predictionData;

  const factorsSummary = factors.map(f => `- ${f.name} (Impact: ${f.impactScore}/10): ${f.description}`).join('\n');

  const promptContent = `
Based on the following neonatal epilepsy risk assessment:
- Overall Risk Score: ${overallRiskScore}/100
- Risk Level: ${riskLevel}
- Key Contributing Factors:
${factorsSummary}
- Summary: ${summary}

Please provide compassionate and actionable recommendations. Focus on:
1.  Next steps for parents to consider.
2.  Potential monitoring or observational points for the newborn.
3.  General care considerations that might be relevant.
4.  Areas or specific questions to discuss with healthcare professionals (e.g., pediatrician, neurologist, genetic counselor).

Frame your response empathetically. Do not provide direct medical advice or diagnosis. The recommendations should be general guidance to support discussions with qualified medical experts.
Keep the recommendations concise, clear, and structured, perhaps using bullet points.
`;

  try {
    console.log("Attempting to generate AI recommendations with prompt:", promptContent);
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_MODEL_NAME,
      contents: promptContent,
      config: {
        systemInstruction: "You are a helpful medical assistant AI specialized in neonatal care and epilepsy. Your role is to provide supportive, general recommendations based on a simulated risk assessment. You should empower users to have informed conversations with their doctors. Always emphasize that your advice is not a substitute for professional medical consultation. Be empathetic and clear.",
        temperature: 0.7, // For a balance of creativity and factuality
        topP: 0.9,
        topK: 40,
      }
    });
    
    console.log("AI Recommendation API Response received.");
    const recommendationText = response.text;
    if (!recommendationText || recommendationText.trim() === "") {
        console.warn("AI generated empty recommendations. Falling back.");
        return "AI could not generate specific recommendations at this time. Please discuss the risk assessment thoroughly with your healthcare providers. They can offer the best guidance based on a complete medical evaluation.";
    }
    return recommendationText;

  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    return `AI-powered recommendations could not be generated due to an error. We recommend discussing the detailed risk assessment with your healthcare team. Key areas for discussion include the identified risk factors and appropriate monitoring strategies. Standard newborn care and follow-up appointments are crucial. (Error: ${error instanceof Error ? error.message : 'Unknown API error'})`;
  }
};


export const predictEpilepsyRisk = async (inputs: ParentalInputs): Promise<PredictionResult> => {
  console.log("Simulating prediction for inputs:", inputs);
  // Keep the existing mock simulation logic
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500)); // Reduced delay for faster mock part

  let score = 5; 
  const factors: ContributingFactor[] = [];
  const { fatherGenetics, motherGenetics, familyHistory, clinicalData } = inputs;

  const processGenetics = (genetics: typeof fatherGenetics, parent: string) => {
    let geneticFactorScore = genetics.overallScore * 1.2;
    if (genetics.markerA) {
      score += 6; geneticFactorScore += 2.5;
    }
    if (genetics.markerB === 'present') {
      score += 8; geneticFactorScore += 3.5;
    }
    score += genetics.overallScore * 1.8;
    factors.push({ 
      name: `${parent} Genetic Profile`, 
      impactScore: Math.min(10, Math.max(0, Math.round(geneticFactorScore))), 
      description: `Assesses influence from ${parent.toLowerCase()} genetic markers and overall predisposition score.` 
    });
  };
  processGenetics(motherGenetics, "Maternal");
  processGenetics(fatherGenetics, "Paternal");
  
  if (familyHistory === YesNoUnknown.Yes) {
    score += 18;
    factors.push({ name: "Family History", impactScore: 7, description: "Positive family history significantly increases predisposition." });
  } else if (familyHistory === YesNoUnknown.No) {
    factors.push({ name: "Family History", impactScore: 1, description: "No reported family history, a positive factor." });
  } else {
     factors.push({ name: "Family History", impactScore: 2, description: "Family history status unknown." });
  }

  if (clinicalData.motherAgeAtBirth !== "") {
    const age = Number(clinicalData.motherAgeAtBirth);
    if (age < 20 || age > 38) {
      score += (age < 20 ? 3 : (age > 40 ? 4 : 2));
      factors.push({ name: "Maternal Age", impactScore: 3, description: `Maternal age (${age}) outside optimal range.` });
    }
  }

  if (clinicalData.gestationalAgeWeeks !== "") {
    const weeks = Number(clinicalData.gestationalAgeWeeks);
    if (weeks < 37) {
      score += (37 - weeks) * 1.2;
      factors.push({ name: "Gestational Age", impactScore: Math.min(10, Math.max(3, Math.round((37 - weeks) * 0.8))), description: `Preterm birth (${weeks} weeks).` });
    } else if (weeks > 42) {
      score += 3;
      factors.push({ name: "Gestational Age", impactScore: 3, description: `Post-term birth (${weeks} weeks).` });
    }
  }
  
  if (clinicalData.birthWeightGrams !== "") {
    const weight = Number(clinicalData.birthWeightGrams);
    if (weight < 2500) {
      score += (2500 - weight) / 200;
      factors.push({ name: "Birth Weight", impactScore: Math.min(8, Math.max(3, Math.round((2500 - weight) / 250))), description: `Low birth weight (${weight}g).` });
    }
  }

  const processApgar = (apgar: number | "", time: string) => {
    if (apgar !== "") {
      const apgarScoreNum = Number(apgar);
      if (apgarScoreNum < 7) {
        score += (7 - apgarScoreNum) * 1.5;
        factors.push({ name: `Apgar Score (${time})`, impactScore: Math.min(7, Math.max(2, Math.round((7-apgarScoreNum)*1.2))), description: `Low Apgar score at ${time} (${apgarScoreNum}).` });
      }
    }
  };
  processApgar(clinicalData.apgarScore1Min, "1 min");
  processApgar(clinicalData.apgarScore5Min, "5 min");

  if (clinicalData.deliveryComplications) {
    score += 10;
    factors.push({ name: "Delivery Complications", impactScore: 6, description: "Presence of significant delivery complications (e.g., hypoxia)." });
  }

  if (clinicalData.neonatalSeizuresObserved === YesNoUnknown.Yes) {
    score += 25;
    factors.push({ name: "Neonatal Seizures", impactScore: 9, description: "Neonatal seizures observed, a strong risk factor." });
  }
  
  if (clinicalData.maternalHealthIssues === MaternalHealthStatus.Significant) {
    score += 8;
    factors.push({ name: "Maternal Health", impactScore: 5, description: "Significant maternal health issues during pregnancy." });
  } else if (clinicalData.maternalHealthIssues === MaternalHealthStatus.Mild) {
    score += 3;
    factors.push({ name: "Maternal Health", impactScore: 2, description: "Mild maternal health issues during pregnancy." });
  }

  if (Math.random() > 0.8) {
    const randomFactorImpact = Math.round(Math.random() * 4 + 1);
    score += randomFactorImpact * 1.2;
     factors.push({ name: "Other Unspecified Factors", impactScore: randomFactorImpact, description: "Represents other potential influences not explicitly modeled." });
  }

  score = Math.min(Math.max(score, 3), 97);

  let riskLevel: RiskLevel;
  if (score < 25) riskLevel = RiskLevel.Low;
  else if (score < 55) riskLevel = RiskLevel.Moderate;
  else if (score < 78) riskLevel = RiskLevel.High;
  else riskLevel = RiskLevel.VeryHigh;

  const summaryText = `Based on the comprehensive genetic, family, and clinical information provided, the simulated neonatal epilepsy risk score is ${Math.round(score)} out of 100. This corresponds to a ${riskLevel} risk level. Key considerations include genetic profiles, family history, perinatal events, and neonatal observations.`;
  
  const mockPredictionResult: PredictionResult = {
    overallRiskScore: Math.round(score),
    riskLevel,
    confidence: parseFloat((0.65 + Math.random() * 0.30).toFixed(2)),
    factors: factors.sort((a, b) => b.impactScore - a.impactScore).slice(0, 5),
    summary: summaryText,
    recommendations: "Generating personalized recommendations...", // Placeholder
  };

  // Now, fetch AI recommendations
  console.log("Fetching AI recommendations...");
  const aiRecommendations = await generateAiRecommendations(mockPredictionResult);
  mockPredictionResult.recommendations = aiRecommendations;

  return mockPredictionResult;
};

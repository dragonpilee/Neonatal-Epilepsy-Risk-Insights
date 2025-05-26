
# Neonatal Epilepsy Risk Insights

## 🌟 Overview

**Neonatal Epilepsy Risk Insights** is a conceptual web application designed to simulate the prediction of epilepsy risk in newborn babies. It utilizes parental genetic information, family history, and various perinatal/neonatal clinical factors as inputs. The application then provides a simulated risk assessment, visualizes contributing factors through charts, and offers AI-generated general recommendations (if a Google Gemini API key is configured).

**Developed by Alan Cyril Sunny.**

---

**🚨 IMPORTANT DISCLAIMER 🚨**

This application is a **conceptual tool for illustrative and educational purposes ONLY**. The predictions generated are based on **simulated data and a simplified model**.

*   **NOT a substitute for professional medical advice, diagnosis, or treatment.**
*   Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
*   Never disregard professional medical advice or delay in seeking it because of something you have read or seen on this application.
*   The AI-generated recommendations are for informational purposes and should be discussed with healthcare professionals.

---

## ✨ Key Features

*   **Comprehensive Input Form:** Collects detailed information across multiple categories:
    *   Father's & Mother's Genetic Profiles (simulated markers and scores)
    *   Family History of Epilepsy
    *   Maternal Health Issues during pregnancy
    *   Perinatal Factors (mother's age, gestational age, birth weight)
    *   Neonatal Factors (Apgar scores, delivery complications, observed seizures)
*   **Simulated Risk Prediction:** Generates a mock epilepsy risk score and level (Low, Moderate, High, Very High).
*   **Contributing Factor Analysis:** Identifies and displays key (simulated) factors influencing the risk score.
*   **Interactive Risk Chart:** Visualizes the impact of different factors using a bar chart (powered by Recharts).
*   **AI-Powered Recommendations (Optional):** If a Google Gemini API key is provided, the application can generate personalized, general recommendations based on the simulated risk profile.
*   **Responsive Design:** User-friendly interface accessible on various devices.
*   **Clear Disclaimers:** Emphasizes the non-medical, conceptual nature of the tool.

## 🛠️ Technologies Used

*   **Frontend:** React 19, TypeScript
*   **Styling:** Tailwind CSS
*   **Charting:** Recharts
*   **AI Integration:** Google Gemini API (`@google/genai`) for generating recommendations.
*   **Build/Module System:** ES Modules directly in the browser (via `importmap` in `index.html`).

## ⚙️ How It Works (High-Level)

1.  **Data Input:** The user fills out a detailed form with various genetic, historical, and clinical data points.
2.  **Mock Risk Simulation (`services/geminiService.ts`):**
    *   A local, JavaScript-based function simulates a risk calculation based on the provided inputs. This part **does not** use AI for the core risk score generation; it's a predefined heuristic logic.
    *   It calculates an `overallRiskScore`, assigns a `riskLevel`, and identifies mock `contributingFactors`.
3.  **AI-Powered Recommendations (Optional - `services/geminiService.ts`):**
    *   If a `process.env.API_KEY` for the Google Gemini API is available:
        *   The simulated risk profile (score, level, factors, summary) is sent to the Gemini API (`gemini-2.5-flash-preview-04-17` model).
        *   A carefully crafted prompt instructs the AI to act as a helpful medical assistant and provide general, empathetic, and actionable (but not diagnostic) recommendations.
    *   If the API key is not available or the API call fails, fallback static recommendations are shown.
4.  **Results Display:** The application presents:
    *   The overall risk score and level.
    *   A chart visualizing the impact of key factors.
    *   A summary of the assessment.
    *   The (potentially AI-generated) recommendations.

## 📂 Project Structure

```
.
├── public/
│   └── (No public assets currently, index.html serves as base)
├── src/
│   ├── components/                 # React UI components
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Icons.tsx               # SVG Icons
│   │   ├── InfoCard.tsx            # Reusable card for sections
│   │   ├── InputForm.tsx           # Main data input form
│   │   ├── ResultsDisplay.tsx      # Displays prediction results
│   │   ├── RiskChart.tsx           # Bar chart for risk factors
│   │   ├── Spinner.tsx             # Loading spinner
│   │   └── ErrorMessage.tsx        # Error display component
│   ├── services/
│   │   └── geminiService.ts        # Mock prediction logic & Gemini API integration
│   ├── App.tsx                     # Main application component
│   ├── constants.ts                # Application-wide constants
│   ├── index.tsx                   # React entry point
│   └── types.ts                    # TypeScript type definitions
├── .env.example                    # Example for environment variables (API Key)
├── index.html                      # Main HTML file with import maps & Tailwind CSS
├── metadata.json                   # Application metadata
├── package.json                    # Project dependencies (conceptual, as it runs via CDN)
├── README.md                       # This file
└── tsconfig.json                   # TypeScript configuration (conceptual)
```

## 🚀 Getting Started

This project is designed to run directly in a modern browser using ES Modules and CDNs for dependencies like React, Recharts, and Tailwind CSS.

### Prerequisites

*   A modern web browser (e.g., Chrome, Firefox, Edge, Safari).
*   An internet connection (to load CDN resources).
*   **(Optional but Recommended for AI Features)** A Google Gemini API Key.

### Setup and Running

1.  **Clone the repository (or download the files):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Set up the API Key (for AI Recommendations):**
    *   The application looks for the Google Gemini API key in `process.env.API_KEY`. Since this is a client-side application without a Node.js backend to manage environment variables in the traditional sense, you'll need to make this available to the `geminiService.ts` script.
    *   **For local development/testing, you can temporarily hardcode it in `services/geminiService.ts` (NOT recommended for production or sharing):**
        ```typescript
        // In services/geminiService.ts, AT THE VERY TOP (replace with your actual key for testing)
        // IMPORTANT: Remove before committing or sharing your code if you do this.
        // const API_KEY = "YOUR_GEMINI_API_KEY"; // This will override process.env.API_KEY for local test
        
        // Original line:
        // const API_KEY = process.env.API_KEY; 
        ```
    *   **A better way for local testing without backend:** If you are serving `index.html` through a simple local server that allows injecting environment variables or if you are using a framework that supports it, configure it there. For a plain HTML setup, direct script modification or a placeholder replacement during a build step (if you had one) would be options.
    *   **For this specific project structure (running `index.html` directly):** The simplest way for you to test locally is to replace `process.env.API_KEY` directly in `services/geminiService.ts` with your actual API key string.
        ```javascript
        // In services/geminiService.ts
        // Replace this:
        const API_KEY = process.env.API_KEY;
        // With this (for local testing only):
        // const API_KEY = "YOUR_ACTUAL_API_KEY_HERE";
        ```
        **Remember to remove your key before committing or sharing your code.**
    *   To obtain an API key, visit the [Google AI Studio](https://aistudio.google.com/app/apikey).

3.  **Open `index.html` in your browser:**
    *   Navigate to the project directory.
    *   You can usually just double-click the `index.html` file, or right-click and choose "Open with" your preferred browser.
    *   Alternatively, serve the directory using a simple HTTP server (e.g., `npx serve` or Python's `http.server`) and open the provided local URL.

### Using the Application

1.  Fill in the required fields in the "Parental Genetic Profiles," "Family & Clinical Background," and "Perinatal & Neonatal Factors" sections.
2.  Click the "Get Risk Assessment" button.
3.  View the simulated results, including the overall risk score, risk level, contributing factors chart, summary, and (if API key is configured) AI-generated recommendations.

## 📜 License

This project is for demonstration and educational purposes. No specific license is attached, but please use responsibly and acknowledge the source if you adapt or build upon it.

---

This README provides a comprehensive guide to the Neonatal Epilepsy Risk Insights application.
Remember the critical importance of the disclaimer: **this is not a medical tool.**

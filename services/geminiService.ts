
import { GoogleGenAI, Type } from "@google/genai";
import { AssessmentResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateHealthPlan = async (answers: Record<string, string>): Promise<AssessmentResult> => {
  const prompt = `
    As a clinical longevity expert, analyze the following user assessment data and provide a "Sleep Vitality Score" and a detailed action plan.
    User Data: ${JSON.stringify(answers)}
    
    Return a detailed health report in JSON format matching the AssessmentResult interface.
    Include:
    1. A score between 0-100.
    2. A category label (e.g., "High Heat Retainer", "REM Deprived").
    3. An efficiency percentage.
    4. A scientific summary of their profile.
    5. A 3-step action plan with behavioral fixes.
    6. Ensure the tone is analytical, scientific, and trustworthy.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          label: { type: Type.STRING },
          efficiency: { type: Type.STRING },
          summary: { type: Type.STRING },
          actionPlan: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                icon: { type: Type.STRING }
              },
              required: ['title', 'description', 'icon']
            }
          }
        },
        required: ['score', 'label', 'efficiency', 'summary', 'actionPlan']
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Failed to parse API response:', error);
    throw new Error('Invalid response format from AI service');
  }
};

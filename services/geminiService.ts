import { AssessmentResult, HotSleeperAnswers } from "../types";

let ai: any = null;

const getAI = async () => {
  if (!ai) {
    const { GoogleGenAI } = await import("@google/genai");
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }
  return ai;
};

export const generateHealthPlan = async (answers: Record<string, string>): Promise<AssessmentResult> => {
  const { Type } = await import("@google/genai");
  const aiClient = await getAI();
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

  const response = await aiClient.models.generateContent({
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

export interface HotSleeperAIResult {
  summary: string;
  actionPlan: { title: string; description: string; icon: string; }[];
}

export const generateHotSleeperPlan = async (
  answers: HotSleeperAnswers,
  score: number,
  severity: string
): Promise<HotSleeperAIResult> => {
  const { Type } = await import("@google/genai");
  const aiClient = await getAI();

  const prompt = `
    As a sleep optimization expert specializing in thermal regulation, analyze this Hot Sleeper assessment data and provide personalized recommendations.

    User Profile:
    - Hot Sleeper Score: ${score}/100 (${severity})
    - Heat Frequency: ${answers.heatFrequency}
    - Bedroom Temperature: ${answers.roomTemperature}
    - Partner Preferences: ${answers.partnerPreferences}
    - Current Bedding: ${answers.beddingType}
    - Current Solutions: ${answers.currentSolutions}
    - Budget: ${answers.budget}

    Context about cooling products we recommend:
    - Eight Sleep Pod 4 ($2,695): Best for severe hot sleepers - active water cooling, dual-zone, tracks sleep
    - Eight Sleep Pod 5 ($3,295): Latest tech, enhanced AI algorithms
    - ChiliPad Cube ($699): Budget-friendly water-based cooling, works with any mattress
    - Sleep Number Climate Cool ($2,299): Mainstream option with ceramic gel cooling

    Generate:
    1. A 2-3 sentence scientific summary explaining their thermal sleep profile and why they're experiencing heat issues
    2. A 3-step action plan with specific, actionable recommendations tailored to their score and budget

    The tone should be analytical, scientific, and trustworthy. Focus on sleep science and temperature regulation.
  `;

  const response = await aiClient.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
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
        required: ['summary', 'actionPlan']
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Failed to parse Hot Sleeper API response:', error);
    throw new Error('Invalid response format from AI service');
  }
};

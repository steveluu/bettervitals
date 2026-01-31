import { CGMQuizAnswers, CGMAssessmentResult, Product } from '../types';
import { VERIFIED_SELECTIONS } from '../constants';

// CGM Products from constants.tsx for matching
const CGM_PRODUCTS = [
  'levels-health',
  'nutrisense',
  'dexcom-stelo',
  'signos',
  'abbott-lingo',
  'lumen'
];

export const calculateWorthinessScore = (answers: CGMQuizAnswers): number => {
  let score = 40; // Base score

  // Primary goal scoring (+5 to +20)
  const goalScores: Record<string, number> = {
    'metabolic-health': 20,
    'weight-loss': 15,
    'athletic-performance': 12,
    'general-wellness': 8,
    'curiosity': 5,
  };
  score += goalScores[answers.primaryGoal] || 0;

  // Risk factors scoring (+10 to +25 each)
  const riskScores: Record<string, number> = {
    'pre-diabetic': 25,
    'family-history': 20,
    'pcos-insulin-resistance': 18,
    'obesity': 15,
    'energy-crashes': 12,
    'none': 0,
  };
  answers.riskFactors.forEach(risk => {
    score += riskScores[risk] || 10;
  });

  // Wearable comfort scoring (-10 to +10)
  const comfortScores: Record<string, number> = {
    'very-comfortable': 10,
    'comfortable': 5,
    'neutral': 0,
    'hesitant': -5,
    'uncomfortable': -10,
  };
  score += comfortScores[answers.wearableComfort] || 0;

  // Timeline/commitment scoring (-5 to +15)
  const timelineScores: Record<string, number> = {
    'long-term': 15,
    '3-6-months': 10,
    '1-3-months': 5,
    'trial-only': 0,
    'undecided': -5,
  };
  score += timelineScores[answers.timeline] || 0;

  // Cap score at 100
  return Math.min(100, Math.max(0, score));
};

export const getWorthinessLabel = (score: number): 'CGM READY' | 'GOOD CANDIDATE' | 'OPTIONAL' | 'ALTERNATIVE PATH' => {
  if (score >= 75) return 'CGM READY';
  if (score >= 55) return 'GOOD CANDIDATE';
  if (score >= 35) return 'OPTIONAL';
  return 'ALTERNATIVE PATH';
};

export const calculateProductMatches = (answers: CGMQuizAnswers): { productId: string; matchScore: number; bestFor: string }[] => {
  const matches: { productId: string; matchScore: number; bestFor: string }[] = [];

  // Levels Health - Self-directed biohackers, athletes
  let levelsScore = 50;
  if (answers.primaryGoal === 'athletic-performance') levelsScore += 25;
  if (answers.primaryGoal === 'metabolic-health') levelsScore += 20;
  if (answers.dataStyle === 'deep-diver') levelsScore += 15;
  if (answers.dataStyle === 'self-directed') levelsScore += 10;
  if (answers.budget === 'premium' || answers.budget === 'mid-range') levelsScore += 10;
  matches.push({ productId: 'levels-health', matchScore: Math.min(100, levelsScore), bestFor: 'Self-directed biohackers & athletes' });

  // Nutrisense - Those wanting dietitian coaching
  let nutriScore = 50;
  if (answers.dataStyle === 'guided') nutriScore += 25;
  if (answers.dataStyle === 'simple-insights') nutriScore += 15;
  if (answers.primaryGoal === 'weight-loss') nutriScore += 15;
  if (answers.primaryGoal === 'metabolic-health') nutriScore += 10;
  if (answers.budget === 'premium' || answers.budget === 'mid-range') nutriScore += 10;
  matches.push({ productId: 'nutrisense', matchScore: Math.min(100, nutriScore), bestFor: 'Those wanting dietitian coaching' });

  // Dexcom Stelo - Clinical accuracy seekers, $99/mo budget
  let dexcomScore = 50;
  if (answers.dataStyle === 'deep-diver') dexcomScore += 20;
  if (answers.riskFactors.includes('pre-diabetic') || answers.riskFactors.includes('family-history')) dexcomScore += 20;
  if (answers.budget === 'mid-range' || answers.budget === 'budget') dexcomScore += 15;
  if (answers.primaryGoal === 'metabolic-health') dexcomScore += 10;
  matches.push({ productId: 'dexcom-stelo', matchScore: Math.min(100, dexcomScore), bestFor: 'Clinical accuracy seekers' });

  // Signos - Weight loss focused
  let signosScore = 50;
  if (answers.primaryGoal === 'weight-loss') signosScore += 30;
  if (answers.dataStyle === 'guided') signosScore += 15;
  if (answers.dietApproach === 'calorie-restriction' || answers.dietApproach === 'low-carb') signosScore += 10;
  if (answers.budget === 'mid-range') signosScore += 10;
  matches.push({ productId: 'signos', matchScore: Math.min(100, signosScore), bestFor: 'Weight loss focused users' });

  // Abbott Lingo - Budget entry ($49/mo), simple metrics
  let lingoScore = 50;
  if (answers.budget === 'budget') lingoScore += 25;
  if (answers.dataStyle === 'simple-insights') lingoScore += 20;
  if (answers.timeline === 'trial-only' || answers.timeline === '1-3-months') lingoScore += 15;
  if (answers.wearableComfort === 'hesitant' || answers.wearableComfort === 'neutral') lingoScore += 10;
  matches.push({ productId: 'abbott-lingo', matchScore: Math.min(100, lingoScore), bestFor: 'Budget-conscious beginners' });

  // Lumen - Non-invasive preference (breath analysis alternative)
  let lumenScore = 40;
  if (answers.wearableComfort === 'uncomfortable' || answers.wearableComfort === 'hesitant') lumenScore += 30;
  if (answers.primaryGoal === 'weight-loss') lumenScore += 15;
  if (answers.primaryGoal === 'athletic-performance') lumenScore += 10;
  if (answers.dataStyle === 'simple-insights') lumenScore += 10;
  if (answers.budget === 'premium') lumenScore += 10;
  matches.push({ productId: 'lumen', matchScore: Math.min(100, lumenScore), bestFor: 'Non-invasive preference' });

  // Sort by match score descending
  return matches.sort((a, b) => b.matchScore - a.matchScore);
};

export const getProductById = (productId: string): Product | undefined => {
  return VERIFIED_SELECTIONS.find(p => p.id === productId);
};

export interface CGMAIResult {
  verdict: string;
  actionPlan: { title: string; description: string; icon: string }[];
  whyItFits: string[];
}

export const generateCGMAssessment = async (
  answers: CGMQuizAnswers,
  score: number,
  label: string,
  primaryProduct: string
): Promise<CGMAIResult> => {
  const { Type } = await import('@google/genai');
  const { GoogleGenAI } = await import('@google/genai');
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const product = getProductById(primaryProduct);
  const productName = product?.name || primaryProduct;

  const prompt = `
    As a metabolic health expert, analyze this CGM Worthiness Quiz assessment and provide personalized recommendations.

    WRITING STYLE RULES (follow strictly):
    - No "testament to", "underscores", "highlights", "showcases"
    - No "Not only X, but Y" constructions
    - No em dashes for dramatic effect
    - Use "is" and "are" instead of "serves as" or "stands as"
    - Be specific, not vague ("eat fewer carbs at dinner" not "optimize your nutrition")
    - Skip the cheerleading ("this could help" not "this exciting opportunity")
    - No generic positive conclusions
    - Write like you're texting a friend who asked for advice

    User Profile:
    - Worthiness Score: ${score}/100 (${label})
    - Primary Goal: ${answers.primaryGoal}
    - Risk Factors: ${answers.riskFactors.join(', ') || 'None'}
    - Diet Approach: ${answers.dietApproach}
    - Data Style Preference: ${answers.dataStyle}
    - Wearable Comfort Level: ${answers.wearableComfort}
    - Budget: ${answers.budget}
    - Timeline/Commitment: ${answers.timeline}

    Top Recommended Product: ${productName}

    Context about CGM products we recommend:
    - Levels Health ($199/mo): Best for self-directed biohackers and athletes who want detailed glucose insights
    - Nutrisense ($225/mo): Best for those wanting 1:1 dietitian coaching and support
    - Dexcom Stelo ($99/mo): Best for clinical accuracy seekers, FDA-cleared, no prescription needed
    - Signos ($199/mo): Best for weight loss focused users with RD support
    - Abbott Lingo ($49/mo): Best budget entry option with simplified "Lingo count" metric
    - Lumen ($349 one-time): Non-invasive breath analysis alternative for those uncomfortable with sensors

    ${score < 55 ? 'Note: This user scored lower on CGM worthiness. While still recommending products, emphasize that they may get less value from CGM tracking and suggest starting with entry-level options or alternatives.' : ''}

    Generate:
    1. A 2-3 sentence verdict explaining why CGM tracking ${score >= 55 ? 'would benefit them' : 'may be optional for them'} based on their specific profile
    2. A 3-step action plan with specific, actionable recommendations tailored to their goals and timeline
    3. Three specific reasons why ${productName} fits their needs (whyItFits array)

    The tone should be analytical, scientific, and trustworthy. Focus on metabolic health and personalized recommendations.
    Use these Material Symbols icon names for actionPlan icons: glucose, restaurant, schedule, fitness_center, analytics, science, tips_and_updates
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          verdict: { type: Type.STRING },
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
          },
          whyItFits: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ['verdict', 'actionPlan', 'whyItFits']
      }
    }
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error('Failed to parse CGM Assessment API response:', error);
    throw new Error('Invalid response format from AI service');
  }
};

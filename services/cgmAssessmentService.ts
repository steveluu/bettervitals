import { CGMQuizAnswers, Product } from '../types';
import { VERIFIED_SELECTIONS } from '../constants';

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
  const product = getProductById(primaryProduct);
  const productName = product?.name || primaryProduct;

  const response = await fetch('/api/cgm-assessment', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, score, label, primaryProduct, productName })
  });

  if (!response.ok) {
    throw new Error('Failed to generate CGM assessment');
  }

  return response.json();
};

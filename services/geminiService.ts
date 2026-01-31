import { AssessmentResult, HotSleeperAnswers } from "../types";

export const generateHealthPlan = async (answers: Record<string, string>): Promise<AssessmentResult> => {
  const response = await fetch('/api/health-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers })
  });

  if (!response.ok) {
    throw new Error('Failed to generate health plan');
  }

  return response.json();
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
  const response = await fetch('/api/hot-sleeper-plan', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ answers, score, severity })
  });

  if (!response.ok) {
    throw new Error('Failed to generate hot sleeper plan');
  }

  return response.json();
};

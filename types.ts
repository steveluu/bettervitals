
export interface Product {
  id: string;
  name: string;
  category: string;
  tag: string;
  description: string;
  priceLevel: string;
  image: string;
  pros: string[];
  cons: string[];
  score: number;
}

export interface DiagnosticTool {
  id: string;
  title: string;
  description: string;
  time: string;
  icon: string;
  category: 'Sleep' | 'Metabolic' | 'Labs' | 'Wearables' | 'Recovery';
}

export interface Review {
  id: string;
  dataset: string;
  title: string;
  summary: string;
  icon: string;
}

export interface AssessmentResult {
  score: number;
  label: string;
  efficiency: string;
  summary: string;
  actionPlan: {
    title: string;
    description: string;
    icon: string;
  }[];
  recommendations: Product[];
}

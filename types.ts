
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
  affiliateUrl?: string;
  actualPrice?: number;
  slug: string;
  fullDescription?: string;
  verdict?: string;
  evidence?: ProductEvidence;
}

export interface ProductEvidence {
  studyCount: number;
  expertCount: number;
  studies: Study[];
  expertEndorsements: ExpertEndorsement[];
  podcastMentions: PodcastMention[];
  thirdPartyTests: ThirdPartyTest[];
}

export interface Study {
  title: string;
  journal?: string;
  year: number;
  type: 'meta-analysis' | 'rct' | 'brand-study';
  tier: 'S' | 'A' | 'B' | 'C';
  keyFinding: string;
  pubmedUrl?: string;
}

export interface ExpertEndorsement {
  expertName: string;
  expertTitle: string;
  expertCredentials: string;
  quote: string;
  source: string;
  episodeNumber?: string;
  timestamp?: string;
  disclosureNote?: string;
}

export interface PodcastMention {
  podcastName: string;
  podcastHost: string;
  episodeTitle: string;
  episodeNumber: string;
  timestamp: string;
  clipUrl?: string;
}

export interface ThirdPartyTest {
  source: string;
  rating?: string;
  summary: string;
  sourceUrl: string;
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

export interface HotSleeperAnswers {
  heatFrequency: string;
  roomTemperature: string;
  partnerPreferences: string;
  beddingType: string;
  currentSolutions: string;
  budget: string;
}

export interface CGMQuizAnswers {
  primaryGoal: string;
  riskFactors: string[];
  dietApproach: string;
  dataStyle: string;
  wearableComfort: string;
  budget: string;
  timeline: string;
}

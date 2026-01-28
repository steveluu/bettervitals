import { Product, DiagnosticTool, Review } from './types';

export const FEATURED_TOOLS: DiagnosticTool[] = [
  {
    id: 'bio-age',
    title: 'Biological Age Estimator',
    description: 'Our most comprehensive free assessment based on the latest epigenetic research and blood marker analysis.',
    time: '8 MIN',
    icon: 'dna',
    category: 'Labs'
  },
  {
    id: 'hot-sleeper',
    title: 'Hot Sleeper Score',
    description: 'Get a custom cooling plan + gear shortlist based on your thermal environment.',
    time: '2 MIN',
    icon: 'bedtime',
    category: 'Sleep'
  },
  {
    id: 'cgm-worthiness',
    title: 'CGM Worthiness Quiz',
    description: 'Determine if a Continuous Glucose Monitor is actually useful for your metabolism.',
    time: '5 MIN',
    icon: 'glucose',
    category: 'Metabolic'
  },
  {
    id: 'supplement-audit',
    title: 'Supplement Audit',
    description: "Receive a clinical-grade audit of your current stack's efficacy.",
    time: '4 MIN',
    icon: 'pill',
    category: 'Recovery'
  },
  {
    id: 'hrv-index',
    title: 'HRV Recovery Index',
    description: 'Calibrate your wearable data against subjective recovery markers.',
    time: '3 MIN',
    icon: 'monitoring',
    category: 'Wearables'
  }
];

export const VERIFIED_SELECTIONS: Product[] = [
  {
    id: 'oura-ring',
    name: 'Oura Ring Gen3',
    category: 'Wearables',
    tag: 'BEST OVERALL',
    description: 'Sleep & recovery precision',
    priceLevel: '$$$',
    image: 'ring_volume',
    pros: ['Unrivaled sleep stage accuracy', 'Subtle form factor for 24/7 wear'],
    cons: ['Requires monthly subscription'],
    score: 9.6
  },
  {
    id: 'eight-sleep',
    name: 'Eight Sleep Pod 4',
    category: 'Sleep',
    tag: 'HOT SLEEPERS',
    description: 'Dynamic thermal regulation',
    priceLevel: '$$$$',
    image: 'ac_unit',
    pros: ['Dual-zone cooling and heating', 'Automatic temp adjustments'],
    cons: ['High upfront cost'],
    score: 9.8
  },
  {
    id: 'whoop',
    name: 'Whoop 4.0',
    category: 'Wearables',
    tag: "ATHLETE'S CHOICE",
    description: 'Strain & load management',
    priceLevel: '$$',
    image: 'monitoring',
    pros: ['No-screen distraction-free', 'Advanced recovery coaching'],
    cons: ['Subscription-only pricing'],
    score: 9.4
  },
  {
    id: 'air-doctor',
    name: 'AirDoctor 3500',
    category: 'Recovery',
    tag: 'PURITY TECH',
    description: 'Medical-grade filtration',
    priceLevel: '$$$',
    image: 'filter_alt',
    pros: ['UltraHEPA captures 99.99%', 'Quiet operation auto-mode'],
    cons: ['Pricey filter replacements'],
    score: 9.2
  }
];

export const SYSTEM_ANALYSIS: Review[] = [
  {
    id: 'oura-vs-whoop',
    dataset: 'H2H',
    title: 'Oura Ring vs. Whoop: Which Recovery Tracker Wins?',
    summary: '6-month biometric longitudinal study.',
    icon: 'compare_arrows'
  },
  {
    id: 'longevity-blueprint',
    dataset: '2026 Index',
    title: 'The Ultimate Longevity Blueprint: 2026 Edition',
    summary: 'The essential stack for modern optimization.',
    icon: 'query_stats'
  },
  {
    id: 'levels-review',
    dataset: 'Tech Review',
    title: 'Levels Health Review: Is 24/7 Glucose Tracking Overkill?',
    summary: 'Metabolic health tracking value analysis.',
    icon: 'precision_manufacturing'
  }
];

import React, { useState } from 'react';
import { generateHotSleeperPlan, HotSleeperAIResult } from '../services/geminiService';
import { HotSleeperAnswers, Product } from '../types';
import { VERIFIED_SELECTIONS } from '../constants';
import ProductCard from './ProductCard';
import AffiliateDisclosure from './AffiliateDisclosure';

interface HotSleeperAssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const HotSleeperAssessmentModal: React.FC<HotSleeperAssessmentModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<HotSleeperAnswers>({
    heatFrequency: '',
    roomTemperature: '',
    partnerPreferences: '',
    beddingType: '',
    currentSolutions: '',
    budget: '',
  });
  const [result, setResult] = useState<{
    score: number;
    severity: 'mild' | 'moderate' | 'severe' | 'extreme';
    label: string;
    summary: string;
    actionPlan: { title: string; description: string; icon: string; }[];
    productRecommendations: Product[];
  } | null>(null);

  if (!isOpen) return null;

  const calculateHotSleeperScore = (ans: HotSleeperAnswers): number => {
    let score = 0;

    // Heat frequency (40 pts max)
    if (ans.heatFrequency === 'Every night') score += 40;
    else if (ans.heatFrequency === 'Often') score += 30;
    else if (ans.heatFrequency === 'Rarely') score += 15;

    // Room temp (25 pts max)
    if (ans.roomTemperature === 'Above 72F') score += 25;
    else if (ans.roomTemperature === '68-72F') score += 15;
    else if (ans.roomTemperature === '65-68F') score += 5;

    // Partner differences (15 pts max)
    if (ans.partnerPreferences === 'Very different') score += 15;
    else if (ans.partnerPreferences === 'Different') score += 10;

    // Bedding (10 pts max)
    if (ans.beddingType === 'Heavy comforter') score += 10;
    else if (ans.beddingType === 'Standard') score += 5;

    // No current solutions = higher need (10 pts max)
    if (ans.currentSolutions === 'None') score += 10;
    else if (ans.currentSolutions === 'Fan/AC only') score += 7;

    return score;
  };

  const getSeverity = (score: number): 'mild' | 'moderate' | 'severe' | 'extreme' => {
    if (score >= 80) return 'extreme';
    if (score >= 60) return 'severe';
    if (score >= 40) return 'moderate';
    return 'mild';
  };

  const getSeverityLabel = (severity: 'mild' | 'moderate' | 'severe' | 'extreme'): string => {
    switch (severity) {
      case 'extreme': return 'Extreme Hot Sleeper';
      case 'severe': return 'Severe Hot Sleeper';
      case 'moderate': return 'Moderate Hot Sleeper';
      default: return 'Mild Hot Sleeper';
    }
  };

  const getProductRecommendations = (score: number, budget: string): Product[] => {
    // Get cooling sleep products
    const coolingProducts = VERIFIED_SELECTIONS.filter(p =>
      p.category === 'Sleep' &&
      ['HOT SLEEPERS', 'BUDGET COOLING', 'LATEST TECH', 'MAINSTREAM'].includes(p.tag)
    );

    // Budget mapping
    const budgetMaxPrice: Record<string, number> = {
      'Under $100': 100,
      '$100-500': 500,
      '$500-1500': 1500,
      '$1500+': 5000,
      'No limit': Infinity,
    };

    const maxPrice = budgetMaxPrice[budget] || Infinity;

    // Filter by budget and score
    let filtered = coolingProducts.filter(p => (p.actualPrice || 0) <= maxPrice);

    // If score is high (70+), prioritize active cooling systems
    if (score >= 70) {
      filtered.sort((a, b) => {
        const aIsActive = ['HOT SLEEPERS', 'LATEST TECH'].includes(a.tag);
        const bIsActive = ['HOT SLEEPERS', 'LATEST TECH'].includes(b.tag);
        if (aIsActive && !bIsActive) return -1;
        if (!aIsActive && bIsActive) return 1;
        return b.score - a.score;
      });
    } else {
      // Sort by score for moderate cases
      filtered.sort((a, b) => b.score - a.score);
    }

    // Return top 3
    return filtered.slice(0, 3);
  };

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const score = calculateHotSleeperScore(answers);
      const severity = getSeverity(score);
      const label = getSeverityLabel(severity);
      const productRecommendations = getProductRecommendations(score, answers.budget);

      const aiResult: HotSleeperAIResult = await generateHotSleeperPlan(answers, score, severity);

      setResult({
        score,
        severity,
        label,
        summary: aiResult.summary,
        actionPlan: aiResult.actionPlan,
        productRecommendations,
      });
      setStep(4);
    } catch (err) {
      console.error(err);
      alert("Failed to generate assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (slug: string) => {
    onClose();
    onNavigate(`product/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'extreme': return 'border-red-500 text-red-500';
      case 'severe': return 'border-orange-500 text-orange-500';
      case 'moderate': return 'border-yellow-500 text-yellow-500';
      default: return 'border-green-500 text-green-500';
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 1 of 3</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Thermal Profile</h2>
              <p className="text-slate-500 text-sm mt-2">Let's understand your nighttime heat patterns.</p>
            </div>
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">How often do you wake up feeling hot or sweaty?</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['Never', 'Rarely', 'Often', 'Every night'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, heatFrequency: opt})}
                      className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                        answers.heatFrequency === opt
                          ? 'bg-scientific-blue text-white border-scientific-blue'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">What is your typical bedroom temperature?</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['Below 65F', '65-68F', '68-72F', 'Above 72F'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, roomTemperature: opt})}
                      className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                        answers.roomTemperature === opt
                          ? 'bg-scientific-blue text-white border-scientific-blue'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <button
              onClick={handleNext}
              disabled={!answers.heatFrequency || !answers.roomTemperature}
              className="w-full bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 2 of 3</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Environment & Bedding</h2>
              <p className="text-slate-500 text-sm mt-2">Your sleep environment affects thermal regulation.</p>
            </div>
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Do you sleep with a partner who has different temperature preferences?</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['No partner', 'Same preferences', 'Different', 'Very different'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, partnerPreferences: opt})}
                      className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                        answers.partnerPreferences === opt
                          ? 'bg-scientific-blue text-white border-scientific-blue'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">What type of bedding do you currently use?</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['Heavy comforter', 'Standard', 'Lightweight', 'Cooling sheets'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, beddingType: opt})}
                      className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                        answers.beddingType === opt
                          ? 'bg-scientific-blue text-white border-scientific-blue'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <button
              onClick={handleNext}
              disabled={!answers.partnerPreferences || !answers.beddingType}
              className="w-full bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 3 of 3</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Solutions & Budget</h2>
              <p className="text-slate-500 text-sm mt-2">Help us tailor recommendations to your situation.</p>
            </div>
            <div className="space-y-6">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Have you tried cooling solutions before?</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['None', 'Fan/AC only', 'Cooling pillows/pads', 'Active cooling system'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, currentSolutions: opt})}
                      className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                        answers.currentSolutions === opt
                          ? 'bg-scientific-blue text-white border-scientific-blue'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">What is your budget for sleep optimization?</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {['Under $100', '$100-500', '$500-1500', '$1500+', 'No limit'].map(opt => (
                    <button
                      key={opt}
                      onClick={() => setAnswers({...answers, budget: opt})}
                      className={`px-4 py-3 border-2 rounded-lg transition-all text-sm font-medium ${
                        answers.budget === opt
                          ? 'bg-scientific-blue text-white border-scientific-blue'
                          : 'border-slate-200 hover:border-primary'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <button
              disabled={loading || !answers.currentSolutions || !answers.budget}
              onClick={handleSubmit}
              className="w-full bg-scientific-blue text-white py-4 rounded-lg font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Analyzing Your Profile...
                </span>
              ) : (
                'Get My Hot Sleeper Score'
              )}
            </button>
          </div>
        );
      case 4:
        if (!result) return null;
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Score Display */}
            <div className="flex flex-col items-center text-center">
              <div className={`size-32 rounded-full border-8 flex items-center justify-center mb-4 ${getSeverityColor(result.severity)}`}>
                <span className="text-4xl font-black">{result.score}</span>
              </div>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue mb-2">{result.label}</h2>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Hot Sleeper Score: {result.score}/100</p>
            </div>

            {/* Summary */}
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-slate-600 leading-relaxed italic">{result.summary}</p>
            </div>

            {/* Action Plan */}
            <div className="space-y-4">
              <h3 className="font-black text-xs uppercase tracking-widest text-primary">Your 3-Step Cooling Plan</h3>
              {result.actionPlan.map((action, i) => (
                <div key={i} className="flex gap-4 items-start p-4 bg-white border border-slate-100 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-scientific-blue text-lg">{action.icon}</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm">{action.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Product Recommendations */}
            {result.productRecommendations.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-black text-xs uppercase tracking-widest text-primary">Recommended Cooling Gear</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {result.productRecommendations.map(product => (
                    <ProductCard key={product.id} product={product} onSelect={handleProductClick} />
                  ))}
                </div>
                <AffiliateDisclosure />
              </div>
            )}

            <button
              onClick={onClose}
              className="w-full bg-slate-900 text-white py-4 rounded-lg font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all"
            >
              Close Report
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-scientific-blue/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-scientific-blue z-10"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-scientific-blue to-primary/80 p-6 text-white">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-3xl">ac_unit</span>
            <div>
              <h1 className="font-black text-lg uppercase tracking-tight">Hot Sleeper Score</h1>
              <p className="text-white/70 text-xs">Personalized thermal sleep assessment</p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default HotSleeperAssessmentModal;

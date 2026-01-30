import React, { useState } from 'react';
import { CGMQuizAnswers, Product } from '../types';
import {
  calculateWorthinessScore,
  getWorthinessLabel,
  calculateProductMatches,
  getProductById,
  generateCGMAssessment,
  CGMAIResult
} from '../services/cgmAssessmentService';
import ProductCard from './ProductCard';
import AffiliateDisclosure from './AffiliateDisclosure';

interface CGMWorthinessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

const CGMWorthinessModal: React.FC<CGMWorthinessModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<CGMQuizAnswers>({
    primaryGoal: '',
    riskFactors: [],
    dietApproach: '',
    dataStyle: '',
    wearableComfort: '',
    budget: '',
    timeline: '',
  });
  const [result, setResult] = useState<{
    worthinessScore: number;
    worthinessLabel: 'CGM READY' | 'GOOD CANDIDATE' | 'OPTIONAL' | 'ALTERNATIVE PATH';
    verdict: string;
    primaryRecommendation: {
      product: Product;
      matchScore: number;
      whyItFits: string[];
    };
    alternatives: { product: Product; matchScore: number; bestFor: string }[];
    actionPlan: { title: string; description: string; icon: string }[];
  } | null>(null);

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const toggleRiskFactor = (factor: string) => {
    if (factor === 'none') {
      setAnswers({ ...answers, riskFactors: answers.riskFactors.includes('none') ? [] : ['none'] });
    } else {
      const newFactors = answers.riskFactors.filter(f => f !== 'none');
      if (newFactors.includes(factor)) {
        setAnswers({ ...answers, riskFactors: newFactors.filter(f => f !== factor) });
      } else {
        setAnswers({ ...answers, riskFactors: [...newFactors, factor] });
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const score = calculateWorthinessScore(answers);
      const label = getWorthinessLabel(score);
      const productMatches = calculateProductMatches(answers);

      const primaryMatch = productMatches[0];
      const primaryProduct = getProductById(primaryMatch.productId);

      const aiResult: CGMAIResult = await generateCGMAssessment(answers, score, label, primaryMatch.productId);

      const alternatives = productMatches.slice(1, 4).map(match => ({
        product: getProductById(match.productId)!,
        matchScore: match.matchScore,
        bestFor: match.bestFor
      })).filter(a => a.product);

      setResult({
        worthinessScore: score,
        worthinessLabel: label,
        verdict: aiResult.verdict,
        primaryRecommendation: {
          product: primaryProduct!,
          matchScore: primaryMatch.matchScore,
          whyItFits: aiResult.whyItFits,
        },
        alternatives,
        actionPlan: aiResult.actionPlan,
      });
      setStep(8);
    } catch (err) {
      console.error(err);
      alert('Failed to generate assessment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = (slug: string) => {
    onClose();
    onNavigate(`product/${slug}`);
  };

  const getLabelColor = (label: string): string => {
    switch (label) {
      case 'CGM READY': return 'border-green-500 text-green-500';
      case 'GOOD CANDIDATE': return 'border-blue-500 text-blue-500';
      case 'OPTIONAL': return 'border-yellow-500 text-yellow-500';
      default: return 'border-slate-500 text-slate-500';
    }
  };

  const getLabelBgColor = (label: string): string => {
    switch (label) {
      case 'CGM READY': return 'bg-green-500';
      case 'GOOD CANDIDATE': return 'bg-blue-500';
      case 'OPTIONAL': return 'bg-yellow-500';
      default: return 'bg-slate-500';
    }
  };

  const renderStep = () => {
    switch (step) {
      // Step 1: Primary Goal
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 1 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Your Primary Health Goal</h2>
              <p className="text-slate-500 text-sm mt-2">What's driving your interest in glucose tracking?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'metabolic-health', label: 'Optimize Metabolic Health', desc: 'Improve insulin sensitivity, prevent disease' },
                { value: 'weight-loss', label: 'Weight Management', desc: 'Use glucose data to guide eating patterns' },
                { value: 'athletic-performance', label: 'Athletic Performance', desc: 'Fuel workouts and optimize recovery' },
                { value: 'general-wellness', label: 'General Wellness', desc: 'Better understand my body' },
                { value: 'curiosity', label: 'Just Curious', desc: 'Want to experiment with the technology' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, primaryGoal: opt.value })}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left ${
                    answers.primaryGoal === opt.value
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className={`text-xs ${answers.primaryGoal === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!answers.primaryGoal}
              className="w-full bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Step
            </button>
          </div>
        );

      // Step 2: Risk Factors (Multi-select)
      case 2:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 2 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Metabolic Risk Factors</h2>
              <p className="text-slate-500 text-sm mt-2">Select all that apply to you.</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'pre-diabetic', label: 'Pre-diabetic / Elevated A1C' },
                { value: 'family-history', label: 'Family history of diabetes' },
                { value: 'pcos-insulin-resistance', label: 'PCOS or insulin resistance' },
                { value: 'obesity', label: 'Overweight / Obesity (BMI > 30)' },
                { value: 'energy-crashes', label: 'Frequent energy crashes' },
                { value: 'none', label: 'None of the above' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => toggleRiskFactor(opt.value)}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left flex items-center gap-3 ${
                    answers.riskFactors.includes(opt.value)
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                    answers.riskFactors.includes(opt.value) ? 'bg-white border-white' : 'border-slate-300'
                  }`}>
                    {answers.riskFactors.includes(opt.value) && (
                      <span className="material-symbols-outlined text-scientific-blue text-sm">check</span>
                    )}
                  </span>
                  <span className="font-medium text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleBack} className="px-6 py-4 border-2 border-slate-200 rounded-lg font-bold text-slate-500 hover:border-slate-300">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={answers.riskFactors.length === 0}
                className="flex-1 bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      // Step 3: Diet Approach
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 3 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Current Diet Approach</h2>
              <p className="text-slate-500 text-sm mt-2">How do you currently approach nutrition?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'low-carb', label: 'Low-Carb / Keto' },
                { value: 'calorie-restriction', label: 'Calorie Counting / Deficit' },
                { value: 'intuitive', label: 'Intuitive Eating' },
                { value: 'time-restricted', label: 'Intermittent Fasting / Time-Restricted' },
                { value: 'no-specific', label: 'No Specific Approach' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, dietApproach: opt.value })}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left ${
                    answers.dietApproach === opt.value
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className="font-medium text-sm">{opt.label}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleBack} className="px-6 py-4 border-2 border-slate-200 rounded-lg font-bold text-slate-500 hover:border-slate-300">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!answers.dietApproach}
                className="flex-1 bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      // Step 4: Data Style
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 4 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Data Engagement Style</h2>
              <p className="text-slate-500 text-sm mt-2">How do you prefer to interact with health data?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'deep-diver', label: 'Deep Diver', desc: 'I want all the raw data and charts' },
                { value: 'self-directed', label: 'Self-Directed', desc: 'Give me insights, I\'ll figure out the rest' },
                { value: 'guided', label: 'Guided Coaching', desc: 'I want expert interpretation and advice' },
                { value: 'simple-insights', label: 'Simple Insights', desc: 'Just tell me what to do' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, dataStyle: opt.value })}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left ${
                    answers.dataStyle === opt.value
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className={`text-xs ${answers.dataStyle === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleBack} className="px-6 py-4 border-2 border-slate-200 rounded-lg font-bold text-slate-500 hover:border-slate-300">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!answers.dataStyle}
                className="flex-1 bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      // Step 5: Wearable Comfort
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 5 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Sensor Comfort Level</h2>
              <p className="text-slate-500 text-sm mt-2">CGMs involve a small sensor worn on your arm for 14 days.</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'very-comfortable', label: 'Very Comfortable', desc: 'I already wear sensors or have no concerns' },
                { value: 'comfortable', label: 'Comfortable', desc: 'Seems manageable, willing to try' },
                { value: 'neutral', label: 'Neutral', desc: 'Not sure, but open to it' },
                { value: 'hesitant', label: 'Hesitant', desc: 'A bit worried about comfort/visibility' },
                { value: 'uncomfortable', label: 'Prefer Non-Invasive', desc: 'Would rather avoid wearing a sensor' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, wearableComfort: opt.value })}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left ${
                    answers.wearableComfort === opt.value
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className={`text-xs ${answers.wearableComfort === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleBack} className="px-6 py-4 border-2 border-slate-200 rounded-lg font-bold text-slate-500 hover:border-slate-300">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!answers.wearableComfort}
                className="flex-1 bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      // Step 6: Budget
      case 6:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 6 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Monthly Budget</h2>
              <p className="text-slate-500 text-sm mt-2">CGM services range from $49-$350/month.</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'budget', label: 'Under $75/month', desc: 'Entry-level options' },
                { value: 'mid-range', label: '$75-150/month', desc: 'Most popular tier' },
                { value: 'premium', label: '$150-250/month', desc: 'Premium with coaching' },
                { value: 'no-limit', label: 'No budget limit', desc: 'Best solution regardless of cost' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, budget: opt.value })}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left ${
                    answers.budget === opt.value
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className={`text-xs ${answers.budget === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleBack} className="px-6 py-4 border-2 border-slate-200 rounded-lg font-bold text-slate-500 hover:border-slate-300">
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!answers.budget}
                className="flex-1 bg-primary text-scientific-blue py-4 rounded-lg font-black uppercase tracking-widest hover:brightness-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next Step
              </button>
            </div>
          </div>
        );

      // Step 7: Timeline
      case 7:
        return (
          <div className="space-y-6">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary mb-2 block">Step 7 of 7</span>
              <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Commitment Level</h2>
              <p className="text-slate-500 text-sm mt-2">How long do you plan to use a CGM?</p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'long-term', label: 'Long-term (6+ months)', desc: 'Building lasting habits' },
                { value: '3-6-months', label: '3-6 months', desc: 'Serious exploration phase' },
                { value: '1-3-months', label: '1-3 months', desc: 'Testing the waters' },
                { value: 'trial-only', label: 'Just a trial', desc: 'Single month to see if it works' },
                { value: 'undecided', label: 'Undecided', desc: 'Not sure yet' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setAnswers({ ...answers, timeline: opt.value })}
                  className={`w-full px-4 py-4 border-2 rounded-lg transition-all text-left ${
                    answers.timeline === opt.value
                      ? 'bg-scientific-blue text-white border-scientific-blue'
                      : 'border-slate-200 hover:border-primary'
                  }`}
                >
                  <span className="font-bold text-sm block">{opt.label}</span>
                  <span className={`text-xs ${answers.timeline === opt.value ? 'text-white/70' : 'text-slate-400'}`}>{opt.desc}</span>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={handleBack} className="px-6 py-4 border-2 border-slate-200 rounded-lg font-bold text-slate-500 hover:border-slate-300">
                Back
              </button>
              <button
                disabled={loading || !answers.timeline}
                onClick={handleSubmit}
                className="flex-1 bg-scientific-blue text-white py-4 rounded-lg font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                    Analyzing Your Profile...
                  </span>
                ) : (
                  'Get My CGM Recommendation'
                )}
              </button>
            </div>
          </div>
        );

      // Step 8: Results
      case 8:
        if (!result) return null;
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Score Display */}
            <div className="flex flex-col items-center text-center">
              <div className={`size-32 rounded-full border-8 flex items-center justify-center mb-4 ${getLabelColor(result.worthinessLabel)}`}>
                <span className="text-4xl font-black">{result.worthinessScore}</span>
              </div>
              <div className={`${getLabelBgColor(result.worthinessLabel)} text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2`}>
                {result.worthinessLabel}
              </div>
              <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">CGM Worthiness Score</p>
            </div>

            {/* Verdict */}
            <div className="bg-slate-50 p-6 rounded-lg border-l-4 border-primary">
              <p className="text-slate-600 leading-relaxed italic">{result.verdict}</p>
            </div>

            {/* Primary Recommendation */}
            <div className="space-y-4">
              <h3 className="font-black text-xs uppercase tracking-widest text-primary">Your Top Match</h3>
              <div className="bg-gradient-to-br from-scientific-blue to-primary/80 p-6 rounded-lg text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-white/20 px-3 py-1 rounded-full">
                  <span className="text-xs font-bold">{result.primaryRecommendation.matchScore}% Match</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="material-symbols-outlined text-4xl">{result.primaryRecommendation.product.image}</span>
                  <div>
                    <h4 className="font-bold text-lg">{result.primaryRecommendation.product.name}</h4>
                    <p className="text-white/70 text-sm">{result.primaryRecommendation.product.description}</p>
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  {result.primaryRecommendation.whyItFits.slice(0, 3).map((reason, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <span className="material-symbols-outlined text-primary text-sm mt-0.5">check_circle</span>
                      <span className="text-sm text-white/90">{reason}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleProductClick(result.primaryRecommendation.product.slug)}
                  className="w-full bg-white text-scientific-blue py-3 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-primary transition-all"
                >
                  View Full Review
                </button>
              </div>
            </div>

            {/* Alternatives Grid */}
            {result.alternatives.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-black text-xs uppercase tracking-widest text-primary">Other Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {result.alternatives.map((alt) => (
                    <div
                      key={alt.product.id}
                      onClick={() => handleProductClick(alt.product.slug)}
                      className="bg-white border border-slate-100 p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-scientific-blue text-2xl">{alt.product.image}</span>
                        <span className="text-xs font-bold text-slate-400">{alt.matchScore}%</span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{alt.product.name}</h4>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider">{alt.bestFor}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Plan */}
            <div className="space-y-4">
              <h3 className="font-black text-xs uppercase tracking-widest text-primary">Your Action Plan</h3>
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

            <AffiliateDisclosure />

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
            <span className="material-symbols-outlined text-3xl">glucose</span>
            <div>
              <h1 className="font-black text-lg uppercase tracking-tight">CGM Worthiness Quiz</h1>
              <p className="text-white/70 text-xs">Find the right glucose monitor for your goals</p>
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

export default CGMWorthinessModal;

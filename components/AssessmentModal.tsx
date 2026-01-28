
import React, { useState } from 'react';
import { generateHealthPlan } from '../services/geminiService';
import { AssessmentResult } from '../types';

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AssessmentResult | null>(null);

  if (!isOpen) return null;

  const handleNext = () => setStep(step + 1);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const report = await generateHealthPlan(answers);
      setResult(report);
      setStep(4);
    } catch (err) {
      console.error(err);
      alert("Failed to generate assessment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="serif-heading text-3xl font-bold text-scientific-blue">First, tell us about your sleep.</h2>
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">How many hours do you average?</span>
                <select 
                  className="mt-2 block w-full rounded-md border-slate-200 bg-slate-50 p-3"
                  onChange={(e) => setAnswers({...answers, sleepHours: e.target.value})}
                >
                  <option>Select range</option>
                  <option>Less than 5</option>
                  <option>5-7 hours</option>
                  <option>7-9 hours</option>
                  <option>10+ hours</option>
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Do you wake up feeling hot?</span>
                <div className="mt-2 flex gap-4">
                  {['Never', 'Rarely', 'Often', 'Every night'].map(opt => (
                    <button 
                      key={opt}
                      onClick={() => setAnswers({...answers, sleepTemp: opt})}
                      className={`px-4 py-2 border rounded-md transition-all ${answers.sleepTemp === opt ? 'bg-scientific-blue text-white' : 'hover:border-primary'}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </label>
            </div>
            <button onClick={handleNext} className="w-full bg-primary text-scientific-blue py-4 rounded-sm font-black uppercase tracking-widest hover:brightness-105 transition-all">Next Step</button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Next, your activity.</h2>
            <div className="grid grid-cols-1 gap-4">
              <label className="block">
                <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Activity Level</span>
                <select 
                  className="mt-2 block w-full rounded-md border-slate-200 bg-slate-50 p-3"
                  onChange={(e) => setAnswers({...answers, activity: e.target.value})}
                >
                  <option>Sedentary</option>
                  <option>Moderate (3-4 days/wk)</option>
                  <option>Active (5+ days/wk)</option>
                  <option>Pro/Athlete</option>
                </select>
              </label>
            </div>
            <button onClick={handleNext} className="w-full bg-primary text-scientific-blue py-4 rounded-sm font-black uppercase tracking-widest hover:brightness-105 transition-all">Almost Done</button>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="serif-heading text-3xl font-bold text-scientific-blue">Generate Blueprint.</h2>
            <p className="text-slate-500">Our clinical engine will now generate your personalized longevity protocol based on your biomarkers and habits.</p>
            <button 
              disabled={loading}
              onClick={handleSubmit} 
              className="w-full bg-scientific-blue text-white py-4 rounded-sm font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all disabled:opacity-50"
            >
              {loading ? 'Analyzing Data...' : 'Generate Report'}
            </button>
          </div>
        );
      case 4:
        if (!result) return null;
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="flex flex-col items-center text-center">
                <div className="size-32 rounded-full border-8 border-primary flex items-center justify-center mb-4">
                  <span className="text-4xl font-black text-scientific-blue">{result.score}</span>
                </div>
                <h2 className="serif-heading text-4xl font-bold text-scientific-blue mb-2">Profile: {result.label}</h2>
                <p className="text-slate-500 font-medium uppercase tracking-widest text-xs">Efficiency: {result.efficiency}</p>
             </div>
             
             <div className="bg-slate-50 p-6 rounded-sm border-l-4 border-primary">
                <p className="text-slate-600 leading-relaxed italic">{result.summary}</p>
             </div>

             <div className="space-y-4">
                <h3 className="font-black text-xs uppercase tracking-widest text-primary">Immediate Action Plan</h3>
                {result.actionPlan.map((action, i) => (
                  <div key={i} className="flex gap-4 items-start p-4 bg-white border border-slate-100 rounded-sm">
                    <span className="material-symbols-outlined text-scientific-blue">{action.icon}</span>
                    <div>
                      <p className="font-bold text-xs uppercase">{action.title}</p>
                      <p className="text-xs text-slate-500">{action.description}</p>
                    </div>
                  </div>
                ))}
             </div>

             <button onClick={onClose} className="w-full bg-slate-900 text-white py-4 rounded-sm font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all">Close Report</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-scientific-blue/40 backdrop-blur-md">
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-scientific-blue"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="p-8 md:p-12">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;

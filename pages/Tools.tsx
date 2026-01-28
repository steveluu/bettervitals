import React, { useState } from 'react';
import { FEATURED_TOOLS } from '../constants';
import ToolCard from '../components/ToolCard';
import { getCategoryColorDark } from '../utils/categoryColors';

interface ToolsProps {
  onOpenAssessment: () => void;
}

const Tools: React.FC<ToolsProps> = ({ onOpenAssessment }) => {
  const [filter, setFilter] = useState('All Tools');
  const filters = ['All Tools', 'Sleep', 'Metabolic', 'Labs', 'Longevity', 'Gear Sizing'];

  const featured = FEATURED_TOOLS.find(t => t.id === 'hot-sleeper') || FEATURED_TOOLS[0];
  const others = filter === 'All Tools'
    ? FEATURED_TOOLS.filter(t => t.id !== featured.id)
    : FEATURED_TOOLS.filter(t => t.id !== featured.id && (t.category === filter || (filter === 'Gear Sizing' && t.category === 'Wearables')));

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="serif-heading text-6xl md:text-7xl font-bold text-scientific-blue mb-8">
          Diagnostic Tools &<br />Calculators
        </h1>
        <p className="text-slate-500 text-lg md:text-xl max-w-3xl leading-relaxed font-light">
          Objective assessments to help you stop guessing and start optimizing.<br />
          <span className="font-bold text-slate-900">Free, fast, and data-backed.</span>
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1 space-y-12">
          {/* Main Hero Tool */}
          <div className="bg-[#f8fafc] border border-slate-100 rounded-2xl p-8 md:p-12 relative overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="absolute top-8 right-8 flex gap-2">
              <span className={`text-[9px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest shadow-sm ${getCategoryColorDark(featured.category)}`}>
                {featured.category}
              </span>
              <span className="bg-[#1e293b] text-white text-[9px] font-black px-3 py-1.5 rounded-sm uppercase tracking-widest">EDITOR'S CHOICE</span>
            </div>
            <div className="max-w-2xl">
              <span className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] mb-4 block">Most Popular Assessment</span>
              <h2 className="serif-heading text-4xl font-bold text-[#1e293b] mb-4">{featured.title}</h2>
              <p className="text-slate-500 mb-8 leading-relaxed">{featured.description}</p>
              
              <div className="space-y-4 mb-10">
                {['Personalized thermal environment analysis', 'Custom cooling gear shortlist', 'Data-backed sleep optimization protocol'].map(item => (
                  <div key={item} className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-slate-400 text-sm">check</span>
                    <span className="text-[13px] font-medium text-slate-600">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-8">
                <button 
                  onClick={onOpenAssessment}
                  className="bg-[#0a192f] text-white px-8 py-4 rounded-lg text-[13px] font-black uppercase tracking-tight flex items-center gap-2 hover:bg-[#1e293b] transition-all shadow-md active:scale-95"
                >
                  START ASSESSMENT <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="material-symbols-outlined text-lg">schedule</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">{featured.time} TO COMPLETE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 py-4">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-8 py-3 rounded-full text-[12px] font-bold transition-all ${
                  filter === f 
                    ? 'bg-[#0a192f] text-white shadow-lg' 
                    : 'bg-[#f1f5f9] text-[#64748b] hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Sub Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {others.map(tool => (
              <ToolCard key={tool.id} tool={tool} onClick={onOpenAssessment} />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-96 space-y-8">
          <div className="bg-[#0a192f] text-white rounded-2xl p-10">
            <h3 className="serif-heading text-2xl font-bold mb-8">How our tools work</h3>
            <div className="space-y-10">
              {[
                { icon: 'biotech', title: 'DATA-LED METHODOLOGY', desc: 'Algorithms built on peer-reviewed clinical studies and large-scale longevity datasets.' },
                { icon: 'verified_user', title: 'PRIVACY FIRST', desc: 'Your assessment data is encrypted and never sold to third-party insurance providers.' },
                { icon: 'clinical_notes', title: 'EXPERT VETTED', desc: 'Every calculator is audited by our internal clinical team for statistical relevance.' }
              ].map(info => (
                <div key={info.title} className="flex gap-6 items-start">
                  <div className="bg-[#00E5FF] text-[#0a192f] w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-xl">{info.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-black text-[12px] uppercase tracking-tight mb-2">{info.title}</h4>
                    <p className="text-[12px] text-slate-400 leading-relaxed font-light">{info.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-white/5">
              <div className="bg-white/5 p-4 rounded-lg">
                <p className="text-[10px] uppercase tracking-widest leading-tight text-white/40 font-bold">
                  Medical Disclaimer: BetterVitals tools provide informational insights only and are not a substitute for professional medical advice, diagnosis, or treatment.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Tools;

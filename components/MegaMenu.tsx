
import React from 'react';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (slug: string) => void;
  onStartAssessment: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onNavigate, onStartAssessment }) => {
  if (!isOpen) return null;

  const categories = [
    { name: 'Sleep', icon: 'bedtime', slug: 'sleep' },
    { name: 'Labs & Testing', icon: 'science', slug: 'labs' },
    { name: 'Metabolic', icon: 'insights', slug: 'discovery' },
    { name: 'Wearables & Health Tech', icon: 'watch', slug: 'wearables' },
    { name: 'Recovery', icon: 'auto_fix_high', slug: 'discovery' },
    { name: 'Heat Therapy (Saunas)', icon: 'thermostat', slug: 'discovery' },
    { name: 'Cold Therapy (Plunges)', icon: 'ac_unit', slug: 'discovery' },
    { name: 'Light Therapy', icon: 'light_mode', slug: 'discovery' },
    { name: 'Home Environment', icon: 'home', slug: 'discovery' },
    { name: 'Supplements & Nutrition', icon: 'pill', slug: 'discovery' },
  ];

  const goals = [
    'Sleep deeper',
    'Stop overheating at night',
    'Improve energy',
    'Improve metabolic health',
    'Recover faster',
    'Improve air quality at home'
  ];

  const popular = [
    { name: 'Eight Sleep Pod 4', badge: 'Best for temperature' },
    { name: 'Oura Ring Gen 3', badge: 'Best for recovery' },
    { name: 'Levels Health', badge: 'Best for metabolic' },
  ];

  const guides = [
    'Best Bed Cooling Systems',
    'Best CGM Programs',
    'Best Infrared Saunas'
  ];

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300 z-50"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1200px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Column 1: Browse by Category */}
        <div className="md:col-span-4 border-r border-slate-50 pr-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Browse by Category</h3>
          <div className="grid grid-cols-1 gap-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => { onNavigate(cat.slug); onClose(); }}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors group text-left"
              >
                <span className="material-symbols-outlined text-slate-300 group-hover:text-[#359EFF] text-xl transition-colors">{cat.icon}</span>
                <span className="text-[13px] font-bold text-[#1e293b] group-hover:translate-x-1 transition-transform">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Column 2: Browse by Goal */}
        <div className="md:col-span-4 border-r border-slate-50 pr-8">
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Browse by Goal</h3>
          <div className="space-y-3">
            {goals.map((goal) => (
              <button
                key={goal}
                onClick={() => { onNavigate('discovery'); onClose(); }}
                className="w-full text-left p-4 rounded-xl bg-[#f8fafc] border border-transparent hover:border-[#359EFF]/30 hover:bg-white hover:shadow-sm transition-all group"
              >
                <span className="text-[13px] font-bold text-[#1e293b] flex items-center justify-between">
                  {goal}
                  <span className="material-symbols-outlined text-sm opacity-0 group-hover:opacity-100 transition-opacity">chevron_right</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Column 3: Editor Picks / Start Here */}
        <div className="md:col-span-4 space-y-10">
          {/* Start with a tool */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#359EFF] mb-4">Start Here</h3>
            <button 
              onClick={() => { onStartAssessment(); onClose(); }}
              className="w-full p-6 rounded-2xl bg-[#0a2472] text-white hover:brightness-110 transition-all text-left group"
            >
              <p className="text-sm font-black mb-1 flex items-center gap-2">
                Get my personalized picks
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </p>
              <p className="text-[11px] text-white/60 font-medium">Identify your needs & get a verified gear shortlist.</p>
            </button>
          </div>

          {/* Popular Right Now */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Popular Right Now</h3>
            <div className="space-y-4">
              {popular.map((item) => (
                <button 
                  key={item.name}
                  onClick={() => { onNavigate('discovery'); onClose(); }}
                  className="w-full text-left group"
                >
                  <p className="text-[13px] font-bold text-[#1e293b] group-hover:text-[#359EFF] transition-colors">{item.name}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.badge}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Best Guides */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Best Guides</h3>
            <div className="space-y-3">
              {guides.map((guide) => (
                <button 
                  key={guide}
                  onClick={() => { onNavigate('discovery'); onClose(); }}
                  className="block text-[13px] font-bold text-slate-600 hover:text-[#359EFF] transition-colors"
                >
                  {guide}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

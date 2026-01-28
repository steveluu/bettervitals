
import React from 'react';
import ToolCard from '../components/ToolCard';
import ProductCard from '../components/ProductCard';
import { FEATURED_TOOLS, VERIFIED_SELECTIONS, SYSTEM_ANALYSIS } from '../constants';

interface HomeProps {
  onGetPicks: () => void;
  onBrowseCategories: () => void;
  onOpenAssessment: () => void;
}

const Home: React.FC<HomeProps> = ({ onGetPicks, onBrowseCategories, onOpenAssessment }) => {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="mb-24">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl lg:text-7xl font-black leading-tight tracking-tighter text-scientific-blue dark:text-white">
              Know your numbers.<br/><span className="text-primary italic font-serif">Get a plan.</span><br/>Buy only what matters.
            </h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-xl font-light leading-relaxed">
              Free diagnostic tools and brutally honest product recommendations curated for your longevity. 
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onGetPicks}
                className="bg-scientific-blue text-white h-14 px-10 rounded-sm font-black text-sm uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all shadow-lg active:scale-95"
              >
                Get my personalized picks
              </button>
              <button 
                onClick={onBrowseCategories}
                className="border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white h-14 px-10 rounded-sm font-black text-sm uppercase tracking-widest hover:border-primary transition-all active:scale-95"
              >
                Browse categories
              </button>
            </div>
            <div className="flex items-center gap-2 pt-2 border-l-2 border-primary pl-4">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Independent picks. Clear pros/cons. We may earn a commission.
              </p>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[4/3] bg-cover bg-center rounded-sm shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-1000">
            <img 
              src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover" 
              alt="Longevity stack setup" 
            />
            <div className="absolute inset-0 bg-scientific-blue/10 backdrop-brightness-110 pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-2">The Process</h2>
          <h3 className="text-3xl font-black text-scientific-blue dark:text-white uppercase tracking-tight">How it Works</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: 'quiz', step: '1. Use a tool', desc: 'Take a 2-minute diagnostic tool to identify your specific health optimization needs.' },
            { icon: 'analytics', step: '2. Get action plan', desc: 'Receive a personalized data-driven plan based on your biomarkers and lifestyle goals.' },
            { icon: 'shopping_cart_checkout', step: '3. See shortlist', desc: 'Shop our brutally honest, verified recommendations for gear that actually moves the needle.' }
          ].map((s, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 border-2 border-primary rounded-full flex items-center justify-center text-scientific-blue dark:text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">
                <span className="material-symbols-outlined font-bold text-2xl">{s.icon}</span>
              </div>
              <h3 className="font-black text-sm uppercase tracking-widest mb-3">{s.step}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-[240px]">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="mb-24">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-1">Diagnostic Intelligence</h2>
            <h3 className="text-2xl font-black text-scientific-blue dark:text-white uppercase tracking-tight">Featured Tools</h3>
          </div>
          <button 
            onClick={onGetPicks}
            className="text-scientific-blue dark:text-primary text-[10px] font-black uppercase tracking-widest hover:underline"
          >
            View all tools
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED_TOOLS.slice(0, 4).map(tool => (
            <ToolCard key={tool.id} tool={tool} onClick={onOpenAssessment} />
          ))}
        </div>
      </section>

      {/* Verified Selections */}
      <section className="mb-24">
        <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-8">Verified Selections</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {VERIFIED_SELECTIONS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* System Analysis */}
      <section className="mb-24">
        <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-8">System Analysis</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SYSTEM_ANALYSIS.map(review => (
            <div key={review.id} className="group relative overflow-hidden rounded-sm border-b-4 border-slate-100 dark:border-slate-800 hover:border-primary bg-white dark:bg-slate-900 flex flex-col h-full transition-all cursor-pointer">
              <div className="h-40 bg-slate-50 dark:bg-slate-800 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-700">
                <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-700">{review.icon}</span>
              </div>
              <div className="p-6">
                <span className="text-[9px] font-black text-primary uppercase mb-2 block tracking-widest">Dataset: {review.dataset}</span>
                <h3 className="text-base font-black uppercase leading-tight group-hover:text-primary transition-colors">{review.title}</h3>
                <p className="text-[11px] text-slate-500 mt-3 line-clamp-2 uppercase tracking-wide">{review.summary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

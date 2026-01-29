
import React from 'react';
import { FEATURED_TOOLS, VERIFIED_SELECTIONS } from '../constants';
import ToolCard from '../components/ToolCard';

interface DiscoveryProps {
  onOpenAssessment: () => void;
  onNavigate: (page: string) => void;
}

const Discovery: React.FC<DiscoveryProps> = ({ onOpenAssessment, onNavigate }) => {
  const categories = [
    { name: 'Sleep', icon: 'bedtime', slug: 'sleep' },
    { name: 'Labs', icon: 'science', slug: 'labs' },
    { name: 'Metabolic', icon: 'insights', slug: 'metabolic' },
    { name: 'Wearables', icon: 'watch', slug: 'wearables' },
    { name: 'Recovery & Therapy', icon: 'spa', slug: 'recovery' },
    { name: 'Home', icon: 'home', slug: 'home-environment' },
    { name: 'Supplements', icon: 'pill', slug: 'supplements' },
  ];

  const goals = ['Sleep deeper', 'Improve energy', 'Metabolic health', 'Recover faster', 'Better air/water'];

  const popularProducts = [
    {
      id: 'eight-sleep-4',
      name: 'Eight Sleep Pod 4',
      tag: 'BEST FOR SLEEP',
      price: '$$$$',
      features: ['Superior thermal regulation', 'Detailed biofeedback data', 'Requires monthly subscription'],
      pros: true,
      image: 'hotel'
    },
    {
      id: 'oura-3',
      name: 'Oura Ring Gen 3',
      tag: 'BEST WEARABLE',
      price: '$$$',
      features: ['Discreet all-day tracking', 'Industry-leading sleep data', 'Limited activity tracking'],
      pros: false,
      image: 'watch'
    },
    {
      id: 'joovv-3',
      name: 'Joovv Solo 3.0',
      tag: 'BEST FOR FOCUS',
      price: '$$$$',
      features: ['Targeted red-light wavelengths', 'Modular design', 'Large physical footprint'],
      pros: true,
      image: 'lightbulb'
    },
    {
      id: 'levels-health',
      name: 'Levels Health',
      tag: 'BEST CGM',
      price: '$$$',
      features: ['Real-time metabolic insight', 'Expert nutritional guidance', 'Invasive sensor application'],
      pros: true,
      image: 'glucose'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-12 items-center mb-24 py-10">
        <div className="flex-1">
          <h1 className="serif-heading text-6xl md:text-7xl font-bold text-[#1e293b] leading-tight mb-6">
            Curated Health <br />
            <span className="text-[#359EFF] italic">Optimization</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md leading-relaxed mb-10 font-light">
            Vetted tools and gear to help you reach your longevity goals. Every product is tested by our clinical team.
          </p>
          <div className="flex gap-4">
            <button className="bg-[#1e293b] text-white px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-125 transition-all active:scale-95 shadow-lg">
              Browse All Gear
            </button>
            <button className="bg-white border border-slate-200 text-[#1e293b] px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95">
              Recent Labs
            </button>
          </div>
        </div>
        <div className="flex-1 w-full relative">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-50 to-blue-200 border border-blue-100 shadow-2xl relative group">
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover mix-blend-multiply opacity-40 group-hover:scale-105 transition-transform duration-1000" 
              alt="Health gear" 
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg">
              <span className="text-[10px] font-black uppercase text-[#359EFF] tracking-widest mb-2 block">Editors Choice</span>
              <p className="text-[#1e293b] font-bold text-sm">Eight Sleep Pod 4 Pro reviewed for HRV recovery.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="mb-24">
        <h2 className="serif-heading text-3xl font-bold text-[#1e293b] mb-10">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                onNavigate(cat.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col gap-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group text-left"
            >
              <span className="material-symbols-outlined text-[#359EFF] text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">{cat.icon}</span>
              <span className="text-sm font-bold text-[#1e293b]">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Shop by Goal */}
      <section className="mb-24">
        <h2 className="serif-heading text-3xl font-bold text-[#1e293b] mb-10">Shop by Goal</h2>
        <div className="flex flex-wrap gap-4">
          {goals.map((goal, i) => (
            <button 
              key={goal}
              className={`px-10 py-3.5 rounded-full text-xs font-black uppercase tracking-tight transition-all border shadow-sm ${
                i === 0 ? 'bg-[#359EFF] text-white border-transparent' : 'bg-white border-slate-200 text-slate-500 hover:border-[#359EFF] hover:text-[#359EFF]'
              }`}
            >
              {goal}
            </button>
          ))}
        </div>
      </section>

      {/* Popular Right Now */}
      <section className="mb-24 bg-[#f8fafc] -mx-6 px-6 py-24 rounded-[3rem] border border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="serif-heading text-4xl font-bold text-[#1e293b]">Popular Right Now</h2>
            <button className="text-[#359EFF] text-[11px] font-black uppercase tracking-widest hover:underline">View All Popular</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {popularProducts.map((prod) => (
              <div key={prod.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col group">
                <div className="aspect-square bg-slate-100 relative overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400&h=400&sig=${prod.id}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={prod.name}
                  />
                  <div className="absolute top-5 left-5">
                    <span className="bg-white/95 backdrop-blur-sm text-[#1e293b] text-[9px] font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-md border border-white/50">{prod.tag}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-lg text-[#1e293b] leading-tight group-hover:text-primary transition-colors">{prod.name}</h3>
                    <span className="text-slate-300 text-xs font-bold">{prod.price}</span>
                  </div>
                  <div className="space-y-3 mb-10 flex-1">
                    {prod.features.map((f, idx) => (
                      <div key={idx} className="flex gap-2 items-start">
                        <span className={`material-symbols-outlined text-sm ${idx < 2 ? 'text-green-500' : 'text-red-400'}`}>
                          {idx < 2 ? 'check_circle' : 'cancel'}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium leading-tight">{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#359EFF] text-white py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-md">
                    See Review
                  </button>
                  <p className="text-[8px] text-center text-slate-300 mt-4 font-bold uppercase tracking-widest">May earn commission</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start with a Tool */}
      <section className="mb-12">
        <h2 className="serif-heading text-3xl font-bold text-[#1e293b] mb-10">Start with a Tool</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURED_TOOLS.slice(1, 4).map((tool) => (
            <ToolCard key={tool.id} tool={tool} onClick={onOpenAssessment} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discovery;

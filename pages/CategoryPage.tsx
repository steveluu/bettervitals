
import React from 'react';
import ToolCard from '../components/ToolCard';
import ProductCard from '../components/ProductCard';
import { FEATURED_TOOLS, VERIFIED_SELECTIONS } from '../constants';

interface CategoryPageProps {
  category: string;
  description: string;
  onOpenAssessment: () => void;
  onNavigate: (page: string) => void;
}

// Category images for hero section
const categoryImages: Record<string, string> = {
  Sleep: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=1000',
  Wearables: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=1000',
  Labs: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=1000',
  Gear: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1000',
};

// Related categories mapping
const relatedCategories: Record<string, Array<{ name: string; slug: string; icon: string }>> = {
  Sleep: [
    { name: 'Wearables', slug: 'wearables', icon: 'watch' },
    { name: 'Recovery', slug: 'discovery', icon: 'auto_fix_high' },
    { name: 'Light', slug: 'discovery', icon: 'light_mode' },
    { name: 'Supplements', slug: 'discovery', icon: 'pill' },
  ],
  Wearables: [
    { name: 'Sleep', slug: 'sleep', icon: 'bedtime' },
    { name: 'Labs', slug: 'labs', icon: 'science' },
    { name: 'Recovery', slug: 'discovery', icon: 'auto_fix_high' },
    { name: 'Metabolic', slug: 'discovery', icon: 'insights' },
  ],
  Labs: [
    { name: 'Wearables', slug: 'wearables', icon: 'watch' },
    { name: 'Metabolic', slug: 'discovery', icon: 'insights' },
    { name: 'Supplements', slug: 'discovery', icon: 'pill' },
    { name: 'Sleep', slug: 'sleep', icon: 'bedtime' },
  ],
  Gear: [
    { name: 'Recovery', slug: 'discovery', icon: 'auto_fix_high' },
    { name: 'Light', slug: 'discovery', icon: 'light_mode' },
    { name: 'Cold', slug: 'discovery', icon: 'ac_unit' },
    { name: 'Heat', slug: 'discovery', icon: 'thermostat' },
  ],
};

// Category headlines with italic accent
const categoryHeadlines: Record<string, { main: string; accent: string }> = {
  Sleep: { main: 'Master Your', accent: 'Sleep' },
  Wearables: { main: 'Track Your', accent: 'Vitals' },
  Labs: { main: 'Know Your', accent: 'Numbers' },
  Gear: { main: 'Optimize Your', accent: 'Stack' },
};

const CategoryPage: React.FC<CategoryPageProps> = ({ category, description, onOpenAssessment, onNavigate }) => {
  const tools = FEATURED_TOOLS.filter(t => t.category.toLowerCase() === category.toLowerCase());
  const products = VERIFIED_SELECTIONS.filter(p => p.category.toLowerCase() === category.toLowerCase());
  const heroImage = categoryImages[category] || categoryImages.Sleep;
  const related = relatedCategories[category] || relatedCategories.Sleep;
  const headline = categoryHeadlines[category] || { main: 'Explore', accent: category };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 pb-20">
      {/* Breadcrumb Navigation */}
      <nav className="mb-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <button
              onClick={() => onNavigate('discovery')}
              className="text-slate-400 hover:text-primary transition-colors font-medium"
            >
              Discovery
            </button>
          </li>
          <li className="text-slate-300">/</li>
          <li className="text-scientific-blue font-bold">{category}</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row gap-12 items-center mb-16 py-6">
        <div className="flex-1">
          <h1 className="serif-heading text-5xl md:text-6xl font-bold text-[#1e293b] leading-tight mb-6">
            {headline.main} <br />
            <span className="text-[#359EFF] italic">{headline.accent}</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-md leading-relaxed mb-8 font-light">
            {description}
          </p>
          <button
            onClick={onOpenAssessment}
            className="bg-[#1e293b] text-white px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-125 transition-all active:scale-95 shadow-lg"
          >
            Get Personalized Picks
          </button>
        </div>
        <div className="flex-1 w-full relative">
          <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-gradient-to-br from-blue-50 to-blue-200 border border-blue-100 shadow-2xl relative group">
            <img
              src={heroImage}
              className="w-full h-full object-cover mix-blend-multiply opacity-40 group-hover:scale-105 transition-transform duration-1000"
              alt={`${category} optimization`}
            />
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg">
              <span className="text-[10px] font-black uppercase text-[#359EFF] tracking-widest mb-2 block">{category} Guide</span>
              <p className="text-[#1e293b] font-bold text-sm">Science-backed protocols for {category.toLowerCase()} optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment CTA Banner */}
      <section className="mb-16 p-8 rounded-2xl bg-gradient-to-r from-scientific-blue to-primary/90 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Start Here</h3>
            <p className="font-black text-lg uppercase tracking-tight">Get Your Personalized {category} Plan</p>
            <p className="text-white/70 text-sm mt-1 font-light">Answer a few questions to get tailored recommendations.</p>
          </div>
          <button
            onClick={onOpenAssessment}
            className="bg-white text-scientific-blue px-8 py-4 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all active:scale-95 shadow-md whitespace-nowrap"
          >
            Take Assessment
          </button>
        </div>
      </section>

      {/* Relevant Diagnostics */}
      {tools.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block mb-1">Diagnostics</span>
              <h2 className="text-2xl font-bold text-scientific-blue">Relevant Tools</h2>
            </div>
            <button className="text-[#359EFF] text-[11px] font-black uppercase tracking-widest hover:underline">
              View All Tools
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map(tool => <ToolCard key={tool.id} tool={tool} onClick={onOpenAssessment} />)}
          </div>
        </section>
      )}

      {/* Verified Gear */}
      {products.length > 0 && (
        <section className="mb-16">
          <div className="flex justify-between items-end mb-8 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block mb-1">Gear</span>
              <h2 className="text-2xl font-bold text-scientific-blue">Verified Products</h2>
            </div>
            <button className="text-[#359EFF] text-[11px] font-black uppercase tracking-widest hover:underline">
              View All Gear
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      {/* Improved Empty State */}
      {tools.length === 0 && products.length === 0 && (
        <div className="py-16 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4 block">biotech</span>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">
            Expanding database... Check back soon for {category} analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenAssessment}
              className="bg-primary text-white px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all"
            >
              Take General Assessment
            </button>
            <button
              onClick={() => onNavigate('discovery')}
              className="bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-lg font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all"
            >
              Browse Other Categories
            </button>
          </div>
        </div>
      )}

      {/* Related Categories */}
      <section className="mt-20 pt-16 border-t border-slate-100">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary block mb-1">Explore More</span>
            <h2 className="text-2xl font-bold text-scientific-blue">Related Categories</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {related.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                onNavigate(cat.slug);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-slate-100 p-8 rounded-2xl flex flex-col gap-4 hover:shadow-md hover:border-primary transition-all cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[#359EFF] text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                {cat.icon}
              </span>
              <span className="text-sm font-bold text-[#1e293b]">{cat.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;

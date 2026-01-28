
import React from 'react';
import ToolCard from '../components/ToolCard';
import ProductCard from '../components/ProductCard';
import { FEATURED_TOOLS, VERIFIED_SELECTIONS } from '../constants';

interface CategoryPageProps {
  category: string;
  description: string;
  onOpenAssessment: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, description, onOpenAssessment }) => {
  const tools = FEATURED_TOOLS.filter(t => t.category.toLowerCase() === category.toLowerCase());
  const products = VERIFIED_SELECTIONS.filter(p => p.category.toLowerCase() === category.toLowerCase());

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="mb-16 border-l-8 border-primary pl-8 py-4">
        <h1 className="text-5xl font-black text-scientific-blue dark:text-white uppercase tracking-tighter mb-2">{category} Optimization</h1>
        <p className="text-slate-500 max-w-xl text-sm font-light leading-relaxed">{description}</p>
      </div>

      {tools.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-8">Relevant Diagnostics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tools.map(tool => <ToolCard key={tool.id} tool={tool} onClick={onOpenAssessment} />)}
          </div>
        </section>
      )}

      {products.length > 0 && (
        <section className="mb-16">
          <h2 className="text-xs font-black tracking-[0.3em] uppercase text-primary mb-8">Verified Gear</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      {tools.length === 0 && products.length === 0 && (
        <div className="py-24 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
          <span className="material-symbols-outlined text-6xl text-slate-200 mb-4">biotech</span>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Expanding database... Check back soon for {category} analysis.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

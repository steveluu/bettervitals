
import React from 'react';
import { Product } from '../types';
import EvidenceBadge from './EvidenceBadge';

interface ProductCardProps {
  product: Product;
  onSelect?: (slug: string) => void;
  onNavigate?: (page: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect, onNavigate }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-sm overflow-hidden flex flex-col hover:border-primary transition-all group">
      <div className="h-44 bg-slate-50 dark:bg-slate-800 relative p-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
        <span className="absolute top-2 left-2 bg-scientific-blue text-white text-[8px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-widest">{product.tag}</span>
        <div className="w-24 h-24 border border-slate-200/50 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <span className="material-symbols-outlined text-4xl text-slate-300">{product.image}</span>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black text-xs uppercase tracking-tight">{product.name}</h3>
          <span className="text-[9px] font-bold text-slate-400">{product.priceLevel}</span>
        </div>
        <p className="text-[10px] text-slate-400 mb-3 italic">{product.description}</p>

        {/* Evidence Badge */}
        {product.evidence && (
          <div className="mb-3">
            <EvidenceBadge evidence={product.evidence} />
          </div>
        )}

        <div className="space-y-1.5 mb-4 border-t border-slate-50 dark:border-slate-800 pt-3">
          {product.pros.map((pro, idx) => (
            <div key={idx} className="flex gap-2 text-[10px] items-start">
              <span className="material-symbols-outlined text-primary text-[12px] font-bold">check_circle</span>
              <span className="leading-tight">{pro}</span>
            </div>
          ))}
          {product.cons.map((con, idx) => (
            <div key={idx} className="flex gap-2 text-[10px] items-start opacity-60">
              <span className="material-symbols-outlined text-slate-400 text-[12px] font-bold">cancel</span>
              <span className="leading-tight">{con}</span>
            </div>
          ))}
        </div>

        {/* Primary CTA: View Full Review (internal link) */}
        {product.slug ? (
          <button
            onClick={() => {
              if (onSelect) {
                onSelect(product.slug);
              } else if (onNavigate) {
                onNavigate(`product/${product.slug}`);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="w-full mt-auto bg-slate-900 text-white dark:bg-slate-800 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all text-center"
          >
            View Full Review
          </button>
        ) : product.affiliateUrl ? (
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="w-full mt-auto bg-slate-900 text-white dark:bg-slate-800 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all text-center block"
          >
            View Best Price
          </a>
        ) : (
          <button
            className="w-full mt-auto bg-slate-200 text-slate-400 dark:bg-slate-700 dark:text-slate-500 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

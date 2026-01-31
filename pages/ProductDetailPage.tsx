import React from 'react';
import { VERIFIED_SELECTIONS } from '../constants';
import EvidenceBadge from '../components/EvidenceBadge';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import ResearchSection from '../components/ResearchSection';

interface ProductDetailPageProps {
  slug: string;
  onNavigate: (page: string) => void;
}

const getCategorySlug = (category: string): string => {
  const slugMap: Record<string, string> = {
    'Sleep': 'sleep',
    'Labs': 'labs',
    'Metabolic': 'metabolic',
    'Wearables': 'wearables',
    'Recovery': 'recovery',
    'Recovery & Therapy': 'recovery',
    'Home': 'home-environment',
    'Supplements': 'supplements',
  };
  return slugMap[category] || 'discovery';
};

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onNavigate }) => {
  const product = VERIFIED_SELECTIONS.find((item) => item.slug === slug);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
          <h1 className="text-2xl font-black text-slate-800 mb-2">Product not found</h1>
          <p className="text-slate-500 mb-6">The product you’re looking for isn’t available yet.</p>
          <button
            onClick={() => {
              onNavigate('discovery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all"
          >
            Browse Discovery
          </button>
        </div>
      </div>
    );
  }

  const categorySlug = getCategorySlug(product.category);

  // Get related products (same category, excluding current product)
  const relatedProducts = VERIFIED_SELECTIONS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8">
        <button
          onClick={() => {
            onNavigate('discovery');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-primary transition-colors"
        >
          Discovery
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <button
          onClick={() => {
            onNavigate(categorySlug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="hover:text-primary transition-colors"
        >
          {product.category}
        </button>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="text-slate-600">{product.name}</span>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Product Image */}
        <div className="w-full md:w-1/3">
          <div className="bg-slate-50 rounded-lg p-8 flex items-center justify-center aspect-square">
            <div className="w-32 h-32 border border-slate-200/50 rounded-full flex items-center justify-center bg-white/50 backdrop-blur-sm">
              <span className="material-symbols-outlined text-6xl text-slate-300">{product.image}</span>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-2/3">
          <div className="flex items-start justify-between mb-2">
            <span className="bg-scientific-blue text-white text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-widest">
              {product.tag}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-black text-scientific-blue">{product.score}</span>
              <span className="text-xs text-slate-400">/10</span>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2">
            {product.name}
          </h1>

          <p className="text-slate-500 italic mb-4">{product.description}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span className="text-sm font-bold text-slate-600">{product.priceLevel}</span>
            {product.actualPrice && (
              <span className="text-sm text-slate-400">~${product.actualPrice}</span>
            )}
            {product.evidence && (
              <EvidenceBadge evidence={product.evidence} size="md" />
            )}
          </div>

          {/* Verdict */}
          {product.verdict && (
            <div className="bg-slate-100 border-l-4 border-primary p-4 rounded-r-lg mb-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">Our Verdict</p>
              <p className="text-sm text-slate-700">{product.verdict}</p>
            </div>
          )}

          {/* CTA Button */}
          {product.affiliateUrl ? (
            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-primary hover:text-scientific-blue transition-all"
            >
              <span>Buy Now</span>
              <span className="material-symbols-outlined text-lg">open_in_new</span>
            </a>
          ) : (
            <button
              className="inline-flex items-center gap-2 bg-slate-200 text-slate-400 px-6 py-3 rounded-sm text-sm font-black uppercase tracking-widest cursor-not-allowed"
              disabled
            >
              Coming Soon
            </button>
          )}
        </div>
      </div>

      {/* Affiliate Disclosure */}
      <AffiliateDisclosure />

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-6 my-8">
        <div className="bg-green-50 border border-green-100 rounded-lg p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-green-700 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">check_circle</span>
            Pros
          </h3>
          <ul className="space-y-3">
            {product.pros.map((pro, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className="material-symbols-outlined text-green-500 text-lg flex-shrink-0">add</span>
                <span>{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-red-50 border border-red-100 rounded-lg p-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-red-700 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">cancel</span>
            Cons
          </h3>
          <ul className="space-y-3">
            {product.cons.map((con, idx) => (
              <li key={idx} className="flex gap-3 text-sm text-slate-700">
                <span className="material-symbols-outlined text-red-500 text-lg flex-shrink-0">remove</span>
                <span>{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Research Evidence Section */}
      {product.evidence && (
        <div className="my-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-center text-slate-400 mb-8">
            Research & Evidence
          </h2>
          <ResearchSection evidence={product.evidence} />
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-slate-900 text-white rounded-lg p-8 my-12 text-center">
        <h3 className="text-xl font-black uppercase tracking-tight mb-2">Ready to try {product.name}?</h3>
        <p className="text-slate-400 text-sm mb-6">Join thousands who've optimized their health with this product.</p>
        {product.affiliateUrl ? (
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="inline-flex items-center gap-2 bg-primary text-scientific-blue px-8 py-3 rounded-sm text-sm font-black uppercase tracking-widest hover:bg-white transition-all"
          >
            <span>View Best Price</span>
            <span className="material-symbols-outlined text-lg">open_in_new</span>
          </a>
        ) : (
          <button
            className="inline-flex items-center gap-2 bg-slate-700 text-slate-400 px-8 py-3 rounded-sm text-sm font-black uppercase tracking-widest cursor-not-allowed"
            disabled
          >
            Coming Soon
          </button>
        )}
        <AffiliateDisclosure compact />
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="my-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-center text-slate-400 mb-4">
            Related Products
          </h2>
          <p className="text-xs text-slate-400 mb-6 italic text-center">
            Links may be affiliate links
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            {relatedProducts.map((relatedProduct) => (
              <button
                key={relatedProduct.id}
                onClick={() => {
                  onNavigate(`product/${relatedProduct.slug}`);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-white border border-slate-200 rounded-lg p-4 text-left hover:border-primary transition-all group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-slate-300 group-hover:text-primary transition-colors">
                      {relatedProduct.image}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">{relatedProduct.tag}</span>
                    <p className="font-bold text-sm">{relatedProduct.name}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{relatedProduct.priceLevel}</span>
                  <span className="text-sm font-black text-scientific-blue">{relatedProduct.score}/10</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Back to Category */}
      <div className="text-center mb-8">
        <button
          onClick={() => {
            onNavigate(categorySlug);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-sm text-slate-500 hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-lg">arrow_back</span>
          Back to {product.category}
        </button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

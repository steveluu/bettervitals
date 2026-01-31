
import React from 'react';

interface ComplianceProps {
  onNavigate: (page: string) => void;
}

const Compliance: React.FC<ComplianceProps> = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-scientific-blue uppercase tracking-tighter mb-4">Affiliate Disclosure</h1>
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">FTC Compliance Statement</p>
      </div>

      <div className="space-y-12 prose prose-slate max-w-none">
        <section className="bg-primary/5 border-l-4 border-primary p-8">
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">FTC Disclosure Statement</h2>
          <p className="text-slate-700 leading-relaxed text-lg">
            <strong>BetterVitals is a participant in affiliate advertising programs.</strong> When you click on links to products on our site and make a purchase, we may receive a commission. This commission comes at no additional cost to you and helps support our research and content creation.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">How We Make Money</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            BetterVitals earns revenue through affiliate partnerships. Here's how it works:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-slate-50 p-6 rounded-sm">
              <div className="text-primary font-black text-2xl mb-2">01</div>
              <h3 className="font-bold text-slate-800 mb-2">You Click a Link</h3>
              <p className="text-sm text-slate-600">When you click a product link on our site, a tracking cookie identifies the referral source.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-sm">
              <div className="text-primary font-black text-2xl mb-2">02</div>
              <h3 className="font-bold text-slate-800 mb-2">You Make a Purchase</h3>
              <p className="text-sm text-slate-600">If you purchase the product (or sometimes other items), the merchant records the sale.</p>
            </div>
            <div className="bg-slate-50 p-6 rounded-sm">
              <div className="text-primary font-black text-2xl mb-2">03</div>
              <h3 className="font-bold text-slate-800 mb-2">We Earn a Commission</h3>
              <p className="text-sm text-slate-600">The merchant pays us a percentage of the sale. This does not increase your price.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">Our Editorial Process</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our editorial recommendations are made independently of our affiliate relationships:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li><strong>Research-First Approach:</strong> We evaluate products based on clinical evidence, user reviews, and hands-on testing before considering any affiliate relationship.</li>
            <li><strong>No Pay-for-Placement:</strong> Companies cannot pay to be featured or to receive higher ratings. Our recommendations are based solely on merit.</li>
            <li><strong>Honest Reviews:</strong> We highlight both pros and cons of products. If a product doesn't meet our standards, we won't recommend it regardless of affiliate potential.</li>
            <li><strong>Transparency:</strong> Products with affiliate links are clearly marked. We disclose our affiliate relationships prominently on product pages.</li>
          </ul>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">Affiliate Partners</h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            We may participate in affiliate programs with the following types of merchants:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Health and wellness product manufacturers</li>
            <li>Wearable technology companies</li>
            <li>Supplement brands</li>
            <li>Sleep and recovery product companies</li>
            <li>Laboratory testing services</li>
            <li>Major e-commerce retailers (Amazon Associates, etc.)</li>
          </ul>
          <p className="text-slate-600 leading-relaxed mt-4">
            Commission rates vary by merchant and product category. The existence of an affiliate relationship does not influence our editorial recommendations.
          </p>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">What This Means for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-green-200 bg-green-50 p-6 rounded-sm">
              <h3 className="font-bold text-green-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-green-600">check_circle</span>
                You Get
              </h3>
              <ul className="text-sm text-green-700 space-y-2">
                <li>Free access to our research and recommendations</li>
                <li>Honest, independent product evaluations</li>
                <li>No inflated prices due to affiliate fees</li>
                <li>Transparent disclosure of our business model</li>
              </ul>
            </div>
            <div className="border border-slate-200 bg-slate-50 p-6 rounded-sm">
              <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-slate-600">info</span>
                We Get
              </h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>Revenue to support our research team</li>
                <li>Resources to test and review more products</li>
                <li>Ability to keep our content free for users</li>
                <li>Sustainable business without paywalls</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="serif-heading text-2xl font-bold text-scientific-blue mb-4">Questions?</h2>
          <p className="text-slate-600 leading-relaxed">
            If you have questions about our affiliate relationships or how we make money, please contact us. We believe in full transparency about our business model.
          </p>
          <div className="bg-slate-50 p-6 mt-4 rounded-sm">
            <p className="text-slate-700 font-medium">compliance@bettervitals.com</p>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-8">
          <h2 className="serif-heading text-xl font-bold text-scientific-blue mb-4">Related Policies</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => {
                onNavigate('privacy');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => {
                onNavigate('terms');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-primary hover:underline font-medium"
            >
              Terms of Service
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Compliance;

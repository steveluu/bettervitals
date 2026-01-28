
import React from 'react';

const About: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-black text-scientific-blue dark:text-white uppercase tracking-tighter mb-4">Methodology</h1>
        <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Data over hype. Science over marketing.</p>
      </div>

      <div className="space-y-16">
        <section className="prose prose-slate dark:prose-invert max-w-none">
          <h2 className="serif-heading text-3xl font-bold text-scientific-blue dark:text-primary">Our Core Thesis</h2>
          <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
            BetterVitals was founded on a simple realization: the longevity market is flooded with high-priced gear that often lacks clinical validation. We believe that health optimization should be accessible, data-driven, and brutally transparent.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white dark:bg-slate-900 p-8 border-l-4 border-primary shadow-sm">
            <h3 className="font-black text-xs uppercase tracking-widest mb-4">The Testing Protocol</h3>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="flex gap-2 italic font-serif">
                <span className="text-primary font-bold">01</span>
                "Every piece of gear is purchased by us. We never accept free units from brands."
              </li>
              <li className="flex gap-2 italic font-serif">
                <span className="text-primary font-bold">02</span>
                "We conduct 30-day longitudinal studies using medical-grade wearables to verify claims."
              </li>
              <li className="flex gap-2 italic font-serif">
                <span className="text-primary font-bold">03</span>
                "We prioritize blood and biomarker results over subjective feel."
              </li>
            </ul>
          </div>
          <div className="bg-scientific-blue text-white p-8 shadow-xl">
            <h3 className="font-black text-xs uppercase tracking-widest mb-4 text-primary">Financial Transparency</h3>
            <p className="text-sm leading-relaxed text-slate-300 mb-6">
              BetterVitals is reader-supported. When you buy through our links, we may earn a commission. This keeps our testing independent and our tools free for everyone.
            </p>
            <div className="h-px bg-white/10 w-full mb-6"></div>
            <p className="text-[10px] font-black uppercase tracking-widest">Independence is our greatest asset.</p>
          </div>
        </div>

        <section className="text-center bg-slate-50 dark:bg-slate-800/50 p-12 rounded-sm">
          <h2 className="font-black text-xs uppercase tracking-[0.3em] text-primary mb-6">The Team</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto italic">
            A collective of bio-engineers, data scientists, and clinical researchers dedicated to separating longevity signal from noise.
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;

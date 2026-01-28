
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f8fafc] text-slate-900 py-24 border-t border-slate-100">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="col-span-1 md:col-span-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="text-[#1e293b] size-8">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
                </svg>
              </div>
              <span className="text-2xl font-black uppercase tracking-tighter">BetterVitals</span>
            </div>
            <p className="text-sm text-[#64748b] leading-relaxed max-w-sm font-light">
              The world's most trusted buyer's guide and assessment directory for health optimization.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-black text-[13px] tracking-tight text-[#1e293b] mb-8">Tools</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#64748b]">
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Longevity</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Sleep Health</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Biohacking</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-[13px] tracking-tight text-[#1e293b] mb-8">Methodology</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#64748b]">
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Clinical Review</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Data Standards</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Editorial Team</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-[13px] tracking-tight text-[#1e293b] mb-8">Company</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#64748b]">
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">About</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Contact</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-black text-[13px] tracking-tight text-[#1e293b] mb-8">Legal</h4>
            <ul className="space-y-4 text-[13px] font-medium text-[#64748b]">
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Privacy</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Terms</a></li>
              <li><a className="hover:text-[#00E5FF] transition-colors" href="#">Compliance</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 flex flex-col items-center">
          <div className="max-w-5xl text-center mb-12">
            <p className="text-[10px] leading-relaxed uppercase tracking-widest text-slate-400 font-bold">
              Medical Disclaimer: The content on BetterVitals is for informational and educational purposes only and should not be construed as medical advice. Always consult with a qualified healthcare professional before making any changes to your health regimen, diet, or starting new supplements or tools. We may earn a commission from links on this page.
            </p>
          </div>
          <p className="text-[11px] font-bold text-slate-400">© 2024 BetterVitals. Built for data-driven longevity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

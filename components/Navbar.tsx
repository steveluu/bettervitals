
import React, { useState } from 'react';
import MegaMenu from './MegaMenu';

interface NavbarProps {
  onStartAssessment: () => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartAssessment, currentPage, setCurrentPage }) => {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  const navItems = [
    { name: 'Browse', slug: 'discovery', hasMenu: true },
    { name: 'Tools', slug: 'tools' }
  ];

  return (
    <header 
      className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-sm shadow-sm"
      onMouseLeave={() => setIsMegaMenuOpen(false)}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between relative">
        <div className="flex items-center gap-16">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setCurrentPage('home')}
          >
            <div className="text-[#0a2472] transition-transform group-hover:scale-105">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"></path>
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-[#1e293b] uppercase">BetterVitals</span>
          </div>
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <div 
                key={item.slug}
                className="relative flex items-center"
                onMouseEnter={() => item.hasMenu && setIsMegaMenuOpen(true)}
              >
                <button
                  onClick={() => setCurrentPage(item.slug)}
                  className={`relative text-[13px] font-bold tracking-tight transition-all pb-1 hover:text-[#359EFF] flex items-center gap-1 ${
                    currentPage === item.slug 
                      ? 'text-[#359EFF] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#359EFF]' 
                      : 'text-[#64748b]'
                  }`}
                >
                  {item.name}
                  {item.hasMenu && (
                    <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`}>
                      keyboard_arrow_down
                    </span>
                  )}
                </button>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={onStartAssessment}
            className="bg-[#359EFF] text-white px-8 py-3.5 rounded-full text-[13px] font-black uppercase tracking-tight hover:brightness-105 hover:shadow-md active:scale-95 transition-all whitespace-nowrap"
          >
            Get my personalized picks
          </button>
        </div>

        {/* Mega Menu Portal */}
        <MegaMenu 
          isOpen={isMegaMenuOpen} 
          onClose={() => setIsMegaMenuOpen(false)}
          onNavigate={(slug) => setCurrentPage(slug)}
          onStartAssessment={onStartAssessment}
        />
      </div>
    </header>
  );
};

export default Navbar;

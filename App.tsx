
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AssessmentModal from './components/AssessmentModal';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Discovery from './pages/Discovery';
import CategoryPage from './pages/CategoryPage';
import About from './pages/About';

const App: React.FC = () => {
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const handleGetPicks = () => {
    setCurrentPage('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssessment = () => {
    setIsAssessmentOpen(true);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home 
            onGetPicks={handleGetPicks} 
            onBrowseCategories={() => setCurrentPage('discovery')}
            onOpenAssessment={handleOpenAssessment}
          />
        );
      case 'tools':
        return <Tools onOpenAssessment={handleOpenAssessment} />;
      case 'discovery':
        return <Discovery onOpenAssessment={handleOpenAssessment} onNavigate={setCurrentPage} />;
      case 'sleep':
        return (
          <CategoryPage
            category="Sleep"
            description="Optimize the foundation of longevity. Temperature regulation, light hygiene, and restorative depth analysis."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'labs':
        return (
          <CategoryPage
            category="Labs"
            description="Bio-marker identification and tracking. From standard panels to cutting-edge epigenetic age testing."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'wearables':
        return (
          <CategoryPage
            category="Wearables"
            description="Continuous biometric feedback loops. HRV, glucose, and recovery tracking technologies."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'gear':
        return (
          <CategoryPage
            category="Gear"
            description="The hardware stack for human optimization. From red light panels to specialized performance tools."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'about':
        return <About />;
      default:
        return (
          <Home 
            onGetPicks={handleGetPicks} 
            onBrowseCategories={() => setCurrentPage('discovery')}
            onOpenAssessment={handleOpenAssessment}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar 
        onStartAssessment={handleGetPicks} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <main className="max-w-[1200px] mx-auto px-6 py-12 flex-1 w-full">
        {renderPage()}

        {/* System Hierarchy Grid - Contextual Navigation */}
        {currentPage === 'home' && (
          <section className="mt-24 mb-24">
            <h2 className="text-xs font-black tracking-[0.3em] uppercase text-center text-[#359EFF] mb-8">System Hierarchy</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-slate-200 overflow-hidden rounded-sm shadow-sm border border-slate-200">
              {[
                { icon: 'hotel', label: 'Sleep', slug: 'sleep' },
                { icon: 'science', label: 'Labs', slug: 'labs' },
                { icon: 'ecg_heart', label: 'Metabolic', slug: 'discovery' },
                { icon: 'watch', label: 'Wearables', slug: 'wearables' },
                { icon: 'spa', label: 'Recovery', slug: 'discovery' },
                { icon: 'fitness_center', label: 'Performance', slug: 'discovery' },
                { icon: 'water_drop', label: 'Hydration', slug: 'discovery' },
                { icon: 'restaurant', label: 'Supplements', slug: 'discovery' },
                { icon: 'lightbulb', label: 'Red Light', slug: 'discovery' },
                { icon: 'more_horiz', label: 'Other', slug: 'discovery' },
              ].map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => {
                    setCurrentPage(cat.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex flex-col items-center p-8 bg-white hover:bg-slate-50 transition-all text-center cursor-pointer group"
                >
                  <span className="material-symbols-outlined text-[#0a2472] mb-3 group-hover:scale-110 group-hover:text-primary transition-all duration-300">{cat.icon}</span>
                  <span className="text-[11px] font-black uppercase tracking-widest group-hover:text-primary transition-colors">{cat.label}</span>
                </button>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />

      <AssessmentModal 
        isOpen={isAssessmentOpen} 
        onClose={() => setIsAssessmentOpen(false)} 
      />
    </div>
  );
};

export default App;

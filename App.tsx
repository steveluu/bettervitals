
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
      case 'metabolic':
        return (
          <CategoryPage
            category="Metabolic"
            description="CGMs, glucose monitors, and metabolic optimization tools for metabolic health insights."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'recovery':
        return (
          <CategoryPage
            category="Recovery & Therapy"
            description="Thermal therapies, light therapy, and recovery tools for optimal restoration and performance."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'home-environment':
        return (
          <CategoryPage
            category="Home"
            description="Air quality, water filtration, and environmental optimization for your living space."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'supplements':
        return (
          <CategoryPage
            category="Supplements"
            description="Evidence-based supplementation protocols for longevity and performance."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
      case 'about':
        return <About />;
      case 'gear':
        // Redirect old gear route to recovery
        return (
          <CategoryPage
            category="Recovery & Therapy"
            description="Thermal therapies, light therapy, and recovery tools for optimal restoration and performance."
            onOpenAssessment={handleOpenAssessment}
            onNavigate={setCurrentPage}
          />
        );
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
            <div className="grid grid-cols-2 md:grid-cols-7 gap-px bg-slate-200 overflow-hidden rounded-sm shadow-sm border border-slate-200">
              {[
                { icon: 'bedtime', label: 'Sleep', slug: 'sleep' },
                { icon: 'science', label: 'Labs', slug: 'labs' },
                { icon: 'insights', label: 'Metabolic', slug: 'metabolic' },
                { icon: 'watch', label: 'Wearables', slug: 'wearables' },
                { icon: 'spa', label: 'Recovery', slug: 'recovery' },
                { icon: 'home', label: 'Home', slug: 'home-environment' },
                { icon: 'pill', label: 'Supplements', slug: 'supplements' },
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

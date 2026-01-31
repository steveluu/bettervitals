
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AssessmentModal from './components/AssessmentModal';
import HotSleeperAssessmentModal from './components/HotSleeperAssessmentModal';
import CGMWorthinessModal from './components/CGMWorthinessModal';
import Home from './pages/Home';
import Tools from './pages/Tools';
import Discovery from './pages/Discovery';
import CategoryPage from './pages/CategoryPage';
import ProductDetailPage from './pages/ProductDetailPage';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Compliance from './pages/Compliance';

const App: React.FC = () => {
  const [activeAssessmentTool, setActiveAssessmentTool] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  const handleGetPicks = () => {
    navigateTo('tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssessment = (toolId?: string) => {
    if (toolId === 'hot-sleeper') {
      setActiveAssessmentTool('hot-sleeper');
    } else if (toolId === 'cgm-worthiness') {
      setActiveAssessmentTool('cgm-worthiness');
    } else {
      setActiveAssessmentTool('generic');
    }
  };

  const categories = {
    sleep: {
      category: 'Sleep',
      description: 'Optimize the foundation of longevity. Temperature regulation, light hygiene, and restorative depth analysis.'
    },
    labs: {
      category: 'Labs',
      description: 'Bio-marker identification and tracking. From standard panels to cutting-edge epigenetic age testing.'
    },
    wearables: {
      category: 'Wearables',
      description: 'Continuous biometric feedback loops. HRV, glucose, and recovery tracking technologies.'
    },
    metabolic: {
      category: 'Metabolic',
      description: 'CGMs, glucose monitors, and metabolic optimization tools for metabolic health insights.'
    },
    recovery: {
      category: 'Recovery & Therapy',
      description: 'Thermal therapies, light therapy, and recovery tools for optimal restoration and performance.'
    },
    'home-environment': {
      category: 'Home',
      description: 'Air quality, water filtration, and environmental optimization for your living space.'
    },
    supplements: {
      category: 'Supplements',
      description: 'Evidence-based supplementation protocols for longevity and performance.'
    }
  };

  const validRoutes = new Set([
    'home',
    'tools',
    'discovery',
    'about',
    'privacy',
    'terms',
    'compliance',
    ...Object.keys(categories)
  ]);

  const getPageFromPath = (pathname: string) => {
    if (pathname === '/' || pathname === '') return 'home';
    if (pathname.startsWith('/product/')) return `product/${pathname.replace('/product/', '')}`;
    const route = pathname.replace('/', '');
    if (route === 'gear') return 'recovery';
    if (validRoutes.has(route)) return route;
    return 'home';
  };

  const getPathFromPage = (page: string) => {
    if (page === 'home') return '/';
    if (page.startsWith('product/')) return `/${page}`;
    return `/${page}`;
  };

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    const path = getPathFromPage(page);
    window.history.pushState({}, '', path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath(window.location.pathname));
    };
    const initialPage = getPageFromPath(window.location.pathname);
    setCurrentPage(initialPage);
    const normalizedPath = getPathFromPage(initialPage);
    if (window.location.pathname !== normalizedPath) {
      window.history.replaceState({}, '', normalizedPath);
    }
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar onStartAssessment={handleGetPicks} currentPage={currentPage} onNavigate={navigateTo} />

      <main className="max-w-[1200px] mx-auto px-6 py-12 flex-1 w-full">
        {currentPage === 'home' && (
          <Home
            onGetPicks={handleGetPicks}
            onBrowseCategories={() => {
              navigateTo('discovery');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAssessment={handleOpenAssessment}
            onNavigate={navigateTo}
          />
        )}
        {currentPage === 'tools' && <Tools onOpenAssessment={handleOpenAssessment} />}
        {currentPage === 'discovery' && <Discovery onOpenAssessment={handleOpenAssessment} onNavigate={navigateTo} />}
        {categories[currentPage as keyof typeof categories] && (
          <CategoryPage
            category={categories[currentPage as keyof typeof categories].category}
            description={categories[currentPage as keyof typeof categories].description}
            onOpenAssessment={handleOpenAssessment}
            onNavigate={navigateTo}
          />
        )}
        {currentPage.startsWith('product/') && (
          <ProductDetailPage onNavigate={navigateTo} slug={currentPage.replace('product/', '')} />
        )}
        {currentPage === 'about' && <About />}
        {currentPage === 'privacy' && <PrivacyPolicy onNavigate={navigateTo} />}
        {currentPage === 'terms' && <TermsOfService onNavigate={navigateTo} />}
        {currentPage === 'compliance' && <Compliance onNavigate={navigateTo} />}

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
                    navigateTo(cat.slug);
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

      <Footer onNavigate={navigateTo} />

      {activeAssessmentTool === 'hot-sleeper' && (
        <HotSleeperAssessmentModal
          isOpen={true}
          onClose={() => setActiveAssessmentTool(null)}
          onNavigate={navigateTo}
        />
      )}
      {activeAssessmentTool === 'cgm-worthiness' && (
        <CGMWorthinessModal
          isOpen={true}
          onClose={() => setActiveAssessmentTool(null)}
          onNavigate={navigateTo}
        />
      )}
      {activeAssessmentTool === 'generic' && (
        <AssessmentModal
          isOpen={true}
          onClose={() => setActiveAssessmentTool(null)}
        />
      )}
    </div>
  );
};

export default App;

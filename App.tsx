
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import AIConsultant from './components/AIConsultant';
import Portfolio from './components/Portfolio';
import PosterGenerator from './components/PosterGenerator';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import AdminPanel from './components/AdminPanel';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <div className={`min-h-screen ${isModalOpen || isAdminOpen ? 'overflow-hidden' : ''}`}>
      <Navbar onStartProject={() => setIsModalOpen(true)} />
      <main>
        <Hero onStartProject={() => setIsModalOpen(true)} />
        <Services />
        <AIConsultant />
        <Portfolio />
        <PosterGenerator />
        <Contact />
      </main>
      
      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />

      <footer className="py-12 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 18l-6-3.75V8.75L12 12.5l6-3.75v7.5L12 20zm0-9.25L6 7.25 12 4l6 3.25-6 3.5z"/>
              </svg>
            </div>
            <span className="text-lg font-outfit font-bold tracking-tight">SENSE <span className="text-indigo-500">FOUNDATION</span></span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Sense Foundation. Empowering digital excellence.
          </p>
          <div className="mt-6 flex justify-center gap-6 text-slate-600 text-xs uppercase tracking-widest font-bold">
            <button onClick={() => setIsAdminOpen(true)} className="hover:text-indigo-400 transition-colors uppercase">Admin Access</button>
            <a href="#" className="hover:text-indigo-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
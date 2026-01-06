
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onStartProject: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onStartProject }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass-morphism' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 18l-6-3.75V8.75L12 12.5l6-3.75v7.5L12 20zm0-9.25L6 7.25 12 4l6 3.25-6 3.5z"/>
            </svg>
          </div>
          <span className="text-xl font-outfit font-bold tracking-tight">SENSE <span className="text-indigo-500">FOUNDATION</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" onClick={(e) => handleNavClick(e, 'services')} className="hover:text-indigo-400 transition-colors">Services</a>
          <a href="#portfolio" onClick={(e) => handleNavClick(e, 'portfolio')} className="hover:text-indigo-400 transition-colors">Portfolio</a>
          <a href="#ai-consultant" onClick={(e) => handleNavClick(e, 'ai-consultant')} className="hover:text-indigo-400 transition-colors">AI Consultant</a>
          <button 
            onClick={onStartProject}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 rounded-full transition-all text-white shadow-lg shadow-indigo-500/25"
          >
            Hire Me
          </button>
        </div>

        <button className="md:hidden text-2xl" onClick={onStartProject}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
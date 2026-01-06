
import React from 'react';

interface HeroProps {
  onStartProject: () => void;
}

const Hero: React.FC<HeroProps> = ({ onStartProject }) => {
  const scrollToPortfolio = () => {
    const element = document.getElementById('portfolio');
    if (element) {
      const offset = 100; // Account for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Visual feedback arrival
      element.classList.add('ring-4', 'ring-indigo-500/20', 'transition-all', 'duration-1000');
      setTimeout(() => {
        element.classList.remove('ring-4', 'ring-indigo-500/20');
      }, 2000);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] -z-10 animate-pulse delay-700"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-morphism text-indigo-400 text-sm font-semibold border border-indigo-500/30">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </span>
            Sense Foundation: Available for new projects
          </div>
          
          <h1 className="text-5xl md:text-7xl font-outfit font-extrabold leading-[1.1]">
            Turning Your <span className="gradient-text">Visions</span> Into Digital Reality
          </h1>
          
          <p className="text-xl text-slate-400 leading-relaxed max-w-xl">
            At Sense Foundation, we craft high-performance websites, innovative mobile applications, and stunning brand identities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onStartProject}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-center transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2"
            >
              Start Your Project
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button 
              onClick={scrollToPortfolio}
              className="px-8 py-4 glass-morphism hover:bg-white/10 text-white rounded-xl font-bold text-center transition-all flex items-center justify-center"
            >
              View My Work
            </button>
          </div>

          <div className="flex items-center gap-6 pt-4 grayscale opacity-50">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Tech Stack:</span>
            <div className="flex gap-4 items-center">
               <img src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" className="h-6" alt="React" />
               <img src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-icon.svg" className="h-6" alt="TS" />
               <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" className="h-6" alt="Tailwind" />
               <img src="https://www.vectorlogo.zone/logos/google_cloud/google_cloud-icon.svg" className="h-6" alt="GCP" />
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="relative z-10 glass-morphism rounded-3xl p-4 overflow-hidden shadow-2xl border-white/20 animate-float">
             <img src="https://picsum.photos/800/600?random=1" className="rounded-2xl w-full h-auto object-cover" alt="Hero Interface" />
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
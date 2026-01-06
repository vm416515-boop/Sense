
import React, { useState } from 'react';
import { PortfolioItem } from '../types';

const portfolioData: (PortfolioItem & { details: string, tags: string[] })[] = [
  { 
    id: 1, 
    title: 'Nexus Marketplace', 
    category: 'Web', 
    image: 'https://picsum.photos/800/600?random=10',
    details: 'A high-scale e-commerce platform built for the next generation of digital commerce.',
    tags: ['React', 'Node.js', 'Stripe']
  },
  { 
    id: 2, 
    title: 'HealthTrack App', 
    category: 'App', 
    image: 'https://picsum.photos/800/600?random=11',
    details: 'A comprehensive fitness tracking mobile application with real-time biometric data sync.',
    tags: ['React Native', 'Firebase', 'HealthKit']
  },
  { 
    id: 3, 
    title: 'Lumina Brand Identity', 
    category: 'Logo', 
    image: 'https://picsum.photos/800/600?random=12',
    details: 'A minimalist yet bold visual identity system for a futuristic architectural firm.',
    tags: ['Branding', 'Vector Art', 'Styleguide']
  },
  { 
    id: 4, 
    title: 'Fintech Dashboard', 
    category: 'Web', 
    image: 'https://picsum.photos/800/600?random=13',
    details: 'Advanced financial data visualization platform with interactive charting and reporting.',
    tags: ['D3.js', 'Next.js', 'Auth0']
  },
  { 
    id: 5, 
    title: 'CloudSync UI', 
    category: 'App', 
    image: 'https://picsum.photos/800/600?random=14',
    details: 'Enterprise-grade cloud management interface focusing on productivity and user flow.',
    tags: ['Flutter', 'AWS', 'Material 3']
  },
  { 
    id: 6, 
    title: 'Vector Lab Logo', 
    category: 'Logo', 
    image: 'https://picsum.photos/800/600?random=15',
    details: 'Modern tech laboratory logo designed with geometric precision and scientific elegance.',
    tags: ['Adobe Illustrator', 'Symbolism', 'Tech']
  },
];

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Web' | 'App' | 'Logo'>('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData[0] | null>(null);

  const filteredItems = filter === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 relative transition-all duration-500">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm">Portfolio</span>
            <h2 className="text-4xl font-outfit font-bold mt-2">Latest Masterpieces</h2>
            <p className="text-slate-400 mt-4">A curated selection of my favorite projects ranging from high-scale applications to minimalist brand identities.</p>
          </div>
          
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 overflow-x-auto whitespace-nowrap">
            {['All', 'Web', 'App', 'Logo'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
                  filter === cat ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setSelectedProject(item)}
              className="group relative rounded-2xl overflow-hidden glass-morphism border-slate-800 transition-all hover:translate-y-[-8px] cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">{item.category}</span>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <div className="flex gap-2">
                   {item.tags.slice(0, 2).map(tag => (
                     <span key={tag} className="px-2 py-1 bg-white/10 rounded text-[10px] font-bold uppercase">{tag}</span>
                   ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in" onClick={() => setSelectedProject(null)} />
          <div className="relative w-full max-w-4xl glass-morphism rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 border-white/10">
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            
            <div className="grid md:grid-cols-2">
              <div className="aspect-square md:aspect-auto overflow-hidden">
                 <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
                <div>
                  <span className="text-indigo-500 font-bold uppercase tracking-widest text-sm">{selectedProject.category}</span>
                  <h3 className="text-4xl font-outfit font-bold mt-2">{selectedProject.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed text-lg">{selectedProject.details}</p>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase text-slate-500 tracking-wider">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-lg text-sm font-medium">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                   <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2">
                     Visit Live Project
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                   </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;

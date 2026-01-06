
import React, { useState } from 'react';
import { generatePromoPoster } from '../services/geminiService';

const PosterGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [service, setService] = useState('Full Stack Digital Solutions');
  const [loading, setLoading] = useState(false);
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');

  const messages = [
    "Analyzing your brand style...",
    "Curating professional design elements...",
    "Rendering high-quality visuals...",
    "Applying premium lighting effects...",
    "Finalizing your marketing masterpiece..."
  ];

  const handleGenerate = async () => {
    if (!brandName.trim()) return;
    setLoading(true);
    setPosterUrl(null);
    
    let msgIndex = 0;
    const interval = setInterval(() => {
      setLoadingMessage(messages[msgIndex % messages.length]);
      msgIndex++;
    }, 2500);

    try {
      const url = await generatePromoPoster(brandName, service);
      setPosterUrl(url);
    } catch (error) {
      console.error("Poster generation failed:", error);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const downloadPoster = () => {
    if (!posterUrl) return;
    const link = document.createElement('a');
    link.href = posterUrl;
    link.download = `${brandName.replace(/\s+/g, '_')}_Promo_Poster.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="marketing-kit" className="py-24 border-y border-slate-900 bg-slate-950/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div>
              <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm">Marketing Kit</span>
              <h2 className="text-4xl font-outfit font-bold mt-2">Create Your <span className="gradient-text">Promo Poster</span></h2>
              <p className="text-slate-400 mt-4 leading-relaxed">
                Generate a professional AI poster to share with your clients. Let people know that Sense Foundation is open for work.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Business / Brand Name</label>
                <input 
                  type="text" 
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  placeholder="e.g. Sense Foundation"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">What service are you promoting?</label>
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-all"
                >
                  <option>Website Design & Development</option>
                  <option>Mobile App Development</option>
                  <option>Logo & Brand Identity</option>
                  <option>Digital Marketing & UI/UX</option>
                  <option>Full Stack Developer Services</option>
                </select>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={loading || !brandName}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                   <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     Generating...
                   </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                    Design My Poster
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md">
            <div className="relative aspect-square glass-morphism rounded-3xl overflow-hidden border-white/10 shadow-2xl flex items-center justify-center">
              {loading ? (
                <div className="text-center p-8 space-y-4">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <p className="text-indigo-400 font-medium animate-pulse">{loadingMessage}</p>
                </div>
              ) : posterUrl ? (
                <div className="group relative w-full h-full">
                  <img src={posterUrl} alt="Generated Poster" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4">
                    <button 
                      onClick={downloadPoster}
                      className="px-6 py-3 bg-white text-slate-950 rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download Poster
                    </button>
                    <p className="text-white/70 text-xs px-6 text-center">Share this image with your clients to showcase your skills!</p>
                  </div>
                </div>
              ) : (
                <div className="text-center p-12 space-y-4 opacity-40">
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  </div>
                  <p className="text-sm">Your generated poster will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PosterGenerator;

import React, { useState } from 'react';
import { analyzeProjectBrief } from '../services/geminiService';
import { AIResponse } from '../types';

const AIConsultant: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const data = await analyzeProjectBrief(prompt);
      setResult(data);
    } catch (error) {
      console.error('AI Consultation Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ai-consultant" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm">Powered by Gemini AI</span>
            <h2 className="text-4xl font-outfit font-bold mt-2">Free AI Project Consultant</h2>
            <p className="text-slate-400 mt-4">Describe your idea, and my AI will help you break down the scope and timeline before we talk.</p>
          </div>

          <div className="glass-morphism rounded-3xl p-8 shadow-2xl border-indigo-500/20">
            {!result ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">What are you looking to build?</label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="E.g., I want an e-commerce app for selling handmade jewelry with a modern clean look and integrated payments..."
                    className="w-full h-40 bg-slate-950/50 border border-slate-700 rounded-2xl p-4 text-slate-100 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all placeholder:text-slate-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Analyzing Project Requirements...
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12L2.1 12.3c.5 4.7 4.2 8.5 9 9s8.5-4.2 9-9L12 12z"/><path d="M12 12L12 2.1c-4.7.5-8.5 4.2-9 9s4.2 8.5 9 9l0-18z"/></svg>
                      Generate AI Breakdown
                    </>
                  )}
                </button>
              </form>
            ) : (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-indigo-400">{result.projectName}</h3>
                    <p className="text-slate-400 mt-1">{result.summary}</p>
                  </div>
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                    result.complexity === 'High' ? 'bg-red-500/20 text-red-500' : 
                    result.complexity === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'
                  }`}>
                    {result.complexity} Complexity
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {result.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400 text-sm">
                          <span className="text-indigo-500 mt-1">•</span> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        Timeline Estimate
                      </h4>
                      <p className="text-slate-400 text-sm bg-slate-950 p-3 rounded-lg border border-slate-800">{result.estimatedTimeline}</p>
                    </div>
                    <div>
                      <h4 className="font-bold flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                        Tech Recommendations
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {result.recommendedStack.map((stack, i) => (
                          <span key={i} className="px-3 py-1 bg-indigo-500/10 text-indigo-300 rounded-md text-xs border border-indigo-500/20">{stack}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setResult(null)}
                    className="flex-1 py-3 px-6 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all"
                  >
                    Start New Brief
                  </button>
                  <a 
                    href="#contact"
                    className="flex-[2] py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-center transition-all"
                  >
                    Get a Detailed Quote based on this AI Brief
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConsultant;

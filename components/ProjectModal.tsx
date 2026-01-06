
import React, { useState } from 'react';
import { ProjectRequest } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Website' as 'Website' | 'App' | 'Logo',
    quality: 'Standard' as any,
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const getPrice = () => {
    if (formData.type === 'Website') return formData.quality === 'Standard' ? '₹5,000' : '₹15,000 - ₹20,000';
    if (formData.type === 'App') return '₹30,000 - ₹40,000';
    if (formData.type === 'Logo') return '₹2,000 - ₹3,000';
    return 'Contact for Quote';
  };

  const handleBooking = async () => {
    setIsSubmitting(true);
    const newRequest: ProjectRequest = {
      id: Math.random().toString(36).substr(2, 9),
      customerName: formData.name,
      email: formData.email,
      serviceType: formData.type,
      quality: formData.quality,
      budget: getPrice(),
      description: formData.description,
      timestamp: Date.now(),
      status: 'New'
    };

    // Save to local database (localStorage)
    const existing = JSON.parse(localStorage.getItem('devpro_requests') || '[]');
    localStorage.setItem('devpro_requests', JSON.stringify([...existing, newRequest]));

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setStep(1);
      }, 3000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl glass-morphism rounded-[2rem] overflow-hidden border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
        {success ? (
          <div className="p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <h2 className="text-3xl font-bold">Request Received!</h2>
            <p className="text-slate-400">I have received your order. I will contact you via email shortly to begin the project.</p>
          </div>
        ) : (
          <div className="flex flex-col h-[80vh] md:h-auto overflow-y-auto p-8 md:p-12">
            <button onClick={onClose} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
            
            <div className="mb-8">
              <div className="flex gap-2 mb-4">
                {[1, 2].map(i => (
                  <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${step >= i ? 'bg-indigo-500' : 'bg-slate-800'}`} />
                ))}
              </div>
              <h2 className="text-3xl font-outfit font-bold">Start Your Project</h2>
              <p className="text-slate-400 text-sm">Fill in the details below to get a professional work quote.</p>
            </div>

            {step === 1 ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Service Type</label>
                    <div className="flex flex-col gap-2">
                      {['Website', 'App', 'Logo'].map(t => (
                        <button 
                          key={t}
                          onClick={() => setFormData({...formData, type: t as any})}
                          className={`p-4 rounded-xl border text-left transition-all ${formData.type === t ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/10'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quality Level</label>
                    <div className="flex flex-col gap-2">
                      {formData.type === 'Website' ? (
                        <>
                          <button 
                            onClick={() => setFormData({...formData, quality: 'Standard'})}
                            className={`p-4 rounded-xl border text-left transition-all ${formData.quality === 'Standard' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/10'}`}
                          >
                            Standard (₹5,000)
                          </button>
                          <button 
                            onClick={() => setFormData({...formData, quality: 'Premium'})}
                            className={`p-4 rounded-xl border text-left transition-all ${formData.quality === 'Premium' ? 'bg-indigo-600/20 border-indigo-500 text-white' : 'bg-slate-900 border-white/5 text-slate-400 hover:border-white/10'}`}
                          >
                            High Quality (₹15,000+)
                          </button>
                        </>
                      ) : (
                        <div className="p-8 text-center bg-slate-950 rounded-xl border border-white/5 text-slate-500 text-sm">
                          Fixed pricing applies for {formData.type}s
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                >
                  Continue to Details
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500" 
                      placeholder="Email for project updates"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Project Description</label>
                  <textarea 
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full h-32 bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500" 
                    placeholder="Tell me about what you want to build..."
                  />
                </div>
                
                <div className="p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20 flex justify-between items-center">
                  <span className="text-sm text-slate-400">Total Estimated Budget:</span>
                  <span className="text-xl font-bold text-white">{getPrice()}</span>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="px-6 py-4 bg-slate-800 rounded-xl font-bold">Back</button>
                  <button 
                    onClick={handleBooking}
                    disabled={!formData.name || !formData.email || isSubmitting}
                    className="flex-1 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Final Request'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;

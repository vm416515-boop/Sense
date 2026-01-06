
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [status, setStatus] = useState<null | 'success' | 'loading'>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    // Simulating form submission
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus(null), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div>
              <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm">Let's Talk</span>
              <h2 className="text-5xl font-outfit font-bold mt-2">Ready to Start Your Next <span className="gradient-text">Project?</span></h2>
              <p className="text-slate-400 mt-6 leading-relaxed text-lg max-w-lg">
                I'm currently accepting new projects. Send me a message and let's discuss how we can bring your vision to life.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <h4 className="font-bold">Email Me</h4>
                  <p className="text-slate-400">hello@devpro.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold">Call Me</h4>
                  <p className="text-slate-400">+91 98765 43210</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               {['github', 'linkedin', 'twitter', 'instagram'].map(platform => (
                 <a key={platform} href={`#${platform}`} className="w-12 h-12 glass-morphism rounded-xl flex items-center justify-center hover:bg-indigo-600 transition-colors border-slate-800">
                   <img src={`https://www.vectorlogo.zone/logos/${platform}/${platform}-icon.svg`} className="w-5 h-5 invert opacity-70" alt={platform} />
                 </a>
               ))}
            </div>
          </div>

          <div className="glass-morphism rounded-3xl p-8 border-indigo-500/10 shadow-2xl relative">
            {status === 'success' ? (
              <div className="absolute inset-0 z-10 bg-slate-950/90 rounded-3xl flex flex-col items-center justify-center text-center p-8 animate-in zoom-in duration-300">
                 <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                 </div>
                 <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                 <p className="text-slate-400">Thank you for reaching out. I'll get back to you within 24 hours.</p>
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Your Name</label>
                  <input type="text" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-all" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Email Address</label>
                  <input type="email" required className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-all" placeholder="john@example.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Service Needed</label>
                <select className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-all">
                  <option>Website Development</option>
                  <option>App Development</option>
                  <option>Logo & Branding</option>
                  <option>Full Digital Bundle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Your Message</label>
                <textarea required className="w-full h-40 bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500 transition-all" placeholder="Tell me about your project..."></textarea>
              </div>
              <button disabled={status === 'loading'} className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2">
                {status === 'loading' ? 'Sending...' : 'Send Message'}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

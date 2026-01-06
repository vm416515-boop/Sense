
import React, { useState, useEffect } from 'react';
import { ProjectRequest } from '../types';

const AdminPanel: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [requests, setRequests] = useState<ProjectRequest[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      const saved = localStorage.getItem('devpro_requests');
      if (saved) {
        setRequests(JSON.parse(saved).sort((a: any, b: any) => b.timestamp - a.timestamp));
      }
    }
  }, [isOpen, isAuthenticated]);

  // Reset authentication when panel is closed to ensure security for next open
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setLoginData({ username: '', password: '' });
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.username === 'sense' && loginData.password === '6392') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid credentials. Access Denied.');
    }
  };

  const deleteRequest = (id: string) => {
    const updated = requests.filter(r => r.id !== id);
    setRequests(updated);
    localStorage.setItem('devpro_requests', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950 p-0 md:p-6 overflow-hidden">
      {!isAuthenticated ? (
        <div className="w-full max-w-md p-8 glass-morphism rounded-3xl border-white/10 shadow-2xl animate-in zoom-in-95">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            </div>
            <h2 className="text-3xl font-outfit font-bold">Admin Login</h2>
            <p className="text-slate-400 text-sm mt-2">Authorized Access Only</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Admin Name</label>
              <input 
                type="text" 
                autoFocus
                value={loginData.username}
                onChange={e => setLoginData({...loginData, username: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500" 
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
              <input 
                type="password" 
                value={loginData.password}
                onChange={e => setLoginData({...loginData, password: e.target.value})}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 outline-none focus:border-indigo-500" 
                placeholder="Enter password"
              />
            </div>
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            
            <div className="flex gap-3 pt-4">
              <button type="button" onClick={onClose} className="flex-1 py-4 bg-slate-800 rounded-xl font-bold hover:bg-slate-700 transition-colors">Cancel</button>
              <button type="submit" className="flex-[2] py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Login</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full h-full bg-slate-900 border-l border-white/10 flex flex-col animate-in slide-in-from-bottom duration-500">
          <header className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-950">
            <div>
              <h2 className="text-2xl font-outfit font-bold flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                Admin Control Center
              </h2>
              <p className="text-slate-400 text-sm">Managing {requests.length} total requests</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-indigo-400 font-bold px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-500/20">Logged in: sense</span>
              <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6">
            {requests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                <p className="text-xl">No requests yet. Your leads will appear here.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {requests.map((req) => (
                  <div key={req.id} className="bg-slate-950 rounded-2xl border border-white/10 p-6 flex flex-col hover:border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        req.serviceType === 'App' ? 'bg-purple-500/20 text-purple-400' :
                        req.serviceType === 'Website' ? 'bg-blue-500/20 text-blue-400' : 'bg-pink-500/20 text-pink-400'
                      }`}>
                        {req.serviceType}
                      </span>
                      <button onClick={() => deleteRequest(req.id)} className="text-slate-600 hover:text-red-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <h3 className="text-lg font-bold truncate group-hover:text-indigo-400 transition-colors">{req.customerName}</h3>
                      <p className="text-sm text-slate-400 truncate">{req.email}</p>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Package & Budget</p>
                        <p className="text-sm font-semibold text-indigo-100">{req.quality} Quality — {req.budget}</p>
                      </div>
                      <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Project Note</p>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">{req.description || "No specific instructions provided."}</p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-between items-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">
                      <span>{new Date(req.timestamp).toLocaleDateString()} at {new Date(req.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                      <a href={`mailto:${req.email}`} className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors">
                        Reply Now
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;


import React from 'react';

const Services: React.FC = () => {
  const services = [
    {
      title: "Website Development",
      description: "From lightweight business sites to high-performance enterprise platforms.",
      priceRange: "₹5,000 — ₹20,000",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
      ),
      tiers: [
        { label: "Standard", price: "₹5,000", detail: "Perfect for small businesses" },
        { label: "High Quality", price: "₹15,000 - ₹20,000", detail: "Advanced features & SEO" }
      ]
    },
    {
      title: "Mobile App Development",
      description: "High-quality Android & iOS apps with premium features and smooth performance.",
      priceRange: "₹30,000 — ₹40,000",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
      ),
      tiers: [
        { label: "Pro App", price: "₹30,000+", detail: "Feature-rich experience" }
      ]
    },
    {
      title: "Logo & Brand Design",
      description: "Professional vector logos that define your brand's unique identity.",
      priceRange: "₹2,000 — ₹3,000",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-500"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
      ),
      tiers: [
        { label: "Custom Logo", price: "₹2,000 - ₹3,000", detail: "High-res source files" }
      ]
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-indigo-500 font-bold tracking-widest uppercase text-sm">Clear Pricing</span>
          <h2 className="text-4xl font-outfit font-bold mt-2">Professional Service Tiers</h2>
          <p className="text-slate-400 mt-4 leading-relaxed">Choose the package that fits your needs. No hidden costs, just high-quality results.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-3xl glass-morphism border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:bg-slate-900/50 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 bg-indigo-600/10 text-indigo-400 font-bold text-xs rounded-bl-2xl">
                {service.priceRange}
              </div>
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.description}</p>
              
              <div className="space-y-3">
                {service.tiers.map((tier, i) => (
                  <div key={i} className="p-3 bg-slate-950/50 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-indigo-400 uppercase">{tier.label}</span>
                      <span className="text-sm font-bold text-white">{tier.price}</span>
                    </div>
                    <p className="text-[11px] text-slate-500">{tier.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

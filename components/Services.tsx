import React from 'react';
import { Icon3D, Icons3D } from './Icons3D';

const Services: React.FC = () => {
  const services = [
    {
      title: "Audit & Assurance",
      desc: "Assisting in statutory and tax audits, preparing comprehensive audit working papers, and performing ledger scrutiny and trial balance reviews under senior guidance.",
      icon: Icons3D.Audit,
      theme: 'gold' as const,
    },
    {
      title: "Taxation & GST Compliance",
      desc: "Formulating precise tax computations, preparing and e-filing GSTR-1 & GSTR-3B, and conducting rigorous input tax credit (ITC) reconciliation procedures.",
      icon: Icons3D.Taxation,
      theme: 'emerald' as const,
    },
    {
      title: "Corporate Compliance",
      desc: "Handling ROC & MCA statutory filings (such as AOC-4 and MGT-7), drafting company resolutions, and assisting with new incorporation compliance procedures.",
      icon: Icons3D.Compliance,
      theme: 'blue' as const,
    },
    {
      title: "Financial Reporting & MIS",
      desc: "Structuring full-cycle double-entry bookkeeping (Tally/QuickBooks), performing comprehensive bank reconciliations, and designing high-clarity monthly reporting packs.",
      icon: Icons3D.FinancialReport,
      theme: 'purple' as const,
    },
  ];

  return (
    <section id="services" className="py-20 bg-light dark:bg-darkBg transition-colors duration-300" aria-labelledby="expertise-heading">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="w-3.5 h-1 bg-orange-500 rounded-full"></span>
            <span className="w-3.5 h-1 bg-slate-200 dark:bg-slate-750 rounded-full"></span>
            <span className="w-3.5 h-1 bg-emerald-500 rounded-full"></span>
          </div>
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-2">Core Practice Areas</h2>
          <h3 id="expertise-heading" className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white">
            Technical <span className="text-orange-500">Practice Areas</span> & <span className="text-emerald-500">Professional Exposure</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div 
                key={idx} 
                tabIndex={0}
                className="bg-white dark:bg-darkCard p-8 rounded-xl border border-slate-200 dark:border-slate-700 group flex flex-col items-start transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-gold focus:outline-none focus:ring-2 focus:ring-gold"
            >
                <Icon3D 
                  icon={service.icon} 
                  theme={service.theme} 
                  size="md" 
                  className="mb-6 transform group-hover:scale-110 transition-transform duration-300"
                  title={service.title}
                />
                <h4 className="text-xl font-bold text-navy dark:text-white mb-3 group-hover:text-corporate dark:group-hover:text-gold transition-colors">
                    {service.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {service.desc}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
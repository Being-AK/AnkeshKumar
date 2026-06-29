import React, { useRef, useEffect, useState } from 'react';
import { Briefcase, Calendar, ClipboardCheck, Globe, Landmark, Users, FileText } from 'lucide-react';
import { FloatingIcon, FinanceIcons } from './FinanceElements';

const Experience: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.disconnect();
    };
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-20 bg-white dark:bg-darkBg border-y border-slate-100 dark:border-slate-800 transition-colors duration-300 relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
                <div className="flex items-center gap-1 mb-2">
                  <span className="w-3.5 h-1 bg-orange-500 rounded-full"></span>
                  <span className="w-3.5 h-1 bg-slate-300 dark:bg-slate-400 rounded-full"></span>
                  <span className="w-3.5 h-1 bg-emerald-500 rounded-full"></span>
                </div>
                <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-2">Career Trajectory</h2>
                <h3 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white">
                  Professional <span className="text-orange-500">Career</span> & <span className="text-emerald-500">Experience</span>
                </h3>
            </div>
            <div className="w-full md:w-1/3 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className={`w-1/3 h-full bg-corporate dark:bg-gold rounded-full transition-all duration-1000 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}></div>
            </div>
        </div>

        <div className="max-w-5xl mx-auto">
            <div className="relative pl-8 md:pl-12 border-l-2 border-slate-200 dark:border-slate-700 space-y-12">
                
                {/* Item 1 */}
                <div 
                    className={`relative group transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[41px] md:-left-[57px] top-0 h-5 w-5 rounded-full border-4 border-white dark:border-darkBg bg-corporate dark:bg-gold shadow-md group-hover:scale-125 transition-transform"></div>
                    
                    <div className="bg-light dark:bg-darkCard p-8 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-corporate/30 dark:hover:border-gold/30 transition-all hover:shadow-lg relative overflow-hidden group">
                        
                        {/* Subtle Floating Icon Decoration */}
                        <FloatingIcon icon={FinanceIcons.Calculator} className="absolute -top-4 -right-4 opacity-5 group-hover:opacity-10 transition-opacity" />

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                            <div className="group/title cursor-default transition-transform duration-300 hover:translate-x-1">
                                <h4 className="text-2xl font-bold text-navy dark:text-white">CA Article Assistant</h4>
                                <div className="flex items-center gap-2 text-corporate dark:text-blue-400 font-semibold mt-1">
                                    <Briefcase size={16} className="group-hover/title:animate-wiggle" />
                                    <span>GPHK & Associates</span>
                                </div>
                            </div>
                            {/* High Visibility Date Badge with Pulse */}
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 shadow-sm whitespace-nowrap z-10 animate-pulse-slow hover:animate-none">
                                <Calendar size={14} className="text-corporate dark:text-gold" />
                                <span>Dec 2024 – Present</span>
                            </div>
                        </div>
                        
                        <ul className="space-y-5 relative z-10">
                            <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 group/item">
                                <div className="mt-1 text-gold shrink-0 group-hover/item:scale-110 transition-transform"><ClipboardCheck size={20} /></div>
                                <span><strong className="text-navy dark:text-white">Audit Fieldwork Leadership:</strong> Coordinated the fieldwork and execution of 30+ Statutory & 15+ Tax Audits, including preparing comprehensive financial statement drafts for final partner review.</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 group/item">
                                <div className="mt-1 text-gold shrink-0 group-hover/item:scale-110 transition-transform"><Globe size={20} /></div>
                                <span><strong className="text-navy dark:text-white">Transfer Pricing Compliance:</strong> Contributed significantly to Form 3CEB filings, compilation of Study Reports, and Benchmarking for IT sector clients with turnover exceeding <strong className="text-corporate dark:text-blue-300">₹300 Cr</strong>.</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 group/item">
                                <div className="mt-1 text-gold shrink-0 group-hover/item:scale-110 transition-transform"><FileText size={20} /></div>
                                <span><strong className="text-navy dark:text-white">High-Volume Compliance Execution:</strong> Managed the processing and reconciliation for filing <strong>100+ GST Returns</strong>, validating ledger data to ensure zero compliance anomalies.</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 group/item">
                                <div className="mt-1 text-gold shrink-0 group-hover/item:scale-110 transition-transform"><Landmark size={20} /></div>
                                <span><strong className="text-navy dark:text-white">Bank & Corporate Assurance Support:</strong> Assisted with Bank Branch Audits (including verification and certification support) and compiled filings for ROC compliance.</span>
                            </li>
                            <li className="flex items-start gap-4 text-slate-700 dark:text-slate-300 group/item">
                                <div className="mt-1 text-gold shrink-0 group-hover/item:scale-110 transition-transform"><Users size={20} /></div>
                                <span><strong className="text-navy dark:text-white">Client Interface & Coordination:</strong> Led on-site audit teams, coordinating directly with client finance departments to resolve queries and streamline data collection.</span>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
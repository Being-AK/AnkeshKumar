import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (currentSection) {
            observer.unobserve(currentSection);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="process" className="py-20 bg-light dark:bg-darkBg transition-colors duration-300 overflow-hidden" aria-labelledby="process-heading">
      <div className="container mx-auto px-6">
        
        {/* Work Process Steps */}
        <div className="mb-20">
             <div className="text-center mb-12">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <span className="w-3.5 h-1 bg-orange-500 rounded-full"></span>
                  <span className="w-3.5 h-1 bg-slate-200 dark:bg-slate-750 rounded-full"></span>
                  <span className="w-3.5 h-1 bg-emerald-500 rounded-full"></span>
                </div>
                <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-2">My Approach</h2>
                <h3 id="process-heading" className="text-3xl font-extrabold text-navy dark:text-white">
                  Engagement &amp; <span className="text-emerald-500">Audit Workflow</span>
                </h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
                {/* Visual Connector Line for Desktop with Animation */}
                <div className={`hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-600 to-transparent -translate-y-1/2 z-0 opacity-20 border-t-2 border-dashed border-slate-400 transition-all duration-1000 delay-500 ${isVisible ? 'scale-x-100 opacity-20' : 'scale-x-0 opacity-0'}`}></div>

                {[
                    { step: "01", title: "Planning & Engagement", desc: "Understanding client business operations, assessing risks, and coordinating initial document requirements." },
                    { step: "02", title: "Verification & Analysis", desc: "Performing meticulous transactional vouching, ledger scrutiny, bank reconciliations, and variance analysis." },
                    { step: "03", title: "Documentation & Compliance", desc: "Drafting compliant financial statements, compiling tax computations, and preparing draft filing schedules." },
                    { step: "04", title: "Review & Reporting", desc: "Compiling detailed audit working papers, supporting query resolution, and preparing client reporting packs." }
                ].map((item, idx) => (
                    <div 
                        key={idx} 
                        className={`bg-white dark:bg-darkCard p-6 rounded-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden group flex flex-col justify-between hover:shadow-lg hover:-translate-y-2 transition-all duration-700 ease-out transform z-10 ${
                            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                        }`}
                        style={{ transitionDelay: `${idx * 200}ms` }}
                    >
                        {/* Step Number moved to top-right to avoid overlap */}
                        <span className="text-4xl font-bold text-slate-200 dark:text-slate-600 absolute top-4 right-4 group-hover:text-corporate/10 dark:group-hover:text-gold/10 transition-colors select-none pointer-events-none group-hover:scale-110 transform duration-500">{item.step}</span>
                        
                        {/* Content */}
                        <div className="relative z-10 pt-2">
                            <h4 className="font-bold text-navy dark:text-white text-xl mb-2 group-hover:text-corporate dark:group-hover:text-gold transition-colors">{item.title}</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300 pr-2 leading-relaxed">{item.desc}</p>
                        </div>

                        {/* Mobile connector indication */}
                        {idx < 3 && (
                             <div className="md:hidden absolute bottom-2 left-1/2 -translate-x-1/2 text-slate-300 dark:text-slate-700">
                                <ArrowRight className="rotate-90" size={16} />
                             </div>
                        )}
                    </div>
                ))}
            </div>
        </div>

        {/* Mini Case Study */}
        <div className={`bg-navy dark:bg-slate-950 rounded-2xl p-8 md:p-12 relative overflow-hidden text-white shadow-2xl border border-navy dark:border-slate-800 transition-all duration-1000 delay-500 hover:shadow-blue-900/20 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-corporate rounded-full blur-[80px] opacity-50 animate-pulse-slow"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:items-center">
                <div className="w-full md:w-2/3">
                    <div className="inline-block px-3 py-1 bg-gold text-white text-xs font-bold uppercase rounded mb-4 shadow-md">Professional Engagement</div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">The ₹300 Cr Transfer Pricing Case Study</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed text-sm md:text-base">
                        <strong>Challenge:</strong> An IT client with over ₹300Cr turnover required meticulous compliance documentation for cross-border transactions under tight statutory deadlines for Form 3CEB filing.
                        <br/><br/>
                        <strong>Solution:</strong> Assisted in benchmarking analysis using global transfer pricing databases, compiled detailed transaction disclosures under senior partner guidance, and supported the preparation of final reporting schedules.
                        <br/><br/>
                        <strong>Result:</strong> Facilitated timely filing and zero compliance audit disruptions.
                    </p>
                </div>
                <div className="w-full md:w-1/3 flex flex-col gap-4 border-l border-white/10 pl-0 md:pl-8">
                    <div className="group cursor-default">
                        <span className="block text-3xl font-bold text-gold group-hover:scale-105 transition-transform inline-block origin-left">₹300Cr+</span>
                        <span className="text-sm text-slate-400 block">Client Operations Scale</span>
                    </div>
                    <div className="group cursor-default">
                        <span className="block text-3xl font-bold text-gold group-hover:scale-105 transition-transform inline-block origin-left">100%</span>
                        <span className="text-sm text-slate-400 block">Timely Compilation Compliance</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </section>
  );
};

export default Process;
import React, { useState, useEffect, useRef } from 'react';
import { FloatingIcon, FinanceIcons } from './FinanceElements';
import { Icon3D, Icons3D } from './Icons3D';

const About: React.FC = () => {
  const ABOUT_IMAGE_URL = "https://i.postimg.cc/LXJD8Xrg/Portfolio.png";
  
  const [auditCount, setAuditCount] = useState(0);
  const [turnoverCount, setTurnoverCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const currentSection = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateValue(setAuditCount, 0, 30, 2000);
          animateValue(setTurnoverCount, 0, 300, 2500);
          if (currentSection) {
            observer.unobserve(currentSection);
          }
        }
      },
      { threshold: 0.3 }
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

  const animateValue = (setter: React.Dispatch<React.SetStateAction<number>>, start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setter(Math.floor(easeOutQuart * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-darkBg transition-colors duration-300 relative overflow-hidden" aria-labelledby="about-heading">
      {/* Decorative Floating Elements using 3D Icons */}
      <FloatingIcon icon={<Icon3D icon={Icons3D.Coins} theme="gold" size="md" />} className="top-10 right-10" delay="1s" />
      <FloatingIcon icon={<Icon3D icon={Icons3D.Dollar} theme="emerald" size="md" />} className="bottom-10 left-10" delay="2s" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          {/* Visual Placeholder */}
          <div className="w-full md:w-1/2 relative group">
             <div className="aspect-[4/5] bg-navy dark:bg-slate-800 rounded-2xl overflow-hidden relative shadow-2xl border-8 border-white dark:border-slate-800 transform transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                    src={ABOUT_IMAGE_URL}
                    alt="Ankesh Kumar - Professional Portrait" 
                    className="w-full h-full object-cover object-[50%_34%] opacity-90 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop";
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-6 left-6 text-white">
                    <div className="inline-block px-3 py-1 mb-2 bg-gold text-white text-xs font-bold uppercase tracking-wider rounded-sm">Based in</div>
                    <p className="text-2xl font-bold">Hyderabad, India</p>
                </div>
             </div>
             {/* Decorative Elements */}
             <div className="absolute -top-4 -left-4 w-full h-full border-2 border-gold/30 rounded-2xl -z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="flex items-center gap-1 mb-2">
              <span className="w-3.5 h-1 bg-orange-500 rounded-full"></span>
              <span className="w-3.5 h-1 bg-slate-300 dark:bg-slate-400 rounded-full"></span>
              <span className="w-3.5 h-1 bg-emerald-500 rounded-full"></span>
            </div>
            <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-2">Professional Profile</h2>
            <h3 id="about-heading" className="text-3xl md:text-4xl font-bold text-navy dark:text-white mb-6">
              About <span className="text-orange-500">Me</span>
            </h3>
            
            <div className="space-y-6 text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                <p>
                    I am an aspiring Chartered Accountant (<strong className="text-navy dark:text-white">CA Finalist</strong>) and a <strong>B.Com (Computer Applications)</strong> graduate, combining rigorous professional standards with technical capabilities in financial systems.
                </p>
                <p>
                    Currently serving as an Article Assistant at <strong className="text-corporate dark:text-gold">GPHK & Associates</strong>, I specialize in statutory audits, direct and indirect taxation, and transfer pricing compliance.
                </p>
                <p>
                    I approach every engagement with diligence and accountability, supporting assignments from initial data verification and ledger reconciliation to final tax computations and financial reporting. My focus is on absolute accuracy, regulatory compliance, and clean documentation.
                </p>
                
                <div className="pt-6 grid grid-cols-2 gap-6 relative">
                    {/* Stat Card 1 */}
                    <div className="bg-slate-50 dark:bg-darkCard p-5 rounded-lg border-l-4 border-gold shadow-sm border border-slate-100 dark:border-slate-700 transition-all relative group/card hover:-translate-y-1 hover:shadow-md">
                        <span className="block text-3xl font-bold text-navy dark:text-white tabular-nums mb-1 group-hover/card:scale-105 transition-transform origin-left">{auditCount}+</span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wide">Audits Assisted</span>
                        {/* Orbiting Coin */}
                        <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity animate-bounce-gentle">
                            <Icon3D icon={Icons3D.Coins} theme="gold" size="sm" />
                        </div>
                    </div>
                    {/* Stat Card 2 */}
                    <div className="bg-slate-50 dark:bg-darkCard p-5 rounded-lg border-l-4 border-corporate shadow-sm border border-slate-100 dark:border-slate-700 transition-all relative group/card hover:-translate-y-1 hover:shadow-md">
                        <span className="block text-3xl font-bold text-navy dark:text-white tabular-nums mb-1 group-hover/card:scale-105 transition-transform origin-left">₹{turnoverCount} Cr+</span>
                        <span className="text-xs text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wide">Client Turnover Exposure</span>
                         {/* Orbiting Graph */}
                         <div className="absolute top-2 right-2 opacity-0 group-hover/card:opacity-100 transition-opacity animate-bounce-gentle" style={{ animationDelay: '0.2s' }}>
                            <Icon3D icon={Icons3D.Graph} theme="corporate" size="sm" />
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
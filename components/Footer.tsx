import React from 'react';
import { 
  Mail, 
  Linkedin, 
  Calculator, 
  ShieldCheck, 
  FileText, 
  Search, 
  Calendar, 
  Building2, 
  MessageSquare
} from 'lucide-react';

const Footer: React.FC = () => {
  
  // Custom dispatcher helper to notify the compliance suite
  const triggerTool = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('select-compliance-tool', { detail: { id } });
    window.dispatchEvent(event);
  };

  return (
    <footer className="bg-white dark:bg-darkBg pt-16 pb-10 border-t border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Footer Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Bio */}
            <div className="space-y-4">
                <a href="#home" className="flex flex-col leading-tight group w-fit">
                    <span className="font-extrabold text-2xl text-corporate dark:text-white tracking-tight">
                    Ankesh
                    <span className="text-navy dark:text-gold ml-0.5">.in</span>
                    </span>
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase">CA Portfolio & Compliance Suite</span>
                </a>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs font-medium">
                  An expert CA portfolio integrated with an interactive AI compliance assistant, statutory Income Tax & GST calculators, and secure, local browser-based PDF utilities.
                </p>
                <div className="pt-1 text-xs font-semibold">
                  <a 
                    href="mailto:ankeshkumar9949@gmail.com" 
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-corporate dark:hover:text-gold transition-colors"
                  >
                    <Mail size={14} className="text-corporate dark:text-gold" /> ankeshkumar9949@gmail.com
                  </a>
                </div>
            </div>

            {/* Column 2: Tax & Regulatory Tools */}
            <div>
                <h4 className="font-bold text-navy dark:text-white mb-5 uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800/50 pb-2 flex items-center gap-1.5">
                  <Calculator size={14} className="text-corporate dark:text-gold" /> Tax & Regulatory Tools
                </h4>
                <ul className="space-y-3.5 text-xs font-medium">
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('calc-salary', e)}
                        className="text-corporate dark:text-gold hover:opacity-85 transition-opacity flex items-center gap-2 font-semibold"
                      >
                        <Calculator size={13} className="text-corporate dark:text-gold shrink-0" /> 
                        <span>Income Tax Calculator (FY 2025–26)</span>
                        <span className="text-[9px] bg-corporate/10 dark:bg-gold/10 text-corporate dark:text-gold px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">Featured</span>
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('calc-gst', e)}
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <Calculator size={13} className="text-slate-400 shrink-0" /> GST Calculator
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#compliance-hub" 
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <Calendar size={13} className="text-slate-400 shrink-0" /> Compliance Calendar
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('company-search', e)}
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <Building2 size={13} className="text-slate-400 shrink-0" /> ROC & Company Law
                      </a>
                    </li>
                </ul>
            </div>

            {/* Column 3: Compliance & Verification */}
            <div>
                <h4 className="font-bold text-navy dark:text-white mb-5 uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800/50 pb-2 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-corporate dark:text-gold" /> Compliance & Verification
                </h4>
                <ul className="space-y-3.5 text-xs font-medium">
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('gstin-search', e)}
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <Search size={13} className="text-slate-400 shrink-0" /> GST Verification
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('gstin-search', e)}
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <ShieldCheck size={13} className="text-slate-400 shrink-0" /> Business Code Validators
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                        className="text-left font-bold text-corporate dark:text-gold hover:text-navy dark:hover:text-white transition-all flex items-center gap-2 cursor-pointer bg-transparent border-none p-0 outline-none group"
                      >
                        <MessageSquare size={13} className="text-corporate dark:text-gold shrink-0 transition-transform duration-200 group-hover:scale-110" /> Chat with Ankesh AI
                      </button>
                    </li>
                </ul>
            </div>

            {/* Column 4: PDF Toolkit */}
            <div>
                <h4 className="font-bold text-navy dark:text-white mb-5 uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800/50 pb-2 flex items-center gap-1.5">
                  <FileText size={14} className="text-corporate dark:text-gold" /> PDF Toolkit
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3 leading-relaxed font-medium">
                  100% browser-based PDF processing. Files never leave your device.
                </p>
                <ul className="space-y-3.5 text-xs font-medium">
                    <li>
                      <a 
                        href="#pdf-toolkit" 
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <FileText size={13} className="text-slate-400 shrink-0" /> Merge, Split & Compress PDFs
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#pdf-toolkit" 
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <Search size={13} className="text-slate-400 shrink-0" /> OCR & Text Extraction
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#pdf-toolkit" 
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-2"
                      >
                        <ShieldCheck size={13} className="text-slate-400 shrink-0" /> Unlock, Protect & Watermark
                      </a>
                    </li>
                </ul>
            </div>

        </div>

        {/* Bottom copyright line with sub links */}
        <div className="border-t border-slate-200 dark:border-slate-800/80 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
            <div className="text-slate-500 dark:text-slate-400 font-medium text-center sm:text-left leading-relaxed space-y-0.5">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  © 2026 Ankesh Kumar • All Rights Reserved
                </p>
                <p className="text-[11px] text-slate-400 dark:text-slate-500">
                  Specializing in Audit, Taxation, GST, ROC Compliance & Financial Reporting.
                </p>
            </div>
            <div className="flex items-center gap-4">
                <a 
                  href="https://linkedin.com/in/ankeshkumar9949" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-all duration-300 flex items-center gap-1.5 font-bold"
                >
                  <Linkedin size={14} className="text-[#0a66c2]" /> LinkedIn Profile
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Mail, Linkedin, ExternalLink, Calculator, ShieldCheck, Cpu } from 'lucide-react';

const Footer: React.FC = () => {
  
  // Custom dispatcher helper to notify the compliance suite
  const triggerTool = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const event = new CustomEvent('select-compliance-tool', { detail: { id } });
    window.dispatchEvent(event);
  };

  return (
    <footer className="bg-white dark:bg-darkBg pt-20 pb-10 border-t border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Main Footer Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1: Brand & Central Node */}
            <div className="space-y-5">
                <a href="#home" className="flex flex-col leading-tight group w-fit">
                    <span className="font-extrabold text-2xl text-corporate dark:text-white tracking-tight">
                    Ankesh
                    <span className="text-navy dark:text-gold ml-0.5">.in</span>
                    </span>
                    <span className="text-[10px] font-bold text-gold tracking-widest uppercase">Technical Domains & Experience</span>
                </a>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed max-w-xs">
                  A professional portfolio showcasing technical competencies in statutory audits, corporate taxation, transfer pricing, and digital financial reporting. Designed by Ankesh Kumar, CA Finalist.
                </p>
                
                <div className="space-y-2 pt-2 text-xs font-semibold">
                  <a 
                    href="mailto:ankeshkumar9949@gmail.com" 
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-corporate dark:hover:text-gold transition-colors"
                  >
                    <Mail size={14} className="text-corporate dark:text-gold" /> ankeshkumar9949@gmail.com
                  </a>
                </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
                <h4 className="font-bold text-navy dark:text-white mb-6 uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800/50 pb-2 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-corporate dark:text-gold" /> Quick Links
                </h4>
                <ul className="space-y-2 text-xs font-medium">
                    <li>
                      <a href="#home" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#about" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        About Profile
                      </a>
                    </li>
                    <li>
                      <a href="#experience" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        Work Experience
                      </a>
                    </li>
                    <li>
                      <a href="#compliance-hub" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        Compliance Hub
                      </a>
                    </li>
                    <li>
                      <a href="#tech-compliance-desk" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        Compliance Suite
                      </a>
                    </li>
                    <li>
                      <a href="#contact" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        Contact Me
                      </a>
                    </li>
                </ul>
            </div>

            {/* Column 3: Professional PDF Toolkit */}
            <div>
                <h4 className="font-bold text-navy dark:text-white mb-6 uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800/50 pb-2 flex items-center gap-1.5">
                  <Cpu size={14} className="text-corporate dark:text-gold" /> Professional PDF Toolkit
                </h4>
                <p className="text-[11px] text-slate-550 dark:text-slate-400 mb-3 leading-relaxed">
                  Secure, 100% browser-based tools running locally on your device:
                </p>
                <ul className="space-y-2 text-xs font-medium">
                    <li>
                      <a href="#pdf-toolkit" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        🔀 Merge PDF Documents
                      </a>
                    </li>
                    <li>
                      <a href="#pdf-toolkit" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        ✂️ Split PDF Files
                      </a>
                    </li>
                    <li>
                      <a href="#pdf-toolkit" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        🗜️ Compress PDF Size
                      </a>
                    </li>
                    <li>
                      <a href="#pdf-toolkit" className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors">
                        🔍 PDF OCR Text Extraction
                      </a>
                    </li>
                </ul>
            </div>

            {/* Column 4: Compliance Suite & AI */}
            <div>
                <h4 className="font-bold text-navy dark:text-white mb-6 uppercase text-xs tracking-wider border-b border-slate-100 dark:border-slate-800/50 pb-2 flex items-center gap-1.5">
                  <Calculator size={14} className="text-corporate dark:text-gold" /> Verification & AI Suite
                </h4>
                <ul className="space-y-2 text-xs font-medium">
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('gstin-search', e)}
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors flex items-center gap-1"
                      >
                        GSTIN Search Verification
                      </a>
                    </li>
                    <li>
                      <a 
                        href="#tech-compliance-desk" 
                        onClick={(e) => triggerTool('company-search', e)}
                        className="text-slate-500 dark:text-slate-400 hover:text-corporate dark:hover:text-gold transition-colors"
                      >
                        MCA Company Search
                      </a>
                    </li>
                    <li>
                      <button 
                        onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
                        className="text-left font-bold text-corporate dark:text-gold hover:underline flex items-center gap-1 cursor-pointer bg-transparent border-none p-0"
                      >
                        🤖 Launch AI Assistant
                      </button>
                    </li>
                </ul>
            </div>
        </div>

        {/* Bottom copyright line with sub links */}
        <div className="border-t border-slate-150 dark:border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-550 dark:text-slate-500 text-xs font-semibold">
                © 2026 Ankesh Kumar. CA Finalist Portfolio. Focused on Audit, Tax Compliance, and Financial Advisory Support.
            </p>
            <div className="flex gap-6 text-xs text-slate-400 font-bold">
                <a href="#" className="hover:text-corporate dark:hover:text-gold transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-corporate dark:hover:text-gold transition-colors">Terms of Service</a>
                <a href="https://linkedin.com/in/ankeshkumar9949" target="_blank" rel="noopener noreferrer" className="hover:text-corporate dark:hover:text-gold transition-all duration-300">
                  <Linkedin size={15} className="inline mr-1" /> LinkedIn
                </a>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

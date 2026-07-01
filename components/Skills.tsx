import React from 'react';
import { Icon3D, Icons3D } from './Icons3D';

const Skills: React.FC = () => {
  const tools = [
    {
      category: "Audit & Assurance",
      items: [
        { name: "Statutory Audit", desc: "Vouching, verification, and rigorous CARO 2020 reporting compliance.", icon: Icons3D.Audit, theme: 'gold', badge: "Advanced" },
        { name: "Ledger Scrutiny", desc: "Scrutiny of ledgers, trial balances, and active account reconciliations.", icon: Icons3D.Calculator, theme: 'corporate', badge: "Advanced" },
      ]
    },
    {
      category: "Taxation & GST",
      items: [
        { name: "GST Compliance", desc: "E-filing GSTR-1, GSTR-3B, and performing advanced ITC reconciliations.", icon: Icons3D.GST, theme: 'emerald', badge: "Advanced" },
        { name: "Income Tax", desc: "Tax computations, deductions review, and corporate/individual ITR drafting.", icon: Icons3D.Taxation, theme: 'purple', badge: "Professional" },
      ]
    },
    {
      category: "Corporate Compliance",
      items: [
        { name: "MCA & ROC Filings", desc: "Filing AOC-4, MGT-7, and preparing corporate resolutions.", icon: Icons3D.ROC, theme: 'blue', badge: "Professional" },
        { name: "Company Setup", desc: "Incorporation proceedings for LLPs, OPCs, and Private Limited structures.", icon: Icons3D.Building, theme: 'gold', badge: "Working Knowledge" },
      ]
    },
    {
      category: "Accounting & ERP",
      items: [
        { name: "Tally Prime & Focus", desc: "Double-entry bookkeeping, multi-state ledger setups, and bank reconciliations.", icon: Icons3D.FinancialReport, theme: 'corporate', badge: "Advanced" },
        { name: "QuickBooks", desc: "Cloud accounting ledger management, automated bank feeds, and standard reporting.", icon: Icons3D.Cart, theme: 'emerald', badge: "Professional" },
      ]
    },
    {
      category: "Data Analysis & Office",
      items: [
        { name: "MS Excel (Advanced)", desc: "XLOOKUP, pivot tables, auditing formulas, and financial statement review models.", icon: Icons3D.Analytics, theme: 'blue', badge: "Advanced" },
        { name: "MS Word", desc: "Drafting high-precision statutory audit reports, management responses, and certificates.", icon: Icons3D.PDF, theme: 'purple', badge: "Daily Use" },
      ]
    },
    {
      category: "AI & Productivity",
      items: [
        { name: "Document Intelligence", desc: "Utilizing OCR and AI models locally to parse and review financial statements.", icon: Icons3D.OCR, theme: 'gold', badge: "Working Knowledge" },
        { name: "AI Research & Prompts", desc: "Leveraging structured prompting for fast, secure reference to Indian tax and company laws.", icon: Icons3D.AI, theme: 'emerald', badge: "Working Knowledge" },
      ]
    }
  ] as const;

  return (
    <section id="skills" className="py-20 bg-white dark:bg-darkBg border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-2">Technical Proficiency</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white">Professional Skills & Exposure</h3>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {tools.map((group, idx) => (
                <div key={idx}>
                    <h4 className="text-lg font-bold text-corporate dark:text-blue-300 mb-6 border-b border-slate-100 dark:border-slate-700 pb-2">{group.category}</h4>
                    <div className="space-y-4">
                        {group.items.map((tool, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-4 bg-light dark:bg-darkCard p-4 rounded-lg border border-slate-100 dark:border-slate-700 hover:border-corporate dark:hover:border-gold transition-colors">
                                <Icon3D icon={tool.icon} theme={tool.theme} size="sm" className="shrink-0" />
                                <div className="flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="font-bold text-navy dark:text-white text-sm">{tool.name}</p>
                                        <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2 py-0.5 bg-slate-100 dark:bg-slate-800/60 rounded">
                                            {tool.badge}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{tool.desc}</p>
                                </div>
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

export default Skills;
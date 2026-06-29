import React, { useState } from 'react';
import { 
  Layers, 
  Scissors, 
  Minimize2, 
  RotateCw, 
  FileX, 
  ExternalLink, 
  Lock, 
  Unlock, 
  FileImage, 
  Images, 
  ArrowRight,
  Info,
  X,
  Languages,
  Type
} from 'lucide-react';
import MergePdfTool from './MergePdfTool';
import SplitPdfTool from './SplitPdfTool';
import CompressPdfTool from './CompressPdfTool';
import RotatePdfTool from './RotatePdfTool';
import DeletePagesTool from './DeletePagesTool';
import ExtractPagesTool from './ExtractPagesTool';
import ProtectPdfTool from './ProtectPdfTool';
import ImagesToPdfTool from './ImagesToPdfTool';
import UnlockPdfTool from './UnlockPdfTool';
import PdfToImagesTool from './PdfToImagesTool';
import OcrPdfTool from './OcrPdfTool';
import WatermarkPdfTool from './WatermarkPdfTool';

interface PdfTool {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function PdfToolkit() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showDemoBanner, setShowDemoBanner] = useState<string | null>(null);

  const tools: PdfTool[] = [
    {
      id: 'merge',
      title: 'Merge PDF',
      desc: 'Combine multiple PDF files into a single document in your preferred sequence.',
      icon: <Layers size={24} />
    },
    {
      id: 'split',
      title: 'Split PDF',
      desc: 'Extract specific page ranges or split a PDF into separate individual files.',
      icon: <Scissors size={24} />
    },
    {
      id: 'compress',
      title: 'Compress PDF',
      desc: 'Reduce PDF file size while maintaining maximum document quality.',
      icon: <Minimize2 size={24} />
    },
    {
      id: 'rotate',
      title: 'Rotate PDF',
      desc: 'Rotate individual pages or entire documents to portrait or landscape.',
      icon: <RotateCw size={24} />
    },
    {
      id: 'delete',
      title: 'Delete Pages',
      desc: 'Remove unnecessary pages from your PDF file before sharing.',
      icon: <FileX size={24} />
    },
    {
      id: 'extract',
      title: 'Extract Pages',
      desc: 'Save only the pages you need from a larger PDF into a new document.',
      icon: <ExternalLink size={24} />
    },
    {
      id: 'protect',
      title: 'Protect PDF',
      desc: 'Secure your PDF with a strong password to prevent unauthorized access.',
      icon: <Lock size={24} />
    },
    {
      id: 'unlock',
      title: 'Unlock PDF',
      desc: 'Remove password security to access or print encrypted PDF documents.',
      icon: <Unlock size={24} />
    },
    {
      id: 'img2pdf',
      title: 'Images to PDF',
      desc: 'Convert JPG, PNG, and WebP images into a single clean PDF file.',
      icon: <FileImage size={24} />
    },
    {
      id: 'pdf2img',
      title: 'PDF to Images',
      desc: 'Extract all pages from a PDF and convert them into high-quality images.',
      icon: <Images size={24} />
    },
    {
      id: 'ocr',
      title: 'OCR PDF (Extract Text)',
      desc: 'Extract structured text blocks, tables, and paragraphs from scanned PDF documents client-side.',
      icon: <Languages size={24} />
    },
    {
      id: 'watermark',
      title: 'Watermark PDF',
      desc: 'Add custom text or image watermarks to your PDF with precise layout and opacity controls.',
      icon: <Type size={24} />
    }
  ];

  const handleOpenTool = (toolId: string, toolTitle: string) => {
    if (toolId === 'merge') {
      setSelectedTool('merge');
    } else if (toolId === 'split') {
      setSelectedTool('split');
    } else if (toolId === 'compress') {
      setSelectedTool('compress');
    } else if (toolId === 'rotate') {
      setSelectedTool('rotate');
    } else if (toolId === 'delete') {
      setSelectedTool('delete');
    } else if (toolId === 'extract') {
      setSelectedTool('extract');
    } else if (toolId === 'protect') {
      setSelectedTool('protect');
    } else if (toolId === 'unlock') {
      setSelectedTool('unlock');
    } else if (toolId === 'img2pdf') {
      setSelectedTool('img2pdf');
    } else if (toolId === 'pdf2img') {
      setSelectedTool('pdf2img');
    } else if (toolId === 'ocr') {
      setSelectedTool('ocr');
    } else if (toolId === 'watermark') {
      setSelectedTool('watermark');
    } else {
      setShowDemoBanner(toolTitle);
    }
  };

  return (
    <section id="pdf-toolkit" className="relative py-24 bg-light dark:bg-darkBg overflow-hidden transition-colors duration-300">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-corporate/5 dark:bg-corporate/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-gold/5 dark:bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="w-3.5 h-1 bg-orange-500 rounded-full"></span>
            <span className="w-3.5 h-1 bg-slate-200 dark:bg-slate-750 rounded-full"></span>
            <span className="w-3.5 h-1 bg-emerald-500 rounded-full"></span>
          </div>
          <h2 className="text-sm font-bold text-gold uppercase tracking-widest mb-2">100% Local Workspace Utilities</h2>
          <h3 className="text-3xl md:text-4xl font-extrabold text-navy dark:text-white">
            Professional <span className="text-orange-500">PDF</span> Toolkit (Browser-Based & Secure)
          </h3>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Manage your tax filings, financial statements, and compliance audits efficiently with secure document utilities. 
            <strong className="text-navy dark:text-white block mt-1.5 font-bold">⚠️ All operations run locally in your browser. Your files are never uploaded or sent to any server. Privacy-first by design.</strong>
          </p>
        </div>

        {/* Privacy & Security Banner */}
        <div className="max-w-3xl mx-auto mb-16 p-6 md:p-8 rounded-3xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-lg text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-6 transition-all duration-300">
          <div className="w-14 h-14 shrink-0 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-2xl flex items-center justify-center shadow-inner">
            <span className="text-2xl" role="img" aria-label="Privacy First">🔒</span>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            <div>
              <h4 className="text-lg font-bold text-navy dark:text-white flex items-center justify-center md:justify-start gap-2 mb-1.5">
                🔒 Privacy First
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
                All PDF processing is performed entirely within your browser.
                Your documents are never uploaded, stored, or transmitted.
                Every operation runs locally on your device for maximum privacy and security.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold rounded-lg border border-emerald-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Browser Only
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold rounded-lg border border-orange-500/10">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                No File Uploads
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-corporate/10 text-corporate dark:text-gold text-xs font-bold rounded-lg border border-corporate/10 dark:border-gold/10">
                <span className="w-1.5 h-1.5 rounded-full bg-corporate dark:bg-gold animate-pulse"></span>
                Offline Friendly
              </span>
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              className="bg-white dark:bg-darkCard p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-corporate dark:hover:border-gold group relative overflow-hidden"
            >
              {/* Decorative Subtle Background Pattern */}
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Tool Icon */}
                <div className="w-12 h-12 bg-slate-50 dark:bg-slate-900 text-corporate dark:text-gold rounded-xl flex items-center justify-center mb-5 transition-colors group-hover:bg-corporate group-hover:text-white dark:group-hover:bg-gold dark:group-hover:text-navy shadow-sm">
                  {tool.icon}
                </div>
                
                {/* Tool Title */}
                <h4 className="text-base font-extrabold text-navy dark:text-white mb-2 group-hover:text-corporate dark:group-hover:text-gold transition-colors">
                  {tool.title}
                </h4>
                
                {/* Tool Description */}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6 flex-grow">
                  {tool.desc}
                </p>
                
                {/* Open Button */}
                <button 
                  onClick={() => handleOpenTool(tool.id, tool.title)}
                  className="w-full mt-auto flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-350 hover:bg-corporate hover:text-white dark:hover:bg-gold dark:hover:text-navy text-xs font-bold rounded-xl border border-slate-100 dark:border-slate-800/80 transition-all duration-300 group/btn cursor-pointer"
                >
                  <span>Open Tool</span>
                  <ArrowRight size={13} className="transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Tool Informational Banner */}
      {showDemoBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-3xl max-w-md w-full shadow-2xl relative">
            <button 
              onClick={() => setShowDemoBanner(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
            >
              <X size={18} />
            </button>
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 bg-gold/10 text-gold rounded-full flex items-center justify-center mb-1">
                <Info size={32} />
              </div>
              <h3 className="text-xl font-bold text-navy dark:text-white">{showDemoBanner} is Offline</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                The <span className="font-semibold text-slate-800 dark:text-white">{showDemoBanner}</span> tool is part of the premium compliance suite. In this professional workspace demo, the <span className="font-bold text-gold">Merge PDF</span> tool is fully unlocked and ready to use.
              </p>
              <div className="flex gap-3 w-full mt-4">
                <button
                  onClick={() => {
                    setShowDemoBanner(null);
                    setSelectedTool('merge');
                  }}
                  className="flex-1 bg-corporate hover:bg-corporate/90 dark:bg-gold dark:hover:bg-amber-500 text-white dark:text-navy font-bold py-3 px-4 rounded-xl text-xs transition-all duration-300 cursor-pointer shadow-md"
                >
                  Try Merge PDF Tool
                </button>
                <button
                  onClick={() => setShowDemoBanner(null)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- MERGE PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'merge' && (
        <MergePdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- SPLIT PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'split' && (
        <SplitPdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- COMPRESS PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'compress' && (
        <CompressPdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- ROTATE PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'rotate' && (
        <RotatePdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- DELETE PAGES INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'delete' && (
        <DeletePagesTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- EXTRACT PAGES INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'extract' && (
        <ExtractPagesTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- PROTECT PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'protect' && (
        <ProtectPdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- IMAGES TO PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'img2pdf' && (
        <ImagesToPdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- UNLOCK PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'unlock' && (
        <UnlockPdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- PDF TO IMAGES INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'pdf2img' && (
        <PdfToImagesTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- OCR PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'ocr' && (
        <OcrPdfTool onClose={() => setSelectedTool(null)} />
      )}

      {/* --- WATERMARK PDF INTERACTIVE WORKSPACE MODAL --- */}
      {selectedTool === 'watermark' && (
        <WatermarkPdfTool onClose={() => setSelectedTool(null)} />
      )}


    </section>
  );
}

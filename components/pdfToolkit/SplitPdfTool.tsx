import React, { useState } from 'react';
import { 
  Scissors, 
  FileText, 
  Loader2 
} from 'lucide-react';
import UploadZone from './UploadZone';
import { usePdfDownload } from './hooks/usePdfDownload';
import { formatFileSize } from './utils/fileHelpers';
import { parsePageRanges, readPdfDocument } from './utils/pdfHelpers';
import { validatePdfFile } from './utils/validation';
import WorkspaceHeader from './ui/WorkspaceHeader';
import AlertBanner from './ui/AlertBanner';

interface SplitPdfToolProps {
  onClose: () => void;
}

export default function SplitPdfTool({ onClose }: SplitPdfToolProps) {
  const [splitFile, setSplitFile] = useState<File | null>(null);
  const [splitTotalPages, setSplitTotalPages] = useState<number | null>(null);
  const [splitRangeInput, setSplitRangeInput] = useState<string>('');
  const [splitOutputName, setSplitOutputName] = useState<string>('split_document.pdf');
  
  const {
    downloading: splitting,
    error: downloadError,
    success: splitSuccess,
    setError: setSplitError,
    executeDownload,
    clearDownloadStates,
  } = usePdfDownload();

  const [validationError, setValidationError] = useState<string | null>(null);

  const splitError = downloadError || validationError;

  const handleSplitFileChange = async (files: File[]) => {
    if (files.length === 0) return;
    const file = files[0];
    
    const validation = validatePdfFile(file);
    if (!validation.isValid) {
      setValidationError(validation.error);
      return;
    }
    
    setSplitFile(file);
    setValidationError(null);
    clearDownloadStates();
    
    // Set default output name based on input name
    const baseName = file.name.replace(/\.pdf$/i, '');
    setSplitOutputName(`${baseName}_split.pdf`);
    
    try {
      const pdf = await readPdfDocument(file, { 
        updateMetadata: false 
      });
      const pagesCount = pdf.getPageCount();
      setSplitTotalPages(pagesCount);
      // Set default range as "1-X"
      setSplitRangeInput(`1-${pagesCount}`);
    } catch (err: any) {
      console.error('Error reading PDF pages:', err);
      setValidationError('Could not read PDF page details. The file might be corrupted, password-protected, or encrypted.');
      setSplitTotalPages(null);
    }
  };

  const applyPresetRange = (preset: 'all' | 'first' | 'odd' | 'even') => {
    if (!splitTotalPages) return;
    if (preset === 'all') {
      setSplitRangeInput(`1-${splitTotalPages}`);
    } else if (preset === 'first') {
      setSplitRangeInput('1');
    } else if (preset === 'odd') {
      const oddList: number[] = [];
      for (let i = 1; i <= splitTotalPages; i += 2) {
        oddList.push(i);
      }
      setSplitRangeInput(oddList.join(', '));
    } else if (preset === 'even') {
      const evenList: number[] = [];
      for (let i = 2; i <= splitTotalPages; i += 2) {
        evenList.push(i);
      }
      setSplitRangeInput(evenList.join(', '));
    }
    setValidationError(null);
    clearDownloadStates();
  };

  const clearSplitState = () => {
    setSplitFile(null);
    setSplitTotalPages(null);
    setSplitRangeInput('');
    setValidationError(null);
    clearDownloadStates();
  };

  const handleClose = () => {
    clearSplitState();
    onClose();
  };

  // PDF Split Engine
  const handleSplit = async () => {
    if (!splitFile) {
      setValidationError('Please select a PDF file first.');
      return;
    }
    if (!splitTotalPages) {
      setValidationError('Could not determine page count. Please re-upload the file.');
      return;
    }

    setValidationError(null);

    await executeDownload(async () => {
      const pagesToExtract = parsePageRanges(splitRangeInput, splitTotalPages);

      const srcPdf = await readPdfDocument(splitFile);
      const { PDFDocument } = await import('pdf-lib');
      const splitPdf = await PDFDocument.create();
      const copiedPages = await splitPdf.copyPages(srcPdf, pagesToExtract);
      copiedPages.forEach((page) => splitPdf.addPage(page));

      const splitPdfBytes = await splitPdf.save();
      return new Blob([splitPdfBytes], { type: 'application/pdf' });
    }, splitOutputName);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] my-8 animate-scale-in">
        
        {/* Workspace Header */}
        <WorkspaceHeader
          title="Split PDF Workspace"
          subtitle="Local sandboxed extraction: Files never upload or leave your system"
          icon={<Scissors size={18} />}
          onClose={handleClose}
        />

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Drag and Drop Zone / File Info */}
          {!splitFile ? (
            <UploadZone
              onFilesSelected={handleSplitFileChange}
              multiple={false}
              title={
                <>
                  Drag and drop your PDF file here, or <span className="text-corporate dark:text-gold hover:underline">browse</span>
                </>
              }
              description="Supports one PDF file. Extraction is processed entirely client-side."
            />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                <h4 className="text-xs font-extrabold text-navy dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} className="text-slate-400" />
                  <span>Selected Document</span>
                </h4>
                <button 
                  onClick={clearSplitState}
                  className="text-xs text-rose-500 hover:text-rose-600 font-bold transition-colors cursor-pointer"
                >
                  Remove File
                </button>
              </div>

              <div className="border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 bg-slate-50/20 dark:bg-slate-950/5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span className="w-8 h-8 bg-orange-500/10 text-orange-500 font-bold rounded-lg flex items-center justify-center shrink-0">
                    <FileText size={16} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                      {splitFile.name}
                    </p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                      {formatFileSize(splitFile.size)}
                    </p>
                  </div>
                </div>
                {splitTotalPages && (
                  <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 font-bold text-[10px] rounded-lg border border-slate-150 dark:border-slate-850">
                    {splitTotalPages} {splitTotalPages === 1 ? 'Page' : 'Pages'}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Status and Notifications */}
          {splitError && (
            <AlertBanner type="error" message={splitError} />
          )}

          {splitSuccess && (
            <AlertBanner 
              type="success" 
              message="PDF Split Successfully!" 
              description="Your extracted pages have been processed and downloaded automatically." 
            />
          )}

          {/* Page Range Selection Setup */}
          {splitFile && splitTotalPages && (
            <div className="space-y-4">
              <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-150 dark:border-slate-800/60 rounded-2xl space-y-4">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-corporate dark:bg-gold rounded-full"></span>
                  <h4 className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Configure Extraction Range</h4>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      Select Pages or Range
                    </label>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Example: 1-3, 5, 7-9 (Max: {splitTotalPages})
                    </span>
                  </div>
                  
                  <input
                    type="text"
                    value={splitRangeInput}
                    onChange={(e) => {
                      setSplitRangeInput(e.target.value);
                      setValidationError(null);
                      clearDownloadStates();
                    }}
                    placeholder="e.g. 1-3, 5, 8-10"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:border-corporate dark:focus:border-gold transition-colors"
                  />
                </div>

                {/* Presets Grid */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-slate-450 dark:text-slate-500 uppercase tracking-wider">
                    Page Presets
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => applyPresetRange('all')}
                      className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-corporate dark:hover:border-gold text-slate-600 dark:text-slate-330 font-bold text-[10px] rounded-lg transition-all cursor-pointer shadow-sm"
                    >
                      All Pages (1-{splitTotalPages})
                    </button>
                    <button
                      type="button"
                      onClick={() => applyPresetRange('first')}
                      className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-corporate dark:hover:border-gold text-slate-600 dark:text-slate-330 font-bold text-[10px] rounded-lg transition-all cursor-pointer shadow-sm"
                    >
                      First Page Only (1)
                    </button>
                    {splitTotalPages >= 2 && (
                      <>
                        <button
                          type="button"
                          onClick={() => applyPresetRange('odd')}
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-corporate dark:hover:border-gold text-slate-600 dark:text-slate-330 font-bold text-[10px] rounded-lg transition-all cursor-pointer shadow-sm"
                        >
                          Odd Pages
                        </button>
                        <button
                          type="button"
                          onClick={() => applyPresetRange('even')}
                          className="px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 hover:border-corporate dark:hover:border-gold text-slate-600 dark:text-slate-330 font-bold text-[10px] rounded-lg transition-all cursor-pointer shadow-sm"
                        >
                          Even Pages
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Output File Configuration */}
              <div className="bg-slate-50/50 dark:bg-slate-950/20 p-4 border border-slate-150 dark:border-slate-800/60 rounded-2xl space-y-3">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-corporate dark:bg-gold rounded-full"></span>
                  <h4 className="text-xs font-bold text-navy dark:text-white uppercase tracking-wider">Output File Setup</h4>
                </div>
                <div className="grid grid-cols-1 gap-1">
                  <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mb-1">
                    File Name
                  </label>
                  <input
                    type="text"
                    value={splitOutputName}
                    onChange={(e) => setSplitOutputName(e.target.value)}
                    placeholder="split_document.pdf"
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold px-3.5 py-2.5 rounded-xl text-slate-800 dark:text-slate-200 outline-none focus:border-corporate dark:focus:border-gold transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-end gap-3 bg-slate-50/30 dark:bg-slate-950/10">
          <button
            onClick={handleClose}
            className="bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800/80 text-slate-600 dark:text-slate-350 font-bold py-2.5 px-5 rounded-xl text-xs transition-colors cursor-pointer border border-slate-150 dark:border-slate-800/60"
          >
            Close Workspace
          </button>
          
          <button
            onClick={handleSplit}
            disabled={!splitFile || !splitRangeInput.trim() || splitting}
            className={`font-bold py-2.5 px-6 rounded-xl text-xs transition-all duration-300 flex items-center gap-2 shadow-md cursor-pointer ${
              !splitFile || !splitRangeInput.trim() || splitting
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800/50 cursor-not-allowed shadow-none'
                : 'bg-corporate hover:bg-corporate/90 text-white dark:bg-gold dark:text-navy dark:hover:bg-amber-500'
            }`}
          >
            {splitting ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Extracting Pages...</span>
              </>
            ) : (
              <>
                <Scissors size={14} />
                <span>Extract & Download</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

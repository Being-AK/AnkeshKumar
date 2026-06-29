import React, { useRef } from 'react';
import { Upload } from 'lucide-react';
import { useDragDrop } from './hooks/useDragDrop';

interface UploadZoneProps {
  onFilesSelected: (files: File[]) => void;
  multiple?: boolean;
  title?: string;
  description?: string;
}

export default function UploadZone({
  onFilesSelected,
  multiple = false,
  title,
  description
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { dragActive, handleDrag, handleDrop } = useDragDrop(onFilesSelected);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(Array.from(e.target.files));
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      role="button"
      tabIndex={0}
      aria-label={title || `Upload PDF file${multiple ? 's' : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          fileInputRef.current?.click();
        }
      }}
      className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 relative group ${
        dragActive 
          ? 'border-corporate dark:border-gold bg-corporate/5 dark:bg-gold/5 shadow-inner' 
          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/10 hover:border-corporate dark:hover:border-gold hover:bg-slate-50 dark:hover:bg-slate-950/20'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple={multiple}
        accept="application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="w-12 h-12 bg-white dark:bg-slate-900 text-slate-400 dark:text-slate-500 border border-slate-100 dark:border-slate-800/80 rounded-xl flex items-center justify-center mb-3 group-hover:text-corporate group-hover:text-white dark:group-hover:text-gold dark:group-hover:text-navy transition-colors shadow-sm">
        <Upload size={22} className={dragActive ? "animate-bounce" : ""} />
      </div>
      
      <p className="text-sm font-bold text-navy dark:text-white mb-1">
        {title || (
          <>
            Drag and drop your PDF file{multiple ? 's' : ''} here, or{' '}
            <span className="text-corporate dark:text-gold hover:underline">browse</span>
          </>
        )}
      </p>
      <p className="text-xs text-slate-400 dark:text-slate-500">
        {description || `Supports ${multiple ? 'multiple' : 'one'} PDF file. Processed entirely client-side.`}
      </p>
    </div>
  );
}

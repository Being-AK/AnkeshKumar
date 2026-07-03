import React from 'react';
import { FileText, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';
import { formatFileSize } from '../utils/fileHelpers';

interface FileListProps {
  pdfFiles: File[];
  onRemove: (index: number) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onClearAll?: () => void;
  showIndexBadge?: boolean;
  titleText?: string;
  tipText?: string;
}

export default function FileList({
  pdfFiles,
  onRemove,
  onMoveUp,
  onMoveDown,
  onClearAll,
  showIndexBadge = false,
  titleText = "Selected Files",
  tipText
}: FileListProps) {
  if (pdfFiles.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center px-1">
        <h4 className="text-xs font-extrabold text-navy dark:text-white uppercase tracking-wider flex items-center gap-1.5">
          <FileText size={14} className="text-slate-400" />
          <span>
            {titleText} ({pdfFiles.length} {pdfFiles.length === 1 ? 'file' : 'files'})
          </span>
        </h4>
        {onClearAll && (
          <button 
            onClick={onClearAll}
            className="text-xs text-rose-500 hover:text-rose-600 font-bold transition-colors cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden max-h-[30vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 bg-slate-50/20 dark:bg-slate-950/5">
        {pdfFiles.map((file, index) => (
          <div 
            key={`${file.name}-${index}`}
            className="p-3.5 flex items-center justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-950/40 transition-colors group/item"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {showIndexBadge ? (
                <span className="w-5 h-5 bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-bold text-[10px] rounded flex items-center justify-center shrink-0">
                  {index + 1}
                </span>
              ) : (
                <span className="w-8 h-8 bg-orange-500/10 text-orange-500 font-bold rounded-lg flex items-center justify-center shrink-0">
                  <FileText size={16} />
                </span>
              )}
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate pr-2">
                  {file.name}
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {formatFileSize(file.size)}
                </p>
              </div>
            </div>

            {/* File Action Controls */}
            <div className="flex items-center gap-1 shrink-0">
              {onMoveUp && (
                <button
                  onClick={() => onMoveUp(index)}
                  disabled={index === 0}
                  title="Move Page Up"
                  aria-label="Move page up"
                  className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 hover:text-corporate dark:hover:text-gold hover:bg-white dark:hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
                >
                  <ArrowUp size={13} />
                </button>
              )}
              {onMoveDown && (
                <button
                  onClick={() => onMoveDown(index)}
                  disabled={index === pdfFiles.length - 1}
                  title="Move Page Down"
                  aria-label="Move page down"
                  className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/80 text-slate-400 dark:text-slate-500 hover:text-corporate dark:hover:text-gold hover:bg-white dark:hover:bg-slate-900 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-all cursor-pointer"
                >
                  <ArrowDown size={13} />
                </button>
              )}
              <button
                onClick={() => onRemove(index)}
                title="Remove File"
                aria-label="Remove file from list"
                className="p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/80 text-rose-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all cursor-pointer"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {tipText && (
        <p className="text-[10px] text-slate-400 dark:text-slate-500 italic text-center">
          {tipText}
        </p>
      )}
    </div>
  );
}

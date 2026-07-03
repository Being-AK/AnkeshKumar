import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface AlertBannerProps {
  type: 'error' | 'success' | 'info';
  message: string;
  description?: string;
}

export default function AlertBanner({ type, message, description }: AlertBannerProps) {
  if (type === 'error') {
    return (
      <div className="flex items-start gap-2.5 p-4 bg-rose-50 dark:bg-rose-950/20 border border-rose-200/50 dark:border-rose-900/30 rounded-xl text-rose-600 dark:text-rose-400 text-xs animate-fade-in">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <span className="leading-relaxed font-medium">{message}</span>
      </div>
    );
  }

  if (type === 'info') {
    return (
      <div className="flex items-start gap-2.5 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-900/30 rounded-xl text-amber-600 dark:text-amber-450 text-xs animate-fade-in">
        <AlertCircle size={16} className="shrink-0 mt-0.5" />
        <div className="leading-relaxed font-medium">
          <p className="font-bold mb-0.5">{message}</p>
          {description && <p className="text-[11px] opacity-90 font-medium">{description}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-450 text-xs animate-fade-in">
      <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
      <div className="leading-relaxed font-medium">
        <p className="font-bold mb-0.5">{message}</p>
        {description && <p className="text-[11px] opacity-90 font-medium">{description}</p>}
      </div>
    </div>
  );
}

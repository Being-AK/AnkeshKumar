import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message?: React.ReactNode;
}

export default function LoadingOverlay({ message = "Processing..." }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-[2px] z-40 flex flex-col items-center justify-center gap-3 animate-fade-in rounded-2xl">
      <span className="p-3 bg-corporate/10 dark:bg-gold/10 text-corporate dark:text-gold rounded-full">
        <Loader2 className="animate-spin" size={24} />
      </span>
      <div className="text-xs font-bold text-navy dark:text-white text-center">
        {message}
      </div>
    </div>
  );
}

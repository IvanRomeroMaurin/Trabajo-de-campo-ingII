'use client';

import { CheckCircle2, XCircle } from 'lucide-react';

type AlertType = 'success' | 'error';

interface AlertMessageProps {
  type: AlertType;
  message: string;
}

export function AlertMessage({ type, message }: AlertMessageProps) {
  const isSuccess = type === 'success';

  return (
    <div className={`
      flex items-start gap-2.5 px-4 py-3.5 rounded-[12px] border text-[0.875rem] leading-relaxed
      ${isSuccess 
        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
        : 'bg-red-500/10 border-red-500/20 text-red-400'
      }
    `}>
      {isSuccess ? <CheckCircle2 size={17} className="shrink-0 mt-0.5" /> : <XCircle size={17} className="shrink-0 mt-0.5" />}
      <span>{message}</span>
    </div>
  );
}

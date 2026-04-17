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
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
      padding: '0.9rem 1rem',
      borderRadius: '10px',
      background: isSuccess ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)',
      border: `1px solid ${isSuccess ? 'rgba(52,211,153,0.25)' : 'rgba(239,68,68,0.25)'}`,
      color: isSuccess ? '#34d399' : '#f87171',
      fontSize: '0.875rem',
      lineHeight: 1.5,
    }}>
      {isSuccess ? <CheckCircle2 size={17} style={{ flexShrink: 0, marginTop: '0.1rem' }} /> : <XCircle size={17} style={{ flexShrink: 0, marginTop: '0.1rem' }} />}
      <span>{message}</span>
    </div>
  );
}

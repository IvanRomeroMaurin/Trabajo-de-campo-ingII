'use client';

import { forwardRef } from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, id, ...props }, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        <label
          htmlFor={inputId}
          style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.02em' }}
        >
          {label}
        </label>
        <div style={{ position: 'relative' }}>
          {icon && (
            <div style={{
              position: 'absolute', left: '0.8rem', top: '50%', transform: 'translateY(-50%)',
              color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
            }}>
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            style={{
              width: '100%',
              padding: icon ? '0.7rem 0.9rem 0.7rem 2.5rem' : '0.7rem 0.9rem',
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)'}`,
              borderRadius: '10px',
              color: 'var(--text-primary)',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
              boxSizing: 'border-box',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-purple)';
              e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,0.15)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = error ? 'rgba(239,68,68,0.5)' : 'var(--border-subtle)';
              e.target.style.boxShadow = 'none';
            }}
            {...props}
          />
        </div>
        {error && (
          <span style={{ fontSize: '0.78rem', color: '#f87171' }}>{error}</span>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

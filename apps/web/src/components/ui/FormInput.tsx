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
      <div className="flex flex-col gap-1.5 w-full">
        <label
          htmlFor={inputId}
          className="text-[0.82rem] font-bold text-slate-500 tracking-wide ml-1 uppercase"
        >
          {label}
        </label>
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 flex items-center group-focus-within:text-sky-500 transition-colors">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              w-full rounded-2xl bg-slate-50 text-slate-900 text-[0.95rem] outline-none transition-all duration-200
              ${icon ? 'pl-12 pr-4' : 'px-4'}
              py-3.5 border
              ${error 
                ? 'border-red-200 bg-red-50 text-red-900 focus:border-red-300 focus:ring-4 focus:ring-red-100' 
                : 'border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-100'
              }
            `}
            {...props}
          />
        </div>
        {error && (
          <span className="text-xs text-red-500 font-bold ml-1 mt-0.5">{error}</span>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';

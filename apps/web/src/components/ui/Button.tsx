'use client';

import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
};

export function Button({
  variant = 'primary',
  isLoading = false,
  icon,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = `
    ${variantClass[variant]}
    ${fullWidth ? 'w-full justify-center' : ''}
    ${disabled || isLoading ? 'opacity-65 cursor-not-allowed' : 'cursor-pointer'}
    ${className ?? ''}
  `.trim();

  return (
    <button
      className={baseClasses}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <Loader2 size={16} className="animate-spin" /> : icon}
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}

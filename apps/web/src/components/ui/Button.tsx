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
  style,
  ...props
}: ButtonProps) {
  return (
    <button
      className={variantClass[variant]}
      disabled={disabled || isLoading}
      style={{
        width: fullWidth ? '100%' : undefined,
        justifyContent: fullWidth ? 'center' : undefined,
        opacity: disabled || isLoading ? 0.65 : 1,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {isLoading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : icon}
      {isLoading ? 'Cargando...' : children}
    </button>
  );
}

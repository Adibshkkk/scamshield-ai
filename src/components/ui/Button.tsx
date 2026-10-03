import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary:
      'bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white shadow-sm shadow-brand-500/20 focus:ring-brand-500 border-transparent',
    secondary:
      'bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white shadow-sm focus:ring-slate-700 border-transparent',
    danger:
      'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-sm shadow-rose-500/20 focus:ring-rose-500 border-transparent',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 focus:ring-brand-500 hover:border-slate-400',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 border-transparent focus:ring-slate-400',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs md:text-sm px-3 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm md:text-base px-4 py-2.5 gap-2 rounded-xl',
    lg: 'text-base md:text-lg px-6 py-3.5 gap-2.5 rounded-xl font-semibold',
  }[size];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center font-medium border transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin shrink-0" />
      ) : (
        icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="shrink-0">{icon}</span>
      )}
    </button>
  );
};

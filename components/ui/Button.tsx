import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost' | 'danger_outline';
  size?: 'sm' | 'md' | 'lg' | 'xs';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 dark:focus:ring-offset-bgdark disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 ease-in-out';

  const sizeStyles = {
    xs: 'px-2.5 py-1 text-xs', // slightly more padding
    sm: 'px-3.5 py-1.5 text-sm', // slightly more padding
    md: 'px-5 py-2.5 text-sm', // slightly more padding
    lg: 'px-7 py-3.5 text-base', // slightly more padding
  };

  const variantStyles = {
    primary: 'bg-primary-DEFAULT text-primary-foreground hover:bg-primary-dark hover:shadow-md focus:ring-primary-DEFAULT active:scale-[0.98] hover:scale-[1.02]',
    secondary: 'bg-secondary-light text-secondary-foreground hover:bg-secondary-DEFAULT dark:bg-secondary-bgDark dark:text-secondary-textDark dark:hover:bg-secondary-hoverDark focus:ring-primary-DEFAULT active:scale-[0.98] hover:scale-[1.02] dark:border dark:border-neutral-600',
    danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-md focus:ring-red-500 active:scale-[0.98] hover:scale-[1.02]',
    danger_outline: 'border border-red-500 text-red-500 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 focus:ring-red-500 active:scale-[0.98] hover:scale-[1.02] hover:shadow-sm',
    outline: 'border border-primary-DEFAULT text-primary-DEFAULT hover:bg-primary-DEFAULT hover:text-primary-foreground focus:ring-primary-DEFAULT active:scale-[0.98] hover:scale-[1.02] hover:shadow-sm',
    ghost: 'text-primary-DEFAULT hover:bg-primary-DEFAULT/10 dark:text-primary-light dark:hover:bg-primary-light/10 focus:ring-primary-DEFAULT active:scale-[0.98] hover:scale-[1.01]',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
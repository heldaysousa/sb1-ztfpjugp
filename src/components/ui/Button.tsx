import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';
  
  const variantClasses = {
    primary: 'bg-accent-purple text-white hover:bg-opacity-90 dark:bg-accent-purple dark:hover:bg-opacity-80',
    secondary: 'bg-accent text-primary hover:bg-opacity-90 dark:bg-accent dark:text-primary-light dark:hover:bg-opacity-80',
    outline: 'border border-gray-300 text-primary hover:bg-gray-50 dark:border-gray-600 dark:text-dark-DEFAULT dark:hover:bg-primary-light',
    danger: 'bg-status-error text-white hover:bg-opacity-90 dark:hover:bg-opacity-80',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
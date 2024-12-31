import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-2xl font-semibold transition-all duration-300';
  const variants = {
    primary: 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-lg',
    secondary: 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-lg'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
import React from 'react';

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionHeading({ children, className = '' }: SectionHeadingProps) {
  return (
    <h2 className={`text-3xl sm:text-4xl font-bold ${className}`}>
      {children}
    </h2>
  );
}
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

export function DashboardHeader({ title, description }: DashboardHeaderProps) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">{title}</h1>
      {description && (
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      )}
    </div>
  );
}
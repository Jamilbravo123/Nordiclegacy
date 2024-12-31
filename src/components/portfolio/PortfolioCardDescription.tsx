import React from 'react';

interface PortfolioCardDescriptionProps {
  description: string;
}

export function PortfolioCardDescription({ description }: PortfolioCardDescriptionProps) {
  return (
    <p className="text-gray-200 text-sm sm:text-base line-clamp-3 mb-4">
      {description}
    </p>
  );
}
import React from 'react';
import { PortfolioCard } from './PortfolioCard';
import type { PortfolioCompany } from '../../types/portfolio';
import { fadeInUp, stagger } from '../../utils/animations';

interface PortfolioGridProps {
  companies: PortfolioCompany[];
}

export function PortfolioGrid({ companies }: PortfolioGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto px-4">
      {companies.map((company, index) => (
        <div 
          key={index} 
          className={`opacity-90 hover:opacity-100 transition-opacity duration-300 ${fadeInUp} ${stagger(index)}`}
        >
          <PortfolioCard {...company} />
        </div>
      ))}
    </div>
  );
}
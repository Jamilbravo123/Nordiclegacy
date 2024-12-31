import React from 'react';
import { PortfolioCardHeader } from './PortfolioCardHeader';
import { PortfolioCardDescription } from './PortfolioCardDescription';
import { PortfolioCardActions } from './PortfolioCardActions';
import type { PortfolioCompany } from '../../types/portfolio';

interface PortfolioCardOverlayProps extends Pick<PortfolioCompany, 'name' | 'description' | 'year' | 'website'> {
  onLearnMore: () => void;
}

export function PortfolioCardOverlay({ 
  name, 
  description, 
  website, 
  onLearnMore 
}: PortfolioCardOverlayProps) {
  return (
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
      <div className="absolute inset-0 p-6 text-white flex flex-col">
        <PortfolioCardHeader 
          name={name}
          website={website}
        />
        <PortfolioCardDescription description={description} />
        <div className="mt-auto">
          <PortfolioCardActions onLearnMore={onLearnMore} />
        </div>
      </div>
    </div>
  );
}
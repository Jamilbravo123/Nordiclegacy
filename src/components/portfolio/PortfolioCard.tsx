import React from 'react';
import type { PortfolioCompany } from '../../types/portfolio';
import { usePortfolioCard } from './usePortfolioCard';
import { PortfolioCardImage } from './PortfolioCardImage';
import { PortfolioCardOverlay } from './PortfolioCardOverlay';

export function PortfolioCard({ name, description, image, website, logo }: PortfolioCompany) {
  const { handleLearnMore } = usePortfolioCard({ website });

  return (
    <div className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-lg shadow-sm transition-all duration-300 hover:shadow-xl h-[300px] transform hover:-translate-y-1">
      <div className="relative h-full">
        <PortfolioCardImage 
          name={name}
          image={image}
          logo={logo}
        />
        <PortfolioCardOverlay
          name={name}
          description={description}
          website={website}
          onLearnMore={handleLearnMore}
        />
      </div>
    </div>
  );
}
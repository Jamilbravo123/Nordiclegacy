import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { PortfolioCardActions } from './PortfolioCardActions';
import type { PortfolioCompany } from '../../types/portfolio';

interface PortfolioCardContentProps extends Pick<PortfolioCompany, 'name' | 'description' | 'year' | 'website'> {
  onLearnMore: () => void;
}

export function PortfolioCardContent({ name, description, year, website, onLearnMore }: PortfolioCardContentProps) {
  return (
    <div className="absolute inset-0 bg-gray-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
      <div className="absolute inset-0 p-4 sm:p-6 text-white flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Acquired {year}</p>
          {website && (
            <a 
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white hover:text-gray-200 transition-colors"
              aria-label={`Visit ${name} website`}
            >
              <LinkIcon className="h-4 w-4" />
            </a>
          )}
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2">{name}</h3>
          <p className="text-gray-200 text-sm sm:text-base line-clamp-3">{description}</p>
          <PortfolioCardActions onLearnMore={onLearnMore} />
        </div>
      </div>
    </div>
  );
}
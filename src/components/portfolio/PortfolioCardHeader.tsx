import React from 'react';
import { Link as LinkIcon } from 'lucide-react';

interface PortfolioCardHeaderProps {
  name: string;
  website?: string;
}

export function PortfolioCardHeader({ name, website }: PortfolioCardHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
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
      <h3 className="text-lg sm:text-xl font-bold">{name}</h3>
    </div>
  );
}
import React from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';
import { PortfolioLogo } from './PortfolioLogo';

interface PortfolioCardImageProps {
  name: string;
  image: string;
  logo?: string;
}

export function PortfolioCardImage({ name, image, logo }: PortfolioCardImageProps) {
  return (
    <div className="relative w-full h-full">
      <OptimizedImage 
        src={image} 
        alt={name}
        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      {logo && (
        <div className="absolute inset-0 flex flex-col">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <PortfolioLogo logo={logo} companyName={name} />
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { getAssetPath } from '../../utils/assetUtils';

interface PortfolioLogoProps {
  logo: string;
  companyName: string;
}

export function PortfolioLogo({ logo, companyName }: PortfolioLogoProps) {
  const isSvg = logo.endsWith('.svg');

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 opacity-100 group-hover:opacity-0 transition-all duration-300 w-full px-6">
      <div className="bg-white/95 backdrop-blur-sm px-8 py-10 rounded-2xl shadow-lg flex items-center justify-center mx-auto max-w-[320px] min-h-[180px]">
        <img 
          src={getAssetPath(logo)}
          alt={`${companyName} logo`}
          className={`w-auto ${isSvg ? 'h-[120px]' : 'h-[80px]'} object-contain`}
        />
      </div>
    </div>
  );
}
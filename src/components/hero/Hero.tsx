import React from 'react';
import { ChevronDown } from 'lucide-react';
import { HeroContent } from './HeroContent';
import { HeroBackground } from './HeroBackground';
import { ScrollIndicator } from './ScrollIndicator';

export default function Hero() {
  return (
    <div className="relative h-[90vh] sm:h-screen">
      <HeroBackground />
      <HeroContent />
      <ScrollIndicator />
    </div>
  );
}
import React from 'react';
import { Button } from '../ui/Button';
import { HeroHeading } from './HeroHeading';
import { HeroDescription } from './HeroDescription';

export function HeroContent() {
  const handleExploreClick = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-center items-center text-white px-4 text-center">
      <HeroHeading />
      <HeroDescription />
      <Button 
        onClick={handleExploreClick}
        className="w-full sm:w-auto text-lg"
      >
        Explore Opportunities
      </Button>
    </div>
  );
}
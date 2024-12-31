import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface PortfolioCardActionsProps {
  onLearnMore: () => void;
}

export function PortfolioCardActions({ onLearnMore }: PortfolioCardActionsProps) {
  return (
    <Button 
      variant="secondary"
      onClick={onLearnMore}
      className="mt-3 sm:mt-4 flex items-center gap-2 bg-transparent hover:bg-white/10"
    >
      Learn more <ArrowRight className="h-4 w-4" />
    </Button>
  );
}
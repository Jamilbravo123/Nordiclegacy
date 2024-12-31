import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useMembership } from '../../../hooks/useMembership';

export function FeaturedOfferings() {
  const { getCurrentTier } = useMembership();
  const currentTier = getCurrentTier();

  if (!currentTier?.benefits) return null;

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        Featured Offerings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {currentTier.benefits.slice(0, 4).map((benefit, index) => (
          <div
            key={index}
            className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors"
          >
            <h3 className="font-medium text-white mb-2">{benefit}</h3>
            <Button
              variant="secondary"
              className="text-sm"
              onClick={() => window.location.href = '/dashboard/benefits'}
            >
              Learn More <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
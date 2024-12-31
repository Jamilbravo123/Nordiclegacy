import React from 'react';
import { Check } from 'lucide-react';
import type { MembershipTier } from '../../types/membership';

interface MembershipBenefitsProps {
  currentTier?: MembershipTier;
  nextTier?: MembershipTier;
}

export function MembershipBenefits({ currentTier, nextTier }: MembershipBenefitsProps) {
  if (!currentTier) return null;

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Your Benefits</h2>
      
      <div className="space-y-4">
        {currentTier.benefits.map((benefit, index) => (
          <div key={index} className="flex items-start">
            <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5" />
            <span className="text-gray-300">{benefit}</span>
          </div>
        ))}
      </div>

      {nextTier && (
        <div className="mt-8 pt-6 border-t border-gray-700">
          <h3 className="text-lg font-medium text-gray-400 mb-4">
            Next Tier Benefits ({nextTier.name})
          </h3>
          <div className="space-y-4">
            {nextTier.benefits.map((benefit, index) => (
              <div key={index} className="flex items-start opacity-50">
                <Check className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <span className="text-gray-400">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { Tag, Gift } from 'lucide-react';
import { Button } from '../../ui/Button';
import type { MembershipTier } from '../../../types/membership';
import { useBenefits } from '../../../hooks/useBenefits';

interface BenefitsListProps {
  currentTier?: MembershipTier;
}

export function BenefitsList({ currentTier }: BenefitsListProps) {
  const { redeemBenefit, loading } = useBenefits();

  if (!currentTier) return null;

  return (
    <div className="space-y-6">
      {currentTier.benefits.map((benefit, index) => (
        <div 
          key={index}
          className="bg-white/5 rounded-lg p-6 flex items-center justify-between group hover:bg-white/10 transition-colors"
        >
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors">
              <Gift className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-1">{benefit}</h3>
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-400">{currentTier.name} Benefit</span>
              </div>
            </div>
          </div>
          
          <Button
            onClick={() => redeemBenefit(benefit)}
            disabled={loading}
            variant="secondary"
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Redeem Now
          </Button>
        </div>
      ))}
    </div>
  );
}
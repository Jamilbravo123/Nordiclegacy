import React from 'react';
import { useMembership } from '../../../hooks/useMembership';
import { DashboardHeader } from '../DashboardHeader';
import { BenefitsList } from '../benefits/BenefitsList';
import { BenefitsHistory } from '../benefits/BenefitsHistory';
import { BackToDashboard } from '../ui/BackToDashboard';

export function Benefits() {
  const { getCurrentTier, loading } = useMembership();
  const currentTier = getCurrentTier();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DashboardHeader 
          title="Member Benefits" 
          description="View and redeem your exclusive benefits"
        />
        <BackToDashboard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BenefitsList currentTier={currentTier} />
        </div>
        <div>
          <BenefitsHistory />
        </div>
      </div>
    </div>
  );
}
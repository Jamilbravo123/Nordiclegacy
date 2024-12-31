import React from 'react';
import { DashboardHeader } from '../DashboardHeader';
import { PointsOverview } from '../points/PointsOverview';
import { PointsHistory } from '../points/PointsHistory';
import { EarningOpportunities } from '../points/EarningOpportunities';
import { usePoints } from '../../../hooks/usePoints';
import { BackToDashboard } from '../ui/BackToDashboard';

export function Points() {
  const { points, loading } = usePoints();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DashboardHeader 
          title="Points & Rewards" 
          description="Track your points and discover ways to earn more"
        />
        <BackToDashboard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <PointsOverview points={points} />
          <EarningOpportunities />
        </div>
        <div>
          <PointsHistory />
        </div>
      </div>
    </div>
  );
}
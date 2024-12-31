import React from 'react';
import { DashboardHeader } from '../DashboardHeader';
import { ReferralStats } from '../referral/ReferralStats';
import { ReferralForm } from '../referral/ReferralForm';
import { ReferralHistory } from '../referral/ReferralHistory';
import { BackToDashboard } from '../ui/BackToDashboard';
import { useReferrals } from '../../../hooks/useReferrals';

export function ReferFriends() {
  const { stats, loading } = useReferrals();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DashboardHeader 
          title="Refer Friends" 
          description="Invite friends and earn rewards together"
        />
        <BackToDashboard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ReferralStats stats={stats} />
          <ReferralForm />
        </div>
        <div>
          <ReferralHistory />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { WelcomeHeader } from '../overview/WelcomeHeader';
import { QuickActions } from '../overview/QuickActions';
import { MembershipProgress } from '../MembershipProgress';
import { FeaturedOfferings } from '../overview/FeaturedOfferings';
import { RecentActivity } from '../overview/RecentActivity';
import { Announcements } from '../overview/Announcements';
import { useMembership } from '../../../hooks/useMembership';

export function Overview() {
  const { 
    profile, 
    loading, 
    getCurrentTier, 
    getNextTier, 
    getPointsToNextTier 
  } = useMembership();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNext = getPointsToNextTier();

  return (
    <div className="space-y-6">
      <WelcomeHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MembershipProgress
            currentTier={currentTier}
            nextTier={nextTier}
            currentPoints={profile?.points || 0}
            pointsToNext={pointsToNext}
          />
          
          <div className="mt-6">
            <QuickActions />
          </div>
          
          <div className="mt-6">
            <FeaturedOfferings />
          </div>
        </div>
        
        <div className="space-y-6">
          <RecentActivity />
          <Announcements />
        </div>
      </div>
    </div>
  );
}
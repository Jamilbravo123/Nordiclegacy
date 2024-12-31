import React from 'react';
import { Container } from '../ui/Container';
import { MembershipProgress } from './MembershipProgress';
import { MembershipBenefits } from './MembershipBenefits';
import { useMembership } from '../../hooks/useMembership';

export default function MembershipDashboard() {
  const { 
    profile, 
    loading, 
    getCurrentTier, 
    getNextTier, 
    getPointsToNextTier 
  } = useMembership();

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNext = getPointsToNextTier();

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <Container>
        <h1 className="text-3xl font-bold text-white mb-8">Your Membership</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MembershipProgress
            currentTier={currentTier}
            nextTier={nextTier}
            currentPoints={profile?.points || 0}
            pointsToNext={pointsToNext}
          />
          
          <MembershipBenefits
            currentTier={currentTier}
            nextTier={nextTier}
          />
        </div>
      </Container>
    </div>
  );
}
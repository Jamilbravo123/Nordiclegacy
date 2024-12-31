import React from 'react';
import { useMembership } from '../../../../hooks/useMembership';

export function TierInformation() {
  const { profile, getCurrentTier, getNextTier, getPointsToNextTier } = useMembership();
  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const pointsToNext = getPointsToNextTier();

  return (
    <section>
      <h3 className="text-lg font-semibold text-white mb-4">Membership Tier</h3>
      <div className="bg-gray-700/50 rounded-lg p-4">
        <div className="mb-4">
          <p className="text-gray-300">Current Tier</p>
          <p className="text-xl font-semibold text-white">{currentTier?.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-300">Points</p>
          <p className="text-xl font-semibold text-white">{profile?.points || 0}</p>
        </div>
        {nextTier && pointsToNext && (
          <div>
            <p className="text-gray-300">Next Tier</p>
            <p className="text-white">
              {pointsToNext} points needed for {nextTier.name}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
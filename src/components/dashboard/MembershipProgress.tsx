import React from 'react';
import type { MembershipTier } from '../../types/membership';

interface MembershipProgressProps {
  currentTier?: MembershipTier;
  nextTier?: MembershipTier;
  currentPoints: number;
  pointsToNext: number | null;
}

export function MembershipProgress({
  currentTier,
  nextTier,
  currentPoints,
  pointsToNext
}: MembershipProgressProps) {
  if (!currentTier) return null;

  const progress = nextTier
    ? (currentPoints / nextTier.points_required) * 100
    : 100;

  // Define tier-specific gradients with more vibrant colors
  const getTierGradient = (tier: string) => {
    switch (tier.toUpperCase()) {
      case 'SILVER':
        return 'from-gray-300 via-gray-200 to-white';
      case 'GOLD':
        return 'from-yellow-500 via-amber-400 to-yellow-300';
      case 'PLATINUM':
        return 'from-purple-600 via-purple-400 to-purple-300';
      default:
        return 'from-gray-300 via-gray-200 to-white';
    }
  };

  const progressGradient = getTierGradient(currentTier.name);

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">
          {currentTier.name} Member
        </h2>
        <span className="text-gray-400">
          {currentPoints} points
        </span>
      </div>

      <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden mb-4">
        <div
          className={`absolute h-full bg-gradient-to-r ${progressGradient} transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      {nextTier && pointsToNext && (
        <p className="text-gray-400 text-sm">
          Earn {pointsToNext} more points to reach {nextTier.name}
        </p>
      )}
    </div>
  );
}
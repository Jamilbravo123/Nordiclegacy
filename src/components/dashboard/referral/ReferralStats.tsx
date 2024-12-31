import React from 'react';
import { Users, Gift, Award } from 'lucide-react';
import type { ReferralStats as ReferralStatsType } from '../../../types/referral';

interface ReferralStatsProps {
  stats: ReferralStatsType;
}

export function ReferralStats({ stats }: ReferralStatsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Your Referral Impact</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-800 rounded-lg">
            <Users className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.totalReferrals}</p>
            <p className="text-gray-400">Friends Referred</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-800 rounded-lg">
            <Gift className="h-6 w-6 text-green-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.pointsEarned}</p>
            <p className="text-gray-400">Points Earned</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gray-800 rounded-lg">
            <Award className="h-6 w-6 text-yellow-400" />
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{stats.successfulConversions}</p>
            <p className="text-gray-400">Successful Joins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
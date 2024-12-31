import React from 'react';
import { Clock, Award, Gift } from 'lucide-react';
import type { EngagementData } from '../types/analytics';

interface EngagementMetricsProps {
  data: EngagementData;
}

export function EngagementMetrics({ data }: EngagementMetricsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Engagement Metrics</h2>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-300">Session Duration</span>
          </div>
          <span className="text-white font-medium">{data.avgSessionTime}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-300">Points Earned</span>
          </div>
          <span className="text-white font-medium">{data.totalPointsEarned}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Gift className="h-5 w-5 text-gray-400 mr-3" />
            <span className="text-gray-300">Benefits Redeemed</span>
          </div>
          <span className="text-white font-medium">{data.benefitsRedeemed}</span>
        </div>
      </div>
    </div>
  );
}
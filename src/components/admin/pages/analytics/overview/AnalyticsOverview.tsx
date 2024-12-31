import React from 'react';
import { Users, TrendingUp, Award, Clock } from 'lucide-react';
import { StatCard } from './StatCard';
import type { AnalyticsData } from '../types/analytics';

interface AnalyticsOverviewProps {
  data: AnalyticsData;
}

export function AnalyticsOverview({ data }: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={Users}
        label="Total Members"
        value={data.totalMembers}
        trend={data.membersTrend}
        trendUp={data.membersTrend > 0}
      />
      <StatCard
        icon={TrendingUp}
        label="Active Users"
        value={data.activeUsers}
        trend={data.activeUsersTrend}
        trendUp={data.activeUsersTrend > 0}
      />
      <StatCard
        icon={Award}
        label="Tier Upgrades"
        value={data.tierUpgrades}
        trend={data.tierUpgradesTrend}
        trendUp={data.tierUpgradesTrend > 0}
      />
      <StatCard
        icon={Clock}
        label="Avg. Session"
        value={data.avgSessionTime}
        trend={data.sessionTimeTrend}
        trendUp={data.sessionTimeTrend > 0}
      />
    </div>
  );
}
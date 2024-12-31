import React from 'react';
import { Users, Award, Gift, TrendingUp } from 'lucide-react';
import { StatCard } from '../overview/StatCard';
import { RecentActivity } from '../overview/RecentActivity';
import { MembershipStats } from '../overview/MembershipStats';
import { useAdminAnalytics } from '../../../hooks/useAdminAnalytics';

export function AdminOverview() {
  const { data, loading } = useAdminAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center text-gray-400 py-12">
        No analytics data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Monitor and manage your membership program</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Members"
          value={data.totalMembers.toLocaleString()}
          trend={data.membersTrend}
          trendUp={data.membersTrend > 0}
        />
        <StatCard
          icon={TrendingUp}
          label="Active Users"
          value={data.activeUsers.toLocaleString()}
          trend={data.activeUsersTrend}
          trendUp={data.activeUsersTrend > 0}
        />
        <StatCard
          icon={Award}
          label="Tier Upgrades"
          value={data.tierUpgrades.toLocaleString()}
          trend={data.tierUpgradesTrend}
          trendUp={data.tierUpgradesTrend > 0}
        />
        <StatCard
          icon={Gift}
          label="Benefits Redeemed"
          value={data.engagement.benefitsRedeemed.toLocaleString()}
          trend={15}
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MembershipStats data={data.trends} />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
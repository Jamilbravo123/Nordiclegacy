import React from 'react';
import { AnalyticsHeader } from './AnalyticsHeader';
import { AnalyticsOverview } from './overview/AnalyticsOverview';
import { MembershipTrends } from './trends/MembershipTrends';
import { EngagementMetrics } from './engagement/EngagementMetrics';
import { useAnalytics } from './hooks/useAnalytics';

export function AnalyticsDashboard() {
  const { data, loading } = useAnalytics();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnalyticsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AnalyticsOverview data={data} />
          <div className="mt-6">
            <MembershipTrends data={data.trends} />
          </div>
        </div>
        <div>
          <EngagementMetrics data={data.engagement} />
        </div>
      </div>
    </div>
  );
}
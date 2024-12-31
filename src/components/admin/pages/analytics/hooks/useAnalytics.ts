import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase';
import type { AnalyticsData } from '../types/analytics';

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    totalMembers: 0,
    membersTrend: 0,
    activeUsers: 0,
    activeUsersTrend: 0,
    tierUpgrades: 0,
    tierUpgradesTrend: 0,
    avgSessionTime: '0m',
    sessionTimeTrend: 0,
    trends: [],
    engagement: {
      avgSessionTime: '0m',
      totalPointsEarned: 0,
      benefitsRedeemed: 0
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch analytics data from Supabase
      const { data: analyticsData, error } = await supabase
        .from('analytics')
        .select('*')
        .single();

      if (error) throw error;
      if (analyticsData) {
        setData(analyticsData);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    refetch: fetchAnalytics,
  };
}
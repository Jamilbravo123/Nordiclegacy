import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { AnalyticsData } from '../types/analytics';

export function useAdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);

      // Fetch member statistics
      const { count: totalMembers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      const { count: activeUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .eq('status', 'active');

      // Fetch tier upgrades in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { count: tierUpgrades } = await supabase
        .from('member_profiles')
        .select('*', { count: 'exact' })
        .gt('updated_at', thirtyDaysAgo.toISOString())
        .neq('current_tier', 'SILVER');

      // Fetch membership trends
      const { data: membershipData } = await supabase
        .from('member_profiles')
        .select('current_tier, created_at')
        .order('created_at', { ascending: true });

      // Process trends data
      const trends = processMonthlyTrends(membershipData || []);

      // Fetch engagement metrics
      const { data: benefitsData } = await supabase
        .from('benefit_redemptions')
        .select('*')
        .gte('redeemed_at', thirtyDaysAgo.toISOString());

      const analyticsData: AnalyticsData = {
        totalMembers: totalMembers || 0,
        membersTrend: calculateTrend(totalMembers || 0),
        activeUsers: activeUsers || 0,
        activeUsersTrend: calculateTrend(activeUsers || 0),
        tierUpgrades: tierUpgrades || 0,
        tierUpgradesTrend: calculateTrend(tierUpgrades || 0),
        avgSessionTime: '25m', // This would need session tracking implementation
        sessionTimeTrend: 0,
        trends,
        engagement: {
          avgSessionTime: '25m',
          totalPointsEarned: calculateTotalPoints(membershipData || []),
          benefitsRedeemed: (benefitsData || []).length
        }
      };

      setData(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    refetch: fetchAnalytics
  };
}

function processMonthlyTrends(membershipData: any[]): { date: string; silver: number; gold: number; platinum: number; }[] {
  const months = getLastSixMonths();
  const trends = months.map(month => ({
    date: month,
    silver: 0,
    gold: 0,
    platinum: 0
  }));

  membershipData.forEach(member => {
    const memberMonth = new Date(member.created_at).toLocaleString('default', { month: 'short' });
    const monthIndex = trends.findIndex(t => t.date === memberMonth);
    if (monthIndex !== -1) {
      const tier = member.current_tier.toLowerCase();
      if (trends[monthIndex][tier] !== undefined) {
        trends[monthIndex][tier]++;
      }
    }
  });

  return trends;
}

function getLastSixMonths(): string[] {
  const months = [];
  const currentDate = new Date();
  
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(currentDate.getMonth() - i);
    months.push(date.toLocaleString('default', { month: 'short' }));
  }
  
  return months;
}

function calculateTrend(currentValue: number): number {
  // This is a simplified trend calculation
  // In a real application, you would compare with historical data
  return Math.round((currentValue * 0.1) * 100) / 100;
}

function calculateTotalPoints(membershipData: any[]): number {
  return membershipData.reduce((total, member) => {
    const points = member.points || 0;
    return total + points;
  }, 0);
}
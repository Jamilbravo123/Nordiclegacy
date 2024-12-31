export interface AnalyticsData {
  totalMembers: number;
  membersTrend: number;
  activeUsers: number;
  activeUsersTrend: number;
  tierUpgrades: number;
  tierUpgradesTrend: number;
  avgSessionTime: string;
  sessionTimeTrend: number;
  trends: TrendData[];
  engagement: EngagementData;
}

export interface TrendData {
  date: string;
  silver: number;
  gold: number;
  platinum: number;
}

export interface EngagementData {
  avgSessionTime: string;
  totalPointsEarned: number;
  benefitsRedeemed: number;
}
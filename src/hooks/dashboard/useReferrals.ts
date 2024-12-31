import { useState, useEffect } from 'react';
import { useAuthContext } from '../../components/auth/AuthProvider';
import { getReferralStats } from '../../services/api/referrals';
import type { ReferralStats } from '../../types/referral';

export function useReferrals() {
  const { user } = useAuthContext();
  const [stats, setStats] = useState<ReferralStats>({
    totalReferrals: 0,
    pointsEarned: 0,
    successfulConversions: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const data = await getReferralStats(user.id);
        setStats({
          totalReferrals: data.total_referrals,
          pointsEarned: data.points_earned,
          successfulConversions: data.successful_conversions
        });
      } catch (error) {
        console.error('Error fetching referral stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return { stats, loading };
}
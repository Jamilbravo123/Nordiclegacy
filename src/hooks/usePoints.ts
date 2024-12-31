import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../components/auth/AuthProvider';

interface PointsHistory {
  id: string;
  points: number;
  description: string;
  created_at: string;
}

export function usePoints() {
  const { user } = useAuthContext();
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState<PointsHistory[]>([]);
  const [expiringPoints, setExpiringPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchPointsData = async () => {
      try {
        // Fetch current points
        const { data: profileData, error: profileError } = await supabase
          .from('member_profiles')
          .select('points')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;
        setPoints(profileData?.points || 0);

        // Fetch points history
        const { data: historyData, error: historyError } = await supabase
          .from('points_history')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (historyError) throw historyError;
        setHistory(historyData || []);

        // Calculate expiring points (points older than 11 months)
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() - 11);
        
        const expiringPointsTotal = (historyData || [])
          .filter(item => new Date(item.created_at) <= expirationDate)
          .reduce((sum, item) => sum + item.points, 0);

        setExpiringPoints(expiringPointsTotal);
      } catch (error) {
        console.error('Error fetching points data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPointsData();
  }, [user]);

  return {
    points,
    history,
    expiringPoints,
    loading
  };
}
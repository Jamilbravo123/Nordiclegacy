import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { ReferralHistory } from '../types/referral';
import { useAuthContext } from '../components/auth/AuthProvider';

export function useReferralHistory() {
  const { user } = useAuthContext();
  const [history, setHistory] = useState<ReferralHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (error) {
        console.error('Error fetching referral history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  return { history, loading };
}
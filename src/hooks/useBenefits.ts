import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthContext } from '../components/auth/AuthProvider';

interface BenefitHistory {
  id: string;
  benefit: string;
  redeemed_at: string;
}

export function useBenefits() {
  const { user } = useAuthContext();
  const [history, setHistory] = useState<BenefitHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('benefit_redemptions')
          .select('*')
          .eq('user_id', user.id)
          .order('redeemed_at', { ascending: false });

        if (error) throw error;
        setHistory(data || []);
      } catch (error) {
        console.error('Error fetching benefit history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user]);

  const redeemBenefit = async (benefit: string) => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('benefit_redemptions')
        .insert([
          {
            user_id: user.id,
            benefit,
            redeemed_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      // Refresh history after redemption
      const { data, error: fetchError } = await supabase
        .from('benefit_redemptions')
        .select('*')
        .eq('user_id', user.id)
        .order('redeemed_at', { ascending: false });

      if (fetchError) throw fetchError;
      setHistory(data || []);
    } catch (error) {
      console.error('Error redeeming benefit:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    history,
    loading,
    redeemBenefit,
  };
}
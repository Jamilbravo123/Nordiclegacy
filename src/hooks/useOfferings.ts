import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Offering } from '../types/offerings';

export function useOfferings() {
  const [offerings, setOfferings] = useState<Offering[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOfferings();
  }, []);

  const fetchOfferings = async () => {
    try {
      const { data, error } = await supabase
        .from('offerings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOfferings(data || []);
    } catch (error) {
      console.error('Error fetching offerings:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    offerings,
    loading,
    refetch: fetchOfferings,
  };
}
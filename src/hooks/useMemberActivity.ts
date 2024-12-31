import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ActivityItem {
  id: string;
  description: string;
  created_at: string;
}

export function useMemberActivity(memberId: string) {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivity();
  }, [memberId]);

  const fetchActivity = async () => {
    try {
      const { data, error } = await supabase
        .from('member_activity')
        .select('*')
        .eq('member_id', memberId)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivity(data || []);
    } catch (error) {
      console.error('Error fetching member activity:', error);
    } finally {
      setLoading(false);
    }
  };

  return { activity, loading };
}
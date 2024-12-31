import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { RecentActivity } from '../types/activity';

export function useRecentActivity() {
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial activities
    fetchActivities();

    // Subscribe to real-time updates
    const channel = supabase.channel('public:member_activity')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'member_activity'
        },
        (payload) => {
          console.log('New activity:', payload);
          if (payload.eventType === 'INSERT') {
            setActivities(current => [payload.new as RecentActivity, ...current].slice(0, 5));
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase
        .from('member_activity')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;
      setActivities(data || []);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return { activities, loading, refetch: fetchActivities };
}
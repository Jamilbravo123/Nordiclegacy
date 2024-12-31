import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { MembershipTier, MemberProfile } from '../types/membership';
import { useAuthContext } from '../components/auth/AuthProvider';

export function useMembership() {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [tiers, setTiers] = useState<MembershipTier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchMembershipData = async () => {
      try {
        // Fetch member profile
        const { data: profileData, error: profileError } = await supabase
          .from('member_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        // If no profile exists, create one with default values
        if (!profileData) {
          const { data: newProfile, error: createError } = await supabase
            .from('member_profiles')
            .insert([
              { id: user.id, current_tier: 'SILVER', points: 0 }
            ])
            .select()
            .single();

          if (createError) throw createError;
          setProfile(newProfile);
        } else {
          setProfile(profileData);
        }

        // Fetch all tiers
        const { data: tiersData, error: tiersError } = await supabase
          .from('membership_tiers')
          .select('*')
          .order('points_required', { ascending: true });

        if (tiersError) throw tiersError;
        setTiers(tiersData || []);
      } catch (error) {
        console.error('Error fetching membership data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, [user]);

  const getCurrentTier = () => {
    if (!profile || !tiers.length) return null;
    return tiers.find(tier => tier.name === profile.current_tier) || tiers[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    if (!currentTier || !tiers.length) return null;
    const currentIndex = tiers.findIndex(tier => tier.name === currentTier.name);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const getPointsToNextTier = () => {
    const nextTier = getNextTier();
    if (!nextTier || !profile) return null;
    return Math.max(0, nextTier.points_required - (profile.points || 0));
  };

  return {
    profile,
    tiers,
    loading,
    getCurrentTier,
    getNextTier,
    getPointsToNextTier
  };
}
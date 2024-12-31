import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Member, MemberFilters } from '../types/members';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<MemberFilters>({
    search: '',
    tier: '',
    status: '',
    sortBy: 'joined'
  });

  useEffect(() => {
    fetchMembers();
  }, [filters]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      
      // Use the new get_all_members function
      const { data, error } = await supabase
        .rpc('get_all_members');

      if (error) throw error;

      // Apply filters
      let filteredMembers = data || [];

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredMembers = filteredMembers.filter(member => 
          member.email?.toLowerCase().includes(searchTerm) ||
          member.full_name?.toLowerCase().includes(searchTerm)
        );
      }

      if (filters.status) {
        filteredMembers = filteredMembers.filter(member => 
          member.status === filters.status
        );
      }

      if (filters.tier) {
        filteredMembers = filteredMembers.filter(member => 
          member.current_tier === filters.tier
        );
      }

      // Apply sorting
      filteredMembers.sort((a, b) => {
        switch (filters.sortBy) {
          case 'points':
            return (b.points || 0) - (a.points || 0);
          case 'activity':
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
          default: // 'joined'
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
      });

      setMembers(filteredMembers);
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    members,
    loading,
    filters,
    setFilters,
    refetch: fetchMembers
  };
}
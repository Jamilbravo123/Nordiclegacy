import { useState, useEffect } from 'react';
import { supabase } from '../../../../../lib/supabase';
import type { Role, Permission } from '../types/access';

export function useAccess() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAccessData();
  }, []);

  const fetchAccessData = async () => {
    try {
      // Fetch roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('roles')
        .select('*');

      if (rolesError) throw rolesError;
      setRoles(rolesData || []);

      // Fetch permissions
      const { data: permissionsData, error: permissionsError } = await supabase
        .from('permissions')
        .select('*');

      if (permissionsError) throw permissionsError;
      setPermissions(permissionsData || []);
    } catch (error) {
      console.error('Error fetching access data:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    permissions,
    loading,
    refetch: fetchAccessData,
  };
}
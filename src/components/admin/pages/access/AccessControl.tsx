import React from 'react';
import { AccessHeader } from './AccessHeader';
import { RolesList } from './roles/RolesList';
import { PermissionsList } from './permissions/PermissionsList';
import { useAccess } from './hooks/useAccess';

export function AccessControl() {
  const { roles, permissions, loading } = useAccess();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AccessHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RolesList roles={roles} />
        <PermissionsList permissions={permissions} />
      </div>
    </div>
  );
}
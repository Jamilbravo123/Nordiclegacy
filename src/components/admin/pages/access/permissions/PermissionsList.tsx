import React from 'react';
import { PermissionCard } from './PermissionCard';
import type { Permission } from '../types/access';

interface PermissionsListProps {
  permissions: Permission[];
}

export function PermissionsList({ permissions }: PermissionsListProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Permissions</h2>
      <div className="space-y-4">
        {permissions.map((permission) => (
          <PermissionCard key={permission.id} permission={permission} />
        ))}
      </div>
    </div>
  );
}
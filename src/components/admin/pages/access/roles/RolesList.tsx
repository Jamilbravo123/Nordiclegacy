import React from 'react';
import { RoleCard } from './RoleCard';
import type { Role } from '../types/access';

interface RolesListProps {
  roles: Role[];
}

export function RolesList({ roles }: RolesListProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Roles</h2>
      <div className="space-y-4">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} />
        ))}
      </div>
    </div>
  );
}
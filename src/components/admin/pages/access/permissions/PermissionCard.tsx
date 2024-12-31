import React from 'react';
import { Lock, Edit2 } from 'lucide-react';
import type { Permission } from '../types/access';

interface PermissionCardProps {
  permission: Permission;
}

export function PermissionCard({ permission }: PermissionCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            <Lock className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">{permission.name}</h3>
            <p className="text-sm text-gray-400">{permission.description}</p>
          </div>
        </div>
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Edit2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
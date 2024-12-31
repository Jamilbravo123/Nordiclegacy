import React from 'react';
import { Shield, Users, Edit2, Trash2 } from 'lucide-react';
import type { Role } from '../types/access';

interface RoleCardProps {
  role: Role;
}

export function RoleCard({ role }: RoleCardProps) {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-1">{role.name}</h3>
            <p className="text-sm text-gray-400 mb-2">{role.description}</p>
            <div className="flex items-center text-sm text-gray-400">
              <Users className="h-4 w-4 mr-1" />
              {role.userCount} users
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <Edit2 className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
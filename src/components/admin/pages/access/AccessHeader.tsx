import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../../ui/Button';

export function AccessHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Access Control</h1>
        <p className="text-gray-400">Manage user roles and permissions</p>
      </div>
      <Button className="flex items-center gap-2">
        <Plus className="h-5 w-5" />
        New Role
      </Button>
    </div>
  );
}
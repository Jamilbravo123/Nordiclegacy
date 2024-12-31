import React from 'react';
import { Save } from 'lucide-react';
import { Button } from '../../../ui/Button';

export function SettingsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure system-wide settings and preferences</p>
      </div>
      <Button className="flex items-center gap-2">
        <Save className="h-5 w-5" />
        Save Changes
      </Button>
    </div>
  );
}
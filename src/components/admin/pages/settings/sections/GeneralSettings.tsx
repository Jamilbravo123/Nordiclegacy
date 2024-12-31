import React from 'react';
import { Button } from '../../../../ui/Button';
import type { AdminSettings } from '../types/settings';

interface GeneralSettingsProps {
  settings: AdminSettings;
  onUpdate: (updates: Partial<AdminSettings>) => Promise<void>;
}

export function GeneralSettings({ settings, onUpdate }: GeneralSettingsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">General Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            System Name
          </label>
          <input
            type="text"
            value={settings.systemName}
            onChange={(e) => onUpdate({ systemName: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Support Email
          </label>
          <input
            type="email"
            value={settings.supportEmail}
            onChange={(e) => onUpdate({ supportEmail: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={(e) => onUpdate({ maintenanceMode: e.target.checked })}
              className="rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-gray-300">Maintenance Mode</span>
          </label>
        </div>
      </div>
    </div>
  );
}
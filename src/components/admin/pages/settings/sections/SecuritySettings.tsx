import React from 'react';
import type { AdminSettings } from '../types/settings';

interface SecuritySettingsProps {
  settings: AdminSettings;
  onUpdate: (updates: Partial<AdminSettings>) => Promise<void>;
}

export function SecuritySettings({ settings, onUpdate }: SecuritySettingsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.twoFactorRequired}
              onChange={(e) => onUpdate({ twoFactorRequired: e.target.checked })}
              className="rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-gray-300">Require Two-Factor Authentication</span>
          </label>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={settings.strongPasswordPolicy}
              onChange={(e) => onUpdate({ strongPasswordPolicy: e.target.checked })}
              className="rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
            />
            <span className="text-gray-300">Enforce Strong Password Policy</span>
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            value={settings.sessionTimeout}
            onChange={(e) => onUpdate({ sessionTimeout: parseInt(e.target.value) })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import type { AdminSettings } from '../types/settings';

interface IntegrationSettingsProps {
  settings: AdminSettings;
  onUpdate: (updates: Partial<AdminSettings>) => Promise<void>;
}

export function IntegrationSettings({ settings, onUpdate }: IntegrationSettingsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Integration Settings</h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            API Key
          </label>
          <input
            type="text"
            value={settings.apiKey}
            readOnly
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Webhook URL
          </label>
          <input
            type="url"
            value={settings.webhookUrl}
            onChange={(e) => onUpdate({ webhookUrl: e.target.value })}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
          />
        </div>
      </div>
    </div>
  );
}
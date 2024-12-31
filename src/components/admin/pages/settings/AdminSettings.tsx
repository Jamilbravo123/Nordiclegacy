import React from 'react';
import { SettingsHeader } from './SettingsHeader';
import { GeneralSettings } from './sections/GeneralSettings';
import { SecuritySettings } from './sections/SecuritySettings';
import { IntegrationSettings } from './sections/IntegrationSettings';
import { useSettings } from './hooks/useSettings';

export function AdminSettings() {
  const { settings, loading, updateSettings } = useSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SettingsHeader />
      <div className="grid grid-cols-1 gap-6">
        <GeneralSettings settings={settings} onUpdate={updateSettings} />
        <SecuritySettings settings={settings} onUpdate={updateSettings} />
        <IntegrationSettings settings={settings} onUpdate={updateSettings} />
      </div>
    </div>
  );
}
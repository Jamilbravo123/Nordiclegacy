import React from 'react';
import { X } from 'lucide-react';
import { useMembershipSettings } from '../../../hooks/useMembershipSettings';
import { SettingsSection } from './SettingsSection';
import { AccountSettings } from './sections/AccountSettings';
import { TierInformation } from './sections/TierInformation';
import { NotificationSettings } from './sections/NotificationSettings';
import { PrivacySettings } from './sections/PrivacySettings';

export function MembershipSettingsPanel() {
  const { isOpen, closeSettings } = useMembershipSettings();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
      <div className="absolute right-0 h-full w-full max-w-2xl bg-gray-800 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Membership Settings</h2>
          <button
            onClick={closeSettings}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-8">
          <SettingsSection title="Account">
            <AccountSettings />
          </SettingsSection>
          
          <SettingsSection title="Membership">
            <TierInformation />
          </SettingsSection>
          
          <SettingsSection title="Notifications">
            <NotificationSettings />
          </SettingsSection>
          
          <SettingsSection title="Privacy">
            <PrivacySettings />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
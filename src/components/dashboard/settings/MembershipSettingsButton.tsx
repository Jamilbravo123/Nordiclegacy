import React from 'react';
import { Settings } from 'lucide-react';
import { useMembershipSettings } from '../../../hooks/useMembershipSettings';

export function MembershipSettingsButton() {
  const { openSettings } = useMembershipSettings();

  return (
    <button
      onClick={openSettings}
      className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
      aria-label="Membership Settings"
    >
      <Settings className="h-5 w-5 text-white" />
      <span className="sr-only">Settings</span>
    </button>
  );
}
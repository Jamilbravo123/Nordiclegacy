import React from 'react';
import { Crown } from 'lucide-react';
import { useProfile } from '../../../hooks/useProfile';
import { useMembershipSettings } from '../../../hooks/useMembershipSettings';

export function WelcomeHeader() {
  const { profile } = useProfile();
  const { openSettings } = useMembershipSettings();

  return (
    <div className="bg-white/5 rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}
            </h1>
            <p className="text-gray-400">
              Here's an overview of your membership status and benefits
            </p>
          </div>
        </div>
        <button
          onClick={openSettings}
          className="p-3 bg-gray-800 rounded-full hover:bg-gray-700 hover:scale-105 transition-all duration-200 ease-in-out"
          aria-label="Open membership settings"
        >
          <Crown className="h-6 w-6 text-white" />
        </button>
      </div>
    </div>
  );
}
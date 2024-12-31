import React from 'react';
import { DashboardHeader } from '../DashboardHeader';
import { ProfileForm } from '../profile/ProfileForm';
import { ProfilePreferences } from '../profile/ProfilePreferences';
import { useProfile } from '../../../hooks/useProfile';
import { BackToDashboard } from '../ui/BackToDashboard';

export function Profile() {
  const { profile, loading, updateProfile } = useProfile();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <DashboardHeader 
          title="Profile Settings" 
          description="Manage your account preferences and personal information"
        />
        <BackToDashboard />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ProfileForm profile={profile} onUpdate={updateProfile} />
        </div>
        <div>
          <ProfilePreferences />
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Settings, Crown } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useAuthContext } from '../../auth/AuthProvider';

interface AdminHeaderProps {
  onSettingsClick: () => void;
}

export function AdminHeader({ onSettingsClick }: AdminHeaderProps) {
  const { signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const handleBackToDashboard = () => {
    navigate('/admin/dashboard');
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            title="Back to Admin Dashboard"
          >
            <Crown className="h-6 w-6" />
            <h2 className="font-semibold">Admin Dashboard</h2>
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            onClick={onSettingsClick}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span className="sr-only">Settings</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleSignOut}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
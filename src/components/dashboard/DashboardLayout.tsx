import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGrid, Gift, Award, User, Users } from 'lucide-react';
import { DashboardNav } from './DashboardNav';
import { useAuthContext } from '../auth/AuthProvider';
import { useMembershipSettings } from '../../hooks/useMembershipSettings';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { signOut } = useAuthContext();
  const { isOpen, closeSettings } = useMembershipSettings();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navItems = [
    { icon: LayoutGrid, label: 'Overview', path: '/dashboard/overview' },
    { icon: Gift, label: 'Benefits', path: '/dashboard/benefits' },
    { icon: Award, label: 'Points', path: '/dashboard/points' },
    { icon: Users, label: 'Refer Friends', path: '/dashboard/referral' },
    { icon: User, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <DashboardNav 
        items={navItems} 
        onSignOut={handleSignOut}
        isOpen={isOpen}
        onClose={closeSettings}
      />
      
      <main className="p-4 sm:p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
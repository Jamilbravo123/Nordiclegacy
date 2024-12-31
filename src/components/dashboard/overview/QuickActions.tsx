import React from 'react';
import { Gift, Users, Star, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../ui/Button';

export function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    { icon: Gift, label: 'Benefits', path: '/dashboard/benefits' },
    { icon: Users, label: 'Refer Friends', path: '/dashboard/referral' },
    { icon: Star, label: 'Points', path: '/dashboard/points' },
    { icon: Calendar, label: 'Profile', path: '/dashboard/profile' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
      {actions.map(({ icon: Icon, label, path }) => (
        <Button
          key={path}
          variant="secondary"
          className="flex flex-col items-center justify-center p-4 sm:p-6 h-auto"
          onClick={() => navigate(path)}
        >
          <Icon className="h-6 w-6 mb-2" />
          <span className="text-sm">{label}</span>
        </Button>
      ))}
    </div>
  );
}
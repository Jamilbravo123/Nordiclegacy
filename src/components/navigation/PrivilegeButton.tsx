import React from 'react';
import { Crown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';

export function PrivilegeButton() {
  const { user } = useAuthContext();
  
  return (
    <Link
      to={user ? "/dashboard" : "/privilege"}
      className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-4 py-2"
    >
      <Crown className="h-4 w-4" />
      <span>NL Privilege</span>
    </Link>
  );
}
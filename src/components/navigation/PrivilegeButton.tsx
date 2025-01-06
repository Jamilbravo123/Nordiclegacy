import React, { useState } from 'react';
import { Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../auth/AuthProvider';

export function PrivilegeButton() {
  const { user } = useAuthContext();
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  
  const handleClick = (e: React.MouseEvent) => {
    if (e.shiftKey) {
      // If Shift key is pressed, navigate to the privilege page
      navigate(user ? "/dashboard" : "/privilege");
    } else {
      // Otherwise show the coming soon tooltip
      e.preventDefault();
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2000);
    }
  };
  
  return (
    <div className="relative">
      <Link
        to={user ? "/dashboard" : "/privilege"}
        onClick={handleClick}
        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors px-4 py-2"
      >
        <Crown className="h-4 w-4" />
        <span>NL Privilege</span>
      </Link>
      {showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black text-white text-sm rounded-md shadow-lg">
          Coming Soon
        </div>
      )}
    </div>
  );
}
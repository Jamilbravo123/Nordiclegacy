import React from 'react';
import { NavLink } from 'react-router-dom';
import { LogOut, X, Settings, LucideIcon } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface DashboardNavProps {
  items: NavItem[];
  onSignOut: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export function DashboardNav({ items, onSignOut, isOpen, onClose }: DashboardNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
      <nav className="h-full max-w-[280px] w-full bg-gray-800 p-4 sm:p-6">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-lg sm:text-xl font-bold text-white">Menu</h1>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            {items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-700">
            <Button
              variant="secondary"
              onClick={onSignOut}
              className="w-full justify-center bg-transparent hover:bg-white/10"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
}
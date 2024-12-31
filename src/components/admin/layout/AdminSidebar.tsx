import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, LayoutGrid, Users, Gift, Bell, BarChart2, Settings, Shield } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { icon: LayoutGrid, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: Users, label: 'Members', path: '/admin/members' },
  { icon: Gift, label: 'Offerings', path: '/admin/offerings' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: BarChart2, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
  { icon: Shield, label: 'Access Control', path: '/admin/access' },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <nav className="absolute left-0 h-full w-64 bg-gray-800 p-6 shadow-xl transform transition-transform duration-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white">Navigation</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
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
      </nav>
    </div>
  );
}
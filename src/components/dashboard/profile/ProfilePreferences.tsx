import React from 'react';
import { Bell, Mail, Shield } from 'lucide-react';

const preferences = [
  {
    icon: Bell,
    title: 'Notifications',
    options: [
      { label: 'Points Updates', checked: true },
      { label: 'New Benefits', checked: true },
      { label: 'Tier Changes', checked: true }
    ]
  },
  {
    icon: Mail,
    title: 'Email Preferences',
    options: [
      { label: 'Monthly Newsletter', checked: true },
      { label: 'Special Offers', checked: false },
      { label: 'Event Invitations', checked: true }
    ]
  },
  {
    icon: Shield,
    title: 'Privacy Settings',
    options: [
      { label: 'Profile Visibility', checked: false },
      { label: 'Activity Sharing', checked: false }
    ]
  }
];

export function ProfilePreferences() {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Preferences</h2>
      
      <div className="space-y-8">
        {preferences.map((section, index) => (
          <div key={index}>
            <div className="flex items-center space-x-3 mb-4">
              <section.icon className="h-5 w-5 text-gray-400" />
              <h3 className="text-lg font-medium text-white">{section.title}</h3>
            </div>
            
            <div className="space-y-3">
              {section.options.map((option, optionIndex) => (
                <label 
                  key={optionIndex}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  <input 
                    type="checkbox" 
                    defaultChecked={option.checked}
                    className="rounded border-gray-700 bg-gray-800 text-purple-500 focus:ring-purple-500"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
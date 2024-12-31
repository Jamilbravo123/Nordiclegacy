import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
  {
    type: 'signup',
    description: 'New member joined',
    time: '5 minutes ago',
  },
  {
    type: 'upgrade',
    description: 'Member upgraded to Gold',
    time: '15 minutes ago',
  },
  {
    type: 'benefit',
    description: 'Benefit redeemed',
    time: '1 hour ago',
  },
  {
    type: 'points',
    description: 'Points awarded',
    time: '2 hours ago',
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
            <div>
              <p className="text-white">{activity.description}</p>
              <p className="text-sm text-gray-400">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
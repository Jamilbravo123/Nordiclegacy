import React from 'react';
import { Bell } from 'lucide-react';

const announcements = [
  {
    title: 'New Benefits Added',
    message: 'Check out our latest exclusive benefits for members.',
    type: 'new'
  },
  {
    title: 'Upcoming Member Event',
    message: 'Join us for an exclusive networking event next month.',
    type: 'event'
  }
];

export function Announcements() {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-4">
        What's New
      </h2>
      <div className="space-y-4">
        {announcements.map((announcement, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 bg-gray-800/50 rounded-lg p-4"
          >
            <Bell className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-white mb-1">
                {announcement.title}
              </h3>
              <p className="text-sm text-gray-400">
                {announcement.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
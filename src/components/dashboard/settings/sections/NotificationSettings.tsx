import React from 'react';

export function NotificationSettings() {
  return (
    <section>
      <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-300">Points Updates</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-300">New Benefits</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            defaultChecked
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-300">Tier Changes</span>
        </label>
      </div>
    </section>
  );
}
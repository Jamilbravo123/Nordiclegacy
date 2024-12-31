import React from 'react';

export function PrivacySettings() {
  return (
    <section>
      <h3 className="text-lg font-semibold text-white mb-4">Privacy</h3>
      <div className="space-y-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-300">Profile Visibility</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-300">Activity Sharing</span>
        </label>
      </div>
    </section>
  );
}
import React from 'react';
import { Clock } from 'lucide-react';
import { useMemberActivity } from '../../../../../hooks/useMemberActivity';
import { formatDate } from '../../../../../utils/dateUtils';

interface ActivityHistoryProps {
  memberId: string;
}

export function ActivityHistory({ memberId }: ActivityHistoryProps) {
  const { activity, loading } = useMemberActivity(memberId);

  if (loading) {
    return <div className="text-gray-400">Loading activity...</div>;
  }

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      {activity.length === 0 ? (
        <p className="text-gray-400">No recent activity</p>
      ) : (
        <div className="space-y-4">
          {activity.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-white">{item.description}</p>
                <p className="text-sm text-gray-400">{formatDate(item.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
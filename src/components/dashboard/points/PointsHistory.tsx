import React from 'react';
import { usePoints } from '../../../hooks/usePoints';
import { formatDate } from '../../../utils/dateUtils';

export function PointsHistory() {
  const { history, loading } = usePoints();

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Points History</h2>
      
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-gray-400">No points activity yet</div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div 
              key={index}
              className="border-l-2 border-gray-700 pl-4 py-2"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-white font-medium">{item.description}</p>
                <span className={`font-medium ${
                  item.points > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {item.points > 0 ? '+' : ''}{item.points}
                </span>
              </div>
              <p className="text-sm text-gray-400">
                {formatDate(item.created_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
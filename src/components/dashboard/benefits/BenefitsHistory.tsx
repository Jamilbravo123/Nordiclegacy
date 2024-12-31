import React from 'react';
import { useBenefits } from '../../../hooks/useBenefits';
import { formatDate } from '../../../utils/dateUtils';

export function BenefitsHistory() {
  const { history, loading } = useBenefits();

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
      
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-gray-400">No benefits redeemed yet</div>
      ) : (
        <div className="space-y-4">
          {history.map((item, index) => (
            <div 
              key={index}
              className="border-l-2 border-gray-700 pl-4 py-2"
            >
              <p className="text-white font-medium">{item.benefit}</p>
              <p className="text-sm text-gray-400">
                {formatDate(item.redeemed_at)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
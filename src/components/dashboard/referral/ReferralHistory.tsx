import React from 'react';
import { Clock } from 'lucide-react';
import { useReferralHistory } from '../../../hooks/useReferralHistory';
import { formatDate } from '../../../utils/dateUtils';

export function ReferralHistory() {
  const { history, loading } = useReferralHistory();

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Recent Referrals</h2>
      
      {loading ? (
        <div className="text-gray-400">Loading...</div>
      ) : history.length === 0 ? (
        <div className="text-gray-400">No referrals yet</div>
      ) : (
        <div className="space-y-4">
          {history.map((referral, index) => (
            <div 
              key={index}
              className="border-l-2 border-gray-700 pl-4 py-2"
            >
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-white">{referral.email}</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(referral.created_at)}
                  </p>
                  <p className={`text-sm ${
                    referral.status === 'joined' 
                      ? 'text-green-400' 
                      : 'text-gray-400'
                  }`}>
                    {referral.status === 'joined' ? 'Joined' : 'Pending'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
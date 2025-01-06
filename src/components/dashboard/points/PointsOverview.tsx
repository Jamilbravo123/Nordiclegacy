import React from 'react';
import { AlertTriangle, TrendingUp } from 'lucide-react';
import { usePoints } from '../../../hooks/usePoints';
import { Button } from '../../ui/Button';
import { useNavigate } from 'react-router-dom';

interface PointsOverviewProps {
  points: number;
}

export function PointsOverview({ points }: PointsOverviewProps) {
  const { expiringPoints, expiringDate } = usePoints();
  const navigate = useNavigate();

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium text-gray-400 mb-2">Available Points</h3>
          <p className="text-4xl font-bold text-white">{points}</p>
        </div>
        
        {expiringPoints > 0 && (
          <div className="bg-yellow-500/10 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-yellow-500 font-medium">
                  {expiringPoints} points expiring soon
                </p>
                <p className="text-sm text-gray-400 mb-2">
                  Use them before {new Date(expiringDate).toLocaleDateString()}
                </p>
                <Button
                  variant="secondary"
                  className="text-sm py-1 px-3"
                  onClick={() => navigate('/dashboard/benefits')}
                >
                  Use Points Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center space-x-2 text-green-400">
          <TrendingUp className="h-5 w-5" />
          <span>Points earned this month: {points}</span>
        </div>
      </div>
    </div>
  );
}
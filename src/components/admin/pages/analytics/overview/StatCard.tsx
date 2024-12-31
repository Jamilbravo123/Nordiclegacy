import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  trend: number;
  trendUp: boolean;
}

export function StatCard({ icon: Icon, label, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-gray-800 rounded-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className={`flex items-center ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
          {trendUp ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          <span className="text-sm">{trend}%</span>
        </div>
      </div>
      <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
      <p className="text-gray-400">{label}</p>
    </div>
  );
}
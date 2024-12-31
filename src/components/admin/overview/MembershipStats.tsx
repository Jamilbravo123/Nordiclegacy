import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendData } from '../../../types/analytics';

interface MembershipStatsProps {
  data: TrendData[];
}

export function MembershipStats({ data }: MembershipStatsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Membership Growth</h2>
        <div className="h-[300px] flex items-center justify-center text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const defaultAxisProps = {
    stroke: '#9CA3AF',
    tick: { fill: '#9CA3AF' },
    axisLine: { stroke: '#4B5563' },
    tickLine: { stroke: '#4B5563' }
  };

  const defaultBarProps = {
    barSize: 20,
    minPointSize: 2,
    radius: [4, 4, 0, 0] as [number, number, number, number]
  };

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Membership Growth</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date"
              {...defaultAxisProps}
              allowDecimals={false}
              scale="auto"
              padding={{ left: 0, right: 0 }}
            />
            <YAxis 
              {...defaultAxisProps}
              allowDecimals={false}
              scale="auto"
              padding={{ top: 0, bottom: 0 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#fff',
                padding: '8px 12px'
              }}
              cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }}
              labelStyle={{ color: '#9CA3AF', marginBottom: '4px' }}
            />
            <Bar 
              dataKey="silver" 
              name="Silver" 
              fill="#94A3B8" 
              {...defaultBarProps}
            />
            <Bar 
              dataKey="gold" 
              name="Gold" 
              fill="#FCD34D" 
              {...defaultBarProps}
            />
            <Bar 
              dataKey="platinum" 
              name="Platinum" 
              fill="#A78BFA" 
              {...defaultBarProps}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
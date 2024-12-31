import React from 'react';
import { Building2, Users, TrendingUp, Map } from 'lucide-react';

const stats = [
  { icon: Building2, label: 'Companies Acquired', value: '25+' },
  { icon: Users, label: 'Combined Employees', value: '1,200+' },
  { icon: TrendingUp, label: 'Growth Rate', value: '40%' },
  { icon: Map, label: 'Nordic Presence', value: '4 Countries' },
];

export default function Stats() {
  return (
    <div className="bg-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 text-white mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
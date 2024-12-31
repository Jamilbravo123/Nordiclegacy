import React from 'react';
import { Building2, Users, TrendingUp, Map } from 'lucide-react';
import { Container } from '../ui/Container';
import { StatCard } from './StatCard';

const stats = [
  { icon: Building2, label: 'Companies Acquired', value: '25+' },
  { icon: Users, label: 'Combined Employees', value: '1,200+' },
  { icon: TrendingUp, label: 'Growth Rate', value: '40%' },
  { icon: Map, label: 'Nordic Presence', value: '4 Countries' },
];

export default function Stats() {
  return (
    <div className="bg-gray-900 py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </Container>
    </div>
  );
}
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  value: string;
  label: string;
}

export function StatCard({ icon: Icon, value, label }: StatCardProps) {
  return (
    <div className="text-center p-6 bg-gray-800 rounded-sm">
      <Icon className="h-8 w-8 text-white mx-auto mb-4" />
      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}
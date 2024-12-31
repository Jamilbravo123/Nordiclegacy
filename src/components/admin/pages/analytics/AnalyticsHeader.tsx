import React from 'react';
import { Download, Calendar } from 'lucide-react';
import { Button } from '../../../ui/Button';

export function AnalyticsHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Analytics</h1>
        <p className="text-gray-400">Track membership growth and engagement</p>
      </div>
      <div className="flex gap-3">
        <Button variant="secondary" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Last 30 Days
        </Button>
        <Button variant="secondary" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  );
}
import React from 'react';
import { Download, Upload } from 'lucide-react';
import { Button } from '../../../ui/Button';

export function MembersHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Members Management</h1>
        <p className="text-gray-400 mt-1">
          View and manage club members
        </p>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button 
          variant="secondary"
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Import
        </Button>
      </div>
    </div>
  );
}
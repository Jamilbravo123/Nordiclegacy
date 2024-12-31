import React from 'react';
import { ChevronDown } from 'lucide-react';

export function ScrollIndicator() {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
      <ChevronDown size={32} className="text-white" />
    </div>
  );
}
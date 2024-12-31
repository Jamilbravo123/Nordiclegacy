import React from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';

interface TeamMemberImageProps {
  image: string;
  name: string;
}

export function TeamMemberImage({ image, name }: TeamMemberImageProps) {
  return (
    <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-sm">
      <div className="absolute inset-0 bg-gray-800" />
      <OptimizedImage 
        src={image} 
        alt={name}
        className="transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 transition-colors"></div>
    </div>
  );
}
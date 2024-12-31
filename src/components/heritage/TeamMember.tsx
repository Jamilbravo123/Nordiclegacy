import React from 'react';
import { OptimizedImage } from '../ui/OptimizedImage';

interface TeamMemberProps {
  name: string;
  position: string;
  image: string;
}

export function TeamMember({ name, position, image }: TeamMemberProps) {
  return (
    <div className="text-center group">
      <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-sm">
        <div className="absolute inset-0 bg-gray-800" /> {/* Placeholder background */}
        <OptimizedImage 
          src={image} 
          alt={name}
          className="transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/20 transition-colors"></div>
      </div>
      <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
      <p className="text-gray-400">{position}</p>
    </div>
  );
}
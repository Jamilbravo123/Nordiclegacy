import React from 'react';
import { Image } from '../ui/Image';
import type { TeamMember } from '../../types/team';

export function TeamMemberCard({ name, position, image, objectPosition }: TeamMember) {
  return (
    <div className="text-center group">
      <div className="relative w-64 h-64 mx-auto mb-4 overflow-hidden rounded-lg bg-gray-800">
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
        <Image 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          style={{ 
            objectPosition: objectPosition || '50% 25%',
            filter: 'contrast(1.05) brightness(1.05) saturate(1.1)',
            imageRendering: 'crisp-edges',
            WebkitFontSmoothing: 'antialiased'
          }}
          loading="eager"
          quality="high"
        />
      </div>
      <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
      <p className="text-gray-400" dangerouslySetInnerHTML={{ __html: position }}></p>
    </div>
  );
}
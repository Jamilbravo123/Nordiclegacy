import React from 'react';
import { TeamMemberImage } from './TeamMemberImage';
import { TeamMemberInfo } from './TeamMemberInfo';
import type { TeamMember } from '../../types/team';

export function TeamMemberCard({ name, position, image }: TeamMember) {
  return (
    <div className="text-center group">
      <TeamMemberImage 
        image={image}
        name={name}
      />
      <TeamMemberInfo 
        name={name}
        position={position}
      />
    </div>
  );
}
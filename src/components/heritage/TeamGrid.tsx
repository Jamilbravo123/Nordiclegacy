import React from 'react';
import { TeamMember as TeamMemberType } from '../../types/team';
import { TeamMemberCard } from './TeamMemberCard';
import { fadeInUp, stagger } from '../../utils/animations';

interface TeamGridProps {
  members: TeamMemberType[];
}

export function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-6xl mx-auto">
      {members.map((member, index) => (
        <div 
          key={index}
          className={`${fadeInUp} ${stagger(index)}`}
        >
          <TeamMemberCard {...member} />
        </div>
      ))}
    </div>
  );
}
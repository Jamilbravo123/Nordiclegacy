import React from 'react';

interface TeamMemberInfoProps {
  name: string;
  position: string;
}

export function TeamMemberInfo({ name, position }: TeamMemberInfoProps) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-1">{name}</h3>
      <p className="text-gray-400">{position}</p>
    </div>
  );
}
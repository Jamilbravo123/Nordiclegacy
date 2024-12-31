import React from 'react';
import { Member } from '../../../../../types/members';

interface MemberDetailsHeaderProps {
  member: Member;
}

export function MemberDetailsHeader({ member }: MemberDetailsHeaderProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-white">{member.full_name}</h2>
      <p className="text-gray-400">{member.email}</p>
    </div>
  );
}
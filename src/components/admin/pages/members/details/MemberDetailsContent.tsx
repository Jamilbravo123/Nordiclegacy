import React from 'react';
import { Member } from '../../../../../types/members';
import { MembershipDetails } from './MembershipDetails';
import { ActivityHistory } from './ActivityHistory';
import { MemberActions } from './MemberActions';

interface MemberDetailsContentProps {
  member: Member;
}

export function MemberDetailsContent({ member }: MemberDetailsContentProps) {
  return (
    <div className="space-y-8">
      <MembershipDetails member={member} />
      <ActivityHistory memberId={member.id} />
      <MemberActions member={member} />
    </div>
  );
}
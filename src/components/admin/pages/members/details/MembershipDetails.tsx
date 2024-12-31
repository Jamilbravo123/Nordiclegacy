import React from 'react';
import { Award, Calendar } from 'lucide-react';
import { Member } from '../../../../../types/members';
import { formatDate } from '../../../../../utils/dateUtils';

interface MembershipDetailsProps {
  member: Member;
}

export function MembershipDetails({ member }: MembershipDetailsProps) {
  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Membership Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <Award className="h-4 w-4 mr-2" />
            <span className="text-sm">Current Tier</span>
          </div>
          <p className="text-white font-medium">{member.current_tier}</p>
        </div>
        <div>
          <div className="flex items-center text-gray-400 mb-2">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">Member Since</span>
          </div>
          <p className="text-white font-medium">{formatDate(member.created_at)}</p>
        </div>
      </div>
    </div>
  );
}
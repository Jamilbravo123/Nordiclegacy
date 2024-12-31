import React from 'react';
import { Shield, Ban, Award, Trash2 } from 'lucide-react';
import { Member } from '../../../../../types/members';
import { Button } from '../../../../ui/Button';
import { useMemberActions } from '../../../../../hooks/useMemberActions';

interface MemberActionsProps {
  member: Member;
}

export function MemberActions({ member }: MemberActionsProps) {
  const { 
    updateStatus, 
    updateTier, 
    deleteMember,
    isLoading 
  } = useMemberActions();

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Member Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="secondary"
          className="flex items-center justify-center gap-2"
          onClick={() => updateStatus(member.id, member.status === 'active' ? 'suspended' : 'active')}
          disabled={isLoading}
        >
          {member.status === 'active' ? (
            <>
              <Ban className="h-4 w-4" />
              Suspend Member
            </>
          ) : (
            <>
              <Shield className="h-4 w-4" />
              Activate Member
            </>
          )}
        </Button>

        <Button
          variant="secondary"
          className="flex items-center justify-center gap-2"
          onClick={() => updateTier(member.id)}
          disabled={isLoading}
        >
          <Award className="h-4 w-4" />
          Change Tier
        </Button>

        <Button
          variant="secondary"
          className="flex items-center justify-center gap-2 col-span-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300"
          onClick={() => deleteMember(member.id)}
          disabled={isLoading}
        >
          <Trash2 className="h-4 w-4" />
          Delete Member
        </Button>
      </div>
    </div>
  );
}
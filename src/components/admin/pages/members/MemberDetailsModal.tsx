import React from 'react';
import { X } from 'lucide-react';
import { Member } from '../../../../types/members';
import { MemberDetailsContent } from './details/MemberDetailsContent';
import { MemberDetailsHeader } from './details/MemberDetailsHeader';
import { useMemberDetailsStore } from '../../../../stores/memberDetailsStore';

export function MemberDetailsModal() {
  const { isOpen, selectedMember, closeModal } = useMemberDetailsStore();

  if (!isOpen || !selectedMember) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-sm">
      <div className="absolute right-0 h-full w-full max-w-2xl bg-gray-800 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <MemberDetailsHeader member={selectedMember} />
          <button
            onClick={closeModal}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <MemberDetailsContent member={selectedMember} />
      </div>
    </div>
  );
}
import React from 'react';
import { MoreVertical, Award } from 'lucide-react';
import type { Member } from '../../../../types/members';
import { formatDate } from '../../../../utils/dateUtils';

interface MembersTableProps {
  members: Member[];
}

export function MembersTable({ members }: MembersTableProps) {
  if (!members || members.length === 0) {
    return (
      <div className="bg-white/5 rounded-lg p-8 text-center">
        <p className="text-gray-400">No members found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Member</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Tier</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Points</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Joined</th>
            <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
            <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {members.map((member) => (
            <tr key={member.id} className="hover:bg-white/5">
              <td className="px-6 py-4">
                <div>
                  <div className="font-medium text-white">{member.full_name || 'No name'}</div>
                  <div className="text-sm text-gray-400">{member.email}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-white">{member.current_tier}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-white">{member.points}</td>
              <td className="px-6 py-4 text-gray-400">
                {formatDate(member.created_at)}
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  member.status === 'active' ? 'bg-green-400/10 text-green-400' :
                  member.status === 'inactive' ? 'bg-gray-400/10 text-gray-400' :
                  'bg-red-400/10 text-red-400'
                }`}>
                  {member.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-gray-400 hover:text-white">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
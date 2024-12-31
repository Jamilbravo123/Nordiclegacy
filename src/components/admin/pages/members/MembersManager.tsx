import React from 'react';
import { MembersHeader } from './MembersHeader';
import { MembersTable } from './MembersTable';
import { MembersFilters } from './MembersFilters';
import { useMembers } from '../../../../hooks/useMembers';

export function MembersManager() {
  const { members, loading, filters, setFilters } = useMembers();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <MembersHeader />
      <MembersFilters filters={filters} onFilterChange={setFilters} />
      <div className="bg-white/5 rounded-lg p-4">
        <p className="text-gray-400 mb-4">
          Total Members: <span className="text-white font-medium">{members.length}</span>
        </p>
        <MembersTable members={members} />
      </div>
    </div>
  );
}
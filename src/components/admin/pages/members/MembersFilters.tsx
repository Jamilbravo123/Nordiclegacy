import React from 'react';
import { Search } from 'lucide-react';
import type { MemberFilters } from '../../../../types/members';

interface MembersFiltersProps {
  filters: MemberFilters;
  onFilterChange: (filters: MemberFilters) => void;
}

export function MembersFilters({ filters, onFilterChange }: MembersFiltersProps) {
  return (
    <div className="bg-white/5 rounded-lg p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search members..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-white"
          />
        </div>
        
        <select
          value={filters.tier}
          onChange={(e) => onFilterChange({ ...filters, tier: e.target.value })}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
        >
          <option value="">All Tiers</option>
          <option value="SILVER">Silver</option>
          <option value="GOLD">Gold</option>
          <option value="PLATINUM">Platinum</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onFilterChange({ ...filters, status: e.target.value })}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>

        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value })}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-white"
        >
          <option value="joined">Join Date</option>
          <option value="points">Points</option>
          <option value="activity">Recent Activity</option>
        </select>
      </div>
    </div>
  );
}
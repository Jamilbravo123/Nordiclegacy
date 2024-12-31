export interface Member {
  id: string;
  email: string;
  full_name: string;
  current_tier: string;
  points: number;
  status: 'active' | 'inactive' | 'suspended';
  role: 'member' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface MemberFilters {
  search: string;
  tier: string;
  status: string;
  sortBy: string;
}
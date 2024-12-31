export interface MembershipTier {
  id: string;
  name: string;
  points_required: number;
  benefits: string[];
  created_at: string;
}

export interface MemberProfile {
  id: string;
  current_tier: string;
  points: number;
  created_at: string;
  updated_at: string;
}
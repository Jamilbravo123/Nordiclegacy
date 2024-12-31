export interface ReferralStats {
  totalReferrals: number;
  pointsEarned: number;
  successfulConversions: number;
}

export interface ReferralHistory {
  id: string;
  email: string;
  status: 'pending' | 'joined';
  created_at: string;
}

export interface ReferralFormData {
  emails: string[];
  message?: string;
}
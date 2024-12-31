export interface Offering {
  id: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  startDate: string;
  endDate?: string;
  pointsRequired?: number;
  tiers: string[];
  images: string[];
  status: 'draft' | 'scheduled' | 'active' | 'expired';
  created_at: string;
  updated_at: string;
}
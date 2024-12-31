export interface RecentActivity {
  id: string;
  type: 'signup' | 'upgrade' | 'benefit' | 'points';
  description: string;
  created_at: string;
  metadata?: Record<string, any>;
}
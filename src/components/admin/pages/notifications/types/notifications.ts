export interface Notification {
  id: string;
  title: string;
  message: string;
  scheduled_for: string;
  sent_at?: string;
  target_audience: string[];
  status: 'draft' | 'scheduled' | 'sent';
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface NotificationFormData {
  title: string;
  message: string;
  scheduled_for: string;
  target_audience: string[];
}
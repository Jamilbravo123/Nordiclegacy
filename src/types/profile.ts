export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string | null;
  address?: string | null;
  birthday?: string | null;
  status?: string;
  role?: string;
  created_at: string;
  updated_at: string;
}
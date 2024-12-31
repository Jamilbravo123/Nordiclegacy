/*
  # Create Admin Tables Migration

  1. New Tables
    - admin_settings
    - analytics
    - notifications
    - roles
    - permissions

  2. Security
    - Enable RLS on all tables
    - Add admin-only policies
*/

-- Create admin_settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id bigint PRIMARY KEY DEFAULT 1,
  system_name text NOT NULL DEFAULT 'Nordic Legacy Club',
  support_email text NOT NULL DEFAULT 'support@nordiclegacy.com',
  maintenance_mode boolean DEFAULT false,
  two_factor_required boolean DEFAULT false,
  strong_password_policy boolean DEFAULT true,
  session_timeout integer DEFAULT 30,
  api_key text,
  webhook_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id bigint PRIMARY KEY DEFAULT 1,
  total_members integer DEFAULT 0,
  members_trend numeric DEFAULT 0,
  active_users integer DEFAULT 0,
  active_users_trend numeric DEFAULT 0,
  tier_upgrades integer DEFAULT 0,
  tier_upgrades_trend numeric DEFAULT 0,
  avg_session_time text DEFAULT '0m',
  session_time_trend numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  target_audience text NOT NULL,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create roles table
CREATE TABLE IF NOT EXISTS roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  permissions text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create permissions table
CREATE TABLE IF NOT EXISTS permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  scope text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies
CREATE POLICY "Admin only select" ON admin_settings
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only update" ON admin_settings
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only select" ON analytics
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only select" ON notifications
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only insert" ON notifications
  FOR INSERT WITH CHECK (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only update" ON notifications
  FOR UPDATE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only delete" ON notifications
  FOR DELETE USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only select" ON roles
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin only select" ON permissions
  FOR SELECT USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Insert default admin settings
INSERT INTO admin_settings (id) VALUES (1)
ON CONFLICT (id) DO NOTHING;
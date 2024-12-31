/*
  # Fix Admin Dashboard Tables

  1. New Tables
    - admin_analytics: Store aggregated analytics data
    - admin_notifications: Store system notifications
    - admin_roles: Store role definitions
    - admin_permissions: Store permission definitions

  2. Security
    - Enable RLS on all tables
    - Add admin-only policies
*/

-- Create admin_analytics table
CREATE TABLE IF NOT EXISTS admin_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_members integer DEFAULT 0,
  members_trend numeric DEFAULT 0,
  active_users integer DEFAULT 0,
  active_users_trend numeric DEFAULT 0,
  tier_upgrades integer DEFAULT 0,
  tier_upgrades_trend numeric DEFAULT 0,
  avg_session_time text DEFAULT '0m',
  session_time_trend numeric DEFAULT 0,
  trends jsonb DEFAULT '[]',
  engagement jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- Create admin_notifications table
CREATE TABLE IF NOT EXISTS admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  target_audience text NOT NULL,
  status text DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  permissions text[] DEFAULT '{}',
  user_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create admin_permissions table
CREATE TABLE IF NOT EXISTS admin_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  scope text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE admin_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies
CREATE POLICY "Admin manage analytics" ON admin_analytics
  FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin manage notifications" ON admin_notifications
  FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin manage roles" ON admin_roles
  FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

CREATE POLICY "Admin manage permissions" ON admin_permissions
  FOR ALL USING ((SELECT role FROM profiles WHERE id = auth.uid()) = 'admin');

-- Insert sample data
INSERT INTO admin_analytics (
  total_members,
  members_trend,
  active_users,
  active_users_trend,
  tier_upgrades,
  tier_upgrades_trend,
  avg_session_time,
  session_time_trend,
  trends,
  engagement
) VALUES (
  150,
  15,
  120,
  8,
  25,
  12,
  '25m',
  5,
  '[
    {"date": "Jan", "silver": 65, "gold": 45, "platinum": 20},
    {"date": "Feb", "silver": 75, "gold": 48, "platinum": 22},
    {"date": "Mar", "silver": 85, "gold": 52, "platinum": 25},
    {"date": "Apr", "silver": 95, "gold": 58, "platinum": 28},
    {"date": "May", "silver": 110, "gold": 65, "platinum": 32},
    {"date": "Jun", "silver": 125, "gold": 72, "platinum": 35}
  ]',
  '{"avgSessionTime": "25m", "totalPointsEarned": 12500, "benefitsRedeemed": 85}'
);

INSERT INTO admin_roles (name, description, permissions, user_count) VALUES
('admin', 'Full system access', ARRAY['all'], 1),
('moderator', 'Content management', ARRAY['read', 'write'], 3),
('support', 'Customer support', ARRAY['read', 'support'], 5);

INSERT INTO admin_permissions (name, description, scope) VALUES
('read', 'Read access to system data', 'global'),
('write', 'Write access to system data', 'global'),
('delete', 'Delete access to system data', 'global'),
('support', 'Access to support features', 'support');
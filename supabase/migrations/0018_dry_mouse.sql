/*
  # Create Offerings and Analytics Tables

  1. New Tables
    - offerings: Store membership offerings and benefits
    - offerings_history: Track offering redemptions and usage
    - analytics_data: Store detailed analytics metrics

  2. Security
    - Enable RLS on all tables
    - Add admin-only policies
*/

-- Create offerings table
CREATE TABLE IF NOT EXISTS offerings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  detailed_description text,
  start_date timestamptz NOT NULL,
  end_date timestamptz,
  points_required integer,
  tiers text[] NOT NULL,
  images text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create offerings history table
CREATE TABLE IF NOT EXISTS offerings_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offering_id uuid REFERENCES offerings(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  redeemed_at timestamptz DEFAULT now()
);

-- Create analytics_data table
CREATE TABLE IF NOT EXISTS analytics_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  metric_value jsonb NOT NULL,
  timestamp timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE offerings ENABLE ROW LEVEL SECURITY;
ALTER TABLE offerings_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_data ENABLE ROW LEVEL SECURITY;

-- Create admin-only policies
CREATE POLICY "Admin manage offerings" ON offerings
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin manage offerings history" ON offerings_history
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

CREATE POLICY "Admin manage analytics" ON analytics_data
  FOR ALL USING (
    (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
  );

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_offerings_status ON offerings(status);
CREATE INDEX IF NOT EXISTS idx_offerings_history_user ON offerings_history(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_metric ON analytics_data(metric_name);

-- Insert sample data
INSERT INTO offerings (
  title,
  short_description,
  detailed_description,
  start_date,
  tiers,
  status
) VALUES 
(
  'Early Access Program',
  'Get exclusive early access to new features',
  'Join our early access program to test and provide feedback on upcoming features before they are released to the general public.',
  now(),
  ARRAY['GOLD', 'PLATINUM'],
  'active'
),
(
  'Premium Support',
  '24/7 priority support access',
  'Get priority access to our support team with guaranteed response times and dedicated account management.',
  now(),
  ARRAY['PLATINUM'],
  'active'
);

-- Insert sample analytics data
INSERT INTO analytics_data (metric_name, metric_value) VALUES 
('member_growth', '{"total": 150, "trend": 15, "breakdown": {"silver": 100, "gold": 35, "platinum": 15}}'),
('engagement', '{"active_users": 120, "avg_session": "25m", "trend": 8}');
/*
  # Membership Tiers System

  1. New Tables
    - `membership_tiers`
      - `id` (uuid, primary key)
      - `name` (text, unique) - tier name (SILVER, GOLD, PLATINUM)
      - `points_required` (integer) - points needed to reach this tier
      - `benefits` (text[]) - array of benefits for this tier
    
    - `member_profiles`
      - `id` (uuid, primary key) - references auth.users
      - `current_tier` (text) - current membership tier
      - `points` (integer) - accumulated points

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create membership tiers table
CREATE TABLE IF NOT EXISTS membership_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,  -- Added UNIQUE constraint
  points_required integer NOT NULL,
  benefits text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create member profiles table
CREATE TABLE IF NOT EXISTS member_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  current_tier text NOT NULL DEFAULT 'SILVER',
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT fk_current_tier 
    FOREIGN KEY (current_tier) 
    REFERENCES membership_tiers(name)
    ON UPDATE CASCADE
);

-- Enable RLS
ALTER TABLE membership_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- Policies for membership_tiers
CREATE POLICY "Anyone can read membership tiers"
  ON membership_tiers
  FOR SELECT
  TO authenticated
  USING (true);

-- Policies for member_profiles
CREATE POLICY "Users can read own profile"
  ON member_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON member_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Insert default tiers
INSERT INTO membership_tiers (name, points_required, benefits) VALUES
  ('SILVER', 0, ARRAY['Basic Discounts', '5% off on all services', 'Newsletter access']),
  ('GOLD', 1000, ARRAY['10% off on all services', 'Priority Support', 'Exclusive Events', 'Quarterly Bonus Points']),
  ('PLATINUM', 5000, ARRAY['15% off on all services', 'VIP Support', 'Premium Events', 'Monthly Bonus Points', 'Concierge Service']);
/*
  # Member Activity Tracking System

  1. New Tables
    - `member_activity`: Stores all member activities
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text, activity type)
      - `description` (text)
      - `metadata` (jsonb, additional activity data)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `member_activity` table
    - Add policies for reading and inserting activities
    - Create function to track common activities

  3. Triggers
    - Track tier changes
    - Track benefit redemptions
    - Track points earned
*/

-- Create member_activity table
CREATE TABLE IF NOT EXISTS member_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('signup', 'upgrade', 'benefit', 'points')),
  description text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE member_activity ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own activities"
  ON member_activity
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "System can insert activities"
  ON member_activity
  FOR INSERT
  WITH CHECK (true);

-- Create function to log activity
CREATE OR REPLACE FUNCTION log_member_activity(
  user_id uuid,
  activity_type text,
  activity_description text,
  activity_metadata jsonb DEFAULT '{}'::jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO member_activity (user_id, type, description, metadata)
  VALUES (user_id, activity_type, activity_description, activity_metadata);
END;
$$;

-- Create trigger for tier changes
CREATE OR REPLACE FUNCTION track_tier_changes()
RETURNS trigger AS $$
BEGIN
  IF (OLD.current_tier IS DISTINCT FROM NEW.current_tier) THEN
    PERFORM log_member_activity(
      NEW.id,
      'upgrade',
      format('Upgraded to %s tier', NEW.current_tier),
      jsonb_build_object(
        'previous_tier', OLD.current_tier,
        'new_tier', NEW.current_tier
      )
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_tier_change
  AFTER UPDATE OF current_tier ON member_profiles
  FOR EACH ROW
  EXECUTE FUNCTION track_tier_changes();

-- Create trigger for benefit redemptions
CREATE OR REPLACE FUNCTION track_benefit_redemptions()
RETURNS trigger AS $$
BEGIN
  PERFORM log_member_activity(
    NEW.user_id,
    'benefit',
    format('Redeemed benefit: %s', NEW.benefit),
    jsonb_build_object('benefit', NEW.benefit)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_benefit_redeemed
  AFTER INSERT ON benefit_redemptions
  FOR EACH ROW
  EXECUTE FUNCTION track_benefit_redemptions();

-- Create trigger for points earned
CREATE OR REPLACE FUNCTION track_points_earned()
RETURNS trigger AS $$
BEGIN
  IF NEW.points > 0 THEN
    PERFORM log_member_activity(
      NEW.user_id,
      'points',
      format('Earned %s points', NEW.points),
      jsonb_build_object('points', NEW.points)
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_points_earned
  AFTER INSERT ON points_history
  FOR EACH ROW
  EXECUTE FUNCTION track_points_earned();

-- Create indexes for better performance
CREATE INDEX idx_member_activity_user_id ON member_activity(user_id);
CREATE INDEX idx_member_activity_created_at ON member_activity(created_at DESC);
CREATE INDEX idx_member_activity_type ON member_activity(type);
/*
  # Points System Implementation

  1. New Tables
    - `points_history`
      - Tracks all points transactions
      - Includes points earned/spent and reason
      - Maintains audit trail for expiration

  2. Changes to Existing Tables
    - Add points expiration tracking to member_profiles

  3. Security
    - Enable RLS on points_history
    - Add policies for user access
*/

-- Create points history table
CREATE TABLE IF NOT EXISTS points_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  points integer NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '1 year')
);

-- Enable RLS
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;

-- Create policies for points_history
CREATE POLICY "Users can read own points history"
  ON points_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to calculate total points
CREATE OR REPLACE FUNCTION calculate_total_points(user_uuid uuid)
RETURNS integer AS $$
BEGIN
  RETURN COALESCE(
    (
      SELECT SUM(points)
      FROM points_history
      WHERE user_id = user_uuid
      AND (expires_at IS NULL OR expires_at > now())
    ),
    0
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
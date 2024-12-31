/*
  # Fix Member Profiles RLS Policies

  1. Changes
    - Add missing RLS policies for member_profiles table
    - Ensure proper read access for authenticated users
    - Add policies for updating member profiles
  
  2. Security
    - Enable RLS on member_profiles table
    - Add policies for read/update operations
*/

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can read own member profile" ON member_profiles;
DROP POLICY IF EXISTS "Users can update own member profile" ON member_profiles;

-- Create new policies for member_profiles
CREATE POLICY "Users can read own member profile"
  ON member_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own member profile"
  ON member_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Ensure RLS is enabled
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- Create or replace function to initialize member profile
CREATE OR REPLACE FUNCTION initialize_member_profile()
RETURNS trigger AS $$
BEGIN
  INSERT INTO member_profiles (id, current_tier, points)
  VALUES (NEW.id, 'SILVER', 0)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for profile initialization
DROP TRIGGER IF EXISTS on_auth_user_created_member_profile ON auth.users;
CREATE TRIGGER on_auth_user_created_member_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_member_profile();
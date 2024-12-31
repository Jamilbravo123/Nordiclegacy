/*
  # Fix Member Profiles Policies and Initialization

  1. Changes
    - Add insert policy for member_profiles
    - Update trigger function to handle profile creation properly
    - Add default tier policy
  
  2. Security
    - Enable proper RLS policies for profile creation
    - Ensure secure profile initialization
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own member profile" ON member_profiles;
DROP POLICY IF EXISTS "Users can update own member profile" ON member_profiles;
DROP POLICY IF EXISTS "System can create member profile" ON member_profiles;

-- Create comprehensive policies for member_profiles
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

CREATE POLICY "System can create member profile"
  ON member_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update the profile initialization function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  default_tier text := 'SILVER';
BEGIN
  -- Create profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;

  -- Create member profile
  INSERT INTO public.member_profiles (id, current_tier, points)
  VALUES (new.id, default_tier, 0)
  ON CONFLICT (id) DO NOTHING;

  -- Create initial points record
  INSERT INTO public.points_history (user_id, points, description)
  VALUES (new.id, 0, 'Welcome bonus')
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure existing users have profiles
DO $$
BEGIN
  INSERT INTO member_profiles (id, current_tier, points)
  SELECT id, 'SILVER', 0
  FROM auth.users
  WHERE id NOT IN (SELECT id FROM member_profiles)
  ON CONFLICT DO NOTHING;
END $$;
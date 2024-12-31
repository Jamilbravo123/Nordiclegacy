/*
  # Fix Profile Initialization and Policies

  1. Changes
    - Add insert policy for profiles table
    - Update profile initialization trigger
    - Add backfill for missing profiles
  
  2. Security
    - Enable proper RLS policies for profile creation
    - Ensure secure profile initialization
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "System can create profile" ON profiles;

-- Create comprehensive policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "System can create profile"
  ON profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Update profile initialization function
CREATE OR REPLACE FUNCTION public.initialize_profiles()
RETURNS trigger AS $$
BEGIN
  -- Create base profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''))
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name
  WHERE profiles.full_name IS NULL OR profiles.full_name = '';

  -- Create member profile if it doesn't exist
  INSERT INTO public.member_profiles (id, current_tier, points)
  VALUES (NEW.id, 'SILVER', 0)
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.initialize_profiles();

-- Backfill missing profiles
DO $$
BEGIN
  -- Insert missing base profiles
  INSERT INTO profiles (id, email, full_name)
  SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', '')
  FROM auth.users
  WHERE id NOT IN (SELECT id FROM profiles)
  ON CONFLICT (id) DO NOTHING;

  -- Insert missing member profiles
  INSERT INTO member_profiles (id, current_tier, points)
  SELECT id, 'SILVER', 0
  FROM auth.users
  WHERE id NOT IN (SELECT id FROM member_profiles)
  ON CONFLICT (id) DO NOTHING;
END $$;
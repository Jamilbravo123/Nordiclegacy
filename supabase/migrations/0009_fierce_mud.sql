/*
  # Fix Profile Creation and Policies

  1. Changes
    - Drop existing triggers and recreate them
    - Update profile initialization function
    - Fix policy conflicts
    - Add status column to profiles
    - Backfill missing data

  2. Security
    - Maintain RLS policies
    - Ensure proper access control
*/

-- Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_member_profile ON auth.users;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "System can create profile" ON profiles;

-- Create a comprehensive function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create base profile
  INSERT INTO public.profiles (id, email, full_name, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'active'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = now();

  -- Create member profile
  INSERT INTO public.member_profiles (id, current_tier, points)
  VALUES (NEW.id, 'SILVER', 0)
  ON CONFLICT (id) DO NOTHING;

  -- Create initial points history
  INSERT INTO public.points_history (user_id, points, description)
  VALUES (NEW.id, 0, 'Welcome bonus')
  ON CONFLICT DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create single trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create new policies for profiles
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "System can create profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Add status column to profiles if not exists
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'status') 
  THEN
    ALTER TABLE profiles ADD COLUMN status text DEFAULT 'active';
  END IF;
END $$;

-- Backfill any missing profiles
DO $$
BEGIN
  -- Insert missing profiles
  INSERT INTO profiles (id, email, full_name, status)
  SELECT 
    id,
    email,
    COALESCE(raw_user_meta_data->>'full_name', ''),
    'active'
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
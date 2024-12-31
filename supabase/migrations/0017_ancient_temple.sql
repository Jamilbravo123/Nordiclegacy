/*
  # Fix Member Profiles Relationship

  1. Changes
    - Drop and recreate member_profiles foreign key with proper cascade
    - Update RLS policies for better admin access
    - Add missing indexes for performance
    - Fix profile initialization trigger

  2. Security
    - Maintain RLS policies
    - Ensure proper admin access
*/

-- Temporarily disable RLS
ALTER TABLE member_profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing foreign key if it exists
ALTER TABLE member_profiles 
DROP CONSTRAINT IF EXISTS fk_member_profiles_profile;

-- Recreate foreign key with proper cascade
ALTER TABLE member_profiles
ADD CONSTRAINT fk_member_profiles_profile
FOREIGN KEY (id) REFERENCES profiles(id)
ON DELETE CASCADE;

-- Update or create indexes
CREATE INDEX IF NOT EXISTS idx_member_profiles_id ON member_profiles(id);
CREATE INDEX IF NOT EXISTS idx_member_profiles_current_tier ON member_profiles(current_tier);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Update profile initialization function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create base profile
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'member'
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

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Re-enable RLS
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
DROP POLICY IF EXISTS "member_profiles_select_policy" ON member_profiles;
DROP POLICY IF EXISTS "member_profiles_update_policy" ON member_profiles;
DROP POLICY IF EXISTS "member_profiles_insert_policy" ON member_profiles;

CREATE POLICY "member_profiles_select_policy" ON member_profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "member_profiles_update_policy" ON member_profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "member_profiles_insert_policy" ON member_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Ensure all existing users have member profiles
INSERT INTO member_profiles (id, current_tier, points)
SELECT id, 'SILVER', 0
FROM profiles
WHERE id NOT IN (SELECT id FROM member_profiles)
ON CONFLICT (id) DO NOTHING;
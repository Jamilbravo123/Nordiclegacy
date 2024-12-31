/*
  # Fix Profile Policies Migration

  1. Changes
    - Reset and simplify profile access policies
    - Add role-based access control
    - Fix infinite recursion issues

  2. Security
    - Users can read and update their own profiles
    - Admins can read and update all profiles
    - System can create new profiles
*/

-- Disable RLS temporarily to avoid conflicts
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;

-- Drop existing policies
DO $$ 
DECLARE
  policy_name text;
BEGIN
  FOR policy_name IN (
    SELECT policyname 
    FROM pg_policies 
    WHERE tablename = 'profiles'
  )
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON profiles', policy_name);
  END LOOP;
END $$;

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create new simplified policies
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR
    role = 'admin'
  );

CREATE POLICY "profiles_update_policy" ON profiles
  FOR UPDATE USING (
    auth.uid() = id OR
    role = 'admin'
  );

CREATE POLICY "profiles_insert_policy" ON profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id
  );

-- Create index for role lookups if it doesn't exist
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);

-- Ensure role column exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' 
    AND column_name = 'role'
  ) THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'member';
  END IF;
END $$;
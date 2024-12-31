-- First, temporarily disable RLS
ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON profiles;
DROP POLICY IF EXISTS "member_profiles_select_policy" ON member_profiles;
DROP POLICY IF EXISTS "member_profiles_update_policy" ON member_profiles;
DROP POLICY IF EXISTS "member_profiles_insert_policy" ON member_profiles;

-- Create new, simplified policies for profiles
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

-- Create new policies for member_profiles
CREATE POLICY "member_profiles_select_policy" ON member_profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "member_profiles_update_policy" ON member_profiles
  FOR UPDATE USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "member_profiles_insert_policy" ON member_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Re-enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

-- Update the get_all_members function to be more efficient
CREATE OR REPLACE FUNCTION get_all_members()
RETURNS TABLE (
  id uuid,
  email text,
  full_name text,
  current_tier text,
  points integer,
  status text,
  role text,
  created_at timestamptz,
  updated_at timestamptz
) SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to execute this function
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT 
    p.id,
    p.email,
    p.full_name,
    COALESCE(mp.current_tier, 'SILVER'),
    COALESCE(mp.points, 0),
    COALESCE(p.status, 'active'),
    p.role,
    p.created_at,
    p.updated_at
  FROM profiles p
  LEFT JOIN member_profiles mp ON p.id = mp.id
  WHERE p.role = 'member'
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Ensure proper grants
REVOKE ALL ON FUNCTION get_all_members() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_all_members() TO authenticated;
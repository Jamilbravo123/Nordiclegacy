-- Ensure proper RLS policies for admin access to profiles
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
DROP POLICY IF EXISTS "member_profiles_select_policy" ON member_profiles;

-- Create new policies that explicitly allow admins to view all profiles
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "member_profiles_select_policy" ON member_profiles
  FOR SELECT USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Update the useMembers hook query
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
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.email,
    p.full_name,
    mp.current_tier,
    mp.points,
    p.status,
    p.role,
    p.created_at,
    p.updated_at
  FROM profiles p
  LEFT JOIN member_profiles mp ON p.id = mp.id
  WHERE p.role = 'member'
  ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_all_members() TO authenticated;
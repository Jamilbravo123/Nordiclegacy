-- Drop and recreate the get_all_members function with explicit column references
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
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT 
    profiles.id,
    profiles.email,
    profiles.full_name,
    COALESCE(member_profiles.current_tier, 'SILVER'),
    COALESCE(member_profiles.points, 0),
    COALESCE(profiles.status, 'active'),
    profiles.role,
    profiles.created_at,
    profiles.updated_at
  FROM profiles
  LEFT JOIN member_profiles ON profiles.id = member_profiles.id
  WHERE profiles.role = 'member'
  ORDER BY profiles.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Ensure proper grants
REVOKE ALL ON FUNCTION get_all_members() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_all_members() TO authenticated;

-- Refresh the RLS policies to ensure they're using explicit column references
DROP POLICY IF EXISTS "profiles_select_policy" ON profiles;
CREATE POLICY "profiles_select_policy" ON profiles
  FOR SELECT USING (
    auth.uid() = profiles.id OR 
    profiles.role = 'admin'
  );

DROP POLICY IF EXISTS "member_profiles_select_policy" ON member_profiles;
CREATE POLICY "member_profiles_select_policy" ON member_profiles
  FOR SELECT USING (
    auth.uid() = member_profiles.id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
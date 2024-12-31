-- Ensure all auth users have profiles
INSERT INTO profiles (id, email, full_name, role, status)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', ''),
  'member',
  'active'
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;

-- Ensure all profiles have member profiles
INSERT INTO member_profiles (id, current_tier, points)
SELECT 
  id,
  'SILVER',
  0
FROM profiles
WHERE id NOT IN (SELECT id FROM member_profiles)
ON CONFLICT (id) DO NOTHING;

-- Update the handle_new_user function to be more robust
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Create base profile
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    role,
    status
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    'member',
    'active'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name),
    updated_at = now();

  -- Create member profile
  INSERT INTO public.member_profiles (
    id,
    current_tier,
    points
  ) VALUES (
    NEW.id,
    'SILVER',
    0
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Refresh the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
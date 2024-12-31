-- Drop existing triggers and functions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  profile_exists boolean;
BEGIN
  -- Check if profile already exists
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = NEW.id
  ) INTO profile_exists;

  -- Only create profile if it doesn't exist
  IF NOT profile_exists THEN
    INSERT INTO profiles (
      id,
      email,
      full_name,
      status,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      'active',
      NOW(),
      NOW()
    );

    -- Create member profile
    INSERT INTO member_profiles (
      id,
      current_tier,
      points,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      'SILVER',
      0,
      NOW(),
      NOW()
    );

    -- Create initial points history
    INSERT INTO points_history (
      user_id,
      points,
      description,
      created_at
    ) VALUES (
      NEW.id,
      0,
      'Welcome bonus',
      NOW()
    );
  END IF;

  RETURN NEW;
END;
$$;

-- Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Ensure all tables have proper indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON profiles(email);
CREATE INDEX IF NOT EXISTS idx_member_profiles_tier ON member_profiles(current_tier);
CREATE INDEX IF NOT EXISTS idx_points_history_created ON points_history(created_at);

-- Add constraints to ensure data integrity
ALTER TABLE profiles
  ADD CONSTRAINT profiles_email_check 
  CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

ALTER TABLE member_profiles
  ADD CONSTRAINT member_profiles_points_check 
  CHECK (points >= 0);

-- Ensure RLS policies are properly set
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE points_history ENABLE ROW LEVEL SECURITY;

-- Update RLS policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
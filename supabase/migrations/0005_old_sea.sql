/*
  # Add Database Indexes and Update Trigger Function

  1. Changes
    - Add performance indexes for member profiles and related tables
    - Update trigger function to handle all profile creation
    - Add ON CONFLICT clauses for data consistency
  
  2. Security
    - No changes to existing policies
*/

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_member_profiles_user_id ON member_profiles(id);
CREATE INDEX IF NOT EXISTS idx_points_history_user_id ON points_history(user_id);
CREATE INDEX IF NOT EXISTS idx_benefit_redemptions_user_id ON benefit_redemptions(user_id);

-- Update handle_new_user function to properly create all required profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;

  -- Insert into member_profiles with default SILVER tier
  INSERT INTO public.member_profiles (id, current_tier, points)
  VALUES (new.id, 'SILVER', 0)
  ON CONFLICT (id) DO NOTHING;

  -- Insert initial points history record
  INSERT INTO public.points_history (user_id, points, description)
  VALUES (new.id, 0, 'Welcome bonus')
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure trigger is properly set up
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
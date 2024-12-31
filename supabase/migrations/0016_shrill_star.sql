/*
  # Fix Member Profiles Relationships and Policies

  1. Changes
    - Add foreign key relationship between profiles and member_profiles
    - Add performance indexes
    - Update RLS policies safely by dropping existing ones first
*/

-- Drop existing policies safely
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can read own member profile" ON member_profiles;
  DROP POLICY IF EXISTS "Users can update own member profile" ON member_profiles;
  DROP POLICY IF EXISTS "System can create member profile" ON member_profiles;
END $$;

-- Add foreign key relationship if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'fk_member_profiles_profile'
  ) THEN
    ALTER TABLE member_profiles
    ADD CONSTRAINT fk_member_profiles_profile
    FOREIGN KEY (id) REFERENCES profiles(id)
    ON DELETE CASCADE;
  END IF;
END $$;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_member_profiles_id ON member_profiles(id);
CREATE INDEX IF NOT EXISTS idx_member_profiles_current_tier ON member_profiles(current_tier);

-- Update RLS policies
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;

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
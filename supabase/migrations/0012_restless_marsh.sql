/*
  # Add Admin Role Support

  1. Changes
    - Add role column to profiles table
    - Add admin role policies
    - Create function to set initial admin

  2. Security
    - Only admins can create other admins
    - Admins have access to manage all profiles
*/

-- Add role column to profiles if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'role') 
  THEN
    ALTER TABLE profiles ADD COLUMN role text DEFAULT 'member';
  END IF;
END $$;

-- Create admin policies
CREATE POLICY "Allow admins to read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow admins to update all profiles"
  ON profiles FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    auth.uid() = id OR 
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Function to set initial admin
CREATE OR REPLACE FUNCTION set_initial_admin(admin_email text)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET role = 'admin'
  WHERE email = admin_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
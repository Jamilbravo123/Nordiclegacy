/*
  # Set Initial Admin User

  1. Updates
    - Set jamil@aprikosventure.com as admin user
    
  2. Security
    - Only updates existing profile
    - No destructive changes
*/

-- Set initial admin user
UPDATE profiles 
SET role = 'admin'
WHERE email = 'jamil@aprikosventure.com';

-- Ensure admin role exists in roles table
INSERT INTO roles (name, description, permissions)
VALUES (
  'admin',
  'Full system access and control',
  ARRAY['all']
)
ON CONFLICT (name) DO NOTHING;
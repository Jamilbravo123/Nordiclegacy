-- Drop existing table and recreate with proper structure
DROP TABLE IF EXISTS contact_form CASCADE;

CREATE TABLE contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows ANYONE to insert (including non-authenticated users)
CREATE POLICY "allow_anon_insert"
ON contact_form
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create a policy that allows admins to view all submissions
CREATE POLICY "allow_admin_select"
ON contact_form
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT INSERT ON contact_form TO anon;
GRANT INSERT ON contact_form TO authenticated;
GRANT SELECT ON contact_form TO authenticated;
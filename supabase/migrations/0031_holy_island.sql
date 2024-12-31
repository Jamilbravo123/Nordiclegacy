-- Drop existing table and recreate with proper structure
DROP TABLE IF EXISTS contact_form;

CREATE TABLE contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

-- Disable RLS temporarily
ALTER TABLE contact_form DISABLE ROW LEVEL SECURITY;

-- Enable RLS with clean state
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create a single, simple policy for submissions
CREATE POLICY "contact_form_insert_policy"
ON contact_form FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Create a policy for admin access
CREATE POLICY "contact_form_admin_policy"
ON contact_form FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Grant necessary permissions
GRANT INSERT ON contact_form TO anon;
GRANT INSERT ON contact_form TO authenticated;
GRANT ALL ON contact_form TO authenticated;
-- Drop existing table and recreate with minimal permissions
DROP TABLE IF EXISTS contact_form CASCADE;

-- Create simplified contact form table
CREATE TABLE contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Disable RLS temporarily
ALTER TABLE contact_form DISABLE ROW LEVEL SECURITY;

-- Enable RLS with clean state
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create a simple, permissive policy for anonymous submissions
CREATE POLICY "allow_anon_insert"
ON contact_form
FOR INSERT
TO anon
WITH CHECK (true);

-- Grant minimal required permissions
GRANT USAGE ON SCHEMA public TO anon;
GRANT INSERT ON contact_form TO anon;
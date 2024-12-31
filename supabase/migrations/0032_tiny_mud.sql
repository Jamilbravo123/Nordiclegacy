-- Drop existing table and start fresh
DROP TABLE IF EXISTS contact_form CASCADE;

-- Create table with minimal structure
CREATE TABLE contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Disable RLS to start clean
ALTER TABLE contact_form DISABLE ROW LEVEL SECURITY;

-- Enable RLS
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create a single, permissive policy for inserts
CREATE POLICY "allow_public_insert"
ON contact_form
FOR INSERT
TO public
WITH CHECK (true);

-- Explicitly grant permissions
GRANT USAGE ON SCHEMA public TO public;
GRANT INSERT ON TABLE contact_form TO public;
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

-- Create a simple policy that allows anyone to insert
CREATE POLICY "allow_public_insert"
ON contact_form
FOR INSERT
TO public
WITH CHECK (true);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO public;
GRANT INSERT ON TABLE contact_form TO public;
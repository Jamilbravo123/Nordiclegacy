-- Drop existing table and policies
DROP TABLE IF EXISTS contact_form CASCADE;

-- Create minimal table
CREATE TABLE contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create single, permissive policy for inserts
CREATE POLICY "enable_insert_for_all"
  ON contact_form
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Grant minimal required permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT INSERT ON contact_form TO anon, authenticated;
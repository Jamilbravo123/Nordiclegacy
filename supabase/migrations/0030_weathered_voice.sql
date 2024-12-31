-- Drop existing RLS policies
DROP POLICY IF EXISTS "Enable anonymous submissions" ON contact_form;
DROP POLICY IF EXISTS "Enable admin read access" ON contact_form;

-- Temporarily disable RLS to ensure clean state
ALTER TABLE contact_form DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create simplified policies
CREATE POLICY "Allow public submissions"
  ON contact_form
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow admin access"
  ON contact_form
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Ensure proper grants
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT INSERT ON contact_form TO anon;
GRANT INSERT ON contact_form TO authenticated;
GRANT ALL ON contact_form TO authenticated;
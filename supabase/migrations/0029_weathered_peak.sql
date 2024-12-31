-- Drop existing RLS policies
DROP POLICY IF EXISTS "Anyone can insert messages" ON contact_form;
DROP POLICY IF EXISTS "Only admins can view messages" ON contact_form;

-- Enable RLS
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create new RLS policies
CREATE POLICY "Enable anonymous submissions"
  ON contact_form
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable admin read access"
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_form_status 
  ON contact_form(status);
CREATE INDEX IF NOT EXISTS idx_contact_form_created_at 
  ON contact_form(created_at DESC);
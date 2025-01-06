-- Create the contact form table
CREATE TABLE IF NOT EXISTS contact_form (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  notification_status TEXT DEFAULT 'pending',
  notification_attempts INTEGER DEFAULT 0,
  last_notification_attempt TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS contact_form_created_at_idx ON contact_form(created_at);
CREATE INDEX IF NOT EXISTS contact_form_notification_status_idx ON contact_form(notification_status);

-- Set up RLS (Row Level Security)
ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable insert for all users" ON contact_form
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read for authenticated users only" ON contact_form
  FOR SELECT USING (auth.role() = 'authenticated'); 
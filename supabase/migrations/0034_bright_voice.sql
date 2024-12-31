-- Create notification queue table
CREATE TABLE contact_form_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_form_id uuid REFERENCES contact_form(id) ON DELETE CASCADE,
  status text DEFAULT 'pending',
  attempts integer DEFAULT 0,
  last_attempt timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE contact_form_notifications ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access
CREATE POLICY "admin_access"
ON contact_form_notifications
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = auth.uid()
    AND profiles.role = 'admin'
  )
);

-- Create function to queue notification
CREATE OR REPLACE FUNCTION queue_contact_notification()
RETURNS trigger AS $$
BEGIN
  INSERT INTO contact_form_notifications (contact_form_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new submissions
CREATE TRIGGER on_contact_form_submitted
  AFTER INSERT ON contact_form
  FOR EACH ROW
  EXECUTE FUNCTION queue_contact_notification();
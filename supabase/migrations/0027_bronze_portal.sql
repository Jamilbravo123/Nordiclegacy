-- Create a function to handle new contact form submissions
CREATE OR REPLACE FUNCTION handle_new_contact_submission()
RETURNS trigger AS $$
BEGIN
  -- Trigger the Edge Function to send email notification
  SELECT net.http_post(
    url := CONCAT(current_setting('app.settings.supabase_url'), '/functions/v1/contact-notification'),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', CONCAT('Bearer ', current_setting('app.settings.service_role_key'))
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new contact form submissions
DROP TRIGGER IF EXISTS on_contact_form_created ON contact_form;
CREATE TRIGGER on_contact_form_created
  AFTER INSERT ON contact_form
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact_submission();
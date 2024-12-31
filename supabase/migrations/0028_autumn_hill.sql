-- Create a function to handle new contact form submissions
CREATE OR REPLACE FUNCTION handle_new_contact_submission()
RETURNS trigger AS $$
DECLARE
  edge_function_url text;
  service_role_key text;
BEGIN
  -- Get the Edge Function URL from environment variable
  edge_function_url := current_setting('app.settings.edge_function_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);

  -- If environment variables are not set, log an error but don't fail
  IF edge_function_url IS NULL OR service_role_key IS NULL THEN
    RAISE WARNING 'Environment variables not properly configured for contact form notifications';
    RETURN NEW;
  END IF;

  -- The actual HTTP request will be handled by the Edge Function
  -- This trigger just marks the submission as received
  UPDATE contact_form
  SET status = 'received'
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new contact form submissions
DROP TRIGGER IF EXISTS on_contact_form_created ON contact_form;
CREATE TRIGGER on_contact_form_created
  AFTER INSERT ON contact_form
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact_submission();
-- Create the function that will be called by the trigger
CREATE OR REPLACE FUNCTION handle_new_contact_form()
RETURNS TRIGGER AS $$
DECLARE
  project_url text;
BEGIN
  -- Get the project URL from settings
  project_url := current_setting('app.settings.project_url');
  
  -- Call the Edge Function using the project URL
  PERFORM net.http_post(
    url := project_url || '/functions/v1/contact-notification',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := json_build_object('record', row_to_json(NEW))::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_contact_form_created ON contact_form;

-- Create the trigger
CREATE TRIGGER on_contact_form_created
  AFTER INSERT ON contact_form
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_contact_form(); 
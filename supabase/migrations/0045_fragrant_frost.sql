-- Create function to send referral invitation
CREATE OR REPLACE FUNCTION process_referral_invite()
RETURNS trigger AS $$
BEGIN
  -- Trigger the Edge Function to send email
  PERFORM net.http_post(
    url := CONCAT(current_setting('app.settings.supabase_url'), '/functions/v1/send-referral-invite'),
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', CONCAT('Bearer ', current_setting('app.settings.service_role_key'))
    ),
    body := jsonb_build_object(
      'referral', row_to_json(NEW),
      'referrerName', (
        SELECT full_name 
        FROM profiles 
        WHERE id = NEW.referrer_id
      )
    )
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new referrals
DROP TRIGGER IF EXISTS on_referral_created ON referrals;
CREATE TRIGGER on_referral_created
  AFTER INSERT ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION process_referral_invite();
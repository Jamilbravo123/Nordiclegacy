/*
  # Notifications System Setup
  
  1. Tables
    - member_notifications: Stores notification details
    - notification_recipients: Tracks notification delivery and read status
  
  2. Security
    - Enable RLS on both tables
    - Admin-only access for managing notifications
    - User access for viewing their notifications
  
  3. Indexes
    - Status index for filtering notifications
    - Scheduled date index for timely delivery
    - User index for recipient lookups
*/

-- Drop existing policies first
DROP POLICY IF EXISTS "Admin can manage notifications" ON member_notifications;
DROP POLICY IF EXISTS "Users can view their notifications" ON notification_recipients;

-- Create member_notifications table if it doesn't exist
CREATE TABLE IF NOT EXISTS member_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  scheduled_for timestamptz NOT NULL,
  sent_at timestamptz,
  target_audience text[] NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  created_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notification_recipients table if it doesn't exist
CREATE TABLE IF NOT EXISTS notification_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_id uuid REFERENCES member_notifications(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE member_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_recipients ENABLE ROW LEVEL SECURITY;

-- Create policies for member_notifications
CREATE POLICY "Admin can manage notifications"
  ON member_notifications FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create policies for notification_recipients
CREATE POLICY "Users can view their notifications"
  ON notification_recipients FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_status 
  ON member_notifications(status);
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled 
  ON member_notifications(scheduled_for);
CREATE INDEX IF NOT EXISTS idx_notification_recipients_user 
  ON notification_recipients(user_id);

-- Create function to get notifications
CREATE OR REPLACE FUNCTION get_notifications()
RETURNS TABLE (
  id uuid,
  title text,
  message text,
  scheduled_for timestamptz,
  sent_at timestamptz,
  target_audience text[],
  status text,
  created_by uuid,
  created_at timestamptz,
  updated_at timestamptz
) SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to execute this function
  IF NOT EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Access denied';
  END IF;

  RETURN QUERY
  SELECT 
    n.id,
    n.title,
    n.message,
    n.scheduled_for,
    n.sent_at,
    n.target_audience,
    n.status,
    n.created_by,
    n.created_at,
    n.updated_at
  FROM member_notifications n
  ORDER BY n.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_notifications() TO authenticated;
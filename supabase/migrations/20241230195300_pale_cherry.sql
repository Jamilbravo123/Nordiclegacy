-- Insert some test activities
INSERT INTO member_activity (user_id, type, description, created_at)
SELECT 
  auth.uid(),
  'signup',
  'New member joined',
  now() - interval '5 minutes'
FROM auth.users
LIMIT 1;

INSERT INTO member_activity (user_id, type, description, created_at)
SELECT 
  auth.uid(),
  'upgrade',
  'Member upgraded to Gold',
  now() - interval '15 minutes'
FROM auth.users
LIMIT 1;

INSERT INTO member_activity (user_id, type, description, created_at)
SELECT 
  auth.uid(),
  'benefit',
  'Benefit redeemed',
  now() - interval '1 hour'
FROM auth.users
LIMIT 1;

INSERT INTO member_activity (user_id, type, description, created_at)
SELECT 
  auth.uid(),
  'points',
  'Points awarded',
  now() - interval '2 hours'
FROM auth.users
LIMIT 1;
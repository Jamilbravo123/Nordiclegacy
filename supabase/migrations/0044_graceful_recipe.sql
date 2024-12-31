-- Create referrals table
CREATE TABLE IF NOT EXISTS referrals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'joined')),
  created_at timestamptz DEFAULT now()
);

-- Create referral_stats table
CREATE TABLE IF NOT EXISTS referral_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_referrals integer DEFAULT 0,
  points_earned integer DEFAULT 0,
  successful_conversions integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for referrals
CREATE POLICY "Users can insert referrals"
  ON referrals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = referrer_id);

CREATE POLICY "Users can view own referrals"
  ON referrals FOR SELECT
  TO authenticated
  USING (auth.uid() = referrer_id);

-- Create policies for referral_stats
CREATE POLICY "Users can view own stats"
  ON referral_stats FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create function to initialize referral stats
CREATE OR REPLACE FUNCTION initialize_referral_stats()
RETURNS trigger AS $$
BEGIN
  INSERT INTO referral_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created_referral_stats ON auth.users;
CREATE TRIGGER on_auth_user_created_referral_stats
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION initialize_referral_stats();

-- Create function to update referral stats
CREATE OR REPLACE FUNCTION update_referral_stats()
RETURNS trigger AS $$
BEGIN
  -- Update total referrals count
  UPDATE referral_stats
  SET 
    total_referrals = total_referrals + 1,
    points_earned = CASE 
      WHEN NEW.status = 'joined' THEN points_earned + 500
      ELSE points_earned
    END,
    successful_conversions = CASE 
      WHEN NEW.status = 'joined' THEN successful_conversions + 1
      ELSE successful_conversions
    END,
    updated_at = now()
  WHERE user_id = NEW.referrer_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for referral updates
CREATE TRIGGER on_referral_created_or_updated
  AFTER INSERT OR UPDATE ON referrals
  FOR EACH ROW
  EXECUTE FUNCTION update_referral_stats();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_id ON referrals(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
CREATE INDEX IF NOT EXISTS idx_referral_stats_user_id ON referral_stats(user_id);

-- Initialize referral stats for existing users
INSERT INTO referral_stats (user_id)
SELECT id FROM auth.users
ON CONFLICT (user_id) DO NOTHING;
/*
  # Add Missing Tables and Initial Data

  1. New Tables
    - `benefit_redemptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `benefit` (text)
      - `redeemed_at` (timestamptz)

  2. Changes
    - Add initial member profile for new users via trigger
    - Add initial profile for new users via trigger

  3. Security
    - Enable RLS on new tables
    - Add policies for authenticated users
*/

-- Create benefit_redemptions table
CREATE TABLE IF NOT EXISTS benefit_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE,
  benefit text NOT NULL,
  redeemed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE benefit_redemptions ENABLE ROW LEVEL SECURITY;

-- Create policies for benefit_redemptions
CREATE POLICY "Users can read own benefit redemptions"
  ON benefit_redemptions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own benefit redemptions"
  ON benefit_redemptions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to create initial profiles
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Insert into profiles
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');

  -- Insert into member_profiles with default SILVER tier
  INSERT INTO public.member_profiles (id, current_tier, points)
  VALUES (new.id, 'SILVER', 0);

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
/*
  # Create Contact Form Table

  1. New Tables
    - `contact_form`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `message` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS
    - Add policy for inserting messages
*/

CREATE TABLE IF NOT EXISTS contact_form (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_form ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages"
  ON contact_form
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Only admins can view messages"
  ON contact_form
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
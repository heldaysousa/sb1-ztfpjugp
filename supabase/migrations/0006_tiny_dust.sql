/*
  # Fix Profile Creation and Services

  1. Changes
    - Ensure profile is created on signup
    - Fix services foreign key constraints
    - Update RLS policies
    - Add missing indexes

  2. Security
    - Maintain RLS policies
    - Add proper constraints
*/

-- Drop existing trigger if any
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, business_name)
  VALUES (
    new.id,
    COALESCE(raw_user_meta_data->>'full_name', email),
    COALESCE(raw_user_meta_data->>'business_name', '')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    business_name = EXCLUDED.business_name;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create missing profiles for existing users
INSERT INTO public.profiles (id, full_name, business_name)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', email),
  COALESCE(raw_user_meta_data->>'business_name', '')
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM profiles WHERE profiles.id = auth.users.id
)
ON CONFLICT (id) DO NOTHING;

-- Add missing indexes
CREATE INDEX IF NOT EXISTS idx_services_owner_id ON services(owner_id);

-- Refresh RLS policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Enable insert for users" ON services;
DROP POLICY IF EXISTS "Enable select for users" ON services;
DROP POLICY IF EXISTS "Enable update for users" ON services;
DROP POLICY IF EXISTS "Enable delete for users" ON services;

CREATE POLICY "Enable insert for users"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable select for users"
  ON services FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Enable update for users"
  ON services FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Enable delete for users"
  ON services FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);
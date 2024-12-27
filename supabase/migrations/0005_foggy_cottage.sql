/*
  # Fix Profile and Services Relationship

  1. Changes
    - Ensure profiles are created for existing users
    - Update services table constraints
    - Add missing RLS policies
*/

-- Create profiles for existing users if they don't exist
INSERT INTO public.profiles (id, full_name, business_name)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', email),
  raw_user_meta_data->>'business_name'
FROM auth.users
WHERE id NOT IN (SELECT id FROM public.profiles);

-- Update services table
ALTER TABLE services
  ALTER COLUMN owner_id SET NOT NULL,
  DROP CONSTRAINT IF EXISTS services_owner_id_fkey,
  ADD CONSTRAINT services_owner_id_fkey 
    FOREIGN KEY (owner_id) 
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- Refresh RLS policies
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
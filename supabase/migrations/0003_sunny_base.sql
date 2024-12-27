/*
  # Fix Services Table RLS Policies

  1. Security Changes
    - Enable RLS on services table
    - Add policies for CRUD operations
    - Ensure owner_id is set correctly
    
  2. Changes
    - Add owner_id column if not exists
    - Add policies for authenticated users
*/

-- First ensure owner_id exists
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'services' AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE services ADD COLUMN owner_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own services" ON services;
DROP POLICY IF EXISTS "Users can insert own services" ON services;
DROP POLICY IF EXISTS "Users can update own services" ON services;
DROP POLICY IF EXISTS "Users can delete own services" ON services;

-- Create new policies
CREATE POLICY "Users can view own services"
ON services FOR SELECT
TO authenticated
USING (owner_id = auth.uid());

CREATE POLICY "Users can insert own services"
ON services FOR INSERT
TO authenticated
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can update own services"
ON services FOR UPDATE
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Users can delete own services"
ON services FOR DELETE
TO authenticated
USING (owner_id = auth.uid());
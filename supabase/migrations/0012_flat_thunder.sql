/*
  # Fix Clients RLS Policies

  1. Changes
    - Drop existing policies
    - Create new comprehensive RLS policies for clients table
    - Add proper security checks
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for users" ON clients;
DROP POLICY IF EXISTS "Enable select for users" ON clients;
DROP POLICY IF EXISTS "Enable update for users" ON clients;
DROP POLICY IF EXISTS "Enable delete for users" ON clients;

-- Create new policies with proper security checks
CREATE POLICY "Users can create their own clients"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = owner_id
  );

CREATE POLICY "Users can view their own clients"
  ON clients FOR SELECT
  TO authenticated
  USING (
    auth.uid() = owner_id
  );

CREATE POLICY "Users can update their own clients"
  ON clients FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = owner_id
  )
  WITH CHECK (
    auth.uid() = owner_id
  );

CREATE POLICY "Users can delete their own clients"
  ON clients FOR DELETE
  TO authenticated
  USING (
    auth.uid() = owner_id
  );
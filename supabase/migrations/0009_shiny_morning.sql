/*
  # Fix Clients Table RLS

  1. Changes
    - Add owner_id column if missing
    - Update foreign key constraint
    - Enable RLS
    - Create proper RLS policies
    
  2. Security
    - Enable RLS on clients table
    - Add policies for CRUD operations
    - Ensure owner_id is required
*/

-- Ensure owner_id exists and is required
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'clients' AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE clients ADD COLUMN owner_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Make owner_id required and update foreign key
ALTER TABLE clients
  ALTER COLUMN owner_id SET NOT NULL,
  DROP CONSTRAINT IF EXISTS clients_owner_id_fkey,
  ADD CONSTRAINT clients_owner_id_fkey 
    FOREIGN KEY (owner_id) 
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable insert for users" ON clients;
DROP POLICY IF EXISTS "Enable select for users" ON clients;
DROP POLICY IF EXISTS "Enable update for users" ON clients;
DROP POLICY IF EXISTS "Enable delete for users" ON clients;

-- Create new policies
CREATE POLICY "Enable insert for users"
  ON clients FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable select for users"
  ON clients FOR SELECT
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Enable update for users"
  ON clients FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Enable delete for users"
  ON clients FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_clients_owner_id ON clients(owner_id);
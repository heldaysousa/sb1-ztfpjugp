/*
  # Fix Services Foreign Key

  1. Changes
    - Update services foreign key to reference auth.users directly
    - Add NOT NULL constraint to owner_id
*/

-- Update services table foreign key
ALTER TABLE services 
  DROP CONSTRAINT IF EXISTS services_owner_id_fkey,
  ALTER COLUMN owner_id SET NOT NULL,
  ADD CONSTRAINT services_owner_id_fkey 
    FOREIGN KEY (owner_id) 
    REFERENCES auth.users(id)
    ON DELETE CASCADE;
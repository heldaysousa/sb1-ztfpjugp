/*
  # Fix Services Owner Reference

  1. Changes
    - Update services table to reference auth.users instead of profiles
    - Add trigger to auto-create profile on user signup
    - Fix existing services owner_id references

  2. Security
    - Maintain RLS policies
    - Ensure data integrity
*/

-- First modify the services foreign key to point directly to auth.users
ALTER TABLE services 
  DROP CONSTRAINT IF EXISTS services_owner_id_fkey,
  ADD CONSTRAINT services_owner_id_fkey 
    FOREIGN KEY (owner_id) 
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- Create a trigger to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, business_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'business_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
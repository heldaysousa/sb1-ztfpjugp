/*
  # Fix Authentication and Profiles Setup

  1. Changes
    - Ensure profiles table exists and has correct constraints
    - Add trigger for automatic profile creation
    - Update RLS policies
    
  2. Security
    - Enable RLS
    - Add policies for profile access
*/

-- Ensure profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  business_name text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

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
    COALESCE(new.raw_user_meta_data->>'full_name', new.email),
    COALESCE(new.raw_user_meta_data->>'business_name', '')
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    business_name = EXCLUDED.business_name,
    updated_at = now();
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

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
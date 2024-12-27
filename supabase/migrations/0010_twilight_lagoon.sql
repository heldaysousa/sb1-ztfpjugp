/*
  # Add Client Additional Fields

  1. New Fields
    - first_visit_date: Date of first appointment
    - birthday: Optional birth date
    - social_media: Optional JSON object for social media links
    - referral_source: How they found the business
    
  2. Changes
    - Add new columns to clients table
    - Add check constraint for referral_source
*/

-- Add new columns
ALTER TABLE clients
  ADD COLUMN IF NOT EXISTS first_visit_date date NOT NULL DEFAULT CURRENT_DATE,
  ADD COLUMN IF NOT EXISTS birthday date,
  ADD COLUMN IF NOT EXISTS social_media jsonb DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS referral_source text CHECK (
    referral_source IN ('social_media', 'referral', 'neighborhood', 'other')
  );

-- Add index for common queries
CREATE INDEX IF NOT EXISTS idx_clients_first_visit_date ON clients(first_visit_date);
CREATE INDEX IF NOT EXISTS idx_clients_birthday ON clients(birthday);
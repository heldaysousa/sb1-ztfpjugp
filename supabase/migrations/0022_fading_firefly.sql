/*
  # Add Commission Settings

  1. New Columns
    - Add commission_closing_day and commission_payment_deadline to professionals
    - Add commission_rate to services
  
  2. Changes
    - Update professional_services table structure
    - Add commission settings to business_settings
*/

-- Add commission fields to professionals
ALTER TABLE professionals
  ADD COLUMN IF NOT EXISTS commission_closing_day integer CHECK (commission_closing_day BETWEEN 1 AND 31),
  ADD COLUMN IF NOT EXISTS commission_payment_deadline integer CHECK (commission_payment_deadline >= 1);

-- Add commission rate to services
ALTER TABLE services
  ADD COLUMN IF NOT EXISTS commission_rate decimal(5,2);

-- Add commission settings to business_settings
ALTER TABLE business_settings
  ADD COLUMN IF NOT EXISTS default_commission_closing_day integer CHECK (default_commission_closing_day BETWEEN 1 AND 31),
  ADD COLUMN IF NOT EXISTS default_commission_payment_deadline integer CHECK (default_commission_payment_deadline >= 1),
  ADD COLUMN IF NOT EXISTS default_commission_rate decimal(5,2) CHECK (default_commission_rate BETWEEN 0 AND 100);

-- Set default values for existing records
UPDATE business_settings 
SET 
  default_commission_closing_day = 5,
  default_commission_payment_deadline = 10,
  default_commission_rate = 30.00
WHERE default_commission_closing_day IS NULL;
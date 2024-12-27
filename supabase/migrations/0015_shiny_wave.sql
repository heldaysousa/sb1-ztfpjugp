/*
  # Add revenue goals to business settings

  1. Changes
    - Add daily_revenue_goal column to business_settings
    - Add monthly_revenue_goal column to business_settings
    - Add default values for both goals
*/

-- Add revenue goal columns to business_settings
ALTER TABLE business_settings
  ADD COLUMN IF NOT EXISTS daily_revenue_goal decimal(10,2) NOT NULL DEFAULT 1000.00,
  ADD COLUMN IF NOT EXISTS monthly_revenue_goal decimal(10,2) NOT NULL DEFAULT 30000.00;

-- Update existing rows with default values if they don't have goals set
UPDATE business_settings 
SET 
  daily_revenue_goal = 1000.00 
WHERE daily_revenue_goal IS NULL;

UPDATE business_settings 
SET 
  monthly_revenue_goal = 30000.00 
WHERE monthly_revenue_goal IS NULL;
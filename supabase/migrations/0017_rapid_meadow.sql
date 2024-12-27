-- Drop existing unique constraint if exists
ALTER TABLE business_settings
DROP CONSTRAINT IF EXISTS business_settings_owner_id_key;

-- Add unique constraint with proper name
ALTER TABLE business_settings
ADD CONSTRAINT business_settings_owner_id_unique UNIQUE (owner_id);

-- Update or insert default settings for existing users
INSERT INTO business_settings (owner_id, daily_revenue_goal, monthly_revenue_goal)
SELECT 
  id as owner_id,
  1000.00 as daily_revenue_goal,
  30000.00 as monthly_revenue_goal
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM business_settings WHERE business_settings.owner_id = auth.users.id
)
ON CONFLICT (owner_id) DO NOTHING;
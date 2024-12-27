-- Create business_settings table if it doesn't exist
CREATE TABLE IF NOT EXISTS business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  daily_revenue_goal decimal(10,2) NOT NULL DEFAULT 1000.00,
  monthly_revenue_goal decimal(10,2) NOT NULL DEFAULT 30000.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (owner_id)
);

-- Enable RLS
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if exists
DROP POLICY IF EXISTS "Users can manage own business settings" ON business_settings;

-- Create new RLS policy
CREATE POLICY "Users can manage own business settings"
  ON business_settings FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

-- Create initial settings for existing users
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
/*
  # Business Settings and Inventory Management

  1. New Tables
    - business_settings: Store business configuration
    - inventory_categories: Organize inventory items
    - inventory_items: Track products and supplies
    - inventory_transactions: Record stock movements

  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated users
*/

-- Create business settings table
CREATE TABLE IF NOT EXISTS business_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_hours jsonb NOT NULL DEFAULT '{"monday":{"start":"09:00","end":"18:00"},"tuesday":{"start":"09:00","end":"18:00"},"wednesday":{"start":"09:00","end":"18:00"},"thursday":{"start":"09:00","end":"18:00"},"friday":{"start":"09:00","end":"18:00"},"saturday":{"start":"09:00","end":"14:00"},"sunday":null}'::jsonb,
  commission_payment_day integer CHECK (commission_payment_day BETWEEN 1 AND 31),
  notification_preferences jsonb DEFAULT '{"email":true,"sms":false}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE (owner_id)
);

-- Create inventory categories table
CREATE TABLE IF NOT EXISTS inventory_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inventory items table
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES inventory_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  sku text,
  unit text NOT NULL,
  quantity decimal(10,2) NOT NULL DEFAULT 0,
  minimum_quantity decimal(10,2) NOT NULL DEFAULT 0,
  cost_price decimal(10,2),
  last_purchase_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create inventory transactions table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  item_id uuid REFERENCES inventory_items(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL CHECK (type IN ('purchase', 'usage', 'adjustment')),
  quantity decimal(10,2) NOT NULL,
  unit_price decimal(10,2),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_inventory_items_owner ON inventory_items(owner_id);
CREATE INDEX IF NOT EXISTS idx_inventory_transactions_item ON inventory_transactions(item_id);

-- Enable RLS
ALTER TABLE business_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can manage own business settings"
  ON business_settings FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own inventory categories"
  ON inventory_categories FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own inventory items"
  ON inventory_items FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own inventory transactions"
  ON inventory_transactions FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());
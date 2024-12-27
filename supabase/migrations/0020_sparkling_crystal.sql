/*
  # Team and Commission Management System

  1. New Tables
    - `professionals`
      - Core professional information
      - Base commission rates
      - Contact details
    
    - `professional_services`
      - Links professionals to services
      - Service-specific commission rates
    
    - `commissions`
      - Commission calculations
      - Payment tracking
      - Transaction links

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    
  3. Indexes
    - For performance optimization
*/

-- Create professionals table if not exists
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  email text,
  phone text,
  document_number text,
  base_commission_rate decimal(5,2) NOT NULL DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create professional_services junction table if not exists
CREATE TABLE IF NOT EXISTS professional_services (
  professional_id uuid REFERENCES professionals(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  commission_rate decimal(5,2), -- Override base rate for specific services
  PRIMARY KEY (professional_id, service_id)
);

-- Create commissions table if not exists
CREATE TABLE IF NOT EXISTS commissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  professional_id uuid REFERENCES professionals(id) ON DELETE CASCADE NOT NULL,
  transaction_id uuid REFERENCES transactions(id) ON DELETE CASCADE NOT NULL,
  service_id uuid REFERENCES services(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  rate decimal(5,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'paid', 'cancelled')),
  payment_date timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_professionals_owner ON professionals(owner_id);
CREATE INDEX IF NOT EXISTS idx_commissions_professional ON commissions(professional_id);
CREATE INDEX IF NOT EXISTS idx_commissions_status ON commissions(status);

-- Enable RLS
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE commissions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can manage own professionals" ON professionals;
DROP POLICY IF EXISTS "Users can manage professional services" ON professional_services;
DROP POLICY IF EXISTS "Users can manage own commissions" ON commissions;

-- Create new RLS policies
CREATE POLICY "Enable manage for users"
  ON professionals FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Enable manage for users"
  ON professional_services FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM professionals
      WHERE professionals.id = professional_services.professional_id
      AND professionals.owner_id = auth.uid()
    )
  );

CREATE POLICY "Enable manage for users"
  ON commissions FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());
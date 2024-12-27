/*
  # Initial Schema Setup for CEO Express

  1. New Tables
    - `profiles`: Extended user profile information
    - `services`: Available beauty services
    - `professionals`: Staff members
    - `clients`: Customer information
    - `appointments`: Service bookings
    - `transactions`: Financial transactions
    - `inventory_items`: Product inventory

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Profiles table for business owners
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text NOT NULL,
  business_name text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Services offered
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  duration integer NOT NULL, -- in minutes
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Professionals/Staff
CREATE TABLE IF NOT EXISTS professionals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  cpf text NOT NULL,
  phone text,
  commission_rate decimal(5,2) NOT NULL,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Professional services junction table
CREATE TABLE IF NOT EXISTS professional_services (
  professional_id uuid REFERENCES professionals(id),
  service_id uuid REFERENCES services(id),
  PRIMARY KEY (professional_id, service_id)
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  email text,
  phone text NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id),
  client_id uuid REFERENCES clients(id),
  professional_id uuid REFERENCES professionals(id),
  service_id uuid REFERENCES services(id),
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  status text NOT NULL CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  price decimal(10,2) NOT NULL,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Financial transactions
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id),
  type text NOT NULL CHECK (type IN ('income', 'expense')),
  category text NOT NULL,
  amount decimal(10,2) NOT NULL,
  description text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  appointment_id uuid REFERENCES appointments(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Inventory
CREATE TABLE IF NOT EXISTS inventory_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id),
  name text NOT NULL,
  description text,
  quantity integer NOT NULL DEFAULT 0,
  min_quantity integer NOT NULL DEFAULT 0,
  unit_price decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can view own services"
  ON services FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own services"
  ON services FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can view own professionals"
  ON professionals FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own professionals"
  ON professionals FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can view own clients"
  ON clients FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own clients"
  ON clients FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own appointments"
  ON appointments FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can view own inventory"
  ON inventory_items FOR SELECT
  TO authenticated
  USING (owner_id = auth.uid());

CREATE POLICY "Users can manage own inventory"
  ON inventory_items FOR ALL
  TO authenticated
  USING (owner_id = auth.uid());
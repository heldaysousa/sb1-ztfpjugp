/*
  # Add Appointment History and Maintenance Tracking

  1. New Tables
    - appointment_history: Track all client appointments
    - maintenance_schedules: Track service maintenance requirements
    
  2. Changes
    - Add new tables with RLS policies
    - Add indexes for performance
*/

-- Create appointment history table
CREATE TABLE IF NOT EXISTS appointment_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  service_id uuid REFERENCES services(id) ON DELETE SET NULL,
  appointment_date date NOT NULL,
  price decimal(10,2) NOT NULL,
  status text NOT NULL CHECK (status IN ('completed', 'cancelled', 'no_show')),
  notes text,
  created_at timestamptz DEFAULT now(),
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Create maintenance schedules table
CREATE TABLE IF NOT EXISTS maintenance_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  frequency_days integer NOT NULL,
  description text NOT NULL,
  owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_appointment_history_client ON appointment_history(client_id);
CREATE INDEX IF NOT EXISTS idx_appointment_history_date ON appointment_history(appointment_date);
CREATE INDEX IF NOT EXISTS idx_maintenance_schedules_service ON maintenance_schedules(service_id);

-- Enable RLS
ALTER TABLE appointment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE maintenance_schedules ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for appointment_history
CREATE POLICY "Users can manage own appointment history"
  ON appointment_history
  USING (owner_id = auth.uid());

-- Create RLS policies for maintenance_schedules
CREATE POLICY "Users can manage own maintenance schedules"
  ON maintenance_schedules
  USING (owner_id = auth.uid());
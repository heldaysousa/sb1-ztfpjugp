-- Add owner_id column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'transactions' AND column_name = 'owner_id'
  ) THEN
    ALTER TABLE transactions ADD COLUMN owner_id uuid REFERENCES auth.users(id);
  END IF;
END $$;

-- Make owner_id required and set foreign key constraint
ALTER TABLE transactions
  ALTER COLUMN owner_id SET NOT NULL,
  DROP CONSTRAINT IF EXISTS transactions_owner_id_fkey,
  ADD CONSTRAINT transactions_owner_id_fkey 
    FOREIGN KEY (owner_id) 
    REFERENCES auth.users(id)
    ON DELETE CASCADE;

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can manage own transactions" ON transactions;

-- Create new RLS policies
CREATE POLICY "Users can manage own transactions"
  ON transactions FOR ALL
  TO authenticated
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_transactions_owner_id ON transactions(owner_id);
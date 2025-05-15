/*
  # Add fields to lawyers table

  1. Changes
    - Add required fields to lawyers table:
      - address (text)
      - whatsapp (text)
      - oab_state (text)
      - how_found (text)

  2. Security
    - Maintain existing RLS policies
*/

DO $$ 
BEGIN
  -- Add address column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lawyers' AND column_name = 'address'
  ) THEN
    ALTER TABLE lawyers ADD COLUMN address text NOT NULL DEFAULT '';
  END IF;

  -- Add whatsapp column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lawyers' AND column_name = 'whatsapp'
  ) THEN
    ALTER TABLE lawyers ADD COLUMN whatsapp text NOT NULL DEFAULT '';
  END IF;

  -- Add oab_state column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lawyers' AND column_name = 'oab_state'
  ) THEN
    ALTER TABLE lawyers ADD COLUMN oab_state text NOT NULL DEFAULT '';
  END IF;

  -- Add how_found column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'lawyers' AND column_name = 'how_found'
  ) THEN
    ALTER TABLE lawyers ADD COLUMN how_found text NOT NULL DEFAULT '';
  END IF;
END $$;
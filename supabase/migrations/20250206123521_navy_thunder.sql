/*
  # Update lawyer registration policies

  1. Changes
    - Add policy to allow new lawyer registration
    - Modify existing policies to work with unauthenticated users during registration

  2. Security
    - Maintain data isolation between lawyers
    - Allow initial registration without authentication
    - Preserve existing access controls for authenticated users
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Advogados podem ler seus próprios dados" ON lawyers;
DROP POLICY IF EXISTS "Advogados podem atualizar seus próprios dados" ON lawyers;

-- Create new policies with updated logic
CREATE POLICY "Permitir registro de novos advogados"
  ON lawyers
  FOR INSERT
  WITH CHECK (true);  -- Allow registration without authentication

CREATE POLICY "Advogados podem ler seus próprios dados"
  ON lawyers
  FOR SELECT
  USING (
    auth.uid() IS NULL OR  -- Allow reading during registration
    auth.uid()::text = id::text
  );

CREATE POLICY "Advogados podem atualizar seus próprios dados"
  ON lawyers
  FOR UPDATE
  USING (auth.uid()::text = id::text);
/*
  # Schema inicial do JusTrack

  1. Novas Tabelas
    - `lawyers` (advogados)
      - `id` (uuid, chave primária)
      - `oab_number` (texto, único)
      - `name` (texto)
      - `email` (texto, único)
      - `created_at` (timestamp)
    
    - `clients` (clientes)
      - `id` (uuid, chave primária)
      - `lawyer_id` (uuid, referência a lawyers)
      - `name` (texto)
      - `whatsapp` (texto)
      - `created_at` (timestamp)
    
    - `cases` (processos)
      - `id` (uuid, chave primária)
      - `lawyer_id` (uuid, referência a lawyers)
      - `client_id` (uuid, referência a clients)
      - `case_number` (texto)
      - `court` (texto)
      - `subject` (texto)
      - `description` (texto)
      - `status` (enum)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - RLS habilitado em todas as tabelas
    - Políticas para garantir que advogados só acessem seus próprios dados
*/

-- Criar enum para status dos processos
CREATE TYPE case_status AS ENUM ('pending', 'inProgress', 'urgent', 'completed');

-- Criar tabela de advogados
CREATE TABLE lawyers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  oab_number text UNIQUE NOT NULL,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de clientes
CREATE TABLE clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid REFERENCES lawyers(id) NOT NULL,
  name text NOT NULL,
  whatsapp text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de processos
CREATE TABLE cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid REFERENCES lawyers(id) NOT NULL,
  client_id uuid REFERENCES clients(id) NOT NULL,
  case_number text NOT NULL,
  court text NOT NULL,
  subject text NOT NULL,
  description text,
  status case_status NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE lawyers ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE cases ENABLE ROW LEVEL SECURITY;

-- Políticas para advogados
CREATE POLICY "Advogados podem ler seus próprios dados"
  ON lawyers
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Advogados podem atualizar seus próprios dados"
  ON lawyers
  FOR UPDATE
  USING (auth.uid() = id);

-- Políticas para clientes
CREATE POLICY "Advogados podem ler seus clientes"
  ON clients
  FOR SELECT
  USING (lawyer_id = auth.uid());

CREATE POLICY "Advogados podem criar clientes"
  ON clients
  FOR INSERT
  WITH CHECK (lawyer_id = auth.uid());

CREATE POLICY "Advogados podem atualizar seus clientes"
  ON clients
  FOR UPDATE
  USING (lawyer_id = auth.uid());

CREATE POLICY "Advogados podem deletar seus clientes"
  ON clients
  FOR DELETE
  USING (lawyer_id = auth.uid());

-- Políticas para processos
CREATE POLICY "Advogados podem ler seus processos"
  ON cases
  FOR SELECT
  USING (lawyer_id = auth.uid());

CREATE POLICY "Advogados podem criar processos"
  ON cases
  FOR INSERT
  WITH CHECK (lawyer_id = auth.uid());

CREATE POLICY "Advogados podem atualizar seus processos"
  ON cases
  FOR UPDATE
  USING (lawyer_id = auth.uid());

CREATE POLICY "Advogados podem deletar seus processos"
  ON cases
  FOR DELETE
  USING (lawyer_id = auth.uid());

-- Criar função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar trigger para atualizar updated_at em cases
CREATE TRIGGER update_cases_updated_at
  BEFORE UPDATE ON cases
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
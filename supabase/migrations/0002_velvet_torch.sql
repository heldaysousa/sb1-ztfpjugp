/*
  # Atualizar políticas RLS para profiles

  1. Alterações
    - Adicionar política para permitir inserção de perfil durante registro
    - Manter políticas existentes para select e update

  2. Segurança
    - Usuários podem criar seu próprio perfil durante registro
    - Usuários só podem ver e atualizar seu próprio perfil
*/

-- Remover políticas existentes para profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Criar novas políticas
CREATE POLICY "Enable insert for authentication" ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable select for users based on user_id" ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id" ON profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
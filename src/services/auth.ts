import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export class AuthService {
  static async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return { user: data.user, error: null };
    } catch (err) {
      const error = err as AuthError;
      let message = 'Erro ao fazer login. Tente novamente.';

      switch (error.message) {
        case 'Invalid login credentials':
          message = 'Email ou senha incorretos';
          break;
        case 'Email not confirmed':
          message = 'Por favor, confirme seu email antes de fazer login';
          break;
        case 'Invalid email':
          message = 'Email inválido';
          break;
      }

      return { user: null, error: message };
    }
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
}
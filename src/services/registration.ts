import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface RegistrationData {
  email: string;
  password: string;
  fullName: string;
  businessName: string;
}

export class RegistrationService {
  static async register(data: RegistrationData) {
    try {
      // Step 1: Create auth user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            business_name: data.businessName
          }
        }
      });

      if (signUpError) throw signUpError;
      if (!authData.user) throw new Error('Failed to create user');

      return {
        success: true,
        error: null
      };
    } catch (err) {
      const error = err as AuthError;
      let message = 'Erro ao criar conta. Tente novamente.';

      switch (error.message) {
        case 'User already registered':
          message = 'Este email já está registrado';
          break;
        case 'Password should be at least 6 characters':
          message = 'A senha deve ter pelo menos 6 caracteres';
          break;
        case 'Invalid email':
          message = 'Email inválido';
          break;
        default:
          console.error('Registration error:', error);
      }

      return {
        success: false,
        error: message
      };
    }
  }
}
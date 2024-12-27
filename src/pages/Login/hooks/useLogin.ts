import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { AuthService } from '../../../services/auth';
import { ROUTES } from '../../../lib/constants';

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { user, error: authError } = await AuthService.signIn(email, password);
      
      if (authError) {
        setError(authError);
        return;
      }

      if (user) {
        setUser(user);
        navigate(ROUTES.HOME);
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleLogin
  };
}
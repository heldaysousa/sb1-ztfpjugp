import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationService } from '../../../services/registration';
import { ROUTES } from '../../../lib/constants';

export function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (formData: {
    email: string;
    password: string;
    fullName: string;
    businessName: string;
  }) => {
    if (!formData.email || !formData.password || !formData.fullName) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { success, error: registrationError } = await RegistrationService.register(formData);
      
      if (!success) {
        setError(registrationError);
        return;
      }

      navigate(ROUTES.LOGIN, {
        state: { message: 'Conta criada com sucesso! Faça login para continuar.' }
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    handleRegister
  };
}
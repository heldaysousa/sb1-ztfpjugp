import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { ROUTES } from '../../lib/constants';
import { Mail, Lock, Sun, Moon } from 'lucide-react';
import { useLogin } from './hooks/useLogin';

export default function Login() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { loading, error, handleLogin } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const state = location.state as { message?: string };
    if (state?.message) {
      setMessage(state.message);
    }
  }, [location]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await handleLogin(email, password);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-purple via-purple-700 to-purple-900 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-lg"
      >
        {theme === 'dark' ? (
          <Sun className="w-6 h-6" />
        ) : (
          <Moon className="w-6 h-6" />
        )}
      </button>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <Logo size="lg" className="w-48 text-white" />
            </div>
            <h2 className="mt-2 text-xl text-white/90 font-light">
              Gerencie seu negócio com excelência
            </h2>
          </div>

          <div className="mt-8 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl space-y-6">
            {message && (
              <div className="p-4 bg-green-500/10 text-green-400 rounded-lg text-sm">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                             bg-white/10 text-white placeholder-white/50
                             focus:outline-none focus:ring-2 focus:ring-white/50
                             focus:border-transparent"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/60" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                             bg-white/10 text-white placeholder-white/50
                             focus:outline-none focus:ring-2 focus:ring-white/50
                             focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 text-red-400 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full py-3 text-lg font-medium bg-white hover:bg-white/90 text-accent-purple"
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-white/70">
                Não tem uma conta?{' '}
                <Link 
                  to={ROUTES.REGISTER} 
                  className="font-medium text-white hover:text-white/90"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
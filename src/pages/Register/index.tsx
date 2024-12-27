import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Logo } from '../../components/ui/Logo';
import { ROUTES } from '../../lib/constants';
import { useRegistration } from './hooks/useRegistration';

export default function Register() {
  const { loading, error, handleRegister } = useRegistration();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    businessName: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent-purple via-purple-700 to-purple-900 flex">
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Logo size="lg" className="text-white" />
            </div>
            <h2 className="text-xl text-white/90">Crie sua conta</h2>
          </div>

          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">
                    Nome completo *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <User className="h-5 w-5 text-white/60" />
                    </div>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/10 text-white placeholder-white/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">
                    Nome do negócio
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Briefcase className="h-5 w-5 text-white/60" />
                    </div>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/10 text-white placeholder-white/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Mail className="h-5 w-5 text-white/60" />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/10 text-white placeholder-white/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">
                    Senha *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <Lock className="h-5 w-5 text-white/60" />
                    </div>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg 
                               bg-white/10 text-white placeholder-white/50"
                      required
                      minLength={6}
                    />
                  </div>
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
                {loading ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-white/70">
                Já tem uma conta?{' '}
                <Link to={ROUTES.LOGIN} className="font-medium text-white hover:text-white/90">
                  Faça login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
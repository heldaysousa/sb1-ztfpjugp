import React from 'react';
import { NavLink } from 'react-router-dom';
import { Settings, Users, DollarSign } from 'lucide-react';

const navItems = [
  { to: '/configuracoes', icon: Settings, label: 'Geral', end: true },
  { to: '/configuracoes/equipe', icon: Users, label: 'Equipe' },
  { to: '/configuracoes/comissoes', icon: DollarSign, label: 'Comissões' }
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Configurações</h1>
        <p className="mt-1 text-sm text-gray-500">
          Gerencie as configurações do seu negócio
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <nav className="w-full md:w-64 space-y-1">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg
                ${isActive
                  ? 'bg-accent-purple text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
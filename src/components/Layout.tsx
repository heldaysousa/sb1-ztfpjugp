import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Logo } from './ui/Logo';
import { useTheme } from '../hooks/useTheme';
import { useAuthStore } from '../store/authStore';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  DollarSign,
  Package,
  Settings,
  LogOut,
  Menu,
  Sun,
  Moon
} from 'lucide-react';
import { MobileMenu } from './Layout/MobileMenu';
import { ROUTES } from '../lib/constants';

export function Layout() {
  const { signOut } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-accent-purple dark:bg-gray-800">
        <div className="p-4">
          <Logo className="text-white" />
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <Link to={ROUTES.HOME} className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link to={ROUTES.APPOINTMENTS} className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
            <Calendar className="w-5 h-5 mr-3" />
            Agenda
          </Link>
          <Link to={ROUTES.CLIENTS} className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
            <Users className="w-5 h-5 mr-3" />
            Clientes
          </Link>
          <Link to={ROUTES.FINANCIAL} className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
            <DollarSign className="w-5 h-5 mr-3" />
            Financeiro
          </Link>
          <Link to={ROUTES.SERVICES} className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
            <Package className="w-5 h-5 mr-3" />
            Serviços
          </Link>
          <Link to={ROUTES.SETTINGS} className="flex items-center px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg">
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Link>
        </nav>

        <div className="p-4 border-t border-white/20 space-y-4">
          <button
            onClick={toggleTheme}
            className="flex items-center w-full px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-5 h-5 mr-3" />
                Modo Claro
              </>
            ) : (
              <>
                <Moon className="w-5 h-5 mr-3" />
                Modo Escuro
              </>
            )}
          </button>
          
          <button
            onClick={() => signOut()}
            className="flex items-center w-full px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-col flex-1">
        <header className="lg:hidden flex items-center justify-between p-4 bg-accent-purple dark:bg-gray-800">
          <Logo className="text-white h-6" />
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-white"
            >
              {theme === 'dark' ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-white/80 hover:text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </header>

        {/* Mobile menu */}
        <MobileMenu 
          isOpen={isMobileMenuOpen} 
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
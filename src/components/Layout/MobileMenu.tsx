import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { ROUTES } from '../../lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { signOut } = useAuthStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-gray-900/50" onClick={onClose} />
      
      <div className="fixed right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="space-y-4">
          <Link 
            to={ROUTES.HOME} 
            className="block py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
            onClick={onClose}
          >
            Dashboard
          </Link>
          <Link 
            to={ROUTES.APPOINTMENTS} 
            className="block py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
            onClick={onClose}
          >
            Agenda
          </Link>
          <Link 
            to={ROUTES.CLIENTS} 
            className="block py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
            onClick={onClose}
          >
            Clientes
          </Link>
          <Link 
            to={ROUTES.FINANCIAL} 
            className="block py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
            onClick={onClose}
          >
            Financeiro
          </Link>
          <Link 
            to={ROUTES.SERVICES} 
            className="block py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
            onClick={onClose}
          >
            Serviços
          </Link>
          <Link 
            to={ROUTES.SETTINGS} 
            className="block py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
            onClick={onClose}
          >
            Configurações
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => {
              signOut();
              onClose();
            }}
            className="w-full px-4 py-2 text-gray-700 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
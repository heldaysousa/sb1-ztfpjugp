import React from 'react';
import { Edit } from 'lucide-react';
import { Professional } from '../../../types/professional';

interface ProfessionalListProps {
  professionals: Professional[];
  onEdit: (professional: Professional) => void;
}

export function ProfessionalList({ professionals, onEdit }: ProfessionalListProps) {
  if (professionals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhum profissional cadastrado
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {professionals.map((professional) => (
          <li key={professional.id}>
            <div className="px-4 py-4 flex items-center justify-between sm:px-6">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {professional.name}
                </h3>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-6">
                  {professional.email && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {professional.email}
                    </p>
                  )}
                  {professional.phone && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {professional.phone}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Comissão base: {professional.commission_rate}%
                  </p>
                </div>
                {professional.description && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {professional.description}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onEdit(professional)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
import React from 'react';
import { Check, X, AlertCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: 'completed' | 'cancelled' | 'no_show';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = {
    completed: {
      color: 'bg-green-100 text-green-800',
      icon: Check,
      label: 'Realizado'
    },
    cancelled: {
      color: 'bg-red-100 text-red-800',
      icon: X,
      label: 'Cancelado'
    },
    no_show: {
      color: 'bg-yellow-100 text-yellow-800',
      icon: AlertCircle,
      label: 'Não Compareceu'
    }
  };

  const { color, icon: Icon, label } = config[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
      <Icon className="w-3 h-3 mr-1" />
      {label}
    </span>
  );
}
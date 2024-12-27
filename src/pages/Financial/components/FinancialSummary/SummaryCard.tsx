import React from 'react';
import { formatCurrency } from '../../../../utils/format';
import { SummaryCardProps } from './types';

const variants = {
  success: 'bg-green-100 text-green-600',
  danger: 'bg-red-100 text-red-600',
  info: 'bg-blue-100 text-blue-600',
  accent: 'bg-purple-100 text-purple-600'
};

export function SummaryCard({ title, value, icon, variant, isPercentage = false }: SummaryCardProps) {
  const formattedValue = isPercentage 
    ? `${value.toFixed(1)}%`
    : formatCurrency(value);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${variants[variant]}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{formattedValue}</p>
        </div>
      </div>
    </div>
  );
}
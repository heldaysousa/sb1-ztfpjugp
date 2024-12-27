import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'rose' | 'blue' | 'green' | 'purple';
}

export function Card({ title, value, icon, color }: CardProps) {
  const colorClasses = {
    rose: 'bg-rose-100 text-rose-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center">
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}
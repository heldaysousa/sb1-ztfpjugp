import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  progress?: number;
  icon: LucideIcon;
  color: 'purple' | 'green' | 'blue' | 'red';
}

export function MetricsCard({ 
  title, 
  value, 
  subtitle, 
  progress, 
  icon: Icon,
  color
}: MetricsCardProps) {
  const colors = {
    purple: 'border-accent-purple',
    green: 'border-status-success',
    blue: 'border-blue-600',
    red: 'border-status-error'
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border-l-4 ${colors[color]} 
                    transform transition-all duration-200 hover:scale-105`}>
      <div className="flex items-center">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Icon className="w-6 h-6 text-accent-purple dark:text-white" />
        </div>
        <div className="ml-4 flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>
      </div>

      {typeof progress === 'number' && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-purple dark:bg-accent transition-all duration-500 ease-out"
              style={{ width: `${Math.min(100, progress)}%` }}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {progress.toFixed(1)}% da meta
          </p>
        </div>
      )}
    </div>
  );
}
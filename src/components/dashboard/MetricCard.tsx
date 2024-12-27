import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'purple' | 'green' | 'red' | 'blue';
  subtitle?: string;
  progress?: number;
}

export function MetricCard({ title, value, icon: Icon, color, subtitle, progress }: MetricCardProps) {
  const colors = {
    purple: 'border-accent-purple',
    green: 'border-status-success',
    red: 'border-status-error',
    blue: 'border-blue-600'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-l-4 ${colors[color]}`}
    >
      <div className="flex items-center">
        <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <Icon className="w-6 h-6 text-accent-purple dark:text-white" />
        </div>
        <div className="ml-4">
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
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, progress)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-accent-purple dark:bg-accent"
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {progress.toFixed(1)}% da meta
          </p>
        </div>
      )}
    </motion.div>
  );
}
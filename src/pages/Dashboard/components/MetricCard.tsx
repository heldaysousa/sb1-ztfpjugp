import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: 'purple' | 'green' | 'blue' | 'red';
  subtitle?: string;
  progress?: number;
}

export function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle, 
  progress 
}: MetricCardProps) {
  const colors = {
    purple: 'border-[#4B0082]',
    green: 'border-[#006400]',
    blue: 'border-blue-600',
    red: 'border-[#8B0000]'
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`bg-[#1C1C1C] rounded-lg p-5 shadow-[0px_4px_8px_rgba(0,0,0,0.2)] border-l-4 ${colors[color]}`}
    >
      <div className="flex items-center">
        <div className="p-3 bg-black/20 rounded-lg">
          <Icon className="w-6 h-6 text-[#C0C0C0]" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-[#C0C0C0]">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
          {subtitle && (
            <p className="text-sm text-[#C0C0C0] mt-1">{subtitle}</p>
          )}
        </div>
      </div>
      
      {typeof progress === 'number' && (
        <div className="mt-4">
          <div className="h-2 bg-black/20 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, progress)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-[#4B0082]"
            />
          </div>
          <p className="text-sm text-[#C0C0C0] mt-1">
            {progress.toFixed(1)}% da meta
          </p>
        </div>
      )}
    </motion.div>
  );
}
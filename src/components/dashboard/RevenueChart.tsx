import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { formatCurrency } from '../../utils/format';

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Faturamento Semanal
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="date" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
              tickFormatter={(value) => formatCurrency(value)}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#f3f4f6'
              }}
              formatter={(value) => formatCurrency(Number(value))}
            />
            <Bar 
              dataKey="revenue" 
              fill="#4B0082"
              radius={[4, 4, 0, 0]}
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Visualize o faturamento diário dos últimos 7 dias para acompanhar a evolução das receitas
      </p>
    </motion.div>
  );
}
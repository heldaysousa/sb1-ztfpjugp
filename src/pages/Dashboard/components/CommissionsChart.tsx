import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../../utils/format';

interface CommissionData {
  name: string;
  value: number;
}

interface CommissionsChartProps {
  data: CommissionData[];
}

const COLORS = ['#4B0082', '#C0C0C0', '#8B0000', '#006400', '#1C1C1C'];

export function CommissionsChart({ data }: CommissionsChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Comissões da Equipe
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total: {formatCurrency(total)}
        </p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              labelLine={false}
              label={({ name, value, percent }) => 
                `${name}: ${formatCurrency(value)} (${(percent * 100).toFixed(1)}%)`
              }
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#f3f4f6'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
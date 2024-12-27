import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { formatCurrency } from '../../../utils/format';

interface RevenueDistributionData {
  name: string;
  value: number;
}

interface RevenueDistributionChartProps {
  data: RevenueDistributionData[];
}

const COLORS = ['#4B0082', '#6B238E', '#9370DB', '#8B008B'];

export function RevenueDistributionChart({ data }: RevenueDistributionChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        Distribuição de Receitas
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  strokeWidth={2}
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
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        Total: {formatCurrency(total)} - Visualize a distribuição das receitas por categoria de serviço.
      </p>
    </div>
  );
}
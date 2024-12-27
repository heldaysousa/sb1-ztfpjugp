import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AppointmentData {
  hour: string;
  count: number;
}

interface AppointmentsChartProps {
  data: AppointmentData[];
}

export function AppointmentsChart({ data }: AppointmentsChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Agendamentos por Hora
      </h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="hour" 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <YAxis 
              stroke="#6b7280"
              tick={{ fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#f3f4f6'
              }}
            />
            <Bar dataKey="count" fill="#e11d48" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
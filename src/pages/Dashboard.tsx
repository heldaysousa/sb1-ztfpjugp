import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Users, DollarSign, TrendingUp } from 'lucide-react';

const data = [
  { name: 'Seg', valor: 1200 },
  { name: 'Ter', valor: 900 },
  { name: 'Qua', valor: 1500 },
  { name: 'Qui', valor: 1800 },
  { name: 'Sex', valor: 2000 },
  { name: 'Sáb', valor: 2400 },
  { name: 'Dom', valor: 800 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      {/* Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-rose-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-rose-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Faturamento Hoje</p>
              <p className="text-2xl font-semibold text-gray-900">R$ 1.500</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Agendamentos</p>
              <p className="text-2xl font-semibold text-gray-900">8</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Clientes Hoje</p>
              <p className="text-2xl font-semibold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Meta Mensal</p>
              <p className="text-2xl font-semibold text-gray-900">75%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Faturamento Semanal</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valor" fill="#e11d48" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
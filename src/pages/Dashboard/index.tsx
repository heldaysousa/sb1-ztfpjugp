import React from 'react';
import { motion } from 'framer-motion';
import { Card, Title, Text } from '@tremor/react';
import { MetricsGrid } from './components/MetricsGrid';
import { RevenueChart } from './components/RevenueChart';
import { RevenueDistribution } from './components/RevenueDistribution';
import { GoalsProgress } from './components/GoalsProgress';
import { useDashboardData } from './hooks/useDashboardData';

export default function Dashboard() {
  const { data, loading, error } = useDashboardData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-purple"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 text-red-600 rounded-lg">
        Erro ao carregar dados: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <div>
          <Title>Dashboard</Title>
          <Text>Visão geral do seu negócio</Text>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <GoalsProgress
              dailyRevenue={data.dailyRevenue}
              monthlyRevenue={data.monthlyRevenue}
              dailyGoal={data.dailyGoal}
              monthlyGoal={data.monthlyGoal}
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <RevenueDistribution data={data.distributionData} />
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <MetricsGrid {...data} />
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <RevenueChart data={data.revenueData} />
        </Card>
      </motion.div>
    </div>
  );
}
import React from 'react';
import { DollarSign, Target, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { MetricCard } from '../MetricCard';
import { MetricsGridProps } from './types';

export function MetricsGrid({
  dailyRevenue,
  monthlyRevenue,
  dailyGoal,
  monthlyGoal,
  appointmentsToday
}: MetricsGridProps) {
  const dailyProgress = (dailyRevenue / dailyGoal) * 100;
  const monthlyProgress = (monthlyRevenue / monthlyGoal) * 100;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
    >
      <MetricCard
        title="Faturamento Hoje"
        value={dailyRevenue}
        subtitle={`Meta: ${dailyGoal}`}
        progress={dailyProgress}
        icon={DollarSign}
      />
      
      <MetricCard
        title="Faturamento Mensal"
        value={monthlyRevenue}
        subtitle={`Meta: ${monthlyGoal}`}
        progress={monthlyProgress}
        icon={DollarSign}
      />

      <MetricCard
        title="Meta Diária"
        value={dailyGoal}
        subtitle={`Realizado: ${dailyProgress.toFixed(1)}%`}
        progress={dailyProgress}
        icon={Target}
      />

      <MetricCard
        title="Meta Mensal"
        value={monthlyGoal}
        subtitle={`Realizado: ${monthlyProgress.toFixed(1)}%`}
        progress={monthlyProgress}
        icon={Target}
      />
      
      <MetricCard
        title="Agendamentos Hoje"
        value={appointmentsToday.toString()}
        icon={Calendar}
      />
    </motion.div>
  );
}
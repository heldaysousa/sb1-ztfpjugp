import React from 'react';
import { Card } from '../../../components/ui/Card';
import { DollarSign, Users, Calendar, Target } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';

interface MetricsCardsProps {
  dailyRevenue: number;
  monthlyRevenue: number;
  monthlyGoal: number;
  appointmentsToday: number;
  clientsToday: number;
  commissionTotal: number;
}

export function MetricsCards({
  dailyRevenue,
  monthlyRevenue,
  monthlyGoal,
  appointmentsToday,
  clientsToday,
  commissionTotal
}: MetricsCardsProps) {
  const goalProgress = (monthlyRevenue / monthlyGoal) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        title="Faturamento Hoje"
        value={formatCurrency(dailyRevenue)}
        icon={<DollarSign className="w-6 h-6" />}
        color="rose"
      />
      
      <Card
        title="Agendamentos Hoje"
        value={appointmentsToday.toString()}
        icon={<Calendar className="w-6 h-6" />}
        color="blue"
      />
      
      <Card
        title="Clientes Hoje"
        value={clientsToday.toString()}
        icon={<Users className="w-6 h-6" />}
        color="green"
      />
      
      <Card
        title="Meta Mensal"
        value={`${goalProgress.toFixed(1)}%`}
        icon={<Target className="w-6 h-6" />}
        color="purple"
      />
    </div>
  );
}
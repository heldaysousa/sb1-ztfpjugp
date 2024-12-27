import React from 'react';
import { ProgressBar, Title, Text, Flex, Badge } from '@tremor/react';
import { formatCurrency } from '../../../utils/format';

interface GoalsProgressProps {
  dailyRevenue: number;
  monthlyRevenue: number;
  dailyGoal: number;
  monthlyGoal: number;
}

export function GoalsProgress({
  dailyRevenue,
  monthlyRevenue,
  dailyGoal,
  monthlyGoal
}: GoalsProgressProps) {
  const dailyProgress = Math.min((dailyRevenue / dailyGoal) * 100, 100);
  const monthlyProgress = Math.min((monthlyRevenue / monthlyGoal) * 100, 100);

  return (
    <div>
      <Title>Progresso das Metas</Title>
      <div className="mt-6 space-y-6">
        <div>
          <Flex>
            <Text>Meta Diária</Text>
            <Text>{formatCurrency(dailyRevenue)} / {formatCurrency(dailyGoal)}</Text>
          </Flex>
          <ProgressBar
            value={dailyProgress}
            color={dailyProgress >= 100 ? "emerald" : "purple"}
            className="mt-2"
          />
          <div className="mt-1 text-right">
            <Badge color={dailyProgress >= 100 ? "emerald" : "purple"}>
              {dailyProgress.toFixed(1)}%
            </Badge>
          </div>
        </div>

        <div>
          <Flex>
            <Text>Meta Mensal</Text>
            <Text>{formatCurrency(monthlyRevenue)} / {formatCurrency(monthlyGoal)}</Text>
          </Flex>
          <ProgressBar
            value={monthlyProgress}
            color={monthlyProgress >= 100 ? "emerald" : "purple"}
            className="mt-2"
          />
          <div className="mt-1 text-right">
            <Badge color={monthlyProgress >= 100 ? "emerald" : "purple"}>
              {monthlyProgress.toFixed(1)}%
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
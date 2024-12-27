import React from 'react';
import { Grid, Card, Text, Metric, Flex, Icon } from '@tremor/react';
import { DollarSign, Target, Calendar } from 'lucide-react';
import { formatCurrency } from '../../../utils/format';
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

  return (
    <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
      <Card decoration="top" decorationColor="purple">
        <Flex>
          <div>
            <Text>Faturamento Hoje</Text>
            <Metric>{formatCurrency(dailyRevenue)}</Metric>
            <Text className="mt-2">Meta: {formatCurrency(dailyGoal)}</Text>
          </div>
          <Icon
            icon={DollarSign}
            color="purple"
            variant="solid"
            size="xl"
          />
        </Flex>
      </Card>

      <Card decoration="top" decorationColor="indigo">
        <Flex>
          <div>
            <Text>Faturamento Mensal</Text>
            <Metric>{formatCurrency(monthlyRevenue)}</Metric>
            <Text className="mt-2">Meta: {formatCurrency(monthlyGoal)}</Text>
          </div>
          <Icon
            icon={Target}
            color="indigo"
            variant="solid"
            size="xl"
          />
        </Flex>
      </Card>

      <Card decoration="top" decorationColor="violet">
        <Flex>
          <div>
            <Text>Agendamentos Hoje</Text>
            <Metric>{appointmentsToday}</Metric>
          </div>
          <Icon
            icon={Calendar}
            color="violet"
            variant="solid"
            size="xl"
          />
        </Flex>
      </Card>
    </Grid>
  );
}
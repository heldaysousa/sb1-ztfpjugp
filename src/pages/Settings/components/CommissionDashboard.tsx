import React from 'react';
import { Card, Title, Text, Grid, Metric, Flex } from '@tremor/react';
import { formatCurrency } from '../../../utils/format';

interface CommissionDashboardProps {
  totalCommissions: number;
  pendingCommissions: number;
  averageCommissionRate: number;
  topProfessionals: Array<{
    name: string;
    totalCommissions: number;
    completedServices: number;
  }>;
}

export function CommissionDashboard({
  totalCommissions,
  pendingCommissions,
  averageCommissionRate,
  topProfessionals
}: CommissionDashboardProps) {
  return (
    <div className="space-y-6">
      <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
        <Card>
          <Title>Total em Comissões</Title>
          <Metric>{formatCurrency(totalCommissions)}</Metric>
        </Card>
        <Card>
          <Title>Comissões Pendentes</Title>
          <Metric>{formatCurrency(pendingCommissions)}</Metric>
        </Card>
        <Card>
          <Title>Taxa Média</Title>
          <Metric>{averageCommissionRate.toFixed(1)}%</Metric>
        </Card>
      </Grid>

      <Card>
        <Title>Top Profissionais</Title>
        <div className="mt-4 space-y-4">
          {topProfessionals.map((professional) => (
            <div key={professional.name} className="border-b last:border-0 pb-4">
              <Flex>
                <div>
                  <Text>{professional.name}</Text>
                  <Text className="text-gray-500">
                    {professional.completedServices} serviços realizados
                  </Text>
                </div>
                <Text>{formatCurrency(professional.totalCommissions)}</Text>
              </Flex>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
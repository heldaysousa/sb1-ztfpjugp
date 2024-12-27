import React from 'react';
import { DonutChart, Title, Legend } from '@tremor/react';
import { formatCurrency } from '../../../utils/format';

interface RevenueDistributionData {
  name: string;
  value: number;
}

interface RevenueDistributionProps {
  data: RevenueDistributionData[];
}

export function RevenueDistribution({ data }: RevenueDistributionProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div>
      <Title>Distribuição de Receitas</Title>
      <div className="mt-4">
        <DonutChart
          data={data}
          category="value"
          index="name"
          valueFormatter={formatCurrency}
          colors={["purple", "indigo", "violet"]}
          showAnimation={true}
        />
      </div>
      <Legend
        className="mt-3"
        categories={data.map(d => d.name)}
        colors={["purple", "indigo", "violet"]}
      />
      <div className="mt-4 text-center text-sm text-gray-500">
        Total: {formatCurrency(total)}
      </div>
    </div>
  );
}
import React from 'react';
import { AreaChart, Card, Title } from '@tremor/react';
import { formatCurrency } from '../../../utils/format';

interface RevenueData {
  date: string;
  revenue: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <div>
      <Title>Faturamento Semanal</Title>
      <AreaChart
        className="h-72 mt-4"
        data={data}
        index="date"
        categories={["revenue"]}
        colors={["purple"]}
        valueFormatter={(value) => formatCurrency(value)}
        showLegend={false}
        showGridLines={false}
        showAnimation={true}
      />
    </div>
  );
}
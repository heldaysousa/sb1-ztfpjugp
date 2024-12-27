import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { SummaryCard } from './SummaryCard';
import { calculateSummary } from './utils';
import { FinancialSummaryProps } from './types';

export function FinancialSummary({ transactions }: FinancialSummaryProps) {
  const { income, expenses, balance, profitMargin } = calculateSummary(transactions);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SummaryCard
        title="Receitas"
        value={income}
        icon={<TrendingUp className="w-6 h-6" />}
        variant="success"
      />
      
      <SummaryCard
        title="Despesas"
        value={expenses}
        icon={<TrendingDown className="w-6 h-6" />}
        variant="danger"
      />
      
      <SummaryCard
        title="Saldo"
        value={balance}
        icon={<DollarSign className="w-6 h-6" />}
        variant="info"
      />
      
      <SummaryCard
        title="Margem de Lucro"
        value={profitMargin}
        icon={<Percent className="w-6 h-6" />}
        variant="accent"
        isPercentage
      />
    </div>
  );
}
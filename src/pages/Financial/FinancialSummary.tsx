import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { formatCurrency } from '../../utils/format';

interface Transaction {
  type: 'income' | 'expense';
  amount: number;
}

interface FinancialSummaryProps {
  transactions: Transaction[];
}

export function FinancialSummary({ transactions }: FinancialSummaryProps) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;
  const profitMargin = income > 0 ? (balance / income) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card
        title="Receitas"
        value={formatCurrency(income)}
        icon={<TrendingUp className="w-6 h-6" />}
        color="green"
      />
      
      <Card
        title="Despesas"
        value={formatCurrency(expenses)}
        icon={<TrendingDown className="w-6 h-6" />}
        color="rose"
      />
      
      <Card
        title="Saldo"
        value={formatCurrency(balance)}
        icon={<DollarSign className="w-6 h-6" />}
        color="blue"
      />
      
      <Card
        title="Margem de Lucro"
        value={`${profitMargin.toFixed(1)}%`}
        icon={<Percent className="w-6 h-6" />}
        color="purple"
      />
    </div>
  );
}
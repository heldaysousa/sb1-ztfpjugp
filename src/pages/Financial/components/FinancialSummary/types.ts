import { ReactNode } from 'react';
import { Transaction } from '../../types';

export interface FinancialSummaryProps {
  transactions: Transaction[];
}

export interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  variant: 'success' | 'danger' | 'info' | 'accent';
  isPercentage?: boolean;
}

export interface Summary {
  income: number;
  expenses: number;
  balance: number;
  profitMargin: number;
}
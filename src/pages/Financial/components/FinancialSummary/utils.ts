import { Transaction } from '../../types';
import { Summary } from './types';

export function calculateSummary(transactions: Transaction[]): Summary {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;
  const profitMargin = income > 0 ? (balance / income) * 100 : 0;

  return {
    income,
    expenses,
    balance,
    profitMargin
  };
}
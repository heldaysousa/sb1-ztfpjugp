export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

export interface TransactionFilter {
  startDate: string;
  endDate: string;
  type: 'all' | 'income' | 'expense';
  dateRange: string;
}

export interface TransactionFormData {
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}
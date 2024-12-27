import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { TransactionFilters } from './components/TransactionFilters';
import { FinancialSummary } from './components/FinancialSummary';
import { useTransactions } from './hooks/useTransactions';
import { INITIAL_FILTER } from './utils/constants';

export default function Financial() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { transactions, isLoading, error, loadTransactions } = useTransactions();
  const [filter, setFilter] = useState(INITIAL_FILTER);

  useEffect(() => {
    loadTransactions(filter);
  }, [filter, loadTransactions]);

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-md">
        Erro ao carregar transações: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Financeiro</h1>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      <FinancialSummary transactions={transactions} />

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <TransactionFilters 
          filter={filter} 
          onFilterChange={setFilter} 
        />

        {isLoading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600" />
          </div>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </div>

      {isFormOpen && (
        <TransactionForm
          onClose={() => setIsFormOpen(false)}
          onSave={() => {
            loadTransactions(filter);
            setIsFormOpen(false);
          }}
        />
      )}
    </div>
  );
}
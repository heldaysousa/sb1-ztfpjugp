import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../../utils/format';
import { getCategoryLabel } from '../utils/categories';
import { useTransactions } from '../hooks/useTransactions';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const { deleteTransaction } = useTransactions();

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      await deleteTransaction(id);
    }
  };

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        Nenhuma transação encontrada
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Data
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoria
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Descrição
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valor
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatDate(transaction.date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                >
                  {transaction.type === 'income' ? 'Receita' : 'Despesa'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {getCategoryLabel(transaction.type, transaction.category)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {transaction.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {formatCurrency(transaction.amount)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button className="text-gray-400 hover:text-gray-600 mr-2">
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  className="text-gray-400 hover:text-red-600"
                  onClick={() => handleDelete(transaction.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
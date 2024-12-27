import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { TRANSACTION_CATEGORIES, getCategoryLabel } from '../utils/categories';
import { useTransactions } from '../hooks/useTransactions';

interface TransactionFormProps {
  onClose: () => void;
  onSave: () => void;
}

export function TransactionForm({ onClose, onSave }: TransactionFormProps) {
  const { addTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    type: 'income',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.category) {
      newErrors.category = 'Categoria é obrigatória';
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Valor deve ser maior que zero';
    }
    if (!formData.date) {
      newErrors.date = 'Data é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await addTransaction({
        type: formData.type as 'income' | 'expense',
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        date: formData.date
      });
      onSave();
    } catch (error) {
      setErrors({ submit: 'Erro ao salvar transação' });
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Nova Transação
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="income"
                checked={formData.type === 'income'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                className="mr-2"
              />
              Receita
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="expense"
                checked={formData.type === 'expense'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'income' | 'expense' })}
                className="mr-2"
              />
              Despesa
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Categoria
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300"
            >
              <option value="">Selecione uma categoria</option>
              {TRANSACTION_CATEGORIES[formData.type as 'income' | 'expense'].map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          <Input
            label="Valor"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            error={errors.amount}
          />

          <Input
            label="Data"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            error={errors.date}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300"
            />
          </div>

          {errors.submit && (
            <p className="text-sm text-red-600">{errors.submit}</p>
          )}

          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}